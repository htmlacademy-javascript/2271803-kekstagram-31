/**
 * Функция для проверки длины строки
 * @param {string} string - строка для проверки
 * @param {integer} maxLength - максимальная длина строки
 * @returns {boolean} - истина, если длина строки не превышает maxLength
 */
const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength('проверяемая строка', 20); // true
checkStringLength('проверяемая строка', 18); // true
checkStringLength('проверяемая строка', 10); // false

/**
 * Функция для проверки, является ли строка палиндромом
 * @param {string} string - строка для проверки
 * @returns {boolean} - истина, если палиндром
 */
const isPalindrome = (string = '') => {
  string = string.replaceAll(' ', '').toLowerCase();

  let reverseString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reverseString = reverseString + string[i];
  }
  return string === reverseString;
};

isPalindrome();
