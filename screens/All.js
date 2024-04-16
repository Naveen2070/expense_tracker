import { StyleSheet } from 'react-native';
import ExpenseOutput from '../components/output/expenseOut';
import { useContext } from 'react';
import { ExpenseContext } from '../store/ExpenseContext';

const All = () => {
  const expenseCTX = useContext(ExpenseContext);
  return (
    <>
      <ExpenseOutput
        expenses={expenseCTX.expenses}
        period="Total"
        fallBackText="No Expense"
      />
    </>
  );
};
export default All;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
