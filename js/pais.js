class Pais{
    name;
    capital;
    nombreCircuito;
    poblacion;
    tipoGobierno;
    meta;
    religion;

    constructor(name, capital, poblacion){
        this.name = name;
        this.capital = capital;
        this.poblacion = poblacion;
    }

    fillValues(nombreCircuito, tipoGobierno, meta, religion){
        this.nombreCircuito = nombreCircuito;
        this.tipoGobierno = tipoGobierno;
        this.meta = meta;
        this.religion = religion;    
    }
    getNombre(){
        return this.name;
    }
    getCapital() {
        return this.capital;
    }
    getNombreCicuito(){
        return this.nombreCircuito;
    }
    getPoblacion(){
        return this.poblacion;
    }
    getTipoGobierno(){
        return this.tipoGobierno;
    }
    getMeta(){
        return this.meta; 
    }
    getReligion(){
        return this.religion;
    }

    getInfo(){
        let info = "<ol>"
        info += "<li>" + this.getNombreCicuito() + "</li>"
        info += "<li>" + this.getPoblacion() + "</li>"
        info += "<li>" + this.getTipoGobierno() + "</li>"
        info += "<li>" + this.getReligion() + "</li>"

        info += "</ol>"
        return info;
    }

    writeCoords(){
        document.write("<p>Longitud: "+this.meta.longitud + ", Latitud: "+this.meta.latitud+ ", Altitud: "+ this.meta.altitud+ "</p>")
    }

}

let p = new Pais("China", "Pekín", 1425671300)
let meta = new Object()
meta.latitud = 2
meta.longitud = 10
meta.altitud = 3
p.fillValues("Shangai", "República", meta, "Confuncionismo, budismo y taoísmo")

console.log(p.getMeta())
console.log(p.getNombre())

p.writeCoords()