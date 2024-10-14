import { Card, Col, Row, Statistic } from 'antd';

const CaseStatistics = ({ totalCases, solvedCases, unsolvedCases }: any) => {
  return (
    <Card title="Case Statistics">
      <Row gutter={16}>
        <Col span={8}>
          <Statistic title="Total Cases" value={totalCases} />
        </Col>
        <Col span={8}>
          <Statistic title="Solved Cases" value={solvedCases} />
        </Col>
        <Col span={8}>
          <Statistic title="Unsolved Cases" value={unsolvedCases} />
        </Col>
      </Row>
    </Card>
  );
};

export default CaseStatistics;
