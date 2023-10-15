import Notiflix from 'notiflix';
Notiflix.Notify.init();
const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(event.target);

  const firstDelay = Number(formData.get('delay'));
  const step = Number(formData.get('step'));
  const amount = Number(formData.get('amount'));

  for (let i = 0; i < amount; i++) {
    const currentDelay = firstDelay + step * i;

    createPromise(i + 1, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }

  form.reset(); 
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
