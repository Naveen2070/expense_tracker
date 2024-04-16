import { FlatList } from 'react-native';
import ExpenseItem from './ExpenseItem';

const renderItem = (itemData) => {
  return (
    <>
      <ExpenseItem {...itemData.item} />
    </>
  );
};

function ExpenseList({ expenses }) {
  return (
    <>
      <FlatList
        data={expenses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
}
export default ExpenseList;
