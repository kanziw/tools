import { Form, Icon, InputNumber, Upload } from 'antd'
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form'
import { RcFile, UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import React, { FC } from 'react'

interface Props {
  getFieldDecorator: <T extends Object = {}>(
    id: keyof T,
    options?: GetFieldDecoratorOptions,
  ) => ((node: React.ReactNode) => React.ReactNode)
  normFile: (event: UploadChangeParam) => Array<UploadFile>
  hijackFile: (file: RcFile) => boolean
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const MIN_VALUE = 10
const MAX_VALUE = 2000000
const DEFAULT_VALUE = 50000

const SlicerPresenter: FC<Props> = ({ getFieldDecorator, normFile, hijackFile }) => (
  <Form {...formItemLayout}>
    <Form.Item label="Slice size">
      {getFieldDecorator('input-number', { initialValue: DEFAULT_VALUE })(
        <InputNumber min={MIN_VALUE} max={MAX_VALUE} />,
      )}
    </Form.Item>
    <Form.Item>
      {getFieldDecorator('dragger', {
        valuePropName: 'fileList',
        getValueFromEvent: normFile,
      })(
        <Upload.Dragger
          name="files"
          accept=".json"
          beforeUpload={hijackFile}
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

export default SlicerPresenter