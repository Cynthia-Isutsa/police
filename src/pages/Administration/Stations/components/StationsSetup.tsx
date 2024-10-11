import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, message, Space } from 'antd';
import React, { useState } from 'react';
import { request } from 'umi';
import enUS from 'antd/lib/locale/en_US';
import { ConfigProvider } from 'antd';

const StationsSetup = ({ actionRef }: any) => {
  const ref = React.useRef<ProFormInstance>();

  const counties = [
    { label: 'Nairobi', value: 'Nairobi' },
    { label: 'Mombasa', value: 'Mombasa' },
    { label: 'Kisumu', value: 'Kisumu' },
    { label: 'Nakuru', value: 'Nakuru' },
    { label: 'Eldoret', value: 'Eldoret' },
    // Add more counties as needed...
  ];

  const subcounties = {
    Nairobi: [
      { label: 'Westlands', value: 'Westlands' },
      { label: 'Lang\'ata', value: 'Lang\'ata' },
      { label: 'Embakasi', value: 'Embakasi' },
      { label: 'Starehe', value: 'Starehe' },
      { label: 'Kasarani', value: 'Kasarani' },
    ],
    Mombasa: [
      { label: 'Likoni', value: 'Likoni' },
      { label: 'Changamwe', value: 'Changamwe' },
      { label: 'Nyali', value: 'Nyali' },
      { label: 'Kisauni', value: 'Kisauni' },
      { label: 'Jomvu', value: 'Jomvu' },
    ],
    Kisumu: [
      { label: 'Kisumu East', value: 'Kisumu East' },
      { label: 'Kisumu Central', value: 'Kisumu Central' },
      { label: 'Kisumu West', value: 'Kisumu West' },
      { label: 'Nyando', value: 'Nyando' },
      { label: 'Muhoroni', value: 'Muhoroni' },
    ],
    Nakuru: [
      { label: 'Nakuru Town East', value: 'Nakuru Town East' },
      { label: 'Nakuru Town West', value: 'Nakuru Town West' },
      { label: 'Naivasha', value: 'Naivasha' },
      { label: 'Subukia', value: 'Subukia' },
      { label: 'Gilgil', value: 'Gilgil' },
    ],
    Eldoret: [
      { label: 'Kapseret', value: 'Kapseret' },
      { label: 'Kesses', value: 'Kesses' },
      { label: 'Moiben', value: 'Moiben' },
      { label: 'Soy', value: 'Soy' },
      { label: 'Ainabkoi', value: 'Ainabkoi' },
    ],
    // Add more subcounties for other counties...
  };

  const wards = {
    Westlands: [
      { label: 'Kangemi', value: 'Kangemi' },
      { label: 'Kitisuru', value: 'Kitisuru' },
      { label: 'Parklands/Highridge', value: 'Parklands/Highridge' },
    ],
    Langata: [
      { label: 'Karen', value: 'Karen' },
      { label: 'Langata', value: 'Langata' },
      { label: 'South C', value: 'South C' },
    ],
    Embakasi: [
      { label: 'Utawala', value: 'Utawala' },
      { label: 'Imara Daima', value: 'Imara Daima' },
      { label: 'Embakasi Central', value: 'Embakasi Central' },
    ],
    Likoni: [
      { label: 'Mtongwe', value: 'Mtongwe' },
      { label: 'Likoni', value: 'Likoni' },
      { label: 'Bofu', value: 'Bofu' },
    ],
    // Add more wards for other subcounties...
  };


  const [county, setCounty] = useState('');
  const [subcounty, setSubcounty] = useState('');
  const [availableSubcounties, setAvailableSubcounties] = useState([]);
  const [availableWards, setAvailableWards] = useState([]);

  // Handle county change
  const handleCountyChange = (value: string) => {
    setCounty(value);
    setAvailableSubcounties(subcounties[value] || []);
    setSubcounty(''); // Reset subcounty when county changes
    setAvailableWards([]); // Reset wards when county changes
  };

  // Handle subcounty change
  const handleSubcountyChange = (value: string) => {
    setSubcounty(value);
    setAvailableWards(wards[value] || []);
  };

  return (
    <ConfigProvider locale={enUS}>
    <ModalForm
    width={800}
      formRef={ref}
      onFinish={async (values) => {
        await request('/api/v1/case/caseNoteStatus', {
          method: 'POST',
          data: {
            ...values,
          },
        });
        message.success('Station added successfully');
        actionRef.current?.reload();
        ref?.current?.resetFields();
        return true;
      }}
      title="Create Station"
      trigger={<Button type="primary">Create Station</Button>}
    >
    <Space>
      <ProFormText 
        name="name" 
        label="Station Name" 
        placeholder="Enter Station Name" 
        required 
        width="md"
      />

    <ProFormText 
        name="code" 
        label="Station Code" 
        placeholder="Enter Station code" 
        required 
         width="md"
      />
     </Space>
     <Space>

  <ProFormText
  name="phoneNumber"
  label="Phone Number"
  placeholder="Enter Phone Number"
  required
  width="md"
  rules={[
    {
      required: true,
      pattern: /^0[0-9]{9}$/,
      message: 'Phone number must be valid',
    },
  ]}
/>

      <ProFormText 
        name="emailAddress" 
        label="Email Address" 
        placeholder="Enter Email Address" 
        required 
        width="md"
      />

     </Space>
      <Space>
      <ProFormSelect
        name="county"
        showSearch
        label="County"
        options={counties}
        placeholder="Select a county"
        onChange={handleCountyChange}
        required
         width="md"
      />
       
      
      <ProFormSelect
        name="subcounty"
        showSearch
        label="Subcounty"
        options={availableSubcounties}
        placeholder="Select a subcounty"
        disabled={!county}
        onChange={handleSubcountyChange}
        required
        width="md"
      />
      </Space>
      <Space>
      <ProFormSelect
        name="ward"
        showSearch
        label="Ward"
        options={availableWards}
        placeholder="Select a ward"
        disabled={!subcounty}
        required
        width="md"
      />
       <ProFormText
        name="address"
      
        label="Address"
        
        placeholder="Enter the Station Address"
      
        required
        width="md"
      />
      </Space>
    </ModalForm>
    </ConfigProvider>
  );
};


export default StationsSetup;
