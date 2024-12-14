class Noticias {
    constructor() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            console.log("Este navegador soporta la API File.");
        } else {
            console.log("Este navegador NO soporta la API File.");
        }
    }

    readInputFile(files) {
        let archivo = files[0]; 
        let errorArchivo = document.getElementById("errorArchivo"); 

        errorArchivo.textContent = "";

        if (archivo && archivo.type.match(/text.*/)) {
            let lector = new FileReader();
            lector.onload = (evento) => {
                const contenido = evento.target.result; 
                this.procesarNoticias(contenido);
            };
            lector.readAsText(archivo);
        } else {
            errorArchivo.textContent = "Error: ¡¡¡ Archivo no válido !!!";
        }

    }

    procesarNoticias(content) {
        const lines = content.split('\n');

        lines.forEach(line => {
            const [titulo, contenido, autor] = line.split('_'); 
            this.mostrarNoticia(titulo, contenido, autor);
            
        });
    }

    mostrarNoticia(titulo, contenido, autor) {

        if (titulo && contenido && autor) {
            const noticiaElement = $("<article></article>");
            noticiaElement.append(`<h2>${titulo.trim()}</h2>`)
            noticiaElement.append(`<p>${contenido.trim()}</p>`)
            noticiaElement.append(`<p><i>- ${autor.trim()}</i></p>`);
            $("main").append(noticiaElement);
        }

    }

    añadirNoticia() {
        const labelTitulo = document.getElementById("titulo");
        const labelContenido = document.getElementById("contenido");
        const labelAutor = document.getElementById("autor");

        const titulo = labelTitulo.value.trim();
        const contenido = labelContenido.value.trim();
        const autor = labelAutor.value.trim();

        this.mostrarNoticia(titulo, contenido, autor);

        labelTitulo.value = "";
        labelContenido.value = "";
        labelAutor.value = "";
    }

}

let noticias = new Noticias();
