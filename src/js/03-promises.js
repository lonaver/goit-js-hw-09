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
  let prevDelay = Number(inputDelayEl.value);
  const stepPromise = Number(inputStepEl.value);

  const arrayPromises = [];
  for (let position = 0; position < numberOfPromise; position++) {
    arrayPromises.push({ position, delay: prevDelay });
    prevDelay += stepPromise;
  }
  const promises = arrayPromises.map(({ position, delay }) =>
    createPromise(position, delay)
  );
  // Promise.race(promises)
  //   .then(({ position, delay }) => {
  //     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  //   })
  //   .catch(({ position, delay }) => {
  //     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  //   });
  Promise.all(promises)
    .then(x =>
      Notify.success(`✅ Fulfilled promise ${x.position} in ${x.delay}ms`)
    )
    .catch(x =>
      Notify.failure(`❌ Rejected promise ${x.position} in ${x.delay}ms`)
    );
  // Promise.all(promises)
  //   .then(x => console.log('YESSSS', x))
  //   .catch(x => console.log('NOOOO', x));
  //
};

formEl.addEventListener('submit', handleSubmitPromise);
