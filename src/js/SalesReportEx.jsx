import React from 'react';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "/assets/vfs_fonts.js"
import { saveAs } from 'file-saver';
import { Capacitor } from '@capacitor/core';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileOpener } from '@capacitor-community/file-opener';

pdfMake.vfs = pdfFonts;

const salesData = [
  { name: 'John Doe', time: '2022-01-01 10:00', location: 'New York', item: 'Laptop', quantity: 1, price: 1000 },
  { name: 'Jane Smith', time: '2022-01-02 11:00', location: 'Los Angeles', item: 'Headphones', quantity: 2, price: 200 },
  { name: 'Bob Johnson', time: '2022-01-03 12:00', location: 'Chicago', item: 'Monitor', quantity: 1, price: 300 },
  { name: 'John Doe', time: '2022-01-01 10:00', location: 'New York', item: 'Laptop', quantity: 1, price: 1000 },
  { name: 'Jane Smith', time: '2022-01-02 11:00', location: 'Los Angeles', item: 'Headphones', quantity: 2, price: 200 },
  { name: 'Bob Johnson', time: '2022-01-03 12:00', location: 'Chicago', item: 'Monitor', quantity: 1, price: 300 }
];

const SalesReportEx = () => {
  const downloadPDF = async () => {
    try {
      let docDefinition = {
        content: [
          { text: 'Sales Report', style: 'header' },
          {
            table: {
              body: [
                ['Name', 'Time', 'Location', 'Item Sold', 'Quantity'],
                ...salesData.map(sale => [sale.name, sale.time, sale.location, sale.item, sale.quantity])
              ]
            }
          }
        ]
      };
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  
      if (Capacitor.getPlatform() === 'web') {
        const pdfDataUrl = await new Promise((resolve, reject) => {
          pdfDocGenerator.getDataUrl((dataUrl) => {
            if (dataUrl) {
              resolve(dataUrl);
            } else {
              reject('Failed to generate data URL for PDF');
            }
          });
        }).then((dataUrl) => {
          console.log('PDF data URL generated:', dataUrl);
          return dataUrl;
        }).catch((error) => {
          console.error('Error generating PDF data URL:', error);
          throw error;
        });
        const pdfBlob = await fetch(pdfDataUrl).then(res => res.blob());
        saveAs(pdfBlob, 'sales_report.pdf');
      } 
      else if (Capacitor.getPlatform() === 'ios' || Capacitor.getPlatform() === 'android') {
        await new Promise((resolve, reject) => {
          // Get the PDF as a buffer
          pdfDocGenerator.getBuffer(async (buffer) => {
            try {
              // Convert the buffer to a base64 string
              const base64Data = btoa(
                new Uint8Array(buffer).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  '',
                ),
              );

              // Write the base64 string to a file
              const result = await Filesystem.writeFile({
                path: 'sales_report.pdf',
                data: base64Data,
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

              // Resolve the promise when done
              resolve();
            } catch (error) {
              // Reject the promise with the error
              reject(error);
            }
          });
        });
      }
    } catch (error) {
      console.error('Error in downloadPDF function:', error);
    }
  };

  const downloadTXT = async () => {
    try {
      let text = salesData.map(sale => 
        `Name: ${sale.name}, Time: ${sale.time}, Location: ${sale.location}, Item Sold: ${sale.item}, Quantity: ${sale.quantity}`
      ).join('\n');
      let blob = new Blob([text], { type: 'text/plain' });
      let blobUrl = URL.createObjectURL(blob);
  
      if (Capacitor.getPlatform() === 'web') {
        window.open(blobUrl, '_blank');
      } 
      else if (Capacitor.getPlatform() === 'ios' || Capacitor.getPlatform() === 'android') {
        // Convert the text to a base64 string
        const base64Data = btoa(text);
  
        // Write the base64 string to a file
        const result = await Filesystem.writeFile({
          path: 'sales_report.txt',
          data: base64Data,
          directory: Directory.Documents,
        });
  
        // Get the URL of the file
        const fileUri = await Filesystem.getUri({
          path: 'sales_report.txt',
          directory: Directory.Documents,
        });
  
        // Open the file
        await FileOpener.open({
          filePath: fileUri.uri,
          mimeType: 'text/plain',
        });
      }
    } catch (error) {
      console.error('Error in downloadTXT function:', error);
    }
  };

  return (
    <div>
        <Typography variant="h3" gutterBottom>
          Sales Report Example
        </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Item Sold</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salesData.map((sale, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">{sale.name}</TableCell>
                <TableCell align="right">{sale.time}</TableCell>
                <TableCell align="right">{sale.location}</TableCell>
                <TableCell align="right">{sale.item}</TableCell>
                <TableCell align="right">{sale.quantity}</TableCell>
                <TableCell align="right">{sale.price}</TableCell>
                <TableCell align="right">{sale.quantity * sale.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ p:6, position: 'fixed', bottom: 0, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Fab style={{ backgroundColor: 'blue', color: 'white', marginRight: '10px' }} onClick={downloadPDF}>
          <PictureAsPdfIcon />
        </Fab>
        <Fab style={{ backgroundColor: 'blue', color: 'white', marginLeft: '10px' }} onClick={downloadTXT}>
          <TextFieldsIcon />
        </Fab>
      </Box>
    </div>
  );
};

export default SalesReportEx;