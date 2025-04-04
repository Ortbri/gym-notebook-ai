import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL, CustomerInfo, PurchasesOffering } from 'react-native-purchases';

// Use keys from you RevenueCat API Keys
const APIKeys = {
  apple: process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY as string,
  google: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY as string,
};

interface RevenueCatProps {
  isPro: boolean;
}

interface ProviderProps {
  children: React.ReactNode;
}

const RevenueCatContext = createContext<RevenueCatProps | null>(null);

// Provide RevenueCat functions to our app
export const RevenueCatProvider = ({ children }: ProviderProps) => {
  const [isReady, setIsReady] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [currentOffering, setCurrentOffering] = useState<PurchasesOffering | null>(null);
  console.log(JSON.stringify(currentOffering, null, 2));

  // Update user state based on previous purchases

  useEffect(() => {
    const updateCustomerInformation = async (customerInfo: CustomerInfo) => {
      if (customerInfo?.entitlements.active['Pro'] !== undefined) {
        setIsPro(true);
      }
    };
    const init = async () => {
      if (!APIKeys.apple) {
        console.log('no key yet');
        return;
      }
      console.log('we have the key', APIKeys.apple);

      if (Platform.OS === 'android') {
        await Purchases.configure({ apiKey: APIKeys.google });
      } else {
        console.log('apple key ----', APIKeys.apple);
        await Purchases.configure({ apiKey: APIKeys.apple });
      }
      setIsReady(true);
      const offerings = await Purchases.getOfferings();
      setCurrentOffering(offerings.current);

      // Use more logging during debug if want!
      Purchases.setLogLevel(LOG_LEVEL.ERROR);

      // Listen for customer updates
      Purchases.addCustomerInfoUpdateListener(async (info) => {
        updateCustomerInformation(info);

        if (Object.entries(info.entitlements.active).length) {
          //user has access to some entitlement
          console.log('has entitlement');
        }

        console.log('running info---', info);
      });
    };
    init();
  }, []);

  const value = {
    isPro,
  };

  // Return empty fragment if provider is not ready (Purchase not yet initialised)
  if (!isReady) return <></>;

  return <RevenueCatContext.Provider value={value}>{children}</RevenueCatContext.Provider>;
};

// Export context for easy usage
export const useRevenueCat = () => {
  return useContext(RevenueCatContext) as RevenueCatProps;
};
