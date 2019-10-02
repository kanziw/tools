import { Form, Icon, Upload } from 'antd'
import { RcFile } from 'antd/lib/upload'
import React, { FC } from 'react'

interface Props {
  beforeUpload: (file: RcFile, files: RcFile[]) => Promise<void>
  withDraggerValidation: (node: React.ReactNode) => React.ReactNode
  isDraggerDisabled: boolean
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const MergePDFPresenter: FC<Props> = ({
  withDraggerValidation,
  beforeUpload,
  isDraggerDisabled,
}) => (
  <Form {...formItemLayout}>
    <Form.Item>
      {withDraggerValidation(
        <Upload.Dragger
          accept=".pdf"
          beforeUpload={beforeUpload}
          multiple={true}
          disabled={isDraggerDisabled}
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

export default MergePDFPresenter