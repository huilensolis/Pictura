'use client';

import { useSupabase } from '@/hooks/use-supabase';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Option } from './option.models';
import { PrimaryButton } from '@/components/ui/buttons/primary';
import { copyToClipboard, downloadImage } from '@/utils/utils';
import { toast } from 'react-toastify';

export function PostOptions({
  post_id,
  image_url,
  doesUserOwnPost,
}: {
  post_id: number;
  image_url: string;
  doesUserOwnPost: boolean;
}) {
  const { supabase } = useSupabase();

  const router = useRouter();

  const [showDropdown, setShowDropdown] = useState(false);
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
          console.log({ error });
          setIndexOfOptionLoading(null);
          if (error) throw new Error('Error trying to delete');
          router.refresh();
        } catch (e) {
          //
        }
      },
    },
  ];

  const PUBLIC_OPTIONS: Option[] = [
    { title: 'Share', action: () => {} },
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
    setShowDropdown(!showDropdown);
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
    </div>
  );
}
