import {addPhotos} from './add-pictures.js';
import {NUMBER_OF_RANDOM_PHOTO} from './settings.js';

const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');

const useDefaultFilter = (images) => {
  addPhotos(images);
};

const useRandomFilter = (images) => {
  const randomImages = images.slice().sort(() => 0.5 - Math.random()).slice(0, NUMBER_OF_RANDOM_PHOTO);
  addPhotos(randomImages);
};

const useDiscussedFilter = (images) => {
  const copiedImages = images.slice().sort((firstImage, secondImage) => secondImage.comments.length - firstImage.comments.length);
  addPhotos(copiedImages);
};


const changeActiveFilterButton = (targetButton) => {
  const activeButton = document.querySelector('.img-filters__button--active');
  if (targetButton !== activeButton) {
    activeButton.classList.remove('img-filters__button--active');
  }
  targetButton.classList.add('img-filters__button--active');
};

const activateDefaultButton = (cb) => {
  defaultFilter.addEventListener('click', (evt) => {
    changeActiveFilterButton(evt.target);
    cb();
  });
};

const activateRandomButton = (cb) => {
  randomFilter.addEventListener('click', (evt) => {
    changeActiveFilterButton(evt.target);
    cb();
  });
};

const activateDiscussedButton = (cb) => {
  discussedFilter.addEventListener('click', (evt) => {
    changeActiveFilterButton(evt.target);
    cb();
  });
};

export {useDefaultFilter, useRandomFilter, useDiscussedFilter, activateDefaultButton, activateRandomButton, activateDiscussedButton};
