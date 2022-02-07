const INITIAL_STATE = { currencies: {},
  expenses: [],
  isFetching: false,
  editData: { id: 0, exchangeRates: { USD: '' }, isUpdating: false } };

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_API':
    return { ...state, isFetching: true };
  case 'EDIT':
    return { ...state, editData: action.value };
  case 'CURRENCIES':
    return { ...state, currencies: action.value, isFetching: false };
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.value], isFetching: false };
  case 'REMOVE':
    return { ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.index),
      editData: { ...state.editData, isUpdating: false },
    };
  default:
    return state;
  }
}

export default wallet;
