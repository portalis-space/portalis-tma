import { useAuthContext } from '@/contexts/Auth.context';
import { EventVisitorAttributesType } from '@/services/event/Event.types';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_WSS;

const useSocket = () => {
  const {currentUserData} = useAuthContext();
  const userId = currentUserData?.id || '';
  const [socket, setSocket] = useState<Socket | null>(null);
  const [scanListenerData, setScanListenerData] = useState<EventVisitorAttributesType | undefined>(undefined);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL, {
      // transports: ['websocket'], // Use WebSocket transport
      extraHeaders: {
        authorization: userId
      }
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

    newSocket.on("connect_error", (error) => {
      if (newSocket.active) {
        // temporary failure, the socket will automatically try to reconnect
        console.log('connect active')
      } else {
        // the connection was denied by the server
        // in that case, `socket.connect()` must be manually called in order to reconnect
        console.log(error.message);
      }
    });

    newSocket.on('disconnect', (reason) => {
      if (newSocket.active) {
        // temporary disconnection, the socket will automatically try to reconnect
      } else {
        // the connection was forcefully closed by the server or the client itself
        // in that case, `socket.connect()` must be manually called in order to reconnect
        console.log(reason);
      }
    });

    newSocket.on(userId, (data: EventVisitorAttributesType) => {
      console.log(`Received broadcast for user ${userId}:`, data);
      setScanListenerData(data); // Update state with received data
    });

    // Cleanup on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [userId]); // Re-run when userId changes

  return { socket, scanListenerData };
};

export default useSocket;
