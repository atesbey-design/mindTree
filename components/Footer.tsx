'use client';

import React from 'react';
import Image from 'next/image';
import { toPng, toSvg } from 'html-to-image';
import { jsPDF } from 'jspdf';

const Footer = () => {
  const exportToPng = async () => {
    const element = document.querySelector('.react-flow') as HTMLElement;
    if (element) {
      // Hide all UI controls before export
      const controls = document.querySelectorAll('.custom-controls, .export-buttons');
      controls.forEach(control => (control as HTMLElement).style.display = 'none');

      const dataUrl = await toPng(element, {
        quality: 1,
        backgroundColor: '#FF6B6B',
        style: {
          transform: 'scale(1)',
        }
      });

      // Show UI controls again after export
      controls.forEach(control => (control as HTMLElement).style.display = 'flex');

      const link = document.createElement('a');
      link.download = 'mindtree.png';
      link.href = dataUrl;
      link.click();
    }
  };

  const exportToPdf = async () => {
    const element = document.querySelector('.react-flow') as HTMLElement;
    if (element) {
      // Hide all UI controls before export
      const controls = document.querySelectorAll('.custom-controls, .export-buttons');
      controls.forEach(control => (control as HTMLElement).style.display = 'none');

      const dataUrl = await toPng(element, {
        quality: 1,
        backgroundColor: '#FF6B6B',
        style: {
          transform: 'scale(1)',
        }
      });

      // Show UI controls again after export
      controls.forEach(control => (control as HTMLElement).style.display = 'flex');

      const pdf = new jsPDF('landscape');
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('mindtree.pdf');
    }
  };

  return (
    <div 
      className="export-buttons"
      style={{
        position: 'fixed',
        bottom: '15px',
        right: '15px',
        display: 'flex',
        gap: '8px',
        zIndex: 1000,
      }}
    >
      <button
        onClick={exportToPng}
        style={{
          padding: '8px 16px',
          backgroundColor: '#FFD93D',
          border: '3px solid #000000',
          borderRadius: '8px',
          boxShadow: '4px 4px 0px #000000',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'transform 0.1s',
          fontSize: '16px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}
        onMouseDown={(e) => e.currentTarget.style.transform = 'translate(4px, 4px)'}
        onMouseUp={(e) => e.currentTarget.style.transform = 'translate(0px, 0px)'}
      >
        <Image src="/icons/downloadImage.png" alt="Export PNG" width={24} height={24} />
        Export PNG
      </button>

      <button
        onClick={exportToPdf}
        style={{
          padding: '8px 16px',
          backgroundColor: '#4ECDC4',
          border: '3px solid #000000',
          borderRadius: '8px',
          boxShadow: '4px 4px 0px #000000',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'transform 0.1s',
          fontSize: '16px',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}
        onMouseDown={(e) => e.currentTarget.style.transform = 'translate(4px, 4px)'}
        onMouseUp={(e) => e.currentTarget.style.transform = 'translate(0px, 0px)'}
      >
        <Image src="/icons/downloadPDF.png" alt="Export PDF" width={24} height={24} />
        Export PDF
      </button>
    </div>
  );
};

export default Footer;
