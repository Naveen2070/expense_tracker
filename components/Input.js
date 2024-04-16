import { StyleSheet, Text, TextInput, View } from 'react-native';

const Input = ({ label, style, Config, invalid }) => {
  const inputStyle = [styles.input];

  if (Config && Config.multiline) {
    inputStyle.push(styles.multi);
  }

  if (invalid) {
    inputStyle.push(styles.invalidInput);
  }

  return (
    <>
      <View style={[styles.inputCont, style]}>
        <Text style={[styles.label, invalid && styles.invalid]}>{label}</Text>
        <TextInput style={inputStyle} {...Config} />
      </View>
    </>
  );
};
export default Input;

const styles = StyleSheet.create({
  inputCont: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    color: '#FFFFFF',
  },
  input: {
    backgroundColor: '#CCDBDD',
    color: '#1500FF',
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  multi: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalid: {
    color: '#9A2929',
  },
  invalidInput: {
    backgroundColor: '#7D2626',
  },
});
