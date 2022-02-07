const calculateExpenses = (expensesArray) => {
  const result = expensesArray.reduce((sum, element) => {
    const { value, currency, exchangeRates } = element;
    const exchangeValue = exchangeRates[currency];
    const total = sum + (value * exchangeValue.ask);
    return total;
  }, 0);
  return result.toFixed(2);
};

export default calculateExpenses;
