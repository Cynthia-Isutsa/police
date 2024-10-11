import React, { useState } from 'react';
import { Button, Card, Col, ConfigProvider, Row, Spin, Tag } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import { useNavigate, useRequest } from '@umijs/max';
import AddCase from './components/AddCase';
import { getFakeCases } from './service';
import { EyeOutlined } from '@ant-design/icons';
import enUS from 'antd/es/locale/en_US';


const Case = () => {
  const { loading, data  } = useRequest<any>(getFakeCases);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleCreate = () => {
    setModalVisible(false);
  };

  const handleView = (record: any) => {
    navigate(`/case-management/case-list/${record.id}`, { state: { record } });
  };

  const columns = [
    {
      title: 'OB Number',
      dataIndex: 'obNumber',
      key: 'obNumber',
      valueType: 'text',
    },
    {
      title: 'Incident Date & Time',
      dataIndex: 'incidentDateTime',
      key: 'incidentDateTime',
      valueType: 'dateTime',
    },
    {
      title: 'Station',
      dataIndex: 'station',
      key: 'station',
      valueType: 'text',
    },
    {
      title: 'Complainant Name',
      dataIndex: 'complainantName',
      key: 'complainantName',
      valueType: 'text',
    },
    {
      title: 'Complainant ID Number',
      dataIndex: 'complainantIdNumber',
      key: 'complainantIdNumber',
      valueType: 'text',
    },
    {
      title: 'Complainant Phone Number',
      dataIndex: 'complainantPhoneNumber',
      key: 'complainantPhoneNumber',
      valueType: 'text',
    },
    {
      title: 'Respondent’s ID Number',
      dataIndex: 'respondentsIdNumber',
      key: 'respondentsIdNumber',
      valueType: 'text',
    },
    {
      title: 'Respondent’s Phone Number',
      dataIndex: 'respondentsPhoneNumber',
      key: 'respondentsPhoneNumber',
      valueType: 'text',
    },
    {
      title: 'Case Type',
      dataIndex: 'caseType',
      key: 'caseType',
      valueType: 'text',
      filters: true,
     
    },
    {
      title: 'Case Severity',
      dataIndex: 'severity',
      key: 'severity',
      valueType: 'text',
      filters: true,
    
    },
   
      {
        title: 'Case Status',
        dataIndex: 'caseStatus',
        key: 'caseStatus',
        valueType: 'text',
        filters: true,
        onFilter: (value: any, record: any) => record.caseStatus.includes(value),
        render: (status: string) => {
          let color = '';
          switch (status) {
            case 'Open':
              color = 'green';
              break;
            case 'Pending':
              color = 'orange';
              break;
            case 'Closed':
              color = 'blue';
              break;
            default:
              color = 'gray';  // Default color for unknown statuses
          }
          return <Tag color={color}>{status}</Tag>;
        },
      },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => handleView(record)}
        >
          View
        </Button>
      ),
    },
  ];
  

  return (
    <div>
      <Row>
        <Col span={24}>
          <Card
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Case List</span>
                <Button key="create" type="primary" onClick={showModal}>
                  Record New Case
                </Button>
              </div>
            }
          >
            {loading ? (
              <Spin  tip="Loading cases..." />
            ) : (
              <ConfigProvider locale={enUS}>
              <ProTable
                columns={columns}
                dataSource={data}
                rowKey="id"
                search={false}
                pagination={{
                  showQuickJumper: true,
                }}
                dateFormatter="string"
              />
              </ConfigProvider>
            )}
            <AddCase
              visible={modalVisible}
              onCancel={handleCancel}
              onCreate={handleCreate}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Case;
