import { Form, Icon, Upload } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { RcFile, UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import { saveAs } from 'file-saver'
import React, { Component } from 'react'

class Demo extends Component<FormComponentProps, { num: number }> {
  state = { num: 0 }

  beforeUpload = (file: RcFile): boolean => {
    const fileReader = new FileReader()
    fileReader.onload = () => {
      this.setState(({ num: prevNum }) => {
        const { result: json } = fileReader
        const num = prevNum + 1
        saveAs(
          new Blob([ String(json) ],
            { type: 'text/plain;charset=utf-8' },
          ),
          `${num}.json`,
        )
        return { num }
      })
    }
    fileReader.readAsText(file)
    return false
  }

  normFile = ({ fileList }: UploadChangeParam): Array<UploadFile> => fileList

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    return (
      <Form {...formItemLayout}>
        <Form.Item>
          {getFieldDecorator('dragger', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload.Dragger
              name="files"
              accept=".json"
              beforeUpload={this.beforeUpload}
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </Upload.Dragger>,
          )}
        </Form.Item>
      </Form>
    )
  }
}

const WrappedDemo = Form.create()(Demo)

export default WrappedDemo
