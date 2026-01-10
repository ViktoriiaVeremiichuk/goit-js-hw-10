import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
const selectedDate = selectedDates[0];
const now = new Date();
if (selectedDate <= now){
  iziToast.error({
    title: 'Error',
    message: 'Please choose a date in the future',
    position: 'topRight',
    timeout: '2000',
  });  
  startButton.disabled = true;}
else {userSelectedDate = selectedDate;
     startButton.disabled = false;}
  },
};

const startButton = document.querySelector('[data-start]');
const inputData = document.querySelector('#datetime-picker');

startButton.disabled = true;
flatpickr(inputData, options);



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

function addLeadingZero(value) {return String(value).padStart(2,'0')}


startButton.addEventListener('click', ()=>{
  startButton.disabled = true;
  inputData.disabled = true;
const interval = setInterval(()=>{
  const differenceMs = userSelectedDate - new Date();
   
if (differenceMs <= 0) {
  clearInterval(interval);
  inputData.disabled = false;
  startButton.disabled = true;
  return;
}
else {const { days, hours, minutes, seconds } = convertMs(differenceMs);
document.querySelector('[data-days]').textContent = addLeadingZero(days);
document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}}, 1000)
});