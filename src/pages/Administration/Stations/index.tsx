
import { ProCard } from '@ant-design/pro-components';
import { Col, List, Row } from 'antd';
import React from 'react';
import Stations from './components/Stations';



const index = () => {
 
  const [current, setCurrent] = React.useState(0);
  const actionRef = React.useRef();
  const statusRef = React.useRef();
  const gitfRef = React.useRef();

  const steps = [
    {
      name: 'Police Stations',
      content: <Stations actionRef={actionRef} />,
    },
    
  ];

  return (
    <>
      <br />
      <ProCard>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={5}>
            <List
              style={{
                borderRadius: '8px',
                padding: '.4rem',
                margin: '.3rem',
              }}
              bordered
              split
              dataSource={steps}
              renderItem={(item, index) => {
                const listStyle =
                  current === index
                    ? {
                        backgroundColor: '#fff7e6',
                        color: '#000',
                        fontWeight: 'bold',
                      }
                    : {};

                return (
                  <List.Item
                    key={index}
                    onClick={() => setCurrent(index)}
                    style={{
                      ...listStyle,
                      cursor: 'pointer',
                      borderColor: 'rgba(0,0,0,0.15)',
                      // marginBottom: '1.3rem',
                    }}
                  >
                    <div>{item?.name}</div>
                  </List.Item>
                );
              }}
            />
          </Col>
          <Col style={{ border: '1px solid #e8e8e8', borderRadius: '8px' }} xs={24} sm={24} md={19}>
            <ProCard>{steps[current].content}</ProCard>
          </Col>
        </Row>
      </ProCard>
    </>
  );
};

export default index;

