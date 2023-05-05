console.log('This is JavaScript')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message_1 = document.querySelector('#message-1')
const message_2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    message_1.textContent = 'Loading'
    message_2.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                message_1.textContent = data.error
            }
            else {
                message_1.textContent = location
                message_2.textContent = "The weather feelslike: " + data.feelslike + ", and the temperature is: " + data.temperature + ", and the humidity is: " + data.humidity + "."
                console.log("The weather feelslike: " + data.feelslike)
                console.log("The temperature is: " + data.temperature)
                console.log("The humidity is : " + data.humidity)
            }
        })
    })
})