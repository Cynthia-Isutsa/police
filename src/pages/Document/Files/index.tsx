import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card } from 'antd';

const index = () => {
  return (
    <PageContainer>
      <Card>
        <Button 
        type="primary" 
        >
         <PlusOutlined /> New Folder
        </Button>
      </Card>
    </PageContainer>
  );
};

export default index;
