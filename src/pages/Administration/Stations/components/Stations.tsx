import { ProTable } from '@ant-design/pro-components';
import { Flex } from 'antd';
import StationsSetup from './StationsSetup';
import { useRequest } from '@umijs/max';
import { getFakeStations } from '@/pages/CaseManagement/Case/service';

const Stations = ({ actionRef }: any) => {
  const { loading, data  } = useRequest<any>(getFakeStations);
console.log({data})

  return (
    <div>
      <ProTable
        headerTitle={<StationsSetup actionRef={actionRef} />}
        actionRef={actionRef}
        search={false}
        dataSource={data}
        pagination={{
          hideOnSinglePage: true,
        }}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Code',
            dataIndex: 'code',
            key: 'code', 
          },
          {
            title: 'County',
            dataIndex: 'county',
            key: 'county', 
            align: 'center',
          },
          {
            title: 'Subcounty',
            dataIndex: 'subcounty',
            key: 'subcounty', 
            align: 'center',
          },
          {
            title: 'Ward',
            dataIndex: 'ward',
            key: 'ward', 
            align: 'center',
          },
          {
            title: 'Contact Number',
            dataIndex: 'contactNumber',
            key: 'contactNumber', 
            align: 'center',
          },
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email', 
          },
          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address', 
          },
          {
            title: 'OnBoarding Date',
            dataIndex: 'createdAt',
            key: 'createdAt', 
            render: (text: string) => new Date(text).toLocaleDateString(), 
          },
          // {
          //   title: 'Updated At',
          //   dataIndex: 'updatedAt',
          //   key: 'updatedAt', 
          //   render: (text: string) => new Date(text).toLocaleDateString(), 
          // },
        ]}
      />
    </div>
  );
};

export default Stations;