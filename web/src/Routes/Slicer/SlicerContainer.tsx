import { Form } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { RcFile, UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import { saveAs } from 'file-saver'
import React, { Component } from 'react'
import { formatNumber, slicer } from 'utils'
import SlicerPresenter from './SlicerPresenter'

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
    const fileReader = new FileReader()
    fileReader.onload = () => {
      const { result: text } = fileReader as { result: string }
      const results = slicer<object>(JSON.parse(text), 20)
      results.forEach(this.saveJson(file.name, results.length))
    }
    fileReader.readAsText(file)
    return false
  }

  normFile = ({ fileList }: UploadChangeParam): Array<UploadFile> => fileList

  render() {
    const { getFieldDecorator } = this.props.form
    return <SlicerPresenter
      getFieldDecorator={getFieldDecorator}
      normFile={this.normFile}
      hijackFile={this.hijackFile}
    />
  }
}

export default Form.create()(SliceContainer)
