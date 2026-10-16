import test from 'node:test';
import assert from 'node:assert/strict';
import { convertCurrency, calculateTotal, filterExpensesByCategory } from '../src/utils.js';

const mockRates = {
  USD: 1,
  EUR: 0.9,
  KES: 130
};

test('convertCurrency calculates correct conversion', () => {
  const result = convertCurrency(100, mockRates.USD, mockRates.EUR);
  assert.ok(Math.abs(result - 90) < 0.0001);
});

test('convertCurrency handles missing or invalid rates gracefully', () => {
  assert.equal(convertCurrency(100, null, 0.9), 0);
  assert.equal(convertCurrency(100, 1, 0), 0);
});

test('calculateTotal sums expenses correctly in home currency', () => {
  const expenses = [
    { amount: 100, currency: 'USD' },
    { amount: 90, currency: 'EUR' }
  ];

  const totalInUSD = calculateTotal(expenses, mockRates, 'USD');
  assert.ok(Math.abs(totalInUSD - 200) < 0.0001);
});

test('calculateTotal handles empty expenses list', () => {
  assert.equal(calculateTotal([], mockRates, 'USD'), 0);
});

test('filterExpensesByCategory filters correctly by category', () => {
  const expenses = [
    { id: '1', category: 'Food' },
    { id: '2', category: 'Transport' },
    { id: '3', category: 'Food' }
  ];

  const foodOnly = filterExpensesByCategory(expenses, 'Food');
  assert.equal(foodOnly.length, 2);

  const allExpenses = filterExpensesByCategory(expenses, 'All');
  assert.equal(allExpenses.length, 3);
});