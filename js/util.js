/**
 * Функция для генерации случайного числа
 * @param {integer} min - Нижняя граница диапазона
 * @param {integer} max - Верхняя граница диапазона
 * @returns {integer} - Случайное число из диапозона
 */
function getRandomInteger(min,max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

export {getRandomInteger};
