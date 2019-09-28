import { Form, Icon, Upload } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { RcFile, UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import React, { Component } from 'react'

class Demo extends Component<FormComponentProps> {
  beforeUpload = (file: RcFile): boolean => {
    const fileReader = new FileReader()
    fileReader.onload = () => {
      console.log('JSON:', fileReader.result)
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
