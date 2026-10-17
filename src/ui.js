import { convertCurrency, calculateTotal, filterExpensesByCategory } from './utils.js';

export function render(state, onRemove) {
  renderStatus(state);
  renderExpenses(state, onRemove);
  renderTotal(state);
}

function renderStatus(state) {
  const statusEl = document.getElementById('status-message');
  if (!statusEl) return;

  if (state.loading) {
    statusEl.textContent = 'Fetching latest exchange rates...';
    statusEl.className = 'status-message loading';
  } else if (state.error) {
    statusEl.textContent = state.error;
    statusEl.className = 'status-message error';
  } else {
    statusEl.className = 'status-message hidden';
  }
}

function renderExpenses(state, onRemove) {
  const listEl = document.getElementById('expense-list');
  if (!listEl) return;

  listEl.innerHTML = '';

  const filtered = filterExpensesByCategory(state.expenses, state.selectedCategory);

  filtered.forEach(expense => {
    const li = document.createElement('li');
    li.className = 'expense-item';

    const fromRate = state.rates[expense.currency] || 1;
    const toRate = state.rates[state.homeCurrency] || 1;
    const converted = convertCurrency(expense.amount, fromRate, toRate);

    li.innerHTML = `
      <div class="expense-info">
        <h3>${expense.description}</h3>
        <p>${expense.category}</p>
      </div>
      <div class="expense-amount">
        <div class="converted-val">${converted.toFixed(2)} ${state.homeCurrency}</div>
        <div class="original-val">(${expense.amount.toFixed(2)} ${expense.currency})</div>
      </div>
      <button class="delete-btn" data-id="${expense.id}">Delete</button>
    `;

    li.querySelector('.delete-btn').addEventListener('click', () => {
      onRemove(expense.id);
    });

    listEl.appendChild(li);
  });
}

function renderTotal(state) {
  const totalEl = document.getElementById('total-amount');
  if (!totalEl) return;

  const total = calculateTotal(state.expenses, state.rates, state.homeCurrency);
  totalEl.textContent = `${total.toFixed(2)} ${state.homeCurrency}`;
}
