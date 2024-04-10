import {isEscapeKey} from './util.js';
import {ALERT_SHOW_TIME} from './settings.js';

const showSuccessAlert = () => {
  const successTemplate = document.querySelector('#success').content;
  const successElement = successTemplate.cloneNode(true);
  document.body.append(successElement);
  const successMessage = document.querySelector('.success');
  const successInner = document.querySelector('.success__inner');
  document.querySelector('.success__button').addEventListener('click', onMessageRemove);
  document.addEventListener('keydown', onEventsClose);
  document.addEventListener('click', onEventsClose);
  function onMessageRemove () {
    successMessage.remove();
  }
  function onEventsClose (evt) {
    if (isEscapeKey(evt) || !successInner.contains(evt.target)) {
      onMessageRemove();
    }
  }
};

const showErrorAlert = () => {
  const errorTemplate = document.querySelector('#error').content;
  const errorElement = errorTemplate.cloneNode(true);
  document.body.append(errorElement);
  const errorMessage = document.querySelector('.error');
  const errorInner = document.querySelector('.error__inner');
  document.querySelector('.error__button').addEventListener('click', onMessageRemove);
  document.addEventListener('keydown', onEventsClose);
  document.addEventListener('click', onEventsClose);
  function onMessageRemove () {
    errorMessage.remove();
  }
  function onEventsClose (evt) {
    if (isEscapeKey(evt) || !errorInner.contains(evt.target)) {
      onMessageRemove();
    }
  }
};

const showDataError = () => {
  const dataErrorTemplate = document.querySelector('#data-error').content;
  const dataErrorElement = dataErrorTemplate.cloneNode(true);
  document.body.append(dataErrorElement);
  const dataErrorMessage = document.querySelector('.data-error');
  setTimeout(() => {
    dataErrorMessage.remove();
  }, ALERT_SHOW_TIME);
};

export {showSuccessAlert, showErrorAlert, showDataError};
