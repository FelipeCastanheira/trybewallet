const INITIAL_STATE = { currencies: {},
  expenses: [],
  isFetching: false,
  editor: false,
  idToEdit: 0,
  currencyToExchange: '' };

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_API':
    return { ...state, isFetching: true };
  case 'EDIT':
    return { ...state,
      editor: true,
      idToEdit: action.id,
      currencyToExchange: action.curr };
  case 'CURRENCIES':
    return { ...state, currencies: action.value, isFetching: false };
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.value], isFetching: false };
  case 'REMOVE':
    return { ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.index),
      editor: false,
    };
  default:
    return state;
  }
}

export default wallet;
