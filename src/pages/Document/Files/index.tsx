import React, { useState } from 'react';
import { Layout, Button, Input, Timeline, Modal, Form, message } from 'antd';

const { Content, Header } = Layout;

const FilesPage = () => {
  // State to store folders and items
  const [folders, setFolders] = useState([]);
  const [items, setItems] = useState([]);
  
  // Modal visibility state
  const [isFolderModalVisible, setIsFolderModalVisible] = useState(false);
  const [isItemModalVisible, setIsItemModalVisible] = useState(false);

  // Form values for folder and item
  const [newFolderName, setNewFolderName] = useState('');
  const [newItemName, setNewItemName] = useState('');

  // Handle New Folder creation
  const handleCreateFolder = () => {
    if (newFolderName.trim() === '') {
      message.error('Folder name cannot be empty');
      return;
    }
    setFolders([...folders, newFolderName]);
    setNewFolderName(''); 
    setIsFolderModalVisible(false); 
    message.success(`Folder "${newFolderName}" created`);
  };

  // Handle New Item creation
  const handleCreateItem = () => {
    if (newItemName.trim() === '') {
      message.error('Item name cannot be empty');
      return;
    }
    setItems([...items, newItemName]);
    setNewItemName(''); 
    setIsItemModalVisible(false); 
    message.success(`Item "${newItemName}" added`);
  };

  return (
    <Layout style={{ padding: '24px', background: '#f0f2f5' }}>
      <Header
        style={{
          padding: 0,
          marginBottom: 24,
          background: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <Input.Search
          placeholder="Search files or folders..."
          style={{ width: '300px' }}
        />
        <Button type="primary">+ Root Folder</Button>
      </Header>

      {/* Content */}
      <Content style={{ display: 'flex' }}>
        {/* Left section (File/Folder List) */}
        <div style={{ flex: 2, paddingRight: 24 }}>
          <h3>Root Folder</h3>

          {/* Display Folders */}
          {folders.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <h4>Folders:</h4>
              <ul>
                {folders.map((folder, index) => (
                  <li key={index}>{folder}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Display Items */}
          {items.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <h4>Items:</h4>
              <ul>
                {items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <Button type="link" onClick={() => setIsFolderModalVisible(true)}>
            + New Folder
          </Button>
          <Button type="link" onClick={() => setIsItemModalVisible(true)}>
            + Add Item
          </Button>
        </div>

        {/* Right section (Folder History) */}
        <div
          style={{
            flex: 1,
            background: '#fff',
            padding: '16px',
            borderRadius: '8px',
          }}
        >
          <h3>Folder History</h3>
          <Timeline>
            <Timeline.Item color="blue">
              12 Files have been uploaded
              <p>Uploaded an Invoice file</p>
              <p>INVOICES.PDF</p>
              <p>12 min ago</p>
            </Timeline.Item>
            <Timeline.Item color="green">
              Comments on Case #24563
              <p>This file needs to be archived and marked as closed</p>
              <p>(Officer) James Kinoti</p>
              <p>45 min ago</p>
            </Timeline.Item>
            <Timeline.Item color="blue">
              Moved the file
              <p>6 team members in a project approved this</p>
              <p>2 Days Ago</p>
            </Timeline.Item>
          </Timeline>
        </div>
      </Content>

      {/* Modal for Creating Folder */}
      <Modal
        title="Create New Folder"
        visible={isFolderModalVisible}
        onOk={handleCreateFolder}
        onCancel={() => setIsFolderModalVisible(false)}
      >
        <Form>
          <Form.Item label="Folder Name">
            <Input
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Enter folder name"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal for Adding Item */}
      <Modal
        title="Add New Item"
        visible={isItemModalVisible}
        onOk={handleCreateItem}
        onCancel={() => setIsItemModalVisible(false)}
      >
        <Form>
          <Form.Item label="Item Name">
            <Input
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Enter item name"
            />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default FilesPage;
