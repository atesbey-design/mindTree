// components/CustomControls.tsx
import React from 'react';
import { useReactFlow, ReactFlowInstance } from 'reactflow';
import Image from 'next/image';

const CustomControls = () => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const buttonStyle = {
    backgroundColor: '#FFD93D',
    border: '3px solid #000000',
    boxShadow: '5px 5px 0px #000000',
    borderRadius: '0',
    width: '50px', 
    height: '50px', 
    margin: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.1s ease-in-out',
  };

  const handleZoomIn = () => {
    zoomIn();
  };

  const handleZoomOut = () => {
    zoomOut();
  };

  const handleFitView = () => {
    fitView({ padding: 0.2 });
  };

  return (
    <div className="custom-controls" style={{ position: 'absolute', left: 10, bottom: 10, zIndex: 999, display: 'flex', flexDirection: 'column' }}> 
      <button style={buttonStyle} onClick={handleZoomIn}>
        <Image src="/icons/zoomIn.png" alt="Zoom In" width={30} height={30} /> 
      </button>
      <button style={buttonStyle} onClick={handleZoomOut}>
        <Image src="/icons/zoomOut.png" alt="Zoom Out" width={30} height={30} /> 
      </button>
      <button style={buttonStyle} onClick={handleFitView}>
        <Image src="/icons/fitView.png" alt="Fit View" width={30} height={30} /> 
      </button>
    </div>
  );
};

export default CustomControls;
