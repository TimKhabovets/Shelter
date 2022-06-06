import pets from '../../asssets/pets.js';
const BODY = document.querySelector('body');
const ICON_BUTER = document.querySelector('.icon_butter');
const NAVIGATION_BLOCK = document.querySelector('.navigation');
const MENU_BLOCK = document.querySelector('.nav-board');
const PETS_CARDS_BLOCK = document.querySelector('.pets-cards');
const BTN_LEFT = document.querySelector('.button_arrow.defaut');
const BTN_LEFT320 = document.querySelector('.button_arrow.adaptive');
const BTN_RIGHT = document.querySelector('.button_arrow.forward');
let slideList = [];

shufflePets(3);

function petsCards(randomPats) {
  const innerPetsCards = document.createElement('div');
  innerPetsCards.classList.add('pets-cards-inner');
  randomPats.forEach((pet) => {
    const petsCard = document.createElement('div');
    petsCard.classList.add('pets-card');
    petsCard.id = pet.id;
    const petsImg = document.createElement('div');
    petsImg.classList.add('pets-img', `${pet.name.toLowerCase()}`);
    const petsName = document.createElement('p');
    petsName.classList.add('pets-name');
    petsName.innerText = pet.name;
    const BTN_LearnMore = document.createElement('button');
    BTN_LearnMore.classList.add('button_secondary', 'text-button');
    BTN_LearnMore.innerText = 'Learn more';
    petsCard.append(petsImg, petsName, BTN_LearnMore);
    innerPetsCards.append(petsCard);
  });
  PETS_CARDS_BLOCK.append(innerPetsCards);
  addListener();
}

function newPetsCards(randomPats, status) {
  const INNER_CARDS = document.querySelector('.pets-cards-inner');
  const newPetsCards = document.createElement('div');
  randomPats.forEach((pet) => {
    const petsCard = document.createElement('div');
    petsCard.classList.add('pets-card');
    petsCard.id = pet.id;
    const petsImg = document.createElement('div');
    petsImg.classList.add('pets-img', `${pet.name.toLowerCase()}`);
    const petsName = document.createElement('p');
    petsName.classList.add('pets-name');
    petsName.innerText = pet.name;
    const BTN_LearnMore = document.createElement('button');
    BTN_LearnMore.classList.add('button_secondary', 'text-button');
    BTN_LearnMore.innerText = 'Learn more';
    petsCard.append(petsImg, petsName, BTN_LearnMore);
    newPetsCards.append(petsCard);
  });
  INNER_CARDS.classList.add(`transition-${status}`);
  newPetsCards.classList.add('pets-cards-inner', `transition-${status}`);
  if (status === 'left') {
    PETS_CARDS_BLOCK.append(newPetsCards);
  } else {
    PETS_CARDS_BLOCK.classList.add('pets-cards-right');
    PETS_CARDS_BLOCK.prepend(newPetsCards);
  }
  INNER_CARDS.addEventListener('animationend', function () {
    INNER_CARDS.remove();
    newPetsCards.classList.remove(`transition-${status}`);
    PETS_CARDS_BLOCK.classList.remove('pets-cards-right');
    BTN_LEFT.addEventListener('click', moveLeft);
    BTN_LEFT320.addEventListener('click', moveLeft);
    BTN_RIGHT.addEventListener('click', moveRight);
  });

  addListener();
}

