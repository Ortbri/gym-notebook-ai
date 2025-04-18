import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '~/components/ui/Button';
import { Text } from '~/components/ui/Text';
import { useJoinShoppingListCallback } from '~/stores/ListsStore';

export default function ScanQRCode() {
  const [permission, requestPermission] = useCameraPermissions();
  const joinShoppingListCallback = useJoinShoppingListCallback();
  const router = useRouter();

  const [qrCodeDetected, setQrCodeDetected] = useState<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text size="h2">We need your permission to show the camera</Text>
        <Button onPress={requestPermission} variant="outline" title="Grant permission" />
      </View>
    );
  }

  const handleConfirmJoinList = () => {
    joinShoppingListCallback(qrCodeDetected);
    if (router.canDismiss()) {
      router.dismiss();
    }
    router.push({
      pathname: '/listB/[listId]',
      params: { listId: qrCodeDetected },
    });
  };

  const handleBarcodeScanned = (barcodeScanningResult: BarcodeScanningResult) => {
    const qrCodeUrl = barcodeScanningResult.data;

    // Extract listId from QR code URL
    const listIdMatch = qrCodeUrl.match(/listId=([^&]+)/);
    if (listIdMatch) {
      const listId = listIdMatch[1];
      setQrCodeDetected(listId);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setQrCodeDetected('');
      }, 1000);
    }
  };

  return (
    <CameraView
      style={styles.camera}
      facing="back"
      barcodeScannerSettings={{
        barcodeTypes: ['qr'],
      }}
      onBarcodeScanned={handleBarcodeScanned}>
      <View style={styles.contentContainer}>
        {qrCodeDetected ? (
          <View style={styles.detectedContainer}>
            <Text size="h2">🥳 QR code detected!!!</Text>
            <Button onPress={handleConfirmJoinList} variant="outline" title="join List " />
          </View>
        ) : (
          <Text style={styles.instructionText}>
            Point the camera at a valid Shopping List QR Code
          </Text>
        )}
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    padding: 16,
  },
  camera: {
    height: 900,
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  detectedContainer: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 30,
  },

  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  detectedText: {
    color: 'white',
    marginBottom: 16,
  },
  instructionText: {
    color: 'white',
  },
});
