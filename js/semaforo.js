class Semaforo {
    levels = [0.2, 0.5, 0.8];
    lights = 4;
    unload_moment = null;
    clic_moment = null;
    difficulty = 0;
    button2 = undefined

    constructor() {
        this.difficulty = this.levels[this.getRandomInt(3)];
        console.log(this.difficulty);
        this.createStructure();
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    initSequence() {

        const container = document.querySelector('main');
        let p = container.querySelectorAll('p');
        console.log(p);
        if (p.length == 5) container.removeChild(p[4]);
        container.classList.add('load');
        this.button1.disabled = true;

        setTimeout(() => {
            this.unload_moment = Date.now();
            this.endSequence();
        }, 2000 + this.difficulty * 100)

        console.log("Init sequence");
    }

    endSequence() {
        const container = document.querySelector('main');
        this.button2.disabled = false;
        container.classList.add('unload');
    }

    stopReaction() {
        const container = document.querySelector('main');
        container.classList.remove('load');
        container.classList.remove('unload')
        this.clic_moment = Date.now();
        let time = this.clic_moment - this.unload_moment;

        let reactionTime = document.createElement('p');
        reactionTime.textContent = "Reaction time: " + time / 1000 + "s";
        container.appendChild(reactionTime);

        this.button2.disabled = true;
        this.button1.disabled = false;

        this.createRecordForm(this.difficulty, time / 1000);
    }

    createStructure() {
        const container = document.querySelector('main');

        const header = document.createElement('h2');
        header.textContent = 'JUEGO DE REACCION';
        container.appendChild(header);


        for (let i = 0; i < this.lights; i++) {
            const div = document.createElement('div');
            const text = document.createElement('p');
            div.appendChild(text);
            container.appendChild(div);
        }
        this.button1 = document.createElement('button');
        this.button2 = document.createElement('button');

        this.button1.textContent = "Arranque";
        this.button2.textContent = "Reaccion";
        this.button2.disabled = true;
        this.button1.onclick = () => this.initSequence();
        this.button2.onclick = () => this.stopReaction();
        container.appendChild(this.button1);
        container.appendChild(this.button2);

    }

    createRecordForm(difficulty, reactionTime) {
        let formHtml = ` 
            <form id="recordForm" method="POST" action="semaforo.php">
                <label for="name">Nombre:</label>
                <input type="text" id="name" name="name" required><br><br>

                <label for="surname">Apellidos:</label>
                <input type="text" id="surname" name="surname" required><br><br>

                <label for="difficulty">Nivel:</label>
                <input type="text" id="difficulty" name="difficulty" value="${difficulty}" readonly><br><br>

                <label for="reactionTime">Tiempo de reacción (segundos):</label>
                <input type="text" id="reactionTime" name="reactionTime" value="${reactionTime}" readonly><br><br>

                <input type="submit" value="Guardar Récord">
            </form>
        `
        const container = document.querySelector('main');
        container.insertAdjacentHTML('beforeend', formHtml);
    }
}

let semaforo = new Semaforo();

