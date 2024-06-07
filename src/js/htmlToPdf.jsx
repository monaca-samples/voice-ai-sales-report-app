import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileOpener } from '@capacitor-community/file-opener';
import html2pdf from 'html2pdf.js';
import { Capacitor } from '@capacitor/core';

const handleCreatePdfFromHtml = async (html) => {
  const opt = {
    margin: 1,
    filename: 'sales_report.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  const element = document.createElement('div');
  element.innerHTML = html;

  if (Capacitor.getPlatform() === 'web') {
    html2pdf().from(element).set(opt).save();
  } else if (Capacitor.getPlatform() === 'android' || Capacitor.getPlatform() === 'ios') {
    const pdfOutput = await html2pdf().from(element).set(opt).outputPdf('arraybuffer');
    
    // Convert the PDF output to a base64 string
    const base64String = btoa(
      new Uint8Array(pdfOutput).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        '',
      ),
    );

    try {
      // Save the PDF file to the device
      await Filesystem.writeFile({
        path: 'sales_report.pdf',
        data: base64String,
        directory: Directory.Documents,
      });
    
      // Get the URL of the file
      const fileUri = await Filesystem.getUri({
        path: 'sales_report.pdf',
        directory: Directory.Documents,
      });
    
      // Open the file
      await FileOpener.open({
        filePath: fileUri.uri,
        mimeType: 'application/pdf',
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }
};

export default handleCreatePdfFromHtml;