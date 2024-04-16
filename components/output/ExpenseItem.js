import { Pressable, StyleSheet, Text, View } from 'react-native';
import { DateFormated } from '../../utils/date';
import { useNavigation } from '@react-navigation/native';

const ExpenseItem = ({ id, description, amount, date }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('ManageExpense', { ExpenseID: id });
  };
  return (
    <>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.expenseItem}>
          <View>
            <Text style={[styles.text, styles.description]}>{description}</Text>
            <Text style={[styles.text]}>{DateFormated(date)}</Text>
          </View>
          <View style={styles.priceCont}>
            <Text style={styles.amount}>₹{amount.toFixed(2)}</Text>
          </View>
        </View>
      </Pressable>
    </>
  );
};
export default ExpenseItem;

const styles = StyleSheet.create({
  expenseItem: {
    padding: 18,
    marginVertical: 8,
    backgroundColor: '#001EFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
    elevation: 4,
  },
  text: {
    color: '#ffffff',
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  priceCont: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: '#0008FF',
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.75,
  },
});
