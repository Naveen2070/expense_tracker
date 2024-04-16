import { useContext, useLayoutEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from '../components/ui/Icon';

import { ExpenseContext } from '../store/ExpenseContext';
import ExpressForm from '../components/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../utils/request';
import LoadingOverlay from '../components/ui/loading';
import ErrorOverlay from '../components/ui/Error';

const Manage = ({ route, navigation }) => {
  const expenseCTX = useContext(ExpenseContext);

  const editId = route.params?.ExpenseID;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const SelectedExpense = expenseCTX.expenses.find(
    (expense) => expense.id === editId
  );

  const isEditing = !!editId;

  async function handleDelete() {
    setLoading(true);
    try {
      await deleteExpense(editId);
      expenseCTX.deleteExpense(editId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete -- Try again later');
      setLoading(false);
    }
  }

  const handleCancel = () => {
    navigation.goBack();
  };

  async function handleConfirm(expenseData) {
    setLoading(true);
    try {
      if (isEditing) {
        expenseCTX.updateExpense(editId, expenseData);
        await updateExpense(editId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expenseCTX.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not save data -- Try again later');
      setLoading(false);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  if (error && !loading) {
    return <ErrorOverlay msg={error} />;
  }

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <View style={styles.container}>
        <ExpressForm
          submitLabel={isEditing ? 'Update' : 'Add'}
          handleCancel={handleCancel}
          isEditing={isEditing}
          onSubmit={handleConfirm}
          editValue={SelectedExpense}
        />

        {isEditing && (
          <View style={styles.deleteButton}>
            <IconButton
              icon="trash"
              color="#000000"
              size={36}
              onPress={handleDelete}
            />
          </View>
        )}
      </View>
    </>
  );
};
export default Manage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#0080FF',
  },
  deleteButton: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: '#0004FF',
    alignItems: 'center',
  },
});
