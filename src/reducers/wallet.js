const INITIAL_STATE = { currencies: {}, expenses: [], isFetching: false };

const updateLastExpense = (array, value) => {
  array.forEach((element, index) => {
    if (index === (array.length - 1)) element.exchangeRates = value;
  });
  return array;
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_API':
    return { ...state, isFetching: true };
  case 'CURRENCY':
    return { ...state,
      currencies: action.value,
      expenses: updateLastExpense(state.expenses, action.value),
      isFetching: false };
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.value] };
  case 'REMOVE':
    return { ...state,
      expenses: state.expenses.filter((_data, i) => i !== action.index),
    };
  default:
    return state;
  }
}

export default wallet;
