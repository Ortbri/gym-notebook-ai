import Constants from 'expo-constants';
import { isDevice } from 'expo-device';
import { Platform } from 'react-native';
import { env } from './env';

/**
 * from x.com post here => https://x.com/MaximilianAst/status/1900212626585514361
 * but Evan Bacon suggested this here https://docs.expo.dev/router/reference/api-routes/#native-deployment
 *
 * @param path - The path to append to the API base URL.
 * @returns The full URL to the API.
 */
export const getServedUrl = (path: string) => {
  if (isDevice) {
    const debuggerHost = Constants.expoConfig?.hostUri;
    const localHost = debuggerHost?.split(':')[0];
    if (!localHost) {
      return `${env.EXPO_PUBLIC_API_URL}/api/${path}`;
    }
    if (!env.EXPO_PUBLIC_API_URL?.includes('localhost')) {
      return `${env.EXPO_PUBLIC_API_URL}/api/${path}`;
    }
    return `http://${localHost}:3000/api/${path}`;
  }
  // sim
  if (env.EXPO_PUBLIC_API_URL?.includes('localhost') && Platform.OS === 'android') {
    return `http://10.0.2.2:3000/api/${path}`;
  }
  return `${env.EXPO_PUBLIC_API_URL}/api/${path}`;
};
