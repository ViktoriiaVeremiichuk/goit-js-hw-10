import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const createButton = document.querySelector('.create-button');
const inputDelay = document.querySelector('.delay');

createButton.addEventListener ('click',(event)=>{
    event.preventDefault();
    const selectedRadioBut = document.querySelector('input[name="state"]:checked');

    const msQuantity = Number(inputDelay.value);
    const promise = new Promise ((resolve, reject) => {
        setTimeout(() => {
    if (selectedRadioBut.value === 'fulfilled') {
        resolve(msQuantity);}
    else {reject(msQuantity);}
    }, msQuantity);
    });

inputDelay.value = '';
selectedRadioBut.checked = false;

promise
  .then(delay => {iziToast.success({
                title: '',
                message: `Fulfilled promise in ${delay}ms`,
                position: 'topRight',
                timeout: '2000',});
    }) 
  .catch(delay => {iziToast.error({
                title: '❌',
                message: `Rejected promise in ${delay}ms`,
                position: 'topRight',
                timeout: '2000',});
    });
});