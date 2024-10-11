//import { queryDocDownload } from '@/pages/Members/services';
import { EyeOutlined, LoadingOutlined } from '@ant-design/icons';
import { ModalForm } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Spin, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
//import * as XLSX from 'xlsx';

const DocumentPreviewer = ({ attachment }: any) => {
  const [htmlContent, setHtmlContent] = useState('');
  const { run, loading, data } = useRequest(
    async (s) => {
      try {
        if (s) {
          //const response: any = await queryDocDownload(s);

          //return response;
        }
      } catch (error) {
        console.log(error);
      }
    },
    { manual: true },
  );

  useEffect(() => {
    const split = attachment?.originalFilename?.split('.');
    const ext = split[split.length - 1];
    if (['xls', 'xlsx'].includes(ext) && data?.content) {
      const dataArr = new Uint8Array(data?.content?.length);

      for (let i = 0; i < data?.content?.length; ++i) {
        dataArr[i] = data?.content?.charCodeAt(i);
      }

      //const workbook = XLSX.read(dataArr, { type: 'array' });

      //const html = XLSX.write(workbook, { type: 'string', bookType: 'html' });
      //setHtmlContent(html);
    }
  }, [data]);

  return (
    <div>
      <ModalForm
        submitter={false}
        title="Viewer"
        trigger={
          <Button type="text" onClick={() => run(attachment?.publicId)}>
            <Tooltip title="Review Document">
              <span style={{ marginRight: '4px' }}>
                <EyeOutlined />
              </span>
              <span style={{ fontWeight: 'bold' }} />
            </Tooltip>
          </Button>
        }
      >
        {loading && (
          <>
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24, marginRight: '.5rem' }} spin />}
            />
            Hold on as we load the document...
          </>
        )}

        {htmlContent ? (
          <>
            {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }} /> */}
            <iframe
              title="PDF Viewer"
              src={`data:${data?.contentType};base64,` + data?.content}
              width="100%"
              height="600px"
            />
          </>
        ) : (
          data?.contentType &&
          data?.content && (
            <iframe
              title="PDF Viewer"
              src={`data:${data?.contentType};base64,` + data?.content}
              width="100%"
              height="600px"
            />
          )
        )}
      </ModalForm>
    </div>
  );
};

export default DocumentPreviewer;