const numObject = 25;
const minLikes = 15;
const maxLikes = 200;
const description = ['Красиво!', 'Однозначно лайк', 'Что это было?'];
const message = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.'
];
const userName = ['Артем', 'Вика', 'Мария'];

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

/**
 * Функция для генерации идентификатора для id и url
 * @returns {integer} - Сгенерированный случайный идентификатор
 */
function getRandomId() {
  let RandomId = 0;
  return function () {
    RandomId += 1;
    return RandomId;
  };
}
const getId = getRandomId();
const getPhoto = getRandomId();


/**
 * Функция для генерации объекта
 * @return {object} - Сгенерированный случайный объект
 */
function createObject() {
  return ({
    id: getId(),
    url: `photos/${getPhoto()}.jpg`,
    description: description[getRandomInteger(0, description.length - 1)],
    likes:getRandomInteger(minLikes,maxLikes),
    comments: {
      id: getRandomInteger(0,1000),
      avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
      message: message[getRandomInteger(0,message.length - 1)],
      name: userName[getRandomInteger(0,userName.length - 1)]
    }
  });
}
