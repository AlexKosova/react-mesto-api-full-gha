export const editButton = document.querySelector(".profile__edit-button");
export const newPostButton = document.querySelector('.profile__add-button');
export const editPopup = document.querySelector("#editProfileForm");
export const editForm = document.forms.editProfile;
export const newPostPopup = document.querySelector('#newPostPopup');
export const newPostForm = document.forms.newPost;
export const cards = document.querySelector('.elements');
export const userName = document.querySelector(".profile__name");
export const nameInput = editForm.elements.userNameInput;
export const userJob = document.querySelector(".profile__description");
export const jobInput = editForm.elements.userJobInput;
export const postTitleInput = newPostForm.elements.postTitleInput;
export const postLinkInput = newPostForm.elements.postLinkInput;
export const imagePopup = document.querySelector('#photo-popup');
export const imagePopupPhoto = document.querySelector('.photo-popup__image');
export const imagePopupTitle = document.querySelector('.photo-popup__title');
export const popups = document.querySelectorAll('.popup')
export const config = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  errorClass: 'popup__input_type_error',
};
export const editPhotoForm = document.forms.editPhotoForm;
export const photoInput = editPhotoForm.elements.photoLinkInput;
export const editPhotoButton = document.querySelector('.profile__photo-edit-button');
export const profilePhotoPopup = document.querySelector('#editPhoto');
export const confirmPopup = document.querySelector('#confirmDeletion');