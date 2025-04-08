import { Text, View, StyleSheet } from 'react-native';

export const EditScreenInfo = ({ path }: { path: string }) => {
  const title = 'Open up the code for this screen:';
  const description =
    'Change any of the text, save the file, and your app will automatically update.';

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text style={styles.getStartedText}>{title}</Text>
        <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
          <Text style={styles.text}>{path}</Text>
        </View>
        <Text style={styles.getStartedText}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  text: {
    color: '#000', // Default text color, adjust as needed
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    color: '#000', // Default text color, adjust as needed
  },
  helpContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 15,
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
});
