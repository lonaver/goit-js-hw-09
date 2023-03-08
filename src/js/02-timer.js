import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateInputEl = document.querySelector('#datetime-picker');
const btnStartEl = document.querySelector('button[data-start]');
const dateDaysEl = document.querySelector('[data-days]');
const dateHoursEl = document.querySelector('[data-hours]');
const dateMinutesEl = document.querySelector('[data-minutes]');
const dateSecondsEl = document.querySelector('[data-seconds]');
let chooseDate = new Date();
let timerMs = 0;
let idInterval = null;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chooseDate = selectedDates[0].getTime();
    const dateNow = Date.now();
    Notiflix.Notify.failure('date now and choose date', dateNow, chooseDate);
    if (chooseDate < dateNow) {
      alert('You have to choose date in future');
      btnStartEl.disabled = true;
      return;
    }

    btnStartEl.disabled = false;
    timerMs = chooseDate - dateNow;
  },
};

flatpickr(dateInputEl, options);

const changeTimer = () => {
  timerMs = chooseDate - Date.now();

  let { days, hours, minutes, seconds } = convertMs(timerMs);

  dateDaysEl.textContent = `${addLeadingZero(days)}`;
  dateHoursEl.textContent = `${addLeadingZero(hours)}`;
  dateMinutesEl.textContent = `${addLeadingZero(minutes)}`;
  dateSecondsEl.textContent = `${addLeadingZero(seconds)}`;
  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    clearInterval(idInterval);
    btnStartEl.disabled = false;
  }
};

const handleClickTimer = () => {
  btnStartEl.disabled = true;

  idInterval = setInterval(changeTimer, 1000);
};

btnStartEl.addEventListener('click', handleClickTimer);
