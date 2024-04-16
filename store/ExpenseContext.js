import { createContext, useReducer } from 'react';

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expense) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const ExpenseReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];

    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;

    case 'UPDATE':
      const updateIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const ExpenseUpdatable = state[updateIndex];
      const updateItem = { ...ExpenseUpdatable, ...action.payload.data };
      const updatedExpense = [...state];
      updatedExpense[updateIndex] = updateItem;
      return updatedExpense;

    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);

    default:
      return state;
  }
};

const ExpenseContextProvider = ({ children }) => {
  const [expenseState, dispatch] = useReducer(ExpenseReducer, []);

  const addExpense = (expenseData) => {
    dispatch({ type: 'ADD', payload: expenseData });
  };

  const setExpenses = (expenses) => {
    dispatch({ type: 'SET', payload: expenses });
  };

  const deleteExpense = (id) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  };

  const value = {
    expenses: expenseState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export default ExpenseContextProvider;
