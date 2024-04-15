import {isEscapeKey} from './util.js';
import {ALERT_SHOW_TIME} from './settings.js';

const showSuccessAlert = () => {
  const successTemplate = document.querySelector('#success').content;
  const successElement = successTemplate.cloneNode(true);
  document.body.append(successElement);
  const successMessage = document.querySelector('.success');
  const successInner = document.querySelector('.success__inner');
  document.querySelector('.success__button').addEventListener('click', onMessageRemove);
  document.body.addEventListener('keydown', onEventsClose);
  document.body.addEventListener('click', onEventsClose);
  function onMessageRemove () {
    successMessage.remove();
    document.body.removeEventListener('keydown', onEventsClose);
  }
  function onEventsClose (evt) {
    if (isEscapeKey(evt) || !successInner.contains(evt.target)) {
      onMessageRemove();
    }
  }
  document.body.addEventListener('click', (evt) => {
    if (evt.target !== successInner && !successInner.contains(evt.target)) {
      removeMessageHandler();
    }
  });
};

const showErrorAlert = () => {
  const errorTemplate = document.querySelector('#error').content;
  const errorElement = errorTemplate.cloneNode(true);
  document.body.append(errorElement);
  const errorMessage = document.querySelector('.error');
  const errorInner = document.querySelector('.error__inner');
  document.querySelector('.error__button').addEventListener('click', onMessageRemove);
  document.body.addEventListener('keydown', onEventsClose);
  document.body.addEventListener('click', onEventsClose);
  function onMessageRemove () {
    errorMessage.remove();
    document.body.removeEventListener('keydown', onEventsClose);
  }
  function onEventsClose (evt) {
    document.body.addEventListener('click', (evt) => {
      if (isEscapeKey(evt) || !errorInner.contains(evt.target)) {
        onMessageRemove();
      }
    });
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
