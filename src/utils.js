export function convertCurrency(amount, fromRate, toRate) {
    if (amount === undefined || amount === null || !fromRate || !toRate || fromRate <= 0 || toRate <= 0) {
        return 0;
    }
    return (amount / fromRate) * toRate;
}

export function calculateTotal(expenses, rates, homeCurrency) {
    if (!expenses || expenses.length === 0 || !rates || !homeCurrency) {
        return 0;
    }

    return expenses.reduce((total, expense) => {
        const fromRate = rates[expense.currency] || 1;
        const toRate = rates[homeCurrency] || 1;
        const convertedAmount = convertCurrency(expense.amount, fromRate, toRate);
        return total + convertedAmount;
    }, 0);
}

export function filterExpensesByCategory(expenses, category) {
  if (!expenses) return [];
  if (!category || category === 'All') {
    return expenses;
  }
  return expenses.filter(expense => expense.category === category);
}

