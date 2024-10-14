import { Card } from 'antd';
import { Bar } from '@ant-design/plots';

const ResolutionRates = ({ resolutionRateData }: any) => {
  return (
    <Card title="Case Resolution Rates">
      <Bar
        height={300}
        data={resolutionRateData}
        xField="type"
        yField="count"
        seriesField="status"
        isGroup
        color={['#3BAF66', '#FA5252']} // Solved: green, Unsolved: red
        label={{
          position: 'middle',
          style: {
            fill: '#fff',
            opacity: 0.6,
          },
        }}
        xAxis={{
          title: { text: 'Case Type' },
        }}
        yAxis={{
          title: { text: 'Number of Cases' },
        }}
      />
    </Card>
  );
};

export default ResolutionRates;
