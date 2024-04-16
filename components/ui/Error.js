import { StyleSheet, Text, View } from 'react-native';

function ErrorOverlay({ msg }) {
  return (
    <>
      <View style={styles.root}>
        <Text style={[styles.text, styles.title]}>An error occures!</Text>
        <Text style={styles.text}>{msg}</Text>
      </View>
    </>
  );
}
export default ErrorOverlay;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#0080FF',
  },
  text: {
    textAlign: 'center',
    marginBottom: 8,
    color: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
