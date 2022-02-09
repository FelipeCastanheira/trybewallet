const INITIAL_STATE = { currencies: ['USD',
  'CAD',
  'EUR',
  'GBP',
  'ARS',
  'BTC',
  'LTC',
  'JPY',
  'CHF',
  'AUD',
  'CNY',
  'ILS',
  'ETH',
  'XRP'],
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
    return { ...state, isFetching: false };
  case 'EDIT_EXPENSE':
    return { ...state,
      expenses: [...state.expenses, action.value].sort((a, b) => a.id - b.id) };
  case 'ADD_EXPENSE':
    return { ...state,
      expenses: [...state.expenses,
        { ...action.value, exchangeRates: action.data }].sort((a, b) => a.id - b.id),
      isFetching: false };
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
