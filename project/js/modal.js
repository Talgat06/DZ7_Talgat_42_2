    // MODAl

    const modal = document.querySelector('.modal')
    const modalTrigger = document.querySelector('#btn-get')
    const closeItem = document.querySelector('.modal_close')

    const openModal = () => {
        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
    }

    const closeModal = () => {
        modal.style.display = 'none'
        document.body.style.overflow = ''
    }

    modalTrigger.onclick = () => openModal()
    closeItem.onclick = () => closeModal()
    modal.onclick = (event) => {
        if (event.target === modal) {
            closeModal()
        }
    }

    const userScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetWidth) {
            openModal()
            window.removeEventListener('scroll', userScroll)
        }
    }
    setTimeout(openModal, 10000)

    window.addEventListener('scroll', userScroll)

    // POST DATA

    const form = document.querySelector('form')
    const chat_id = '@talgatino06'
    const token = '7433441326:AAHXJX51_7r25E4AvlbkwqQtuaER48vnPps'
    const api_url = `https://api.telegram.org/bot${token}/sendMessage`

    form.onsubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(form)
        const user = {}
        formData.forEach((item, index) => {
            user[index] = item
        })
        const {name, phone} = user
        const text = `Имя: ${name}\nНомер: ${phone}`

        await fetch(api_url, {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({chat_id: chat_id, text})
        })
    }
