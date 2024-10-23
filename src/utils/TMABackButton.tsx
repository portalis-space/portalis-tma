import { useEffect } from 'react';
import { backButton, useSignal } from '@telegram-apps/sdk-react';
import Typography from '@/components/atoms/Typography.atom';

/**
 * Component which controls the Back Button visibility.
 */
export function TMABackButton() {
  const isVisible = useSignal(backButton.isVisible);
  const isSupported = useSignal(backButton.isSupported);
  const isMounted = useSignal(backButton.isMounted);

  useEffect(() => {
    console.log('The button is', isVisible ? 'visible' : 'invisible',  isSupported, isMounted);
  }, [isMounted, isSupported, isVisible]);

  useEffect(() => {
    if (backButton.isSupported()) {
      backButton.onClick(() => console.log('clicked'))
      backButton.show();
      return () => {
        backButton.hide();
      };
    }
  }, []);

  return <Typography>{isVisible ? 'ok' : 'no'} {isSupported ? 'ok' : 'no'} {isMounted ? 'ok' : 'no'}</Typography>;
}