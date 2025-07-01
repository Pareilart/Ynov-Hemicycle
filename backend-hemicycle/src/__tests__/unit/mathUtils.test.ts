import { add, multiply, subtract } from '../../utils/mathUtils';

describe('MathUtils', () => {
  describe('add', () => {
    test('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    test('should add positive and negative numbers', () => {
      expect(add(5, -2)).toBe(3);
    });

    test('should add zero', () => {
      expect(add(10, 0)).toBe(10);
    });
  });

  describe('multiply', () => {
    test('should multiply two positive numbers', () => {
      expect(multiply(3, 4)).toBe(12);
    });

    test('should multiply by zero', () => {
      expect(multiply(5, 0)).toBe(0);
    });
  });

  describe('subtract', () => {
    test('should subtract two numbers', () => {
      expect(subtract(10, 3)).toBe(7);
    });

    test('should handle negative result', () => {
      expect(subtract(2, 5)).toBe(-3);
    });
  });
});
