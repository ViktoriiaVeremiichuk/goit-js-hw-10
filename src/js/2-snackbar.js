import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const createButton = document.querySelector('.create-button');

const inputFulfilled = document.querySelector('.input-fulfilled');
const inputRejected = document.querySelector('.input-rejected');
const inputDelay = document.querySelector('.delay');

createButton.addEventListener ('click',(event)=>{
    event.preventDefault();
    const msQuantity = Number(document.querySelector('.delay').value);
    const userChoice = inputFulfilled.checked;
    const promise = new Promise ((resolve, reject) => {
        setTimeout(() => {
    if (userChoice) {
        resolve(msQuantity);}
    else {reject(msQuantity);}
    }, msQuantity);
    });

inputDelay.value = '';
inputFulfilled.checked = false;
if (inputRejected)inputRejected.checked = false;

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



