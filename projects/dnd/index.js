/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

function randomNumber(min = 0, max = 100) {
  return Math.round((max - min) * Math.random()) + min;
}

const homeworkContainer = document.querySelector('#app');
homeworkContainer.style.position = 'relative';

let shiftX, shiftY;
let currentDrag;

document.addEventListener('mousemove', e => {
  if (currentDrag) {
    currentDrag.style.top = e.clientY - shiftY + 'px';
    currentDrag.style.left = e.clientX - shiftX + 'px';
  }
});

export function createDiv() {
  let div = document.createElement('div');
  div.style.height = randomNumber(20, 300) + 'px';
  div.style.width = randomNumber(20, 300) + 'px';
  div.style.backgroundColor = '#' + randomNumber(0, 0xffffff).toString(16);
  div.style.top = randomNumber(0, window.innerHeight) + 'px';
  div.style.left = randomNumber(0, window.innerWidth) + 'px';
  div.classList.add('draggable-div');

  div.addEventListener('mouseup', e => {
    currentDrag = null;
  });
  
  div.addEventListener('mousedown', e => {
    //console.log(e);
    currentDrag = e.target;
    shiftX = e.offsetX;
    shiftY = e.offsetY;
  });
  return div;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const newDiv = createDiv();
  homeworkContainer.appendChild(newDiv);
});
