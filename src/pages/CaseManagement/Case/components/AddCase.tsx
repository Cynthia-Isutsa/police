import React from 'react';
import { Modal, Button } from 'antd';
import { ProForm, ProFormText, ProFormSelect, ProFormTextArea, ProFormDateTimePicker } from '@ant-design/pro-form';
import { ProFormGroup } from '@ant-design/pro-components';

const AddCase = ({ visible, onCancel, onCreate }: any) => {
  return (
    <Modal
      title="Record Case"
      visible={visible}
      width={1000}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Close
        </Button>,
        <Button key="submit" type="primary" onClick={onCreate}>
          Save changes
        </Button>,
      ]}
    >
      <ProForm
      submitter={{
        resetButtonProps: { style: { display: 'none' } },  // Hide reset button
        submitButtonProps: { style: { display: 'none' } }, // Hide submit button
      }}
      >
        <ProFormGroup>
          <ProFormText 
            name="obNumber" 
            label="OB Number" 
            placeholder="Enter OB Number" 
            rules={[{ required: true, message: 'Please enter OB number!' }]}
          />
          <ProFormDateTimePicker 
            name="incidentDateTime" 
            label="Incident Date & Time" 
            placeholder="Select date & time" 
            rules={[{ required: true, message: 'Please select the date and time of the incident!' }]}
          />
          <ProFormSelect 
            name="station" 
            label="Station" 
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
            placeholder="Enter complainant's name" 
            rules={[{ required: true, message: 'Please enter complainant name!' }]}
          />
          <ProFormText 
            name="complainantIdNumber" 
            label="Complainant ID Number" 
            placeholder="Enter complainant ID" 
            rules={[{ required: true, message: 'Please enter complainant ID number!' }]}
          />
          <ProFormText 
            name="complainantPhoneNumber" 
            label="Complainant Phone Number" 
            placeholder="Enter phone number" 
            rules={[{ required: true, message: 'Please enter complainant phone number!' }]}
          />
        </ProFormGroup>

        <ProFormGroup>
          <ProFormText 
            name="respondentsIdNumber" 
            label="Respondent's ID Number" 
            placeholder="Enter respondent's ID number" 
            rules={[{ required: true, message: 'Please enter respondent ID number!' }]}
          />
          <ProFormText 
            name="primaryPhoneNumber" 
            label="Respondent's Phone Number" 
            placeholder="Enter phone number" 
            rules={[{ required: true, message: 'Please enter phone number!' }]}
          />
          <ProFormSelect 
            name="caseType" 
            label="Case Type" 
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
            placeholder="Select case status" 
            options={[
              { value: 'open', label: 'Open' },
              { value: 'pending', label: 'Pending' },
              { value: 'closed', label: 'Closed' },
            ]}
            rules={[{ required: true, message: 'Please select case status!' }]}
          />
        </ProFormGroup>

        <ProFormTextArea 
          name="description" 
          label="Description" 
          placeholder="Enter case description" 
          rules={[{ required: true, message: 'Please enter a description!' }]}
        />
      </ProForm>
    </Modal>
  );
};

export default AddCase;