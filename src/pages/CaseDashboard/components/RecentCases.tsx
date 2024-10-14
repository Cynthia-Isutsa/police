import { Card, Table } from 'antd';

const RecentCases = ({ recentCases }: any) => {
  const columns = [
    {
      title: 'Case ID',
      dataIndex: 'caseId',
      key: 'caseId',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  return (
    <Card title="Recent Cases">
      <Table
        rowKey="caseId"
        columns={columns}
        dataSource={recentCases}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
};

export default RecentCases;
