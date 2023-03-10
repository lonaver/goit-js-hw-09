const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let idInterval = null;
btnStopEl.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const changeColor = () => {
  bodyEl.style.backgroundColor = getRandomHexColor();
};

const handleClickStart = e => {
  e.target.disabled = true;
  btnStopEl.disabled = false;

  idInterval = setInterval(changeColor, 1000);
};

const handleClickStop = () => {
  btnStartEl.disabled = false;
  btnStopEl.disabled = true;

  clearInterval(idInterval);
};

btnStartEl.addEventListener('click', handleClickStart);
btnStopEl.addEventListener('click', handleClickStop);
