const Calculator = require('../Calculator');

test('should return price before VAT applied', () => {
   const calculator = new Calculator(2, 2);
   expect(calculator.beforeVAT).toBe(0.48);
});

test('should return price after VAT applied', () => {
   const calculator = new Calculator(2, 2);
   expect(calculator.afterVAT).toBe(0.54);
});
