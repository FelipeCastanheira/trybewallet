export const addExpense = (value) => ({ type: 'ADD_EXPENSE', value });
export const login = (value) => ({ type: 'LOGIN', value });
export const getCurrencies = (value) => ({ type: 'CURRENCIES', value });
export const requestAPI = () => ({ type: 'REQUEST_API' });
export const removeAction = (index) => ({ type: 'REMOVE', index });

export function fetchAPI(expense) {
  return async (dispatch) => {
    try {
      dispatch(requestAPI());
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      if (expense) {
        dispatch(addExpense(expense));
      } else {
        dispatch(getCurrencies(data));
      }
    } catch (error) {
      console.error(error);
    }
  };
}
