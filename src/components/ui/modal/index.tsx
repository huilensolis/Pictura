import { XIcon } from 'lucide-react';
import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  heading: string | ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  heading,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-70'>
      <div className='bg-white p-6 rounded shadow-lg'>
        <XIcon
          className='cursor-pointer absolute top-10 right-20 m-4 text-white hover:text-gray-900'
          onClick={onClose}
          size={36}
        />
        <h1>{heading}</h1>
        {children}
      </div>
    </div>
  );
};

export default Modal;
