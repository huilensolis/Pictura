import cloudinary from '@/services/cloudinary';

export const downloadImage = async (url: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    // Extract image name from the URL
    const urlParts = url.split('/');
    const imageName = urlParts[urlParts.length - 1];

    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', imageName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading image:', error);
  }
};

export const extractPublicId = async (imageURL: string) => {
  const parts = imageURL.split('/');
  const filename = parts.pop(); // Get the last part of the URL
  if (filename) {
    const filenameParts = filename.split('.');
    if (filenameParts.length > 1) {
      return filenameParts[0]; // Return the part before the first '.'
    }
  }
  throw new Error('Invalid imageURL format');
};

export const deleteFromCloundinary = async (imageUrl: string) => {
  try {
    const public_id = await extractPublicId(imageUrl);
    const response = await fetch('/api/images/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_id }),
    });

    console.log('Res from deleteFromCloudinary', response);
    if (!response.ok) {
      throw new Error('Failed to delete image');
    }

    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};
