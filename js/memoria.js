class Memoria{

    cards = [{
        "team":"Alpine",
        "url" : "../multimedia/imágenes/Alpine_F1_Team_2021_Logo.svg"
        
    }]

    constructor(){
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
    }

    shuffleElements() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    unflipCards(){
        
        this.lockBoard = true;
        setTimeout(() => {
            this.firstCard.dataset.state = "";
            this.secondCard.dataset.state = "";
            this.resetBoard();
        }, 1000);
    }

    resetBoard(){
        this.firstCard = null;
        this.secondCard = null;
        this.hasFlippedCard = false;
        this.lockBoard = false;
    }

    checkForMatch(){
        this.firstCard == this.secondCard ? this.disableCards() : this.unflipCards()
    }

    disableCards() {
        this.firstCard.dataset.state = "revealed";
        this.secondCard.dataset.state = "revealed";
        this.resetBoard();
    }
    addEventListeners() {
        document.querySelectorAll(".card").forEach(card => {
            card.addEventListener("click", this.flipCard.bind(card, this));
        });
    }

    createElements() {
        const tablero = document.getElementById("tablero");
        this.cards.forEach(({ element, source }) => {
            const cardEl = document.createElement("article");
            cardEl.classList.add("card");
            cardEl.dataset.element = element;
    
            const header = document.createElement("h3");
            header.textContent = "Tarjeta de memoria";
            
            const img = document.createElement("img");
            img.src = source;
            img.alt = element;
    
            card.appendChild(header);
            card.appendChild(img);
            tablero.appendChild(card);
        });
    }

}



