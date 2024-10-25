    async function cards() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts')
            const data = await response.json()
            renderCards(data)
        } catch (error) {
            console.log(error)
        }
    }

    function renderCards(data) {
        const container = document.getElementById('cards-container')
        const imageUrl = 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/flat-white-3402c4f.jpg'
        const limitedData = data.slice(0, 6);

        container.innerHTML =  limitedData.map(item => `
            <div class="card">
                <h2>${item.title}</h2>
                <div class="cardImg">
                <img src="${imageUrl}" alt="Image">
                <h4>${item.body}</h4>
                </div>
            </div>
        `).join('')
    }

    cards()
