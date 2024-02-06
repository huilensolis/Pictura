'use client';

import { useSupabase } from '@/hooks/use-supabase';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Option } from './option.models';
import { PrimaryButton } from '@/components/ui/buttons/primary';
import { toast } from 'react-toastify';
import ShareBtns from '@/components/feature/share-btns';
import Modal from '@/components/ui/modal';
import {
  deleteFromCloundinary,
  copyToClipboard,
  downloadImage,
} from '@/utils/utils';

export function PostOptions({
  post_id,
  title,
  image_url,
  doesUserOwnPost,
}: {
  post_id: number;
  title: string;
  image_url: string;
  doesUserOwnPost: boolean;
}) {
  const { supabase } = useSupabase();

  const router = useRouter();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [indexOfOptionLoading, setIndexOfOptionLoading] = useState<
    number | null
  >(null);

  const OWNER_OPTIONS: Option[] = [
    { title: 'Edit', action: () => {} },
    {
      title: 'Delete',
      action: async () => {
        const indexOfOption = 1;
        setIndexOfOptionLoading(indexOfOption);
        try {
          const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', post_id)
            .single();
          setIndexOfOptionLoading(null);
          if (error) throw new Error('Error trying to delete');
          deleteFromCloundinary(image_url);
          if (typeof window !== 'undefined') {
            if (window.history.length > 1) {
              window.history.back(); // Go back to the previous page
            } else {
              router.push('/app'); // Navigate to '/app' if no history
            }
          }
          router.refresh();
        } catch (e) {
          //
        }
      },
    },
  ];

  const PUBLIC_OPTIONS: Option[] = [
    {
      title: 'Share',
      action: () => toggleShareModal(),
    },
    { title: 'Download', action: async () => await downloadImage(image_url) },
    {
      title: 'Copy URL',
      action: async () => {
        (await copyToClipboard(image_url))
          ? toast.success(`Copied ${image_url} to clipboard`, {
              position: 'top-center',
            })
          : toast.error('error copying', { position: 'top-center' });
      },
    },
  ];

  const FINAL_OPTIONS = [...OWNER_OPTIONS, ...PUBLIC_OPTIONS];

  function toggleDropdown() {
    setShowDropdown((prev) => !prev);
  }
  function toggleShareModal() {
    setShowShareModal((prev) => !prev);
    toggleDropdown();
  }

  return (
    <div className='relative'>
      <button
        onClick={toggleDropdown}
        className='text-white bg-neutral-700 hover:brightness-125 rounded-md p-2 text-center flex items-center'
      >
        <MoreHorizontal />
      </button>

      {showDropdown && (
        <ul
          id='dropdown'
          className='flex flex-col z-10 absolute top-12 right-0 w-48 bg-neutral-700 rounded-md overflow-hidden'
        >
          {FINAL_OPTIONS.map((option, index) => (
            <li key={option.title}>
              <PrimaryButton
                isDisabled={indexOfOptionLoading === index}
                isLoading={indexOfOptionLoading === index}
                onClick={option.action}
              >
                {option.title}
              </PrimaryButton>
            </li>
          ))}
        </ul>
      )}
      {showShareModal && (
        <Modal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          heading={`Share ${title} on: `}
        >
          <ShareBtns shareUrl={image_url} title={title} />
        </Modal>
      )}
    </div>
  );
}
