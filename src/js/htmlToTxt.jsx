import textversionjs from 'textversionjs';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileOpener } from '@capacitor-community/file-opener';

const handleCreateTxtFromHtml = async (html) => {
  // Convert HTML to plain text
  const plainText = textversionjs(html);

  if (Capacitor.getPlatform() === 'web') {
    const element = document.createElement('a');
    const file = new Blob([plainText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'sales_report.txt';
    document.body.appendChild(element);
    element.click();
  } else if (Capacitor.getPlatform() === 'android' || Capacitor.getPlatform() === 'ios') {
    try {
      // Convert the text to a Uint8Array
      const textEncoder = new TextEncoder();
      const textArray = textEncoder.encode(plainText);

      // Convert the Uint8Array to a base64 string
      const base64String = btoa(String.fromCharCode.apply(null, textArray));

      // Save the plain text to a text file
      await Filesystem.writeFile({
        path: 'sales_report.txt',
        data: base64String,
        directory: Directory.Data,
      });

      // Get the URL of the text file
      const fileUri = await Filesystem.getUri({
        path: 'sales_report.txt',
        directory: Directory.Data,
      });

      // Open the file
      await FileOpener.open({
        filePath: fileUri.uri,
        mimeType: 'text/plain',
      });

    } catch (error) {
      console.error('Error:', error);
    }
  }
};

export default handleCreateTxtFromHtml;