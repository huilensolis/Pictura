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

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Unable to copy text to clipboard:', error);
    return false;
  }
};
