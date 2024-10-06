"use client"
import Button from '@/components/atoms/Button.atom';
import Typography from '@/components/atoms/Typography.atom';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HiOutlineArrowUturnRight } from 'react-icons/hi2';

const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment'); // Default to back camera

  // Detect if the user is on a mobile device
  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const openCamera = useCallback(async(selectedFacingMode: 'user' | 'environment') => {
    try {
      const constraints = isMobileDevice()
        ? { video: { facingMode: { exact: selectedFacingMode } } } // Mobile: front or back camera
        : { video: true }; // Desktop: default webcam

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }, []);

  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  // Toggle the camera between front and back
  const toggleCamera = () => {
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacingMode);
    closeCamera();
    openCamera(newFacingMode);
  };

  useEffect(() => {
    openCamera(facingMode);

    // Clean up camera when component unmounts
    return () => {
      closeCamera();
    };
  }, [facingMode, openCamera]); // Re-run when the facing mode changes

  return (
    <main className="flex flex-col items-center h-screen gap-3">
      <Typography variant='text-lg' weight='bold'>Scan Ticket</Typography>
      <div>
        <video ref={videoRef} className="border-2 border-gray-300 min-h-64" />
      </div>
      <div className='flex flex-row items-center justify-center gap-5 w-full px-3'>
        {cameraActive ? (
          <Button variant='outlined' onClick={closeCamera} className='px-3'>
            Close Camera
          </Button>
        ) : (
          <Button variant='filled' onClick={() => openCamera(facingMode)} className='px-3'>
            Open Camera
          </Button>
        )}
        {isMobileDevice() && cameraActive && (
          <Button variant='filled' onClick={toggleCamera}>
            <HiOutlineArrowUturnRight
              className=" text-white w-6 h-6"
            />
          </Button>
        )}
      </div>
    </main>
  );
};

export default Camera;
