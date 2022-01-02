import { FC } from 'react';
import { Link } from '@mui/material';

const Footer: FC = () => {
  return (
    <>
      <div>
        <p>
          Powered by{' '}
          <Link
            href="https://webify.cloudbase.net/"
            target="_blank"
            rel="noreferrer"
          >
            CloudBase Webify
          </Link>
        </p>
      </div>
    </>
  );
};

export default Footer;