function modalWindow(pet) {
  BODY.classList.toggle('hiden_body');
  const modalBlock = document.createElement('div');
  modalBlock.classList.add('modal');
  const modalWindow = document.createElement('div');
  modalWindow.classList.add('modal-window');
  const petsImg = document.createElement('div');
  petsImg.classList.add('modal-img', `${pet.name.toLowerCase()}`);
  const petsInfoModal = document.createElement('div');
  petsInfoModal.classList.add('modal-content');
  const namePet = document.createElement('h3');
  namePet.classList.add('name-pet');
  namePet.innerText = pet.name;
  const classPet = document.createElement('h4');
  classPet.classList.add('class-pet');
  classPet.innerText = `${pet.type} - ${pet.breed}`;
  const aboutPet = document.createElement('h5');
  aboutPet.classList.add('about-pet');
  aboutPet.innerText = pet.description;
  const infoPet = document.createElement('ul');
  infoPet.classList.add('info-pet');
  const infoPetAge = document.createElement('li');
  infoPetAge.innerHTML = `<span style='font-weight: bold'>Age:</span> ${pet.age}`;
  const infoPetInoculation = document.createElement('li');
  infoPetInoculation.innerHTML = `<span style='font-weight: bold'>Inoculations:</span> ${pet.inoculations}`;
  const infoPetDiseases = document.createElement('li');
  infoPetDiseases.innerHTML = `<span style='font-weight: bold'>Diseases:</span> ${pet.diseases}`;
  const infoPetParasites = document.createElement('li');
  infoPetParasites.innerHTML = `<span style='font-weight: bold'>Parasites:</span> ${pet.parasites}`;
  infoPetAge.classList.add('circle');
  infoPetInoculation.classList.add('circle');
  infoPetDiseases.classList.add('circle');
  infoPetParasites.classList.add('circle');
  const BTN_Close = document.createElement('div');
  BTN_Close.classList.add('button_close');
  infoPet.append(
    infoPetAge,
    infoPetInoculation,
    infoPetDiseases,
    infoPetParasites
  );
  petsInfoModal.append(namePet, classPet, aboutPet, infoPet);
  modalWindow.append(petsImg, petsInfoModal, BTN_Close);
  modalBlock.append(modalWindow);
  BODY.append(modalBlock);
  const MODAL_WINDOW = document.querySelector('.modal');
  const BTN_CLOSE = document.querySelector('.button_close');
  BTN_CLOSE.addEventListener('click', (event) => {
    BODY.classList.toggle('hiden_body');
    MODAL_WINDOW.remove();
  });
  MODAL_WINDOW.addEventListener('click', (event) => {
    const cheakClick = event.target;
    if (cheakClick === MODAL_WINDOW) {
      BODY.classList.toggle('hiden_body');
      MODAL_WINDOW.remove();
    }
  });
}

ICON_BUTER.addEventListener('click', () => {
  ICON_BUTER.classList.toggle('active_burger');
  NAVIGATION_BLOCK.classList.toggle('navigation_active');
  MENU_BLOCK.classList.toggle('nav-board_active');
  BODY.classList.toggle('hiden_body');
});

NAVIGATION_BLOCK.addEventListener('click', (event) => {
  const cheakClick = event.target;
  if (cheakClick === NAVIGATION_BLOCK) {
    ICON_BUTER.classList.toggle('active_burger');
    NAVIGATION_BLOCK.classList.toggle('navigation_active');
    MENU_BLOCK.classList.toggle('nav-board_active');
    BODY.classList.toggle('hiden_body');
  }
});

MENU_BLOCK.addEventListener('click', (event) => {
  if (event.target.classList[0] === 'nav-link-hover') {
    ICON_BUTER.classList.toggle('active_burger');
    NAVIGATION_BLOCK.classList.toggle('navigation_active');
    MENU_BLOCK.classList.toggle('nav-board_active');
    BODY.classList.toggle('hiden_body');
  }
});

const moveLeft = () => {
  BTN_RIGHT.removeEventListener('click', moveRight);
  BTN_LEFT.removeEventListener('click', moveLeft);
  BTN_LEFT320.removeEventListener('click', moveLeft);
  randomPositionPets('left');
};
const moveRight = () => {
  BTN_RIGHT.removeEventListener('click', moveRight);
  BTN_LEFT.removeEventListener('click', moveLeft);
  BTN_LEFT320.removeEventListener('click', moveLeft);
  randomPositionPets('right');
};

BTN_LEFT320.addEventListener('click', moveLeft);
BTN_LEFT.addEventListener('click', moveLeft);
BTN_RIGHT.addEventListener('click', moveRight);

function shufflePets(count) {
  while (slideList.length < count) {
    let item = pets[Math.floor(Math.random() * 8)];
    if (!slideList.includes(item)) slideList.push(item);
  }
  petsCards(slideList);
}

function addListener() {
  const PETS_CARDS = document.querySelectorAll('.pets-card');
  PETS_CARDS.forEach((card) => {
    card.addEventListener('click', (event) => {
      const getId = event.currentTarget.id;
      modalWindow(pets[getId]);
    });
  });
}

function randomPositionPets(status) {
  let nextSlideList = [];
  while (nextSlideList.length < slideList.length) {
    let item = pets[Math.floor(Math.random() * 8)];
    if (!slideList.includes(item) && !nextSlideList.includes(item))
      nextSlideList.push(item);
  }
  slideList = nextSlideList;
  newPetsCards(nextSlideList, status);
}
