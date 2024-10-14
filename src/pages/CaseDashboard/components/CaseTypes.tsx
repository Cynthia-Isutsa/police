import { Card } from 'antd';
import { Pie } from '@ant-design/plots';

const CaseTypes = ({ caseTypeData }: any) => {
  return (
    <Card title="Types of Cases">
      <Pie
        height={300}
        radius={0.8}
        angleField="count"
        colorField="type"
        data={caseTypeData}
        label={{
          type: 'inner',
          offset: '-20%',
          content: '{value}',
          style: {
            fontSize: 20,
            fill: '#fff',
            textAlign: 'center',
          },
        }}
      />
    </Card>
  );
};

export default CaseTypes;
