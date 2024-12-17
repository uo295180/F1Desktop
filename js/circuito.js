function leerArchivoXML(files) {
    const file = files[0];
    if (!file) {
        alert('Por favor, selecciona un archivo XML.');
        return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
        const xmlContent = e.target.result;
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
            if (xmlDoc.getElementsByTagName('parsererror').length) {
                throw new Error('Error al analizar el archivo XML.');
            }
            const htmlContent = Circuito.parseXmlToHtml(xmlDoc);
            document.querySelector('section').innerHTML = htmlContent;
        } catch (error) {
            document.querySelector('section').innerHTML = `<p style="color:red;">No se pudo procesar el archivo XML: ${error.message}</p>`;
        }
    };

    reader.readAsText(file);
}

function procesarArchivoKML(files){
    const file = files[0];

    if (!file) {
        alert('Por favor, selecciona un archivo KML.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const kmlContent = e.target.result;
        const parser = new DOMParser();
        const kmlDoc = parser.parseFromString(kmlContent, "application/xml");

        const lookAt = kmlDoc.querySelector("LookAt");
        const longitude = parseFloat(lookAt.querySelector("longitude").textContent);
        const latitude = parseFloat(lookAt.querySelector("latitude").textContent);

        const name = kmlDoc.querySelector("name")

        $("main").append(`<h2>${name.textContent}</h2>`);
        const section = $("<section></section>");
        section.append($("<div></div>"))
        $("main").append(section);
        var mapaGeoposicionado = new google.maps.Map(document.querySelector('main > section > div'), {
            zoom: 15,
            center: {lat:latitude, lng: longitude}
        });
        const coordinates = [];
        const lineString = kmlDoc.querySelector("LineString");
        const coords = lineString.querySelector("coordinates").textContent.trim().split(" ");

        coords.forEach((coord, index) => {
            const [lon, lat] = coord.split(",").map(parseFloat);
            if (isFinite(lat) && isFinite(lon)) {
                coordinates.push({ lat, lng: lon });
            } 
        });

        const circuitPolyline = new google.maps.Polyline({
            path: coordinates,
            strokeColor: "#ff0000",
            strokeOpacity: 1.0,
            strokeWeight: 5
        });

        circuitPolyline.setMap(mapaGeoposicionado);
    };

    reader.readAsText(file);
}

function cargarSVG(files) {
    const file = files[0];

    if (!file) {
        alert('Por favor, selecciona un archivo SVG.');
        return;
    }

    if (file.type !== 'image/svg+xml') {
        alert('Por favor, selecciona un archivo SVG válido.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const svgContent = e.target.result;
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = svgContent;

        const svgElement = tempContainer.querySelector('svg');

        if (svgElement) {
            if (!svgElement.getAttribute('viewBox')) {
                const bbox = svgElement.getBoundingClientRect();
                const width = bbox.width || 1000;
                const height = bbox.height || 1000;
                svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
            }
            document.body.appendChild(svgElement);
        }
    };

    reader.readAsText(file);
}

class Circuito {

    static parseXmlToHtml(xmlDoc) {
        const traverseNode = (node, level) => {
            let title = "h2";
            switch(level) {
                case(1):
                    title = "h2";
                    break;
                case(2): 
                    title = "h3";
                    break;
                case(3):
                    title = "h4";
                    break;
                case(4):
                    title = "h5";
                    break;
                default:
                    title = "h6";
            }
            if (node.nodeType === Node.ELEMENT_NODE) {
                let html = '<section>';
                if(level > 0) {
                    html = `<${title}>${node.nodeName}`;

                    if (node.attributes.length > 0) {
                        html += ' <em>(';
                        Array.from(node.attributes).forEach(attr => {
                            html += `"${attr.value}" `;
                        });
                        html += ')</em>';
                    }
                    html += `</${title}>`;
                }

                if (node.childNodes.length > 0) {
                    Array.from(node.childNodes).forEach(childNode => {
                        html += traverseNode(childNode, level+1);
                    });
                }

                html += `</section>`;
                return html;
            } else if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
                return `<p>${node.nodeValue.trim()}</p>`;
            } else {
                return '';
            }
        };

        return traverseNode(xmlDoc.documentElement, 0);
    }
}
