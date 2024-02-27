/**Функция для проверки длины строки
 * @param {string} string - строка для проверки
 * @param {integer} maxLength - максимальная длина строки
 * @return {boolean} - истина, если длина строки в нужном диапазоне
 */
const checkStringLength = (string, maxLength) => {
  return string.length <= maxLength;
};

checkStringLength('проверяемая строка', 20); // true
checkStringLength('проверяемая строка', 18); // true
checkStringLength('проверяемая строка', 10); // false

