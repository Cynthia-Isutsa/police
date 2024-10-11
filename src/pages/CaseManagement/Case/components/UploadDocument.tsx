
//import { getIconName } from '@/utils/helpers';
import { InboxOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProForm, ProFormTextArea } from '@ant-design/pro-components';
import type { UploadProps } from 'antd';
import { Avatar, Button, Col, message, Modal, Row } from 'antd';
import Text from 'antd/es/typography/Text';
import Title from 'antd/es/typography/Title';
import Dragger from 'antd/es/upload/Dragger';
import { useRef, useState } from 'react';

import type { GetProps } from 'antd';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';

type Props = {
  currentLead?: any;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
};
export default function UploadModal({
  currentLead,
  showModal,
  setShowModal,
}: Readonly<Props>) {
  const formRef = useRef<ProFormInstance>();

  const [uploadFile, setUploadFile] = useState<any>([]);

  const handleCancel = () => {
    formRef.current?.resetFields();
    setShowModal(false);
  };

  const props: UploadProps = {
    name: 'file',
    multiple: false,

    onChange(info) {
      setUploadFile(info.file);
    },
  };


 
  return (
    <Modal
      onCancel={handleCancel}
      footer={null}
      title="Add Attachments"
      open={showModal}
      width={600}
      centered
    >
      <Title level={4}>{currentLead?.obNumber ?? ""}</Title>
      <div
        style={{
          backgroundColor: 'rgba(245, 245, 245, 1)',
          padding: '10px',
          display: 'flex',
          marginBottom: '10px',
        }}
      >

        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 15 }}>
          <Text>{currentLead?.caseType ?? ''}</Text>
        </div>
      </div>

      <ProForm
        autoFocusFirstInput
        formRef={formRef}
        submitter={{
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
          submitButtonProps: {
            style: {
              display: 'none',
            },
          },
        }}
        onFinish={async (values) => {
          if (currentLead) {
            const formData = new FormData();
            formData.append('file', uploadFile?.originFileObj);
            formData.append('referenceType', 'ORDINARY_FILE');
            formData.append('referenceId', currentLead?.publicId);
            formData.append('fileDescription', values?.fileDescription);
            message.success(`Record Updated`);
          }

          handleCancel();

          return true;
        }}
      >
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for a single or bulk upload.</p>
        </Dragger>

        <Col style={{ padding: '5px' }} xs={24} sm={24}>
          <ProFormTextArea
            name="fileDescription"
            label="File Description"
            placeholder="Enter File Description"
          />
        </Col>
        <Row justify="end">
          <Button size="large" onClick={handleCancel}>
            Cancel
          </Button>

          <Button
            size="large"
            type="primary"
            style={{ marginLeft: '10px' }}
            onClick={() => formRef.current?.submit()}
          >
            Submit
          </Button>
        </Row>
      </ProForm>
    </Modal>
  );
}