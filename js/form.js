import {isEscapeKey} from './util.js';
import {MAX_HASHTAGS, REGEX, MAX_COMMENT_LENGTH} from './settings.js';
import {onScaleChange} from './photo-scaling.js';
import {onEffectSelect, sliderContainer, uploadedImage} from './slider.js';
import {sendData} from './api.js';
import {showSuccessAlert, showErrorAlert} from './alerts.js';
import {onFileUpload, uploadedImageInput} from './upload-photo.js';
import {body} from './popup.js';

const uploadForm = document.querySelector('.img-upload__form');
const overlay = uploadForm.querySelector('.img-upload__overlay');
const overlayCloseButton = overlay.querySelector('.img-upload__cancel');
const hashtagInput = overlay.querySelector('.text__hashtags');
const imageDescriptionInput = overlay.querySelector('.text__description');
const zoomOutPhoto = overlay.querySelector('.scale__control--smaller');
const zoomPhoto = overlay.querySelector('.scale__control--bigger');
const effectsRadio = overlay.querySelector('.effects__list');
const submitButton = overlay.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const toggleSubmitButtonSettings = {
  block: {isDisabled: false, buttonText: 'Опубликовать'},
  unblock: {isDisabled: true, buttonText: 'Отправляю данные на сервер...'}
};

const toggleSubmitButton = (isBlock) => {
  submitButton.disabled = isBlock.isDisabled;
  submitButton.textContent = isBlock.buttonText;
};

const onEventEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onFormHide();
  }
};

const onFormOpen = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEventEscKeydown);
  zoomOutPhoto.addEventListener('click', onScaleChange);
  zoomPhoto.addEventListener('click', onScaleChange);
  effectsRadio.addEventListener('change', onEffectSelect);
  uploadedImageInput.addEventListener('change', onFileUpload);
};

function onFormHide () {
  pristine.reset();
  uploadForm.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadedImage.removeAttribute('style');
  sliderContainer.classList.add('hidden');
  document.removeEventListener('keydown', onEventEscKeydown);
  zoomOutPhoto.removeEventListener('click', onScaleChange);
  zoomPhoto.removeEventListener('click', onScaleChange);
  effectsRadio.removeEventListener('change', onEffectSelect);
}

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    toggleSubmitButton(toggleSubmitButtonSettings.unblock);
    sendData(new FormData(evt.target))
      .then(() => {
        onFormHide();
        showSuccessAlert();
      })
      .catch((err) => {
        showErrorAlert(err.message);
      })
      .finally(toggleSubmitButton);
  }
};

const validateHashtag = (hashtag) => REGEX.test(hashtag);

const convertHashtagsString = (string) => {
  const newString = string.trim();
  const hashtags = newString.split(' ');
  return hashtags;
};

const isEveryHashtagValid = (hashtagsString) => {
  const hashtags = convertHashtagsString(hashtagsString);
  if (!hashtags[0]) {
    return true;
  }
  const validHashtags = hashtags.every((hashtag) => validateHashtag(hashtag));
  return validHashtags;
};

const isHashtagsUnique = (hashtagsString) => {
  const hashtags = convertHashtagsString(hashtagsString);
  const lowerHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  const seenHashtag = new Set();
  for (let i = 0; i < lowerHashtags.length; i++) {
    const currentHashtag = lowerHashtags[i];
    if (seenHashtag.has(currentHashtag)) {
      return false;
    }
    seenHashtag.add(currentHashtag);
  }
  return true;
};

const isHashtagsArrayLengthValid = (hashtagsString) => {
  const hashtags = convertHashtagsString(hashtagsString);
  return hashtags.length <= MAX_HASHTAGS;
};

const isCommentValid = (comment) => comment.length <= MAX_COMMENT_LENGTH;

const initValidation = () => {
  sliderContainer.classList.add('hidden');
  uploadForm.addEventListener('submit', onFormSubmit);
  uploadedImageInput.addEventListener('change', onFileUpload);
  overlayCloseButton.addEventListener('click', onFormHide);
  imageDescriptionInput.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
  hashtagInput.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });
  uploadedImageInput.addEventListener('change', onFormOpen);
  pristine.addValidator(hashtagInput, isEveryHashtagValid, 'Неверная структура хэштега. Хэштег начинается с символа #. строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д. Максимальная длина одного хэштега 20 символов, включая решётку.');
  pristine.addValidator(hashtagInput, isHashtagsUnique, 'Каждый хэштег дожен быть уникальным.');
  pristine.addValidator(hashtagInput, isHashtagsArrayLengthValid, 'Превышен лимит указанных хэштегов. Можно указать не более 5 хэштегов.');
  pristine.addValidator(imageDescriptionInput, isCommentValid, 'Превышена длина комментария. Максимальная длина комментария 140 символов.');
};

export {initValidation};
