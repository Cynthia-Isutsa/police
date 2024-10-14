import { Row, Col } from 'antd';
import CaseStatistics from './components/CaseStatistics';
import CaseTypes from './components/CaseTypes';
import RecentCases from './components/RecentCases';
import CasesByMonth from './components/CasesByMonth';
import ResolutionRates from './components/ResolutionRates';

const Dashboard = () => {
  // Sample data
  const totalCases = 100;
  const solvedCases = 70;
  const unsolvedCases = 30;

  const caseTypeData = [
    { type: 'Theft', count: 30 },
    { type: 'Assault', count: 25 },
    { type: 'Fraud', count: 20 },
    { type: 'Vandalism', count: 15 },
    { type: 'Other', count: 10 },
  ];

  const recentCases = [
    { caseId: 'C001', type: 'Theft', status: 'Solved', date: '2024-10-01' },
    { caseId: 'C002', type: 'Assault', status: 'Unsolved', date: '2024-10-02' },
    { caseId: 'C003', type: 'Fraud', status: 'Solved', date: '2024-10-03' },
    { caseId: 'C004', type: 'Vandalism', status: 'Unsolved', date: '2024-10-04' },
    { caseId: 'C005', type: 'Other', status: 'Solved', date: '2024-10-05' },
  ];

  const caseMonthlyData = [
    { month: 'January', cases: 15 },
    { month: 'February', cases: 20 },
    { month: 'March', cases: 25 },
    { month: 'April', cases: 18 },
    { month: 'May', cases: 22 },
    { month: 'June', cases: 24 },
    { month: 'July', cases: 27 },
    { month: 'August', cases: 30 },
    { month: 'September', cases: 35 },
    { month: 'October', cases: 28 },
    { month: 'November', cases: 31 },
    { month: 'December', cases: 34 },
  ];

  const resolutionRateData = [
    { type: 'Theft', status: 'Solved', count: 20 },
    { type: 'Theft', status: 'Unsolved', count: 10 },
    { type: 'Assault', status: 'Solved', count: 15 },
    { type: 'Assault', status: 'Unsolved', count: 10 },
    { type: 'Fraud', status: 'Solved', count: 10 },
    { type: 'Fraud', status: 'Unsolved', count: 10 },
    { type: 'Vandalism', status: 'Solved', count: 10 },
    { type: 'Vandalism', status: 'Unsolved', count: 5 },
    { type: 'Other', status: 'Solved', count: 5 },
    { type: 'Other', status: 'Unsolved', count: 5 },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={16}>
        <Col span={12}>
          <CaseStatistics totalCases={totalCases} solvedCases={solvedCases} unsolvedCases={unsolvedCases} />
        </Col>
        <Col span={12}>
          <CaseTypes caseTypeData={caseTypeData} />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <CasesByMonth caseMonthlyData={caseMonthlyData} />
        </Col>
        <Col span={12}>
          <ResolutionRates resolutionRateData={resolutionRateData} />
        </Col>
      </Row>
      <Row style={{ marginTop: 16 }}>
        <Col span={24}>
          <RecentCases recentCases={recentCases} />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
