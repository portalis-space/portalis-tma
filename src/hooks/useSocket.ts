// hooks/useSocket.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_WSS;

const useSocket = (userId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [broadcastData, setBroadcastData] = useState<unknown>(null);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL, {
      transports: ['websocket'], // Use WebSocket transport
    });

    setSocket(newSocket);

    // Handle socket connection
    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');

      // Subscribe to events for this specific userId
      if (userId) {
        console.log(`Subscribing to userId: ${userId}`);
        newSocket.emit('subscribe', userId); // Join the room with the userId
      }
    });

    // Listen for broadcasts for this userId
    newSocket.on('broadcast', (data: undefined) => {
      console.log(`Received broadcast for user ${userId}:`, data);
      setBroadcastData(data); // Update state with received data
    });

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [userId]); // Re-run when userId changes

  return { socket, broadcastData };
};

export default useSocket;
