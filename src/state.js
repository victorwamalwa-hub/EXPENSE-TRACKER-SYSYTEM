const state = {
  expenses: [],
  rates: {},
  homeCurrency: 'USD',
  selectedCategory: 'All',
  loading: false,
  error: null
};

export function getState() {
  return state;
}

// Requirement: Using spread operator to immutably add an expense[cite: 3]
export function addExpense(expense) {
  state.expenses = [...state.expenses, expense];
}

export function removeExpense(id) {
  state.expenses = state.expenses.filter(item => item.id !== id);
}

// Requirement: Using spread operator to update state field[cite: 3]
export function updateRates(rates) {
  state.rates = { ...rates };
}

export function setHomeCurrency(currency) {
  state.homeCurrency = currency;
}

export function setSelectedCategory(category) {
  state.selectedCategory = category;
}

export function setLoading(isLoading) {
  state.loading = isLoading;
}

export function setError(errorMsg) {
  state.error = errorMsg;
}