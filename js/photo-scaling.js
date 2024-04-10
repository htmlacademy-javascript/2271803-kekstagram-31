import {ScalingSettings} from './settings.js';

const scale = document.querySelector('.scale__control--value');
const photo = document.querySelector('.img-upload__preview img');

const onScaleChange = (evt) => {
  let currentValue = parseInt(scale.value, 10);
  if (evt.target.classList.contains('scale__control--smaller') && currentValue > ScalingSettings.MIN) {
    currentValue = currentValue - ScalingSettings.STEP;
    scale.value = `${currentValue}%`;
    photo.style.transform = `scale(${0.01 * currentValue})`;
  } else if (evt.target.classList.contains('scale__control--bigger') && currentValue < ScalingSettings.MAX) {
    currentValue = currentValue + ScalingSettings.STEP;
    scale.value = `${currentValue}%`;
    photo.style.transform = `scale(${0.01 * currentValue})`;
  }
};

export {onScaleChange};
