const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const placesList = document.querySelector('.places');

const closeButtons = document.querySelectorAll('.popup__close-icon');

const popupImage = document.querySelector('.popup-image');
const popupImageImage = document.querySelector('.popup-image__image');
const popupImageText = document.querySelector('.popup-image__text');

const profileAddButton = document.querySelector('.profile__add-button');
const userInfoEdit = document.querySelector('.profile__edit-button');

const popupAdd = document.querySelector('.popup-add');
const formAdd = document.forms.new;

const popupEdit = document.querySelector('.popup-edit');
const popupEditForm = document.forms.profile;

const nameProfile = document.forms.profile.elements.name;
const aboutProfile = document.forms.profile.elements.about;
const userName = document.querySelector('.profile__nickname');
const userJob = document.querySelector('.profile__additional-information');

function getCard(name, link) {
    const template = document.querySelector('#place-template');
    const item = template.content.cloneNode(true);
    item.querySelector('.place__title').textContent = name;
    item.querySelector('.place').setAttribute('style', `background-image: url(${link}); background-size: cover`);
    item.querySelector('.place__like').addEventListener('click', likeHandler);
    item.querySelector('.place__delete-button').addEventListener('click', delHandler);
    item.querySelector('.place__image-container').addEventListener('click', () => {
        imageHandler(name, link);
    });
    return item;
}

function createCard(name, link) {
    const placeCard = getCard(name, link);
    placesList.prepend(placeCard);
}

function addCards() {
    for (let i = 0; i < initialCards.length; i++) {
        const data = initialCards[i];
        const name = data.name;
        const link = data.link;
        createCard(name, link);
    }
}

addCards();

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function addCustomUserCard(event) {
    createCard(formAdd.name.value, formAdd.link.value);
    event.preventDefault();
    closePopup(popupAdd);
}

function openPopup(popup) {
    if (popup === popupEdit) {
        nameProfile.value = userName.textContent;
        aboutProfile.value = userJob.textContent;
    }
    popup.classList.add('popup_opened');
}

popupEditForm.addEventListener('submit', function (event) {
    userName.textContent = nameProfile.value;
    userJob.textContent = aboutProfile.value;

    event.preventDefault();
    closePopup(popupEdit);
});

function likeHandler(event) {
    event.target.classList.toggle('place__like_active');
    event.stopPropagation();
}

function delHandler(event) {
    placesList.removeChild(event.target.closest('.place'));
    event.stopPropagation();
}

function imageHandler(name, link) {
    popupImage.classList.add('popup_opened');
    popupImageImage.src = link;
    popupImageImage.alt = name;
    popupImageText.textContent = name;
}

profileAddButton.addEventListener('click', () => {
    openPopup(popupAdd)
});
userInfoEdit.addEventListener('click', () => {
    openPopup(popupEdit)
});

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

formAdd.addEventListener('submit', addCustomUserCard);