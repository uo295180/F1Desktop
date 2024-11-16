class Memoria{
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
    }

    shuffleElements() {
        for (let i = this.elements.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.elements[i], this.elements[j]] = [this.elements[j], this.elements[i]];
        }
    }

    unflipCards(){
        this.lockBoard = true;
        if(this.firstCard == null) this.firstCard = this.article;
        else{ 
            this.secondCard = this.article;
            this.checkForMatch();
        }


        this.resetBoard();
    }

    resetBoard() {
        this.lockBoard = false;
        this.hasFlippedCard = false;
        this.firstCard = null;
        this.secondCard = null; 
    }

    checkForMatch() {
        this.firstCard.getAttribute('data-element') == this.secondCard.getAttribute('data-element') ? this.disableCrads() : this.resetBoard()
    }

    disableCrads() {
        console.log("Match: ", this.firstCard, this.secondCard);
        // Modify the state of the cards
        this.resetBoard();
    }

    createElements() {
        const container = document.querySelector('section');

        this.elements.forEach(({element, source}) => {
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

            article.addEventListener('click', () => {
                console.log("Clicked on: ", article.getAttribute('data-element'));
                article.setAttribute('data-state', 'flip')
                this.unflipCards.bind(article, this);
            })

        })
    }


}
let m = new Memoria();
console.log("Antes de barajar:", m.elements.map(e => e.id));
m.shuffleElements();
m.shuffleElements();
m.shuffleElements();
console.log("Después de barajar:", m.elements.map(e => e.id));