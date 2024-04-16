import { StyleSheet, Text, View } from 'react-native';

function ExpenseSummary({ period, expenses }) {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.period}>{period}</Text>
        <Text style={styles.sum}>₹{expensesSum.toFixed(2)}</Text>
      </View>
    </>
  );
}
export default ExpenseSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#0008FF',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  period: {
    fontSize: 12,
    color: '#00FFEE',
  },

  sum: {
    fontSize: 16,
    color: '#00FFEE',
    fontWeight: 'bold',
  },
});
