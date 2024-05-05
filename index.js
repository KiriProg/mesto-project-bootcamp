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

// Функция создания карточки
function createCard(name, link) {
    const placeCard = document.createElement('li');
    const cardDeleteIcon = document.createElement('button');
    const cardName = document.createElement('h2');
    const cardLikeIcon = document.createElement('button');
    const cardInfo = document.createElement('div');
    const cardImageContainer = document.createElement('div');
    const placesList = document.querySelector('.places');

    const popupImage = document.querySelector('.popup-image');
    const popupImageClose = document.querySelector('.popup-image__close');
    const popupImageImage = document.querySelector('.popup-image__image');
    const popupImageText = document.querySelector('.popup-image__text');

    cardName.textContent = name;
    placeCard.setAttribute('style', `background-image: url(${link}); background-size: cover`);

    placeCard.classList.add('place');
    cardDeleteIcon.classList.add('place__delete-button');
    cardName.classList.add('place__title');
    cardLikeIcon.classList.add('place__like');
    cardInfo.classList.add('place__info');
    cardImageContainer.classList.add('place__image-container');

    cardInfo.appendChild(cardName);
    cardInfo.appendChild(cardLikeIcon);

    placeCard.appendChild(cardDeleteIcon);
    placeCard.appendChild(cardImageContainer);
    placeCard.appendChild(cardInfo);
    placesList.prepend(placeCard);

    cardDeleteIcon.addEventListener('click', delHandler);
    cardLikeIcon.addEventListener('click', likeHandler);

    cardImageContainer.addEventListener('click', () => {
        popupImage.classList.add('popup_opened');
        popupImageImage.src = link;
        popupImageText.textContent = name;
    });
    popupImage.addEventListener('click', () => {
        popupImage.classList.remove('popup_opened');
    })
    popupImageClose.addEventListener('click', () => {
        popupImage.classList.remove('popup_opened');
    })

}

function addCard() {

    for (let i = 0; i < initialCards.length; i++) {
        const data = initialCards[i];
        const name = data.name;
        const link = data.link;
        createCard(name, link);
    }
}

addCard();

const popupAdd = document.querySelector('.popup-add');
const profileAddButton = document.querySelector('.profile__add-button');

function addClassToPopup() {
    popupAdd.classList.add('popup_opened');
}

const popupClose = document.querySelector('.popup__close-icon');

function deleteClassFromPopup() {
    popupAdd.classList.remove('popup_opened');
    form.name.value = '';
    form.link.value = '';
}


let form = document.forms.new;
function addCustomUserCard(event) {

    let name = form.name.value;
    let link = form.link.value;
    createCard(name, link);
    event.preventDefault();
    deleteClassFromPopup();
}


const popupEdit = document.querySelector('.popup-edit');
const userInfoEdit = document.querySelector('.profile__edit-button');

function addClassToPopupEdit() {
    popupEdit.classList.add('popup_opened');
}

const popupEditClose = document.querySelector('.popup-edit__close');
function deleteClassFromPopupEdit() {
    popupEdit.classList.remove('popup_opened');
}


let infoName = document.querySelector('.profile__nickname').textContent;
let infoJob = document.querySelector('.profile__additional-information').textContent;
const nameProfile = document.forms.profile.elements.name;
const aboutProfile = document.forms.profile.elements.about;

nameProfile.value = infoName;
aboutProfile.value = infoJob;

const popupEditButton = document.querySelector('.popup-edit__form-button');

popupEditButton.addEventListener('click', function(event) {
    const userName = document.querySelector('.profile__nickname');
    const userJob = document.querySelector('.profile__additional-information');
    userName.textContent = nameProfile.value;
    userJob.textContent = aboutProfile.value;

    event.preventDefault();
    deleteClassFromPopupEdit();
});

function likeHandler(event) {
    event.target.classList.toggle('place__like_active');
    event.stopPropagation();
}

function delHandler(event) {
    const placesList = document.querySelector('.places');
    placesList.removeChild(event.target.parentNode);
    event.stopPropagation();
}

profileAddButton.addEventListener('click', addClassToPopup);
userInfoEdit.addEventListener('click', addClassToPopupEdit);
popupClose.addEventListener('click', deleteClassFromPopup);
popupEditClose.addEventListener('click', deleteClassFromPopupEdit);
form.addEventListener('submit',addCustomUserCard);
