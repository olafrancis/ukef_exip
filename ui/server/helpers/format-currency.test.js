const formatCurrency = require('./format-currency');

describe('sever/helpers/format-currency', () => {
  it('shouild return a formatted currency', () => {
    const mock = 123456;
    const currencyCode = 'GBP';

    const result = formatCurrency(mock, currencyCode);

    const expected = mock.toLocaleString('en', {
      style: 'currency',
      currency: currencyCode,
    });

    expect(result).toEqual(expected);
  });
});