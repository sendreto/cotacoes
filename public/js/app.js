
console.log('javaScript no frontend');

const cotacoesForm = document.querySelector('form')
const mainMessage = document.querySelector('h3')
const price = document.querySelector('#price')
const price_open = document.querySelector('#price_open')
const day_high = document.querySelector('#day_high')
const day_low = document.querySelector('#day_low')

cotacoesForm.addEventListener('submit', (event) => {
    mainMessage.innerHTML = '<a href="https://media.giphy.com/media/swhRkVYLJDrCE/source.gif" </a>'
    event.preventDefault()
    const ativo = document.querySelector('input').value

    if (!ativo) {
        mainMessage.innerText = 'O ativo deve ser informado'
        return;
    }

    fetch(`http://localhost:3000/cotacoes?ativo=${ativo}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                mainMessage.innerHTML = `Informe um ativo válido`
                price.innerText = `${data.error.message} | código ${data.error.code}`
            } else {
                mainMessage.innerText = data.symbol
                price.innerHTML = data.price
                price_open.innerHTML = data.price_open
                day_high.innerHTML = data.day_high
                day_low.innerHTML = data.day_low

            }
        })
    })
})
