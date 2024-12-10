class Memoria {
    elements = [
        {
            "id": "1",
            "element": "Alpine",
            "source": "../multimedia/imágenes/Alpine_F1_Team_2021_Logo.svg"
        }, {
            "id": "2",
            "element": "Alpine",
            "source": "../multimedia/imágenes/Alpine_F1_Team_2021_Logo.svg"
        }, {
            "id": "3",
            "element": "AstonMartin",
            "source": "../multimedia/imágenes/Aston_Martin_Aramco_Cognizant_F1.svg"
        }, {
            "id": "4",
            "element": "AstonMartin",
            "source": "../multimedia/imágenes/Aston_Martin_Aramco_Cognizant_F1.svg"
        }, {
            "id": "5",
            "element": "RedBull",
            "source": "../multimedia/imágenes/Red_Bull_Racing_logo.svg"
        }, {
            "id": "6",
            "element": "RedBull",
            "source": "../multimedia/imágenes/Red_Bull_Racing_logo.svg"
        }, {
            "id": "7",
            "element": "McLaren",
            "source": "../multimedia/imágenes/McLaren_Racing_logo.svg"
        }, {
            "id": "8",
            "element": "McLaren",
            "source": "../multimedia/imágenes/McLaren_Racing_logo.svg"
        }, {
            "id": "9",
            "element": "Mercedes",
            "source": "../multimedia/imágenes/Mercedes_AMG_Petronas_F1_Logo.svg"
        }, {
            "id": "10",
            "element": "Mercedes",
            "source": "../multimedia/imágenes/Mercedes_AMG_Petronas_F1_Logo.svg"
        }, {
            "id": "11",
            "element": "Ferrari",
            "source": "../multimedia/imágenes/Scuderia_Ferrari_Logo.svg"
        }, {
            "id": "12",
            "element": "Ferrari",
            "source": "../multimedia/imágenes/Scuderia_Ferrari_Logo.svg"
        }
    ];

    constructor() {
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;

        this.shuffleElements();
        this.createElements();
        this.addEventListeners();
    }

    shuffleElements() {
        for (let i = this.elements.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.elements[i], this.elements[j]] = [this.elements[j], this.elements[i]];
        }
    }

    unflipCards() {
        this.lockBoard = true;
        setTimeout(() => {
            this.firstCard.setAttribute('data-state', '');
            this.secondCard.setAttribute('data-state', '')
            this.resetBoard();
        }, 1500);
    }

    resetBoard() {
        this.firstCard = null;
        this.secondCard = null;
        this.lockBoard = false;
    }

    checkForMatch() {
        this.firstCard.getAttribute('data-element') == this.secondCard.getAttribute('data-element') ? this.disableCrads() : this.unflipCards()
    }

    disableCrads() {
        console.log("Match: ", this.firstCard, this.secondCard);
        this.firstCard.setAttribute('data-state', 'revealed');
        this.secondCard.setAttribute('data-state', 'revealed');
        this.firstCard = null;
        this.secondCard = null;
        this.resetBoard();
    }

    createElements() {
        const container = document.querySelector('section');

        this.elements.forEach(({ element, source }) => {
            const article = document.createElement('article');
            article.setAttribute('data-element', element);
            const heading = document.createElement('h3');
            heading.textContent = 'Tarjeta de memoria';
            const image = document.createElement('img');
            image.setAttribute('src', source);
            image.setAttribute('alt', element);
            article.appendChild(heading);
            article.appendChild(image);
            container.appendChild(article);
        })
    }

    addEventListeners() {
        let cards = document.querySelectorAll('article');
        cards.forEach(card => {
            card.onclick = this.flipCard.bind(card, this);
        })
    }

    flipCard(gameInstance) {
        if (gameInstance.lockBoard) return;
        if (this === gameInstance.firstCard) return;
        if (this.getAttribute('data-state') == 'revealed') return;

        this.setAttribute('data-state', 'flip');

        if (gameInstance.firstCard == null) {
            gameInstance.firstCard = this;
        } else {
            gameInstance.secondCard = this;
            gameInstance.lockBoard = true;
            gameInstance.checkForMatch();
        }
    }


}
let m = new Memoria();
console.log("Antes de barajar:", m.elements.map(e => e.id));
m.shuffleElements();
m.shuffleElements();
m.shuffleElements();
console.log("Después de barajar:", m.elements.map(e => e.id));