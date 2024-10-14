import { PageContainer } from '@ant-design/pro-layout';
import { history, useLocation } from '@umijs/max';
import { Card, Col, Row, Tabs } from 'antd';
import Witnesses from "../components/Witnesses";
import { ProDescriptions } from '@ant-design/pro-components';
import React, { useState } from 'react';
import Attachments from '../components/Attachments';

const Index = () => {
  const location = useLocation();
  const { state }: any = location;
  
  const [activeTabKey, setActiveTabKey] = useState('witness');

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  return (
    <>
      <PageContainer
        title="Case Details"
        breadcrumbRender={false}
        fixedHeader
        affixProps={{
          offsetTop: 10,
        }}
        content={
          <>
            <Card className="mb-4">
              <ProDescriptions
                title="Case Details"
                dataSource={state?.record}
                columns={[
                  { title: 'OB Number', dataIndex: 'obNumber', key: 'obNumber' },
                  { title: 'Incident Date & Time', dataIndex: 'incidentDateTime', key: 'incidentDateTime', valueType: 'dateTime' },
                  { title: 'Station', dataIndex: 'station', key: 'station' },
                  { title: 'Complainant Name', dataIndex: 'complainantName', key: 'complainantName' },
                  { title: 'Complainant ID Number', dataIndex: 'complainantIdNumber', key: 'complainantIdNumber' },
                  { title: 'Complainant Phone Number', dataIndex: 'complainantPhoneNumber', key: 'complainantPhoneNumber' },
                  { title: 'Respondent ID Number', dataIndex: 'respondentsIdNumber', key: 'respondentsIdNumber' },
                  { title: 'Respondent Phone Number', dataIndex: 'respondentsPhoneNumber', key: 'respondentsPhoneNumber' },
                  { title: 'Case Type', dataIndex: 'caseType', key: 'caseType' },
                  { title: 'Severity', dataIndex: 'severity', key: 'severity' },
                  { title: 'Case Status', dataIndex: 'caseStatus', key: 'caseStatus' },
                  { title: 'Description', dataIndex: 'description', key: 'description', valueType: 'textarea' },
                ]}
              />
            </Card>
          </>
        }
        onBack={() => history.back()}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Tabs
              activeKey={activeTabKey} 
              onChange={onTabChange}    
              items={[
                {
                  label: `Witnesses`,
                  key: 'witness',
                  children: <Witnesses />,
                },
                {
                  label: `Attachments`,
                  key: 'attachment',
                  children: <Attachments />,
                },
              ]}
            />
          </Col>
        </Row>
      </PageContainer>
    </>
  );
};

export default Index;
