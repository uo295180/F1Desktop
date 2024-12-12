class Agenda {

    urls = undefined;

    constructor() {
        this.url = "https://api.jolpi.ca/ergast/f1/current/races.json";
    }

    readAndProcessData() {
        $.ajax({
            url: this.url,
            type: "GET",
            dataType: "json",
            success: function (data) {
                
                let races = data.MRData.RaceTable.Races;
                races.forEach(race => {
                    let raceName = race.raceName;
                    let circuitName = race.Circuit.circuitName;
                    let locality = race.Circuit.Location.locality;
                    let country = race.Circuit.Location.country;
                    let raceDate = race.date;
                    let raceTime = race.time;
                    let latitude = race.Circuit.Location.lat;
                    let longitude = race.Circuit.Location.long;

                    let raceDateFormatted = new Date(raceDate + "T" + raceTime).toLocaleString();

                    const raceArticle = $("<article></article>");
                    raceArticle.append(`<h2>${raceName}</h2>`);
                    const dataList = $("<ul></ul>");
                    dataList.append(`<li><b>Nombre del circuito</b>: ${circuitName}</li>`);
                    dataList.append(`<li><b>Localización</b>: ${locality}, ${country} (<b>Lat</b>: ${latitude}, <b>Long</b>: ${longitude})</li>`);
                    dataList.append(`<li><b>Fecha y hora</b>: ${raceDateFormatted}</li>`);
                    raceArticle.append(dataList);

                    $("main").append(raceArticle);
                });
            }
        })
    }
}

let agenda = new Agenda();
//agenda.readAndProcessData()