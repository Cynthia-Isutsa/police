
import { PageContainer, ProCard, ProDescriptions, ProTable, TableDropdown } from '@ant-design/pro-components';
import { useLocation, useRequest } from '@umijs/max';
import { Button, Card } from 'antd';
import React, { useState } from 'react';
import UploadDocument from './UploadDocument';
import { getFakeCaseDocs } from '../service';


const Attachments = () => {
  const location = useLocation();
  const { state }: any = location;
  const actionRef = React.useRef();
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [uploadModalKey, setUploadModalKey] = useState<number>(Math.random());
  const { loading, data  } = useRequest<any>(getFakeCaseDocs);

  console.log({data})
  const handleUploadDocument = (isOpen: boolean) => {
    setUploadModalKey(Math.random());
    setShowUploadModal(isOpen);

  
  }

  const handleViewFile = (filePath: string) => {
    window.open(filePath, '_blank'); // Open the file in a new tab
  };



  return (
    <PageContainer
    title={`Case Details`}
    breadcrumbRender={false}
    header={{
        children: (
            <Card className="mb-4">
            <ProDescriptions
              title="Case Details"
              dataSource={state?.record}
              columns={[
                {
                  title: 'OB Number',
                  dataIndex: 'obNumber',
                  key: 'obNumber',
                },
                {
                  title: 'Incident Date & Time',
                  dataIndex: 'incidentDateTime',
                  key: 'incidentDateTime',
                  valueType: 'dateTime', // To display it in date & time format
                },
                {
                  title: 'Station',
                  dataIndex: 'station',
                  key: 'station',
                },
                {
                  title: 'Complainant Name',
                  dataIndex: 'complainantName',
                  key: 'complainantName',
                },
                {
                  title: 'Complainant ID Number',
                  dataIndex: 'complainantIdNumber',
                  key: 'complainantIdNumber',
                },
                {
                  title: 'Complainant Phone Number',
                  dataIndex: 'complainantPhoneNumber',
                  key: 'complainantPhoneNumber',
                },
                {
                  title: 'Respondent ID Number',
                  dataIndex: 'respondentsIdNumber',
                  key: 'respondentsIdNumber',
                },
                {
                  title: 'Respondent Phone Number',
                  dataIndex: 'respondentsPhoneNumber',
                  key: 'respondentsPhoneNumber',
                },
                {
                  title: 'Case Type',
                  dataIndex: 'caseType',
                  key: 'caseType',
                },
                {
                  title: 'Severity',
                  dataIndex: 'severity',
                  key: 'severity',
                },
                {
                  title: 'Case Status',
                  dataIndex: 'caseStatus',
                  key: 'caseStatus',
                },
                {
                  title: 'Description',
                  dataIndex: 'description',
                  key: 'description',
                  valueType: 'textarea', // To display long text appropriately
                },
              ]}
            />
          </Card>
        ),
      }}
    onBack={() => history.back()}
  >
     <ProCard
  extra={
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Button
        type="primary"
        onClick={() => handleUploadDocument(true)}
        style={{ marginRight: '10px' }}
      >
        Upload Document
      </Button>
    </div>
  }
>
<ProTable
          actionRef={actionRef}
          rowKey="publicId"
          dataSource={data}
          search={false}
          columns={[
            {
              title: 'File Name',
              dataIndex: 'fileName',
            },
            {
              title: 'File Description',
              dataIndex: 'fileDescription',
            },
            {
              title: 'Upload Date',
              dataIndex: 'uploadDate',
            },
            {
              title: 'Uploader',
              dataIndex: 'uploader',
            },
            {
              title: 'Action',
              dataIndex: 'action',
              render: (_, record) => (
                <Button type="link" onClick={() => handleViewFile(record.filePath)}>
                  View
                </Button>
              ),
            },
          ]}
        />
        </ProCard>
        <UploadDocument
        key={uploadModalKey}
        currentLead={state?.record}
        showModal={showUploadModal}
        setShowModal={handleUploadDocument}
      />
      </PageContainer>
  );
};

export default Attachments;