import { StyleSheet } from 'react-native';
import ExpenseOutput from '../components/output/expenseOut';
import { useContext, useEffect, useState } from 'react';
import { ExpenseContext } from '../store/ExpenseContext';
import { getFilterDate } from '../utils/date';
import { fetchExpense } from '../utils/request';
import LoadingOverlay from '../components/ui/loading';
import ErrorOverlay from '../components/ui/Error';

const Recent = () => {
  const expenseCTX = useContext(ExpenseContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function getExpense() {
      setLoading(true);
      try {
        const expenses = await fetchExpense();
        expenseCTX.setExpenses(expenses);
      } catch (error) {
        setError('Could not Fetch');
      }
      setLoading(false);
    }
    getExpense();
  }, []);

  if (error && !loading) {
    return <ErrorOverlay msg={error} />;
  }

  if (loading) {
    return <LoadingOverlay />;
  }

  const RecentExpense = expenseCTX.expenses.filter((expense) => {
    const today = new Date();
    const RecentData = getFilterDate(today, 7);
    return expense.date >= RecentData && expense.date <= today;
  });

  return (
    <>
      <ExpenseOutput
        expenses={RecentExpense}
        period="Recent"
        fallBackText="No recent expense"
      />
    </>
  );
};
export default Recent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
