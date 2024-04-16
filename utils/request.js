import axios from 'axios';

const url = 'https://expense-tracker-sam-s-default-rtdb.firebaseio.com';

export async function storeExpense(expenseData) {
  const response = await axios.post(url + '/expenses.json', expenseData);
  const id = response.data.name;
  return id;
}

export async function fetchExpense() {
  const response = await axios.get(url + '/expenses.json');

  const expense = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expense.push(expenseObj);
  }
  return expense;
}

export function updateExpense(id, updateData) {
  return axios.put(url + `/expenses/${id}.json`, updateData);
}

export function deleteExpense(id) {
  return axios.delete(url + `/expenses/${id}.json`);
}
