import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('form');
const inputDelayEl = document.querySelector('input[name="delay"]');
const inputStepEl = document.querySelector('input[name="step"]');
const inputAmountEl = document.querySelector('input[name="amount"]');
const btnSubmitEl = document.querySelector('button');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
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
  formEl.reset();

  for (let i = 0; i < numberOfPromise; i++) {
    createPromise(i + 1, delay)
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
