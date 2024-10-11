import { DownOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Image,
  Input,
  List,
  Modal,
  Radio,
  Row,
} from 'antd';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import type { FC } from 'react';
import React, { useState } from 'react';
import OperationModal from './components/OperationModal';
import type { DocumenyType } from './data.d';
import { addFile, removeFile, updateFile, queryFileList } from './service';
import useStyles from './style.style';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

const Info: FC<{
  title: React.ReactNode;
  value: React.ReactNode;
  bordered?: boolean;
}> = ({ title, value, bordered }) => {
  const { styles } = useStyles();
  return (
    <div className={styles.headerInfo}>
      <span>{title}</span>
      <p>{value}</p>
      {bordered && <em />}
    </div>
  );
};

const ListContent = ({
  data: { documentType, createdAt, viewedBy, description, status },
}: {
  data: DocumenyType;
}) => {
  const { styles } = useStyles();
  return (
    <div>
      <div className={styles.listContentItem}>
        <span>Document Type</span>
        <p>{documentType}</p>
      </div>
      <div className={styles.listContentItem}>
        <span>Created By</span>
        <p>{viewedBy}</p>
      </div>
      <div className={styles.listContentItem}>
        <span>Created At</span>
        <p>{dayjs(createdAt).format('YYYY-MM-DD HH:mm')}</p>
      </div>
      <div className={styles.listContentItem}>
        <span>Status</span>
        <p>{status}</p>
      </div>
      <div className={styles.listContentItem}>
        <span>Description</span>
        <p>{description}</p>
      </div>
    </div>
  );
};

export const BasicList: FC = () => {
  const { styles } = useStyles();
  const [done, setDone] = useState<boolean>(false);
  const [open, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<DocumenyType> | undefined>(undefined);
  const [previewFile, setPreviewFile] = useState<string | null>(null); // State for previewing files
  const [fileType, setFileType] = useState<string | null>(null); // State for storing the file type

  const {
    data: listData,
    loading,
    mutate,
  } = useRequest(() => queryFileList({ count: 50 }));

  const { run: postRun } = useRequest(
    (method, params) => {
      if (method === 'remove') {
        return removeFile(params);
      }
      if (method === 'update') {
        return updateFile(params);
      }
      return addFile(params);
    },
    {
      manual: true,
      onSuccess: (result) => {
        mutate(result);
      },
    },
  );

  const list = listData?.list || [];
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 5,
    total: list.length,
  };

  const showEditModal = (item: DocumenyType) => {
    setVisible(true);
    setCurrent(item);
  };

  const deleteItem = (id: string) => {
    postRun('remove', { id });
  };

  const editAndDelete = (key: string | number, currentItem: DocumenyType) => {
    if (key === 'edit') showEditModal(currentItem);
    else if (key === 'delete') {
      Modal.confirm({
        title: 'Delete Task',
        content: 'Are you sure you want to delete this task?',
        okText: 'Confirm',
        cancelText: 'Cancel',
        onOk: () => deleteItem(currentItem.id),
      });
    }
  };

  const extraContent = (
    <div>
      <RadioGroup defaultValue="all">
        <RadioButton value="all">All</RadioButton>
        <RadioButton value="progress">In Progress</RadioButton>
        <RadioButton value="waiting">Waiting</RadioButton>
      </RadioGroup>
      <Search className={styles.extraContentSearch} placeholder="Please enter" onSearch={() => ({})} />
    </div>
  );

  const MoreBtn: React.FC<{
    item: DocumenyType;
  }> = ({ item }) => (
    <Dropdown
      menu={{
        onClick: ({ key }) => editAndDelete(key, item),
        items: [
          {
            key: 'edit',
            label: 'Edit',
          },
          {
            key: 'delete',
            label: 'Delete',
          },
        ],
      }}
    >
      <a>
        More <DownOutlined />
      </a>
    </Dropdown>
  );

  const handleFilePreview = (item: DocumenyType) => {
    setPreviewFile(item.url);
    setFileType(item.documentType); // Store the file type
  };

  const handleDone = () => {
    setDone(false);
    setVisible(false);
    setCurrent({});
  };

  const handleSubmit = (values: DocumenyType) => {
    setDone(true);
    const method = values?.id ? 'update' : 'add';
    postRun(method, values);
  };

  const closePreview = () => {
    setPreviewFile(null);
    setFileType(null);
  };

  return (
    <div>
      <PageContainer>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="My To-Do" value="8 tasks" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="Average Processing Time This Week" value="32 minutes" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="Tasks Completed This Week" value="24 tasks" />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="Basic List"
            style={{
              marginTop: 24,
            }}
            bodyStyle={{
              padding: '0 32px 40px 32px',
            }}
            extra={extraContent}
          >
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <a
                      key="view"
                      onClick={(e) => {
                        e.preventDefault();
                        handleFilePreview(item);
                      }}
                    >
                      <EyeOutlined />
                    </a>,
                    <a
                      key="edit"
                      onClick={(e) => {
                        e.preventDefault();
                        showEditModal(item);
                      }}
                    >
                      Edit
                    </a>,
                    <MoreBtn key="more" item={item} />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.name} shape="square" size="large" />}
                    title={<a href={item.name}>{item.name}</a>}
                    description={item.description}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageContainer>
      <Button
        type="dashed"
        onClick={() => setVisible(true)}
        style={{
          width: '100%',
          marginBottom: 8,
        }}
      >
        <PlusOutlined />
        Add
      </Button>
      <OperationModal
        done={done}
        open={open}
        current={current}
        onDone={handleDone}
        onSubmit={handleSubmit}
      />
      {previewFile && (
        <Modal
          visible={!!previewFile}
          footer={null}
          onCancel={closePreview}
          width={800}
        >
          {fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'image/gif' ? (
            <Image src={previewFile} width={400} />
          ) : fileType === 'application/pdf' ? (
            <iframe
              src={previewFile}
              style={{ width: '100%', height: '500px' }}
              title="PDF Preview"
            />
          ) : (
            <div>Cannot preview this file type.</div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default BasicList;
