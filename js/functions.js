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

// Функция, которая проверяет, выходит ли встреча за рамки рабочего дня.
const MINUTES_IN_HOUR = 60;
const convertTimeToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(':'); // Преобразуем строку времени в общее количество минут.
  return hours * MINUTES_IN_HOUR + +minutes;
};
const isMeetingOutsideWorkHours = (workDayStart, workDayEnd, meetingStart, meetingDurationInMinutes) => {
  const workDayStartInMinutes = convertTimeToMinutes(workDayStart); // Получаем время в минутах
  const workDayEndInMinutes = convertTimeToMinutes(workDayEnd);
  const meetingStartInMinutes = convertTimeToMinutes(meetingStart);
  const meetingEndInMinutes = meetingStartInMinutes + meetingDurationInMinutes; // Расчёт времени окончания встречи
  return meetingEndInMinutes <= workDayEndInMinutes && meetingStartInMinutes >= workDayStartInMinutes; // Проверка, в рабочее ли время встреча
};
/*
'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/
isMeetingOutsideWorkHours('08:00', '17:30', '14:00', 90); // true
isMeetingOutsideWorkHours('8:0', '10:0', '8:0', 120); // true
isMeetingOutsideWorkHours('08:00', '14:30', '14:00', 90); // false
isMeetingOutsideWorkHours('14:00', '17:30', '08:0', 90); // false
isMeetingOutsideWorkHours('8:00', '17:30', '08:00', 900); // false
