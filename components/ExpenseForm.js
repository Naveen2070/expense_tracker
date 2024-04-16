import { StyleSheet, Text, View } from 'react-native';
import Input from './Input';
import Button from '../components/ui/Button';
import { useState } from 'react';
import { DateFormated } from '../utils/date';

const ExpressForm = ({ submitLabel, handleCancel, onSubmit, editValue }) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: editValue ? editValue.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: editValue ? DateFormated(editValue.date) : '',
      isValid: true,
    },
    description: {
      value: editValue ? editValue.description : '',
      isValid: true,
    },
  });

  const inputsChangeHandler = (id, values) => {
    setInputs((prev) => {
      return {
        ...prev,
        [id]: { value: values, isValid: true },
      };
    });
  };

  const handleConfirm = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    const amountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateValid = !isNaN(expenseData.date.getTime()); // Check if date is valid
    const descriptionValid = expenseData.description.trim().length > 0;

    // Update the state with validity information
    setInputs((prev) => ({
      amount: { value: prev.amount.value, isValid: amountValid },
      date: { value: prev.date.value, isValid: dateValid },
      description: { value: prev.description.value, isValid: descriptionValid },
    }));

    if (amountValid && dateValid && descriptionValid) {
      onSubmit(expenseData);
    }
  };

  const isFormValid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <>
      <View style={styles.root}>
        <Text style={styles.title}>Expense Recorder</Text>
        <View style={styles.inputRow}>
          <Input
            label="Amount"
            invalid={!inputs.amount.isValid}
            Config={{
              keyboardType: 'decimal-pad',
              onChangeText: inputsChangeHandler.bind(this, 'amount'),
              value: inputs.amount.value,
            }}
            style={styles.row}
          />
          <Input
            label="Date"
            style={styles.row}
            invalid={!inputs.date.isValid}
            Config={{
              keyboardType: 'decimal-pad',
              placeholder: 'YYYY-MM-DD',
              maxLength: 10,
              onChangeText: inputsChangeHandler.bind(this, 'date'),
              value: inputs.date.value,
            }}
          />
        </View>

        <Input
          label="Description"
          invalid={!inputs.description.isValid}
          Config={{
            multiline: true,
            onChangeText: inputsChangeHandler.bind(this, 'description'),
            value: inputs.description.value,
          }}
        />
        {isFormValid && (
          <Text style={styles.errorText}>
            Invalid values - Check your entered data
          </Text>
        )}
        <View style={styles.buttons}>
          <Button mode="flat" onPress={handleCancel} style={styles.button}>
            Cancel
          </Button>
          <Button onPress={handleConfirm} style={styles.button}>
            {submitLabel}
          </Button>
        </View>
      </View>
    </>
  );
};
export default ExpressForm;

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flex: 1,
  },
  root: {
    marginTop: 60,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    color: '#8A0202',
    margin: 8,
    fontSize: 16,
  },
});
