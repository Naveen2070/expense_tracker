import { Pressable, StyleSheet, Text, View } from 'react-native';

function Button({ children, onPress, mode, style }) {
  return (
    <>
      <View style={style}>
        <Pressable
          onPress={onPress}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <View style={[styles.Button, mode === 'flat' && styles.flat]}>
            <Text style={[styles.text, mode === 'flat' && styles.flatText]}>
              {children}
            </Text>
          </View>
        </Pressable>
      </View>
    </>
  );
}
export default Button;
const styles = StyleSheet.create({
  Button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: '#002AFF',
  },
  flat: {
    backgroundColor: 'transparent',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  flatText: {
    color: '#00D0FF',
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: '#002AFF',
    borderRadius: 4,
  },
});
