
function initMap(){
    viajes.initMap();
}


class Viajes {
    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
    }
    getPosicion(posicion) {
        this.mensaje = "Se ha realizado correctamente la petición de geolocalización";
        this.longitud = posicion.coords.longitude;
        this.latitud = posicion.coords.latitude;
        this.precision = posicion.coords.accuracy;
        this.altitud = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo = posicion.coords.heading;
        this.velocidad = posicion.coords.speed;

        this.getMapaEstaticoGoogle();
        //this.initMap();
    }
    verErrores(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                this.mensaje = "El usuario no permite la petición de geolocalización"
                break;
            case error.POSITION_UNAVAILABLE:
                this.mensaje = "Información de geolocalización no disponible"
                break;
            case error.TIMEOUT:
                this.mensaje = "La petición de geolocalización ha caducado"
                break;
            case error.UNKNOWN_ERROR:
                this.mensaje = "Se ha producido un error desconocido"
                break;
        }
    }
    getMapaEstaticoGoogle() {
        $("main").append(`<h2>Mapa Estático</h2>`);
        console.log(this.longitud);
        var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";

        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center=" + this.latitud + "," + this.longitud;
        var zoom = "&zoom=15";
        var tamaño = "&size=800x600";

        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        var sensor = "&sensor=false";

        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        $("main").append(`<img src=${this.imagenMapa} alt='mapa estático google' />`);
    }

    initMap() {
        var centro = { lat: this.latitud, lng: this.longitud };
        $("main").append("<h2>Mapa Dinámico</h2>");
        const section = $("<section></section>");
        section.append($("<div></div>"))
        $("main").append(section);
        var mapaGeoposicionado = new google.maps.Map(document.querySelector('main > section > div'), {
            zoom: 15,
            center: centro
        });
        var marker = new google.maps.Marker({
            position: centro,
            map: mapaGeoposicionado,
        })

    }

    getLongitud() {
        return this.longitud;
    }
    getLatitud() {
        return this.latitud;
    }
    getAltitud() {
        return this.altitud;
    }
}
var viajes = new Viajes();


const slides = document.querySelectorAll("img");

// select next slide button
const nextSlide = document.querySelector("main > article > button:nth-of-type(1)");

// maximum number of slides
let maxSlide = slides.length - 1;
let curSlide = maxSlide;

nextSlide.addEventListener("click", function () {
    if (curSlide === maxSlide) {
        curSlide = 0;
    } else {
        curSlide++;
    }

    slides.forEach((slide, indx) => {
        var trans = 100 * (indx - curSlide);
        $(slide).css('transform', 'translateX(' + trans + '%)')
    });
});

// select next slide button
const prevSlide = document.querySelector("main > article > button:nth-of-type(2)");

// add event listener and navigation functionality
prevSlide.addEventListener("click", function () {
    // check if current slide is the first and reset current slide to last
    if (curSlide === 0) {
        curSlide = maxSlide;
    } else {
        curSlide--;
    }

    //   move slide by 100%
    slides.forEach((slide, indx) => {
        var trans = 100 * (indx - curSlide);
        $(slide).css('transform', 'translateX(' + trans + '%)')
    });
});
