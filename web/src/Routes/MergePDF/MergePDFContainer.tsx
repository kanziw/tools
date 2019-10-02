import { Form } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { RcFile, UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import React, { Component } from 'react'
import MergePDFPresenter from './MergePDFPresenter'

interface State {
  num: number
  isDraggerDisabled: boolean
}

class MergePDFContainer extends Component<FormComponentProps, State> {
  state = { num: 0, isDraggerDisabled: false }

  normFile = ({ fileList }: UploadChangeParam): Array<UploadFile> => fileList

  withDraggerValidation: (node: React.ReactNode) => React.ReactNode = (
    this.props.form.getFieldDecorator(
      'dragger',
      {
        valuePropName: 'fileList',
        getValueFromEvent: this.normFile,
      },
    )
  )

  requestUpload = async (files: RcFile[]): Promise<void> => {
    console.log(' GOGO REQUEST!')
    const formData = new FormData()
    for (const file of files) {
      formData.append('files', file)
    }
    await fetch('http://localhost:8080/merge-pdf', {
      method: 'POST',
      body: formData,
    })
    this.setState({ isDraggerDisabled: false })
  }

  beforeUpload = async (file: RcFile, files: RcFile[]): Promise<void> => {
    if (files.length < 2) {
      return Promise.reject()
    }
    let shouldRequest = false
    await new Promise((resolve, reject) => {
      this.setState(({ num: currentNum, isDraggerDisabled }) => {
        shouldRequest = !isDraggerDisabled
        return { num: currentNum + 1, isDraggerDisabled: true }
      }, async () => {
        if (shouldRequest) {
          await this.requestUpload(files)
        }
      })
    })
  }

  render = () => (
    <MergePDFPresenter
      beforeUpload={this.beforeUpload}
      withDraggerValidation={this.withDraggerValidation}
      isDraggerDisabled={this.state.isDraggerDisabled}
    />
  )
}

export default Form.create()(MergePDFContainer)
