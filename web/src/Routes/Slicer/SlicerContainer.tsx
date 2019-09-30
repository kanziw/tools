import { Form } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { RcFile, UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import { saveAs } from 'file-saver'
import React, { Component } from 'react'
import { formatNumber, slicer } from 'utils'
import SlicerPresenter from './SlicerPresenter'

const SLICE_SIZE_DEFAULT_VALUE = 50000
const SLICE_SIZE_MIN_VALUE = 10
const SLICE_SIZE_MAX_VALUE = 2000000

interface State {
  num: number
}

class SliceContainer extends Component<FormComponentProps, State> {
  state = { num: 0 }

  name = (originalFileName: string, suffix: string): string => (
    `${originalFileName.replace(/\.json$/, '')}_${suffix}.json`
  )

  saveJson = (originalFileName: string, digit: number) => (
    (resultJson: Array<object>): void => {
      this.setState(({ num: prevNum }) => {
        const num = prevNum + 1
        saveAs(
          new Blob([ JSON.stringify(resultJson, null, 2) ],
            { type: 'text/plain;charset=utf-8' },
          ),
          this.name(originalFileName, formatNumber(num, digit)),
        )
        return { num }
      })
    }
  )

  hijackFile = (file: RcFile): boolean => {
    const size = this.props.form.getFieldValue('input-number')
    const fileReader = new FileReader()
    fileReader.onload = () => {
      const { result: text } = fileReader as { result: string }
      const results = slicer<object>(JSON.parse(text), size)
      results.forEach(this.saveJson(file.name, results.length))
    }
    fileReader.readAsText(file)
    return false
  }

  normFile = ({ fileList }: UploadChangeParam): Array<UploadFile> => fileList

  withSliceSizeValidation: (node: React.ReactNode) => React.ReactNode = (
    this.props.form.getFieldDecorator(
      'input-number',
      { initialValue: SLICE_SIZE_DEFAULT_VALUE },
    )
  )

  withDraggerValidation: (node: React.ReactNode) => React.ReactNode = (
    this.props.form.getFieldDecorator(
      'dragger',
      {
        valuePropName: 'fileList',
        getValueFromEvent: this.normFile,
      },
    )
  )

  render = () => (
    <SlicerPresenter
      withSliceSizeValidation={this.withSliceSizeValidation}
      withDraggerValidation={this.withDraggerValidation}
      hijackFile={this.hijackFile}
      SLICE_SIZE_MIN_VALUE={SLICE_SIZE_MIN_VALUE}
      SLICE_SIZE_MAX_VALUE={SLICE_SIZE_MAX_VALUE}
    />
  )
}

export default Form.create()(SliceContainer)
