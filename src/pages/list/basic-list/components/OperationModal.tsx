import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, Result } from 'antd';
import type { FC } from 'react';
import type {DocumenyType } from '../data.d';
import useStyles from '../style.style';
type OperationModalProps = {
  done: boolean;
  open: boolean;
  current: Partial<DocumenyType> | undefined;
  onDone: () => void;
  onSubmit: (values: DocumenyType) => void;
  children?: React.ReactNode;
};
const OperationModal: FC<OperationModalProps> = (props) => {
  const { styles } = useStyles();
  const { done, open, current, onDone, onSubmit, children } = props;
  if (!open) {
    return null;
  }
  return (
    <ModalForm<DocumenyType>
      open={open}
      title = {done ? null : `File ${current ? 'Edit' : 'Add'}`}
      className={styles.standardListForm}
      width={640}
      onFinish={async (values) => {
        onSubmit(values);
      }}
      initialValues={current}
      submitter={{
        render: (_, dom) => (done ? null : dom),
      }}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        bodyStyle: done
          ? {
              padding: '72px 0',
            }
          : {},
      }}
    >
      {!done ? (
        <>
          <ProFormText
            name="name"
            label="File Name"
            rules={[
              {
                required: true,
                message:'File Name Required',
              },
            ]}
            placeholder="pdf"
          />
          <ProFormDateTimePicker
            name="createdAt"
            label="Date Filed"
            rules={[
              {
                required: true,
                message: 'Date Filed Required',
              },
            ]}
            fieldProps={{
              style: {
                width: '100%',
              },
            }}
            placeholder="Date"
          />
          <ProFormSelect
            name="documentType"
            label="DocumentType"
            rules={[
              {
                required: false,              },
            ]}
            options={[
              {
                label: 'Confidential',
                value: 'Confidential',
              },
              {
                label: 'Normal',
                value: 'Normal',
              },
            ]}
            placeholder="is it confidential?"
          />
          <ProFormTextArea
            name="description"
            label="File description"
            rules={[
              {
                message: 'Brief description of file is required',
                min: 5,
              },
            ]}
            placeholder="Description"
          />
        </>
      ) : (
        <Result
  status="success"
  title="Operation Successful"
  subTitle="File Uploaded"
  extra={
    <Button type="primary" onClick={onDone}>
      Got It
    </Button>
  }
  className={styles.formResult}
/>

      )}
    </ModalForm>
  );
};
export default OperationModal;
