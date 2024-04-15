import {addPhotos, photoList} from './add-pictures.js';
import {onPopupOpen} from './popup.js';
import {initValidation} from './form.js';
import {getData} from './api.js';
import {showDataError} from './alerts.js';
import {useDefaultFilter, useRandomFilter, useDiscussedFilter, activateDefaultButton, activateRandomButton, activateDiscussedButton} from './photo-filters.js';
import {debounce} from './util.js';
import {DEBOUNCE_DELAY} from './settings.js';

getData()
  .then((images) => {
    addPhotos(images);
    activateDefaultButton(debounce(
      () => useDefaultFilter(images),
      DEBOUNCE_DELAY,
    ));
    activateRandomButton(debounce(
      () => useRandomFilter(images),
      DEBOUNCE_DELAY,
    ));
    activateDiscussedButton(debounce(
      () => useDiscussedFilter(images),
      DEBOUNCE_DELAY,
    ));
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    photoList.addEventListener('click', (evt) => {
      onPopupOpen(evt, images);
    });
  })
  .catch(
    (err) => {
      showDataError(err.message);
    }
  );

initValidation();
