
import { DefaultFooter } from '@ant-design/pro-components';

const Footer: React.FC = () => {
  

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{ background: 'none' }}
      copyright={`${currentYear} Copyright reserved  by Pathways Technologies`}
    />
  );
};

export default Footer;