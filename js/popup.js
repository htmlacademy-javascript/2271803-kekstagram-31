import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const bigPicturePopup = document.querySelector('.big-picture');
const buttonClosePopup = document.querySelector('.big-picture__cancel');
const commentList = bigPicturePopup.querySelector('.social__comments');
const comment = bigPicturePopup.querySelector('.social__comment');
const commentCount = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');
const сommentsShownCounter = bigPicturePopup.querySelector('.social__comment-shown-count');

const fillComments = (photoComments) => {
  commentList.innerHTML = '';
  photoComments.comments.forEach(({avatar, name, message}) => {
    const newComment = comment.cloneNode(true);
    const picture = newComment.querySelector('.social__picture');
    picture.src = avatar;
    picture.alt = name;
    newComment.querySelector('.social__text').textContent = message;
    commentList.append(newComment);
  });
};

const showCommentCount = () => {
  const hiddenCommentItems = document.querySelectorAll('.social__comment.hidden').length;
  сommentsShownCounter.textContent = commentList.querySelectorAll('.social__comment').length - hiddenCommentItems;
};

const fillPopup = ({url, description, likes, comments}) => {
  const bigImage = bigPicturePopup.querySelector('.big-picture__img').querySelector('img');
  bigImage.src = url;
  bigImage.alt = description;
  bigPicturePopup.querySelector('.social__caption').textContent = description;
  bigPicturePopup.querySelector('.likes-count').textContent = likes;
  bigPicturePopup.querySelector('.social__comment-total-count').textContent = comments.length;
  const commentItems = bigPicturePopup.querySelectorAll('.social__comment');
  for (let i = commentItems.length - 1; i > 4; i--) {
    commentItems[i].classList.add('hidden');
  }
  showCommentCount();
  if (сommentsShownCounter.textContent < 5) {
    commentLoader.classList.add('hidden');
  }
};

const onCommentsLoad = (evt) => {
  evt.preventDefault();
  const hiddenComments = document.querySelectorAll('.social__comment.hidden');
  let hiddenCounter = hiddenComments.length;
  for (let i = 0; i < 5; i++) {
    if (hiddenCounter === 0) {
      commentLoader.classList.add('hidden');
      break;
    } else {
      hiddenCounter--;
      hiddenComments[i].classList.remove('hidden');
    }
  }
  showCommentCount();
};

const onPopupClose = () => {
  bigPicturePopup.classList.add('hidden');
  body.classList.remove('modal-open');
  commentCount.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
  buttonClosePopup.removeEventListener('click', onPopupClose);
  commentLoader.removeEventListener('click', onCommentsLoad);
};

function onPopupEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onPopupClose();
  }
}

const onPopupOpen = (evt, arrayData) => {
  if (evt.target.matches('.picture__img')) {
    evt.preventDefault();
    const object = arrayData.find((item) => item.id === parseInt(evt.target.parentNode.dataset.id, 10));
    fillComments(object);
    fillPopup(object);
    bigPicturePopup.classList.remove('hidden');
    body.classList.add('modal-open');
    buttonClosePopup.addEventListener('click', onPopupClose);
    document.addEventListener('keydown', onPopupEscKeydown);
    commentLoader.addEventListener('click', onCommentsLoad);
  }
};

export {onPopupOpen, body};
