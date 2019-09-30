import { Form, Icon, InputNumber, Upload } from 'antd'
import { RcFile } from 'antd/lib/upload'
import React, { FC } from 'react'

interface Props {
  withSliceSizeValidation: (node: React.ReactNode) => React.ReactNode
  withDraggerValidation: (node: React.ReactNode) => React.ReactNode
  hijackFile: (file: RcFile) => boolean
  SLICE_SIZE_MIN_VALUE: number
  SLICE_SIZE_MAX_VALUE: number
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

const SlicerPresenter: FC<Props> = ({
  withSliceSizeValidation,
  withDraggerValidation,
  hijackFile,
  SLICE_SIZE_MIN_VALUE,
  SLICE_SIZE_MAX_VALUE,
}) => (
  <Form {...formItemLayout}>
    <Form.Item label="Slice size">
      {withSliceSizeValidation(
        <InputNumber min={SLICE_SIZE_MIN_VALUE} max={SLICE_SIZE_MAX_VALUE} />,
      )}
    </Form.Item>
    <Form.Item>
      {withDraggerValidation(
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