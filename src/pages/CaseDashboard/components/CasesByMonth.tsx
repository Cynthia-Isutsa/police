import { Card } from 'antd';
import { Bar } from '@ant-design/plots';

const CasesByMonth = ({ caseMonthlyData }: any) => {
  return (
    <Card title="Cases by Month">
      <Bar
        height={300}
        data={caseMonthlyData}
        xField="month"
        yField="cases"
        color="#6294FA"
        label={{
          position: 'middle',
          style: {
            fill: '#fff',
            opacity: 0.6,
          },
        }}
        xAxis={{
          title: { text: 'Month' },
        }}
        yAxis={{
          title: { text: 'Number of Cases' },
        }}
      />
    </Card>
  );
};

export default CasesByMonth;
