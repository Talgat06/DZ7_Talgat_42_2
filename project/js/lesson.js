// PHONE CHECKER

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'NOT OK'
        phoneResult.style.color = 'red'
    }
}

// TAB SLIDER

const tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabItems = document.querySelectorAll('.tab_content_item')
const tabParent = document.querySelector('.tab_content_items')

let currentIndex = 0;
let interval;

const hideTabContent = () => {
    tabContentBlocks.forEach((item) => {
        item.style.display = 'none'
    })
    tabItems.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'block'
    tabItems[index].classList.add('tab_content_item_active')
}

const startSlide = () => {
    interval = setInterval(() => {
        hideTabContent()
        currentIndex++
        if (currentIndex >= tabContentBlocks.length) {
            currentIndex = 0
        }
        showTabContent(currentIndex)
    }, 3000)
}

const stopSlide = () => {
    clearInterval(interval)
}

hideTabContent()
showTabContent()

    tabParent.onclick = (event) => {
        if (event.target.classList.contains('tab_content_item')) {
            tabItems.forEach((item, index) => {
                if (event.target === item) {
                    hideTabContent()
                    showTabContent(index)
                    currentIndex = index
                    stopSlide()
                    startSlide()
                }
            })
        }
    }

    startSlide()

// CONVERTER

    const usdInput = document.querySelector('#usd')
    const somInput = document.querySelector('#som')
    const eurInput = document.querySelector('#eur')

const converter = (element, targetElement) => {
    element.oninput = async () => {
        try {
            const response = await fetch('../data/converter.json', {
                method: 'GET',
                headers: { 'Content-type': 'application/json' }
            })

            const data = await response.json()

            if (element.id === 'som') {
                targetElement.usd.value = (element.value / data.usd).toFixed(2);
                targetElement.eur.value = (element.value / data.eur).toFixed(2);
            }
            if (element.id === 'usd') {
                targetElement.som.value = (element.value * data.usd).toFixed(2);
                targetElement.eur.value = (element.value * (data.usd / data.eur)).toFixed(2);
            }
            if (element.id === 'eur') {
                targetElement.som.value = (element.value * data.eur).toFixed(2);
                targetElement.usd.value = (element.value * (data.eur / data.usd)).toFixed(2);
            }
            if (element.value === '') {
                targetElement.usd.value = '';
                targetElement.som.value = '';
                targetElement.eur.value = '';
            }
        } catch (error) {
            console.log(error)
        }
    }
}

converter(somInput, { usd: usdInput, eur: eurInput });
converter(usdInput, { som: somInput, eur: eurInput });
converter(eurInput, { som: somInput, usd: usdInput });

// DRY - don`t repeat yourself - не повторяй самого себя
// KISS - keep it super stupid - делай очень проще

// CARD SWITCHER

    const card = document.querySelector('.card')
    const prevButton = document.querySelector('#btn-prev')
    const nextButton = document.querySelector('#btn-next')

    let cardId = 1
    let MaxCardId = 200

    async function load() {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${cardId}`,{
                method: 'GET',
                headers: { 'Content-type': 'application/json' }
            });
            const data = await response.json();
            const { id, title, completed } = data;

            card.innerHTML = `
                <p>${title}</p>
                <p>${completed}</p>
                <span>${id}</span>
            `;
        } catch (error) {
            console.log(error)
        }
    }

    nextButton.onclick = () => {
        cardId++;
        if (cardId > MaxCardId) {
            cardId = 1;
        }
        load(cardId);
    };

    prevButton.onclick = () => {
        cardId--;
        if (cardId < 1) {
            cardId = MaxCardId;
        }
        load(cardId);
    };
    load(cardId);

    const url = 'https://jsonplaceholder.typicode.com/posts'
    const getPosts = async () => {
        try {
            const response = await fetch(url)
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    getPosts()

//WEATHER
// query params - настройки запроса


    const searchInput = document.querySelector('.cityName')
    const city = document.querySelector('.city')
    const temp = document.querySelector('.temp')

    const API_KEY = 'e417df62e04d3b1b111abeab19cea714'
    const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'

    searchInput.oninput = async () => {
        try {
            const response = await fetch(`${BASE_URL}?q=${searchInput.value}&appid=${API_KEY}&units=metric`)
            const data = await response.json()
            city.innerHTML = data.name || 'Город не найден'
            temp.innerHTML = data.main?.temp ? Math.round(data.main?.temp) + '&deg;C' :'Температура не определена'
        } catch (error) {
            console.log(error)
        }
    }

// Optional chaining - Опциональная цепочка

