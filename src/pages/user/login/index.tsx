import { LoadingOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { ProCard, ProForm, ProFormCheckbox, ProFormDigit, ProFormText } from '@ant-design/pro-components';
import { Button, Image, Row, Spin, message } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useRef } from 'react';
import kenya from '../../../../public/kenya.png';
import { useNavigate } from 'react-router';
import { login } from '@/services/ant-design-pro/api'; // Assuming the same service function is used

const Login = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const formRef = useRef<ProFormInstance>();
  const navigate = useNavigate();

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      setLoading(true); 

      
      const msg = await login({ ...values });
      if (msg.status === 'ok') {
        message.success('Login successful!');
        // Fetch user info if needed, navigate after login
        const urlParams = new URL(window.location.href).searchParams;
        window.location.href = urlParams.get('redirect') || '/';
      } else {
        message.error('Login failed, please try again!');
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      message.error('Login failed, please try again!');
      setLoading(false); // Hide loading spinner in case of error
    }
  };

  return (
    <div>
      <div
        style={{
          background: 'linear-gradient(180deg, #00539C 0%, #fff 100%)',
          position: 'absolute',
          width: '100%',
          height: '50vh',
          top: 0,
          left: 0,
          right: 0,
        }}
      />
      <Row
        style={{
          zIndex: 1,
          backgroundColor: 'transparent',
          position: 'absolute',
          width: '100%',
          height: '30vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Title style={{ color: '#000', fontFamily: 'monospace' }} level={2}>
          Police Authentication
        </Title>
      </Row>

      <Row
        style={{
          zIndex: 1,
          backgroundColor: 'transparent',
          position: 'absolute',
          width: '100%',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ProCard
          colSpan={24}
          layout="center"
          bordered
          style={{
            maxWidth: 500,
            minWidth: 400,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <ProForm
            style={{ padding: '20px 35px' }}
            submitter={{
              resetButtonProps: { style: { display: 'none' } },
              submitButtonProps: { style: { display: 'none' } },
            }}
            formRef={formRef}
          >
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Image preview={false} width={100} height={100} src={kenya} />
            </div>
            <ProFormText
              style={{ marginBottom: 32 }}
              name="username"
              fieldProps={{ size: 'large', prefix: <UserOutlined /> }}
              placeholder="Username"
              rules={[{ required: true, message: 'Please enter your username!' }]}
            />
            <ProFormText.Password
              style={{ marginBottom: 24 }}
              name="password"
              fieldProps={{ size: 'large', prefix: <LockOutlined /> }}
              placeholder="Password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            />
            <ProFormDigit
              style={{ marginBottom: 24 }}
              name="policeId"
              placeholder="Police ID"
              fieldProps={{ size: 'large', prefix: <UserOutlined /> }}
              rules={[{ required: true, message: 'Please enter a valid police ID. (e.g., 3456)' }]}
            />

            <div style={{ marginBottom: 24 }}>
              <ProFormCheckbox noStyle name="autoLogin">
                Remember Me
              </ProFormCheckbox>
              <a style={{ float: 'right', color: '#00539C' }}>Forgot Password?</a>
            </div>

            <Row style={{ marginTop: 15, padding: '0px, 15px' }} justify="center">
              {loading ? (
                <Spin indicator={<LoadingOutlined spin />} />
              ) : (
                <Button
                  block
                  style={{
                    height: 50,
                    backgroundColor: '#003366',
                    color: 'white',
                    fontSize: 18,
                    fontWeight: 'bold',
                    borderRadius: 8,
                  }}
                  type="primary"
                  onClick={async () => {
                    const values = await formRef.current?.validateFields(); // Validate form fields
                    if (values) {
                      await handleSubmit(values as API.LoginParams); // Call handleSubmit with form values
                    }
                  }}
                >
                  Login
                </Button>
              )}
            </Row>
          </ProForm>
        </ProCard>
      </Row>
    </div>
  );
};

export default Login;
