import {
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  XIcon,
} from 'react-share';

interface ShareBtnProps {
  shareUrl: string;
  title: string;
}
const ShareBtns: React.FC<ShareBtnProps> = ({ shareUrl, title }) => {
  return (
    <div>
      <div className='justify-center flex gap-2'>
        <TwitterShareButton url={shareUrl} title={title} className='p-2'>
          <XIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={shareUrl} title={title} className='p-2'>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>
    </div>
  );
};

export default ShareBtns;
