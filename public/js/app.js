console.log('Client side Javascript file is loaded')
//grab the input from index.hbs form; returns js presentation of the element
const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


//listens for the submit Event
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchTerm.value                              //prevent default behaviour of refreshing the browser after submit 
    messageOne.textContent = 'LOADING'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {    
        response.json().then((data) => {
            if (data.error) {
               messageOne.textContent = data.error               
            } else { 
               messageOne.textContent = data.location
               messageTwo.textContent = data.weather
            }
        })
    })   
})