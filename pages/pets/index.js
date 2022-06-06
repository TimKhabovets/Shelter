import pets from '../../asssets/pets.js';
const PETS_CARDS_BLOCK = document.querySelector('.pets-cards');
const BTNS_INACTIVE = document.querySelectorAll('.inactive');
const BTN_LAST = document.querySelector('.button_arrow.forwardend');
const BTN_RIGHT = document.querySelector('.button_arrow.forwardpage');
const BODY = document.querySelector('body');
const ICON_BUTER = document.querySelector('.icon_butter');
const NAVIGATION_BLOCK = document.querySelector('.navigation');
const MENU_BLOCK = document.querySelector('.nav-board');
let pageList = [];

shufflePets(8);

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

function petsCards(randomPats) {
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
    PETS_CARDS_BLOCK.append(petsCard);
  });
  addListener();
}

function pagination(pets, maxPage, status) {
  const numberPage = document.querySelector('.backstart.page');
  if (+numberPage.innerHTML < maxPage && status === 'forward') {
    BTNS_INACTIVE.forEach((btn, index) => {
      if (index === 1) {
        btn.addEventListener('click', backPage);
        btn.classList.add('button_arrow', 'firstpage');
      } else {
        btn.addEventListener('click', firstPage);
        btn.classList.add('button_arrow', 'backpage');
      }
      btn.classList.remove('inactive');
    });
    ++numberPage.innerHTML;
  }
  if (+numberPage.innerHTML >= 2 && status === 'back') {
    if (+numberPage.innerHTML <= maxPage) {
      BTN_LAST.classList.add('button_arrow', 'forwardend');
      BTN_LAST.classList.remove('inactive');
      BTN_RIGHT.classList.add('button_arrow', 'forwardpage');
      BTN_RIGHT.classList.remove('inactive');
      BTN_RIGHT.addEventListener('click', nextPage);
      BTN_LAST.addEventListener('click', lastPage);
    }
    BTNS_INACTIVE.forEach((btn, index) => {
      if (index === 1) {
        btn.addEventListener('click', backPage);
        btn.classList.add('button_arrow', 'firstpage');
      } else {
        btn.addEventListener('click', firstPage);
        btn.classList.add('button_arrow', 'backpage');
      }
      btn.classList.remove('inactive');
    });
    --numberPage.innerHTML;
  }
  if (status === 'last' || +numberPage.innerHTML === maxPage) {
    numberPage.innerHTML = maxPage;
    BTNS_INACTIVE.forEach((btn, index) => {
      if (index === 1) {
        btn.addEventListener('click', backPage);
        btn.classList.add('button_arrow', 'firstpage');
      } else {
        btn.addEventListener('click', firstPage);
        btn.classList.add('button_arrow', 'backpage');
      }
      btn.classList.remove('inactive');
    });
    BTN_LAST.classList.remove('button_arrow', 'forwardend');
    BTN_LAST.classList.add('inactive');
    BTN_RIGHT.classList.remove('button_arrow', 'forwardpage');
    BTN_RIGHT.classList.add('inactive');
    BTN_RIGHT.removeEventListener('click', nextPage);
    BTN_LAST.removeEventListener('click', lastPage);
  }
  if (status === 'first' || +numberPage.innerHTML === 1) {
    numberPage.innerHTML = 1;
    const BTN_FIRST = document.querySelector('.button_arrow.firstpage');
    BTN_FIRST.classList.remove('button_arrow', 'forwardend');
    BTN_FIRST.classList.add('inactive');
    BTN_FIRST.removeEventListener('click', backPage);
    const BTN_BACK = document.querySelector('.button_arrow.backpage');
    BTN_BACK.classList.remove('button_arrow', 'lastpage');
    BTN_BACK.classList.add('inactive');
    BTN_BACK.removeEventListener('click', backPage);
    BTN_LAST.classList.add('button_arrow', 'forwardend');
    BTN_LAST.classList.remove('inactive');
    BTN_RIGHT.classList.add('button_arrow', 'forwardpage');
    BTN_RIGHT.classList.remove('inactive');
    BTN_RIGHT.addEventListener('click', nextPage);
    BTN_LAST.addEventListener('click', lastPage);
  }
  const allCards = document.querySelectorAll('.pets-card');
  allCards.forEach((card) => card.remove());
  pets.forEach((pet) => {
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
    PETS_CARDS_BLOCK.append(petsCard);
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

const lastPage = () => {
  randomPositionPets('last');
};
const nextPage = () => {
  randomPositionPets('forward');
};
const firstPage = () => {
  randomPositionPets('first');
};
const backPage = () => {
  randomPositionPets('back');
};

BTN_LAST.addEventListener('click', lastPage);
BTN_RIGHT.addEventListener('click', nextPage);

function shufflePets(count) {
  while (pageList.length < count) {
    let item = pets[Math.floor(Math.random() * 8)];
    if (!pageList.includes(item)) pageList.push(item);
  }
  petsCards(pageList);
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
  let nextPageList = [];
  let maxCountPage = 0;
  let quantity = 8;
  const screenWidth = window.outerWidth;
  if (screenWidth >= 1280) {
    maxCountPage = 6;
  } else if (screenWidth >= 768 && screenWidth <= 1279) {
    maxCountPage = 8;
  } else if (screenWidth < 768) {
    maxCountPage = 16;
  }
  while (nextPageList.length < quantity) {
    let item = pets[Math.floor(Math.random() * 8)];
    if (pageList.includes(item) !== nextPageList.includes(item))
      nextPageList.push(item);
  }
  pageList = nextPageList;
  pagination(nextPageList, maxCountPage, status);
}
