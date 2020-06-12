class Codes {
  constructor(id, code) {
    this.id = id;
    this.code = code;
  }
}

const codeInput = document.getElementById('code');
const img = document.getElementById('safeImg');
const checkBtn = document.getElementById('checkBtn');

let codes = loadFromStorage('codeData') ? loadFromStorage('codeData') : [];
let idNumber = loadFromStorage('codeId') ? loadFromStorage('codeId') : 0;

//limit input to 4 digits
function checkNumberFieldLength(elem) {
  if (elem.value.length > 4) {
    elem.value = elem.value.slice(0, 4);
  }
}

checkBtn.addEventListener('click', () => {
  const addError = document.getElementById('addError');

  if (codeInput.value == '') {
    alert('Please try some code! The time is running!');
  } else {
    idNumber++;
    const code = new Codes(idNumber, codeInput.value);
    codes.push(code);
    saveInStorage();
  }

  if (codeInput.value == '1234') {
    let newBtn = document.createElement('button');
    let putBtn = document.getElementById('butBtnHere');
    newBtn.classList = 'ui primary button';
    newBtn.innerText = 'Play Again';

    addError.classList = 'ui input';
    checkBtn.remove();
    putBtn.appendChild(newBtn);
    newBtn.addEventListener('click', () => {
      location.reload();
    });
    img.setAttribute('src', 'img/ok.jpg');
    document.getElementById('message').innerText = 'WELL DONE!';
  } else {
    addError.classList = 'ui input error';
  }
});

const saveInStorage = () => {
  localStorage.setItem('codeId', idNumber);
  localStorage.setItem('codeData', JSON.stringify(codes));
};

function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

//Show the previous codes

function showCodes() {
  const result = document.getElementById('result');
  //table
  const table = document.createElement('table');
  const tr1 = document.createElement('tr');
  table.classList = 'ui celled table';
  //thead
  const thead = document.createElement('thead');
  const th1 = document.createElement('th');
  const th2 = document.createElement('th');
  th1.innerText = 'Number';
  th2.innerText = 'Combination';

  //tbody

  for (let i = 0; i < codes.length; i++) {
    const tbody = document.createElement('tbody');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const tr2 = document.createElement('tr');
    td1.innerText = codes[i].id;
    td2.innerText = codes[i].code;
    tr1.appendChild(th1);
    tr1.appendChild(th2);
    thead.appendChild(tr1);
    tr2.appendChild(td1);
    tr2.appendChild(td2);
    tbody.appendChild(tr2);
    table.appendChild(thead);
    table.appendChild(tbody);
    result.appendChild(table);
  }
  document.getElementById('showBtn').remove();
  let deleteTable = document.createElement('button');
  deleteTable.classList = 'ui button';
  deleteTable.innerText = 'Hide table';
  document.getElementById('butBtnHere2').appendChild(deleteTable);

  deleteTable.addEventListener('click', () => {
    deleteTable.remove();
    document.getElementById('result').innerHTML = '';
    let showCodeBtn = document.createElement('button');
    showCodeBtn.innerText = 'Show previous cases';
    showCodeBtn.setAttribute('id', 'showBtn');
    showCodeBtn.setAttribute('onclick', 'showCodes()');
    showCodeBtn.classList = 'ui button';
    document.getElementById('butBtnHere2').appendChild(showCodeBtn);
  });
}

function deleteAll() {
  let msg = prompt(`Are you sure? write 'yes'`);
  if (msg == 'yes') {
    window.localStorage.clear();
    location.reload();
    alert('Data was stored successfully!');
  } else {
    alert('No action was taken!');
  }
}

//add timer
// checkBtn.addEventListener('click', countDown(10));
function countDown(sec) {
  let element = document.getElementById('timer');

  element.innerHTML = sec;

  sec--;
  let timer = setTimeout('countDown(' + sec + ')', 1000);
  if (sec < 8) {
    element.style.color = 'red';
  }
  if (sec < 1) {
    clearTimeout(timer);
    element.innerHTML = 'Time out! Try again';
    let newBtn = document.createElement('button');
    let putBtn = document.getElementById('butBtnHere');
    newBtn.classList = 'ui primary button';
    newBtn.innerText = 'Play Again';
    codeInput.classList = 'ui disabled input';

    addError.classList = 'ui input';
    checkBtn.remove();
    putBtn.appendChild(newBtn);
    newBtn.addEventListener('click', () => {
      location.reload();
    });
  }
  if (sec < 20) {
    checkBtn.removeAttribute('onclick', 'setTimeout(countDown(20), 1000)');
  }

  checkBtn.addEventListener('click', () => {
    if (codeInput.value == '1234') {
      clearTimeout(timer);
      element.innerHTML = `You cracked the code in ${20 - sec} seconds!`;
    }
    if (codeInput.value == '') {
      alert('Please try some code! The time is running!');
      element.innerHTML = 'Press check to start the timer';
    }
  });
}
