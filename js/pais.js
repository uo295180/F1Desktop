class Pais {
    name;
    capital;
    nombreCircuito;
    poblacion;
    tipoGobierno;
    meta;
    religion;

    constructor(name, capital, poblacion) {
        this.name = name;
        this.capital = capital;
        this.poblacion = poblacion;
    }

    fillValues(nombreCircuito, tipoGobierno, meta, religion) {
        this.nombreCircuito = nombreCircuito;
        this.tipoGobierno = tipoGobierno;
        this.meta = meta;
        this.religion = religion;
    }
    getNombre() {
        return this.name;
    }
    getCapital() {
        return this.capital;
    }
    getNombreCicuito() {
        return this.nombreCircuito;
    }
    getPoblacion() {
        return this.poblacion;
    }
    getTipoGobierno() {
        return this.tipoGobierno;
    }
    getMeta() {
        return this.meta;
    }
    getReligion() {
        return this.religion;
    }

    getInfo() {
        let info = "<ol>"
        info += "<li>" + this.getNombreCicuito() + "</li>"
        info += "<li>" + this.getPoblacion() + "</li>"
        info += "<li>" + this.getTipoGobierno() + "</li>"
        info += "<li>" + this.getReligion() + "</li>"
        info += "</ol>"
        return info;
    }

    writeCoords() {
        document.write("<p>Longitud: " + this.meta.longitud + ", Latitud: " + this.meta.latitud + ", Altitud: " + this.meta.altitud + "</p>")
    }

    getMeteorology() {
        let latitud = this.meta.latitud;
        let longitud = this.meta.longitud;
        const apiKey = 'b7be616cf27c1a8c0a3c1759c5ce7c24';
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitud}&lon=${longitud}&appid=${apiKey}&mode=xml&units=metric&lang=es`;
        $.ajax({
            url: url,
            type: "GET",
            dataType: "xml",  // Request the response in XML format
            success: function (data) {
                console.log("XML Data received:", data);
                let dailyForecasts = {};
                let limitDays = 0;
                const location = $(data).find("name").text();
                console.log(location);
                $("main").append(`<h2>Meteorología en ${location}, Shanghai, China</h2>`)
                $(data).find("forecast time").each(function () {
                    const fromTime = $(this).attr("from");
                    const toTime = $(this).attr("to");

                    const symbolName = $(this).find("symbol").attr("name");
                    const symbolCode = $(this).find("symbol").attr("var");

                    const temperature = $(this).find("temperature").attr("value");
                    const temperatureMin = $(this).find("temperature").attr("min");
                    const temperatureMax = $(this).find("temperature").attr("max");

                    const windSpeed = $(this).find("windSpeed").attr("mps");
                    const windDirection = $(this).find("windDirection").attr("name");

                    const clouds = $(this).find("clouds").attr("value");
                    const humidity = $(this).find("humidity").attr("value");

                    const fromDate = new Date(fromTime);
                    const toDate = new Date(toTime);

                    const dayOfWeek = fromDate.toLocaleDateString('es-ES', { weekday: 'long' });
                    const dayOfMonth = fromDate.getDate();
                    const startDate = fromDate.toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit' });
                    const endDate = toDate.toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit' });


                    const dayKey = `${fromDate.getFullYear()}-${fromDate.getMonth() + 1}-${fromDate.getDate()}`;
                    
                    if (limitDays < 5) {
                        if (!dailyForecasts[dayKey]) {
                            limitDays++;
                            dailyForecasts[dayKey] = {
                                dayOfWeek: dayOfWeek,
                                dayOfMonth: dayOfMonth,
                                forecasts: []
                            };
                        }
                        dailyForecasts[dayKey].forecasts.push({
                            startDate: startDate,
                            endDate: endDate,
                            symbolName: symbolName,
                            symbolCode: symbolCode,
                            temperature: temperature,
                            temperatureMin: temperatureMin,
                            temperatureMax: temperatureMax,
                            windSpeed: windSpeed,
                            windDirection: windDirection,
                            clouds: clouds,
                            humidity: humidity
                        });
                    }
                });

                for (let dayKey in dailyForecasts) {
                    const dayData = dailyForecasts[dayKey];

                    const dayArticle = $("<article></article>");
                    dayArticle.append(`<h2>${dayData.dayOfWeek}, ${dayData.dayOfMonth}</h2>`);
                    let min = 1000;
                    let max = -1000;
                    let accumTemp = 0;
                    let accumHum = 0;
                    let records = 0;
                    let impcode = 0;
                    let symName = 0;
                    let clouds = -1;
                    dayData.forecasts.forEach(forecast => {
                        records++;
                        accumTemp += parseFloat(forecast.temperature);
                        accumHum += parseFloat(forecast.humidity);
                        if (impcode == 0) {
                            impcode = forecast.symbolCode;
                            symName = forecast.symbolName;
                        }
                        if (forecast.startDate == "9:00") {
                            impcode = forecast.symbolCode;
                            clouds = forecast.clouds;
                            symName = forecast.symbolName;
                        };
                        if (forecast.temperatureMin < min) min = forecast.temperatureMin;
                        if (forecast.temperatureMax > max) max = forecast.temperatureMax;
                        if (clouds == -1) {
                            clouds = forecast.clouds;
                        }
                    })
                    let meanTemp = accumTemp / records;
                    let meanHum = accumHum / records;
                    let icon = `https://openweathermap.org/img/wn/` + impcode + '@2x.png';
                    dayArticle.append(`<img src=${icon} alt="${symName}" />`);
                    dayArticle.append(`<p><b>Tiempo</b>: ${symName}</p>`);
                    dayArticle.append(`<p><b>Temperature</b>: ${meanTemp.toFixed(2)}ºC. (Min: ${min}ºC, Max: ${max}ºC)</p>`);
                    dayArticle.append(`<p><b>Humidity</b>: ${meanHum.toFixed(2)}</p>`)                    
                    $("main").append(dayArticle);
                }
            }
        })
    }
}

let p = new Pais("China", "Pekín", 1425671300)
let meta = new Object()
meta.latitud = 31.3389
meta.longitud = 121.2196
meta.altitud = 3
p.fillValues("Shangai", "República", meta, "Confuncionismo, budismo y taoísmo")

p.getMeteorology();