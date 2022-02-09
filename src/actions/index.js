export const addExpense = (value, data) => ({ type: 'ADD_EXPENSE', value, data });
export const editExpense = (value) => ({ type: 'EDIT_EXPENSE', value });
export const login = (value) => ({ type: 'LOGIN', value });
export const getCurrencies = (value) => ({ type: 'CURRENCIES', value });
export const requestAPI = () => ({ type: 'REQUEST_API' });
export const removeAction = (index) => ({ type: 'REMOVE', index });
export const editAction = (id, curr) => ({ type: 'EDIT', id, curr });

export function fetchAPI(expense) {
  return async (dispatch) => {
    try {
      dispatch(requestAPI());
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      if (expense) {
        dispatch(addExpense(expense, data));
      } else {
        dispatch(getCurrencies(data));
      }
    } catch (error) {
      console.error(error);
    }
  };
}
