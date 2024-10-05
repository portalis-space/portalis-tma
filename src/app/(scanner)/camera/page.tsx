"use client"
import Button from '@/components/atoms/Button.atom';
import Typography from '@/components/atoms/Typography.atom';
import React, { useEffect, useRef, useState } from 'react';

const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  useEffect(() => {
    // Clean up camera when component unmounts
    return () => {
      closeCamera();
    };
  }, []);

  return (
    <main className="flex flex-col items-center h-screen gap-3">
      <Typography variant='text-lg' weight='bold'>Scan Ticket</Typography>
      <div>
        <video ref={videoRef} className="border-2 border-gray-300 min-h-64" />
      </div>
      <div>
        {cameraActive ? (
          <Button variant='outlined' onClick={closeCamera} className='px-3'>
            Close Camera
          </Button>
        ) : (
          <Button variant='filled' onClick={openCamera} className='px-3'>
            Open Camera
          </Button>
        )}
      </div>
    </main>
  );
};

export default Camera;
