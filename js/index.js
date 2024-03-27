// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minWeightInput = document.querySelector('.minweight__input');
const maxWeightInput = document.querySelector('.maxweight__input');


let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

const display = () => {
  fruitsList.innerHTML = '';
  for (let i = 0; i < fruits.length; i++) {
    let fruitLi = document.createElement('li');
    fruitLi.className = "fruit_item";
    let fruitDiv = document.createElement('div');
    fruitDiv.className = "fruit_info"
    fruitDiv.insertAdjacentHTML('beforeend', `<div>index: ${i}</div>`);
  
    fruitLi.appendChild(fruitDiv);
    fruitsList.appendChild(fruitLi);

    let fruitKind = document.createElement('div'); 
    let fruitKindText = document.createTextNode("kind: " + fruits[i].kind);
    fruitKind.appendChild(fruitKindText);
    fruitDiv.appendChild(fruitKind);

    let fruitColor = document.createElement('div'); 
    let fruitColorText = document.createTextNode("color: " + fruits[i].color);
    fruitColor.appendChild(fruitColorText);
    fruitDiv.appendChild(fruitColor);

    let fruitWeight = document.createElement('div'); 
    let fruitWeightText = document.createTextNode("weight (кг): " + fruits[i].weight);
    fruitWeight.appendChild(fruitWeightText);
    fruitDiv.appendChild(fruitWeight);

    switch (fruits[i].color) {
      case 'фиолетовый':
        fruitLi.className = `fruit__item fruit_violet`;
        break;
      case 'зеленый':
        fruitLi.className = `fruit__item fruit_green`;
        break;
      case 'розово-красный':
        fruitLi.className = `fruit__item fruit_carmazin`;
        break;
      case 'желтый':
        fruitLi.className = `fruit__item fruit_yellow`;
        break;
      case 'светло-коричневый':
        fruitLi.className = `fruit__item fruit_lightbrown`;
        break;
    }
  };
};

display();

/*** ПЕРЕМЕШИВАНИЕ ***/

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleFruits = () => {
  let result = [];
  while (fruits.length > 0) {
    let index = getRandomInt(0, fruits.length - 1);
    result.push(fruits[index]);
    fruits.splice(index, 1);
  }

  if (result == fruits) {
    alert ('Порядок фруктов не изменился');
  } else {
    fruits = result;
  }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

const filterFruits = () => {
  if (minWeightInput.value && maxWeightInput.value) {
    let filteredArray = fruits.filter((item) => 
    minWeightInput.value <= item.weight && item.weight <= maxWeightInput.value)
    fruits = filteredArray
  } else if (minWeightInput.value == '' || maxWeightInput.value == '') {
    alert ("Пожалуйста, проверьте корректность указанных диапазонов фильтрации")
  } 
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort';
let sortTime = '-';

const comparationColor = (a, b) => {
  const priority = ['красный','розовый','оранжевый','желтый','зеленый','голубой','синий','фиолетовый','коричневый','черный','серый','белый','светлый','темный']
  const priority1 = priority.findIndex(elem => elem.includes(a.color.slice(0,3)));
  console.log(a.color, typeof a.color)
  const priority2 = priority.findIndex(elem => elem.includes(b.color.slice(0,3)));
  console.log(b.color, typeof b.color)
  return priority1 > priority2;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    for (let i = 0, l = arr.length, k = l - 1; i < k; i++) {
      let indexMin = i;
      for (let j = i + 1; j < l; j++) {
        if (comparation(arr[indexMin], arr[j])) {
          indexMin = j;
        }
      }
      if (indexMin !== i) {
        [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
      }
    }
    return arr;
  },
  
  quickSort(arr, comparation) {
    function swap(items, firstIndex, secondIndex){
      const temp = items[firstIndex];
      items[firstIndex] = items[secondIndex];
      items[secondIndex] = temp;

    function partition(items, left, right) {
        var pivot = items[Math.floor((right + left) / 2)],
            i = left,
            j = right;
        while (i <= j) {
            while (items[i] < pivot) {
                i++;
            }
            while (items[j] > pivot) {
                j--;
            }
            if (i <= j) {
                swap(items, i, j);
                i++;
                j--;
            }
        }
        return i;
     }
   }
   function quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;
        index = partition(items, left, right);
        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }
        if (index < right) {
            quickSort(items, index, right);
        }
    }
    }
    quickSort(arr);
  },

  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  sortKind = sortKind === 'bubbleSort' ? 'quickSort' : 'bubbleSort';
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});
