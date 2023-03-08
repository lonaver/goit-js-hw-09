import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('form');
const inputDelayEl = document.querySelector('input[name="delay"]');
const inputStepEl = document.querySelector('input[name="step"]');
const inputAmountEl = document.querySelector('input[name="amount"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        // console.log('resolve', position, delay);
        resolve({ position, delay });
      } else {
        // console.log('reject', position, delay);
        reject({ position, delay });
      }
    }, delay);
  });
}

const handleSubmitPromise = e => {
  e.preventDefault();
  const numberOfPromise = Number(inputAmountEl.value);
  let delay = Number(inputDelayEl.value);
  const stepPromise = Number(inputStepEl.value);

  for (let position = 0; position < numberOfPromise; position++) {
    createPromise(position, delay)
      .then(({ position, delay }) =>
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
    delay += stepPromise;
  }
};

formEl.addEventListener('submit', handleSubmitPromise);
