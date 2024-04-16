import { StyleSheet, Text, View } from 'react-native';
import ExpenseSummary from './ExpenseSummary';
import ExpenseList from './ExpenseList';

const ExpenseOutput = ({ expenses, period, fallBackText }) => {
  let Content = <Text style={styles.infoText}>{fallBackText}</Text>;

  if (expenses.length > 0) {
    Content = <ExpenseList expenses={expenses} />;
  }

  return (
    <>
      <View style={styles.container}>
        <ExpenseSummary period={period} expenses={expenses} />
        {Content}
      </View>
    </>
  );
};
export default ExpenseOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: '#0080FF',
  },

  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
