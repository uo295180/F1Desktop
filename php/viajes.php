<?php
class Carrusel
{
    private $capital;
    private $pais;
    private $fotos;

    public function __construct($capital, $pais)
    {
        $this->capital = $capital;
        $this->pais = $pais;
        $this->fotos = [];
    }

    public function obtenerFotos()
    {
        $apiKey = '21f3182ccffb62ef5f1f440fc9dd62ea'; // Reemplázalo con tu clave real
        $url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=$apiKey&tags="
            . urlencode($this->pais) . "&format=json&nojsoncallback=1&per_page=10";

        $respuesta = file_get_contents($url);
        $datos = json_decode($respuesta, true);

        if (isset($datos['photos']['photo'])) {
            foreach ($datos['photos']['photo'] as $foto) {
                $farmId = $foto['farm'];
                $serverId = $foto['server'];
                $id = $foto['id'];
                $secret = $foto['secret'];
                $urlFoto = "https://farm$farmId.staticflickr.com/$serverId/$id" . "_$secret.jpg";
                $this->fotos[] = $urlFoto;
            }
        }
    }

    public function mostrarCarrusel()
    {
        if (!empty($this->fotos)) {
            echo '<article>';
            echo '<h2>Imagenes de ' . htmlspecialchars($this->capital) . ', ' . htmlspecialchars($this->pais) . '</h2>';
            foreach ($this->fotos as $foto) {
                echo "<img src='$foto' alt='Imagen del país' />";
            }
            echo "<button>&gt;</button>";
            echo "<button>&lt;</button>";
            echo '</article>';
        } else {
            echo "<p>No se encontraron imágenes para {$this->pais}.</p>";
        }
    }
}
$carrusel = new Carrusel("Pekin", "China"); // Ajusta la capital y el país según tu necesidad
$carrusel->obtenerFotos();


class Moneda
{
    private $local;
    private $extranjera;
    private $apiKey;
    public function __construct($local, $extranjera)
    {
        $this->local = $local;
        $this->extranjera = $extranjera;
        $this->apiKey = "2fb1c30c73c5789d79d4ea55";
    }

    public function obtainExchangeRate()
    {
        $url = "https://v6.exchangerate-api.com/v6/$this->apiKey/pair/$this->local/$this->extranjera";
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response_json = curl_exec($ch);
        curl_close($ch);
        if (false !== $response_json) {
            try {
                $response = json_decode($response_json);
                //echo "$response";
                if ('success' === $response->result) {
                    $extr_rate = $response->conversion_rate;
                    echo "<section>";
                    echo "<h2>Exchange rate ($this->local to $this->extranjera)</h2>";
                    echo "<p>The exchange rate from $this->local to $this->extranjera is: $extr_rate</p>";
                    echo "</section>";
                } else {
                    echo "No success";
                }
            } catch (Exception $e) {
                echo "Error in request";
            }
        } else {
            echo "False sesponse";
        }
    }
}

$moneda = new Moneda("EUR", "CNY")
    ?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Mario Orviz Viesca" />
    <meta name="description" content=" ... " />
    <meta name="keywords"
        content="aquí cada documento debe tener la lista de las palabras clave del mismo separadas por comas" />

    <title>F1Desktop - Viajes</title>

    <link rel="stylesheet" type="text/css" href="../estilo/estilo.css">
    <link rel="stylesheet" type="text/css" href="../estilo/layout.css">

    <link rel="icon" type="image/ico" href="../multimedia/imágenes/f1icon.ico" sizes="16x16">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCSHqfAJo3R5iQg33EC9bHwxc4e4SV057s&callback=initMap"
        async defer></script>
</head>

<body>
    <header>
        <h1><a href="../index.html" title="Inicio">F1 Desktop</a></h1>
        <nav>
            <a href="../index.html" title="Inicio">Inicio</a>
            <a href="../piloto.html" title="Piloto">Piloto</a>
            <a href="../noticias.html" title="Noticias">Noticias</a>
            <a href="../calendario.html" title="Calendario">Calendario</a>
            <a href="../meteorología.html" title="Meteorología">Meteorología</a>
            <a href="../circuito.html" title="Circuito">Circuito</a>
            <a href="viajes.php" title="Viajes" class="active">Viajes</a>
            <a href="../juegos.html" title="Juegos">Juegos</a>
        </nav>
    </header>
    <p>Estás en: <a href="../index.html" title="Inicio">Inicio</a> >> Viajes</p>

    <main>
        <?php
        $moneda->obtainExchangeRate();
        $carrusel->mostrarCarrusel();
        ?>
    </main>
    <script src="../js/viajes.js"></script>

</body>

</html>