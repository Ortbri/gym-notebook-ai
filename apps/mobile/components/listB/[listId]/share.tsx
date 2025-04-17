import { useLocalSearchParams } from 'expo-router';
import { Share, StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { BodyScrollView } from '~/components/BodyScroll';
import { Button } from '~/components/ui/Button';
import { Text } from '~/components/ui/Text';

export default function ShareListScreen() {
  const { listId } = useLocalSearchParams() as { listId: string };

  const handleShareListCode = async () => {
    const shareMessage = `🛒 Join my shopping list!\n\nPaste this code in the app to start collaborating:\n\n${listId}\n\nDon't have the app yet? Download it here:\nhttps://apps.apple.com/us/app/shopping-list-sync-share/id6739513017`;

    try {
      await Share.share({ message: shareMessage });
    } catch (error) {
      console.error('Error sharing list code:', error);
    }
  };

  return (
    <BodyScrollView contentContainerStyle={styles.container}>
      <View style={styles.heroSection}>
        <Text size="h2" style={styles.title}>
          Invite Collaborators
        </Text>
        <Text size="p" style={styles.subtitle}>
          Share your list with family and friends to collaborate in real-time
        </Text>
      </View>

      <View style={styles.qrSection}>
        <Text size="p" style={styles.sectionTitle}>
          Scan QR Code
        </Text>
        <View style={styles.qrContainer}>
          <QRCode
            size={220}
            value={`gym-shopping-list://list/new?listId=${listId}`}
            // color="blue"
            logoSize={100}
            logo={require('~/assets/icon.png')}
          />
        </View>
      </View>

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text size="p" style={styles.orText}>
          or
        </Text>
        <View style={styles.line} />
      </View>

      <Button onPress={handleShareListCode} variant="ghost" style={styles.shareButton}>
        Share List Code
      </Button>

      <Text style={styles.disclaimer}>
        ⚠️ Only share your list with people you trust. Anyone with the code can join and edit your
        list.
      </Text>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 100,
    alignItems: 'center',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
    gap: 8,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: 'gray',
    paddingHorizontal: 16,
  },
  qrSection: {
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
  },
  qrContainer: {
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 16,
    marginBottom: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(150, 150, 150, 0.2)',
  },
  orText: {
    color: 'gray',
  },
  shareButton: {
    minWidth: 200,
  },
  disclaimer: {
    textAlign: 'center',
    fontSize: 14,
    color: 'gray',
    marginTop: 24,
    maxWidth: '90%',
  },
});
