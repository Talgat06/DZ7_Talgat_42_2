    const gmailInput = document.querySelector('#gmail_input')
    const gmailButton = document.querySelector('#gmail_button')
    const gmailResult = document.querySelector('#gmail_result')

    const regExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    gmailButton.onclick = () => {
        if (regExp.test(gmailInput.value)) {
            gmailResult.innerHTML = 'OK'
            gmailResult.style.color = 'green'
        } else {
            gmailResult.innerHTML = 'NOT OK'
            gmailResult.style.color = 'red'
        }
    }

    const childBlock = document.querySelector(".child_block")
    const parentBlock = document.querySelector('.parent_block')

    const offsetWidth = parentBlock.offsetWidth - childBlock.offsetWidth
    const offsetHeight = parentBlock.offsetHeight = childBlock.offsetHeight

    let positionX = 0;
    let positionY = 0;
    let direction = 'right';

    function move() {
        if (direction === 'right') {
            if (positionX < offsetWidth) {
                positionX++
                childBlock.style.left = `${positionX}px`;
            } else {
                direction = 'down';
            }
        } else if (direction === 'down') {
            if (positionY < offsetWidth) {
                positionY++
                childBlock.style.top = `${positionY}px`;
            } else {
                direction = 'left';
            }
        } else if (direction === 'left') {
            if (positionX > 0) {
                positionX--
                childBlock.style.left = `${positionX}px`;
            } else {
                direction = 'up';
            }
        } else if (direction === 'up') {
            if (positionY > 0) {
                positionY--
                childBlock.style.top = `${positionY}px`;
            } else {
                direction = 'right';
            }
        }
        requestAnimationFrame(move);
    }
    move()

    const startButton = document.querySelector('#start')
    const stopButton = document.querySelector('#stop')
    const resetButton = document.querySelector('#reset')
    const seconds = document.querySelector('#seconds')

    let num = 0;
    let timer = null;

    function counter() {
        seconds.textContent = num;
    }

    startButton.onclick = () => {
        if (timer === null) {
            timer = setInterval(() => {
                num++
                counter()
            },1000)
        }
    }

    stopButton.onclick = () => {
        clearInterval(timer);
        timer = null;
    }

    resetButton.onclick = () => {
        clearInterval(timer);
        timer = null;
        num = 0;
        counter()
    }

    counter();

    const catalog = document.getElementById("cars-container")

    async function cars() {
        try {
            const response = await fetch('../data/cars.json', {
                method: 'GET',
                headers: {'Content-type': 'application/json'}
            })

            const data = await response.json()

            data.map((item) => {
                const card = document.createElement("div")
                card.classList.add('card');
                card.innerHTML = `
                <h4>name :${"   " + item.name}</h4>
                <span>model :${"   " + item.model}</span>
                <img src="${item.cars_photo}" alt="">
            `
                catalog.append(card)
            })
        } catch (error) {
            console.log(error)
        }
    }
    cars()

    const url = '../data/any.json'
    const  posts = async () => {
        try {
            const response = await fetch(url)
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    posts()