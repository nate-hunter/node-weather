// const address = '!';
// const url = `http://localhost:3000/weather?address=${address}`;
// const url = `http://localhost:3000/weather?address=`;

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const msgOne = document.querySelector('#msg-1');
const msgTwo = document.querySelector('#msg-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    msgOne.innerHTML = 'Loading...';
    msgTwo.innerHTML = '';

    fetch(`/weather?address=${location}`)
        .then(resp => resp.json())
        .then(data => {
            if(data.error) msgOne.innerHTML = data.error;
            else {
                msgOne.innerHTML = `<h3>${location.toUpperCase()}</h3>`
                msgTwo.innerHTML = data.weatherMsg;
            }
        });
});

