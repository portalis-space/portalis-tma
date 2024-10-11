"use client";
import Button from '@/components/atoms/Button.atom';
import Typography from '@/components/atoms/Typography.atom';
import Loader from '@/components/molecules/Loader.molecule';
import useScanTicket from '@/services/ticket/mutations/ScanTicket.query';
import { cn } from '@/utils/cn';
import jsQR from 'jsqr';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HiOutlineArrowUturnRight } from 'react-icons/hi2';

const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment'); // Default to back camera
  const [scanning, setScanning] = useState<boolean>(true);
  const [QRString, setQRString] = useState('');
  const [isScanLoading, setIsScanLoading] = useState(false);
  const [isScanSuccess, setIsScanSuccess] = useState(false);
  const [scanErrMessage, setScanErrMessage] = useState<string | undefined>(undefined);

  const scanTicket = useScanTicket({
    onSuccess: () => {
      setIsScanSuccess(true);
    },
    onError: (err) => {
      setScanErrMessage(err.errors[0].detail)
    },
    onMutate: () => {
      setIsScanLoading(true);
      setScanning(false);
    },
    onSettled: () => {
      setIsScanLoading(false);
      setScanning(true);
    }
  })

  // Detect if the user is on a mobile device
  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  const openCamera = useCallback(async (selectedFacingMode: 'user' | 'environment') => {
    try {
      const constraints = isMobileDevice()
        ? { video: { facingMode: { ideal: selectedFacingMode } } } // Use 'ideal' instead of 'exact' for graceful fallback
        : { video: true }; // Desktop: default webcam

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }
    } catch (error: unknown) {
      console.error('Error accessing camera:', error);

      // Fallback if camera access fails
      if (error &&  selectedFacingMode === 'environment') {
        console.warn('Back camera is not available. Switching to front camera.');
        openCamera('user'); // Try the front camera if the back is unavailable
      } else {
        alert('Unable to access the camera. Please check your camera settings.');
      }
    }
  }, []);

  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
      setScanning(false);
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

  useEffect(() => {
    const scanQrCode = () => {
      if (canvasRef.current && videoRef.current && cameraActive) {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          // Draw the video frame to canvas
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Extract the image data from the canvas
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

          // Use jsQR to scan for QR codes
          const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

          if (qrCode) {
            setQRString(qrCode.data);
            scanTicket.mutate({qrString: qrCode.data})
          }
        }
      }
    };

    if (scanning) {
      const interval = setInterval(scanQrCode, 3000); // Scan every 500ms
      return () => clearInterval(interval); // Clear the interval on component unmount
    }
  }, [scanning, cameraActive, scanTicket]);

  return (
    <main className="flex flex-col items-center h-screen gap-3">
      <Typography variant='text-lg' weight='bold'>Scan Ticket</Typography>
      <div className='relative'>
        <video ref={videoRef} className="border-2 border-gray-300 min-h-64" autoPlay playsInline muted />
        <canvas ref={canvasRef} className="hidden" />
        {
          isScanLoading && <div className='absolute w-full h-full top-0 flex justify-center bg-neutral-900 bg-opacity-70'><Loader /></div>
        }
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
            <HiOutlineArrowUturnRight className="text-white w-6 h-6" />
          </Button>
        )}
      </div>
      <Typography variant='text-xs' className={cn('text-center !text-primary-blue-600', {'!text-red-400': !scanning})}>{scanning ? 'Scanner Ready' : 'Scanner Not Ready'}</Typography>
      {
        isScanSuccess && <Typography variant='text-xs' className='text-center'>Success</Typography>
      }
      {
        scanErrMessage && <Typography variant='text-xs' className='text-center !text-red-500'>{scanErrMessage}</Typography>
      }
      <Typography variant='text-xs' className='text-center'>{QRString}</Typography>
    </main>
  );
};

export default Camera;
