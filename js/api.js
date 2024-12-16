// Función para manejar las predicciones
function handlePrediction(event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    // Obtener la información de la predicción
    const pilot = document.querySelector('select').value;
    const position = document.querySelector('input').value;

    document.querySelector('select').value = "Lewis Hamilton";
    document.querySelector('input').value = "";

    // Guardar la predicción usando Web Storage
    savePrediction(pilot, position);

    // Emitir un sonido de confirmación con Web Audio
    //playConfirmationSound();

    // Mostrar las predicciones almacenadas
    displayPredictions();
}

// Función para guardar las predicciones en Web Storage
function savePrediction(pilot, position) {
    let predictions = JSON.parse(localStorage.getItem('predictions')) || [];
    predictions.push({ pilot, position });
    localStorage.setItem('predictions', JSON.stringify(predictions));
}

// Función para mostrar las predicciones almacenadas
function displayPredictions() {
    const predictions = JSON.parse(localStorage.getItem('predictions')) || [];
    const predictionsList = document.querySelector('ul');
    predictionsList.innerHTML = ''; // Limpiar la lista actual

    // Verificar si hay predicciones almacenadas
    if (predictions.length === 0) {
        const noPredictionsMessage = document.createElement('li');
        noPredictionsMessage.textContent = 'No hay predicciones todavía.';
        predictionsList.appendChild(noPredictionsMessage);
        return;
    }
    console.log(predictions);
    // Mostrar las predicciones
    predictions.forEach(prediction => {
        const listItem = document.createElement('li');
        listItem.textContent = `${prediction.pilot} predijo que terminaría en la posición ${prediction.position}`;
        predictionsList.appendChild(listItem);
    });
}

// Función para reproducir el sonido de confirmación
function playConfirmationSound() {
    const audio = new Audio('https://freesound.org/people/Geoff-Bremner-Audio/sounds/751867/');
    audio.play();
}

// Cargar las predicciones cuando se abre la página
document.addEventListener('DOMContentLoaded', function() {
    displayPredictions();
});

// Agregar el evento de envío al formulario
document.querySelector('form').addEventListener('submit', handlePrediction);
localStorage.clear();