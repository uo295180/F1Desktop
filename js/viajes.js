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
        this.initMap();
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
        const mapaEstatico = $("<div></div>");
        mapaEstatico.attr('id', 'staticMap')
        mapaEstatico.append(`<h2>Mapa Estático</h2>`);
        console.log(this.longitud);
        var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";

        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center=" + this.latitud + "," + this.longitud;
        var zoom = "&zoom=15";
        var tamaño = "&size=800x600";

        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        var sensor = "&sensor=false";

        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        mapaEstatico.append(`<img src=${this.imagenMapa} alt='mapa estático google' />`);
        $("main").append(mapaEstatico);
    }
    initMap() {
        var centro = { lat: this.latitud, lng: this.longitud };
        $("main").append("<h2>Mapa Dinámico</h2>");
        const dynamicMap = $("<div></div>");
        dynamicMap.attr('id', 'dynamicMap');
        $("main").append(dynamicMap);
        var mapaGeoposicionado = new google.maps.Map(document.getElementById('dynamicMap'), {
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
