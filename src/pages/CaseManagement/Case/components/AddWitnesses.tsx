import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { ProForm, ProFormGroup, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { useNavigate } from 'react-router-dom';

const AddWitness = () => {
  const navigate = useNavigate();


  
  const onFinish = async (values) => {
    console.log('Witness added:', values);

    navigate('/case-management/case-list/:id');
  };

  return (
    <PageContainer
      title="Add Witness"
      content="Please enter the details of the witness below."
      onBack={() => navigate(-1)}
    >
      <ProForm
        onFinish={onFinish}
        submitter={{
            searchConfig: { submitText: 'Save Changes' },
            resetButtonProps: { style: { display: 'none' } },  
          }}
      >
        <ProFormGroup>
        <ProFormText
          name="name"
          width="md" 
          label="Name"
          placeholder="Enter witness name"
          rules={[{ required: true, message: 'Please input the name' }]}
        />

        <ProFormText
          name="contact"
          width="md" 
          label="Phone Number"
          placeholder="Enter contact information"
          rules={[{ required: true, message: 'Please input contact details' }]}
        />
         <ProFormText
          name="email"
          width="md" 
          label="Email Address"
          placeholder="Enter email Address"
          rules={[{ required: true, message: 'Please input email Address' }]}
        />

        </ProFormGroup>
        <ProFormGroup>
        <ProFormText
          name="idNumber"
          width="md" 
          label="ID Number"
          placeholder="Enter Id number"
          rules={[{ required: true, message: 'Please input Id Number' }]}
        />
        </ProFormGroup>

        <ProFormTextArea
          name="statement"
          label="Write the Statement"
          placeholder="Enter witness statement"
          rules={[{ required: true, message: 'Please input the statement' }]}
          fieldProps={{
            style: {
              height: 150, 
              width: '70%', 
            },
          }}
        />

      
      </ProForm>
    </PageContainer>
  );
};

export default AddWitness;
