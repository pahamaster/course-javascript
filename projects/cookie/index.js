/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

let cookies;

const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

function isMatching(full, chunk) {
  return !chunk.trim() ? true : full.toLowerCase().includes(chunk.trim().toLowerCase());
}

function getCookies() {
 cookies= document.cookie
    .split('; ')
    .filter(Boolean)
    .map((cookie) => cookie.match(/^([^=]+)=(.+)/))
    .reduce((obj, [, name, value]) => {
      obj[name] = value;
      //obj.set(name, value);
      return obj;
    }, {});
}

function reloadTable() {
  getCookies();
  //listTable.innerHTML = "";
  for (const cookie in cookies)
    updateRow(cookie, cookies[cookie]);
}

function updateRow(name, value) {
  let findRow;
  let isMatch = isMatching(name, filterNameInput.value) || isMatching(value, filterNameInput.value);
  for (const node of listTable.childNodes) {
    if (node?.firstChild?.textContent == name) findRow = node;
  }
  if (findRow === undefined) {
    if (isMatch) addRow(name, value)
  } else {
    if (isMatch)
      findRow.firstChild.nextElementSibling.textContent = value
    else listTable.removeChild(findRow);
  }

}

function addRow(name, value) {
  const row = document.createElement("TR");
  const tdName = document.createElement("TD");
  tdName.textContent=name;
  const tdValue = document.createElement("TD");
  tdValue.textContent=value;
  const but = document.createElement("BUTTON");
  but.textContent = "Удалить";
  row.appendChild(tdName);
  row.appendChild(tdValue);
  row.appendChild(but);
  but.addEventListener('click', e => {
    document.cookie = name+"=; max-age = -1";
    listTable.removeChild(row);
  })
  listTable.appendChild(row);
}


filterNameInput.addEventListener('input', function () {
  reloadTable();
});

addButton.addEventListener('click', () => {
  const name = encodeURIComponent(addNameInput.value.trim());
  const value = encodeURIComponent(addValueInput.value.trim());
  if (name) 
  {
    document.cookie = `${name}=${value}`;
    updateRow(name, value);
    addNameInput.value = '';
    addValueInput.value = '';
  }
});

listTable.addEventListener('click', (e) => {
});

reloadTable();
