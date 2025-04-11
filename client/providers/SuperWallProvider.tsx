import { useAuth } from '@clerk/clerk-expo'; // make sure this is imported
import Superwall, { LogLevel } from '@superwall/react-native-superwall';
import React, { createContext, useContext, useState } from 'react';

import { RCPurchaseController } from '~/api/superwalls/RCPurchaseController';

interface SuperWallProps {
  isPro: boolean;
}

interface ProviderProps {
  children: React.ReactNode;
}

const SuperWallContext = createContext<SuperWallProps | null>(null);

const SuperwallAPIKey = process.env.EXPO_PUBLIC_SUPERWALL_API_KEY as string;
/* -------------------------------- provider -------------------------------- */
export const SuperWallProvider = ({ children }: ProviderProps) => {
  const [isReady, setIsReady] = useState(false);
  const [isPro, setIsPro] = useState(false);

  // const apiKey = Platform.OS === 'ios' ? 'MY_IOS_API_KEY' : 'MY_ANDROID_API_KEY';
  const purchaseController = new RCPurchaseController();
  const { userId } = useAuth();
  React.useEffect(() => {
    const setupSuperwall = async () => {
      await Superwall.configure({
        apiKey: SuperwallAPIKey,
        options: undefined,
        purchaseController,
      });
      Superwall.shared.identify({ userId: userId ?? '' });
      // Superwall.shared.identify({ userId: 'abc' });
      // Superwall.shared.setDelegate(delegate);
      // Superwall.shared.setUserAttributes({ test: 'abc' });
      purchaseController.syncSubscriptionStatus();
      setIsReady(true);

      Superwall.instance.logLevel = LogLevel.Warn;
    };
    setupSuperwall();
  }, []);

  const value = {
    isPro,
  };

  // Return empty fragment if provider is not ready (Purchase not yet initialised)
  if (!isReady) return <></>;

  return <SuperWallContext.Provider value={value}>{children}</SuperWallContext.Provider>;
};

/* ---------------------------------- hook ---------------------------------- */
export const useSuperWall = () => {
  return useContext(SuperWallContext) as SuperWallProps;
};
