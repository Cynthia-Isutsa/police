import { PageContainer, ProCard, ProTable } from '@ant-design/pro-components';
import { useLocation, useRequest } from '@umijs/max';
import { Button } from 'antd';
import React, { useState } from 'react';
import UploadDocument from './UploadDocument';
import { getFakeCaseDocs } from '../service';

const Attachments = () => {
  const location = useLocation();
  const { state }: any = location;
  const actionRef = React.useRef();
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [uploadModalKey, setUploadModalKey] = useState<number>(Math.random());
  const [attachmentsGrouped, setAttachmentsGrouped] = useState<boolean>(false); // State to track if attachments are in a folder
  const { loading, data } = useRequest<any>(getFakeCaseDocs);

  // Folder name derived from OB Number and incident date
  const folderName = `${state?.record?.obNumber || 'NoOBNumber'}_${state?.record?.incidentDate || 'NoDate'}`;

  console.log({ data });

  const handleUploadDocument = (isOpen: boolean) => {
    setUploadModalKey(Math.random());
    setShowUploadModal(isOpen);
  };

  const handleViewFile = (filePath: string) => {
    window.open(filePath, '_blank'); 
  };

  const handleCreateFolder = () => {
   
    setAttachmentsGrouped(true); 
  };

  return (
    <>
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
            <Button
              type="default"
              onClick={handleCreateFolder}
              style={{ marginRight: '10px' }}
              disabled={attachmentsGrouped}
            >
              {attachmentsGrouped ? 'Folder Created' : 'Create Folder for Attachments'}
            </Button>
          </div>
        }
      >
        {attachmentsGrouped ? (
          <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '4px' }}>
            <h3>Folder: {folderName}</h3> 
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
          </div>
        ) : (
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
        )}
      </ProCard>

      <UploadDocument
        key={uploadModalKey}
        currentLead={state?.record}
        showModal={showUploadModal}
        setShowModal={handleUploadDocument}
      />
    </>
  );
};

export default Attachments;
