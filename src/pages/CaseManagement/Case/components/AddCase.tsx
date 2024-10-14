import React from 'react';
import { Button, message } from 'antd';
import { ProForm, ProFormText, ProFormSelect, ProFormTextArea, ProFormDateTimePicker } from '@ant-design/pro-form';
import { PageContainer, ProFormGroup } from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';

const AddCase = () => {
const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    // Handle form submission logic here
    console.log('Form values:', values);
    message.success('Case added successfully!');
    navigate('/case-management/case-list');
  };

  const policeChiefs = [
    { id: 1, name: "Bernard Hinga" },
    { id: 2, name: "Ben Gethi" },
    { id: 3, name: "Bernard Njinu" },
    { id: 4, name: "Phillip Kilonzo" },
    { id: 5, name: "Shedrack Kiruki" },
    { id: 6, name: "Duncan Wachira" },
    { id: 7, name: "Philemon Abong’o" },
    { id: 8, name: "Edwin Nyaseda" },
    { id: 9, name: "Major General Mohammed Hussein Ali" },
    { id: 10, name: "Mathew Kirai Iteere" },
    { id: 11, name: "Grace Kaindi" },
    { id: 12, name: "Joel Kitili" },
    { id: 13, name: "Edward N. Mbugua" }
  ];

  return (
    <PageContainer
    title={`Add Case`}
    //breadcrumbRender={false}
    onBack={() => history.back()}
    >
      <ProForm
        onFinish={handleSubmit}
        submitter={{
          searchConfig: { submitText: 'Save Changes' },
          resetButtonProps: { style: { display: 'none' } },  // Hide reset button
        }}
      >
        <ProFormGroup>
          <ProFormText 
            name="obNumber" 
            label="OB Number" 
            placeholder="Enter OB Number" 
            width="md"
            rules={[{ required: true, message: 'Please enter OB number!' }]}
          />
          <ProFormDateTimePicker 
            name="incidentDateTime" 
            label="Incident Date & Time" 
            width="md"
            placeholder="Select date & time" 
            rules={[{ required: true, message: 'Please select the date and time of the incident!' }]}
          />
          <ProFormSelect 
            name="station" 
            label="Station" 
            width="md"
            placeholder="Select Station"
            options={[
              { value: 'Kasarani Police Station', label: 'Kasarani Police Station' },
              { value: 'Kilimani Police Station', label: 'Kilimani Police Station' },
              { value: 'Embakasi Police Station', label: 'Embakasi Police Station' },
            ]}
            rules={[{ required: true, message: 'Please select a station!' }]}
          />
        </ProFormGroup>

        <ProFormGroup>
          <ProFormText 
            name="complainantName" 
            label="Complainant Name" 
            width="md"
            placeholder="Enter complainant's name" 
            rules={[{ required: true, message: 'Please enter complainant name!' }]}
          />
          <ProFormText 
            name="complainantIdNumber" 
            label="Complainant ID Number" 
            width="md"
            placeholder="Enter complainant ID" 
            rules={[{ required: true, message: 'Please enter complainant ID number!' }]}
          />
          <ProFormText 
            name="complainantPhoneNumber" 
            label="Complainant Phone Number"
            width="md" 
            placeholder="Enter phone number" 
            rules={[{ required: true, message: 'Please enter complainant phone number!' }]}
          />
        </ProFormGroup>

        <ProFormGroup>
          <ProFormText 
            name="respondentsIdNumber" 
            label="Respondent's ID Number" 
            width="md"
            placeholder="Enter respondent's ID number" 
            rules={[{ required: true, message: 'Please enter respondent ID number!' }]}
          />
          <ProFormText 
            name="primaryPhoneNumber"
            width="md" 
            label="Respondent's Phone Number" 
            placeholder="Enter phone number" 
            rules={[{ required: true, message: 'Please enter phone number!' }]}
          />
          <ProFormSelect 
            name="caseType" 
            label="Case Type" 
              width="md"
            placeholder="Select case type" 
            options={[
              { value: 'robbery', label: 'Robbery' },
              { value: 'assault', label: 'Assault' },
              { value: 'traffic_violation', label: 'Traffic Violation' },
            ]}
            rules={[{ required: true, message: 'Please select case type!' }]}
          />

        </ProFormGroup>

        <ProFormGroup>
          <ProFormSelect 
            name="severity" 
            label="Case Severity" 
            width="md"
            placeholder="Select severity" 
            options={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
            ]}
            rules={[{ required: true, message: 'Please select case severity!' }]}
          />
          <ProFormSelect 
            name="caseStatus" 
            label="Case Status"
            width="md" 
            placeholder="Select case status" 
            options={[
              { value: 'open', label: 'Open' },
              { value: 'pending', label: 'Pending' },
              { value: 'closed', label: 'Closed' },
            ]}
            rules={[{ required: true, message: 'Please select case status!' }]}
          />
          <ProFormSelect
        name="investigatingOfficer"
        label="Investigating Officer"
        width="md"
        placeholder="Select investigating officer"
        rules={[{ required: true, message: 'Please select an investigating officer!' }]}

        options={policeChiefs.map((chief) => ({
          label: chief.name,
          value: chief.id
        }))}
      />
        </ProFormGroup>

        <ProFormTextArea
  name="description"
  label=" Case Description"
  placeholder="Enter case description"
  fieldProps={{
    style: {
      height: 100, 
      width: '70%', 
    },
  }}
  rules={[{ required: true, message: 'Please enter a description!' }]}
/>

      </ProForm>
      </PageContainer>
  );
};

export default AddCase;
