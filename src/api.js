const BASE_URL = 'https://open.er-api.com/v6/latest';

export async function fetchExchangeRates(baseCurrency = 'USD') {
  try {
    const response = await fetch(`${BASE_URL}/${baseCurrency}`);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    if (data.result !== 'success') {
      throw new Error('API reported an unsuccessful response');
    }
    return data.rates;
  } catch (error) {
    throw new Error(`Failed to fetch exchange rates: ${error.message}`);
  }
}