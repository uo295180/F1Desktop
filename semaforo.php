<?php
class Record
{
    private $server;
    private $user;
    private $pass;
    private $dbname;
    private $conn;

    public function __construct()
    {
        $this->server = "localhost";
        $this->user = "DBUSER2024";
        $this->pass = "DBPSWD2024";
        $this->dbname = "records";
        $this->connectDB();
        $this->checkAndCreateTable();
    }

    private function connectDB()
    {
        $this->conn = mysqli_connect($this->server, $this->user, $this->pass, $this->dbname);

        if ($this->conn->connect_error) {
            die("Error de conexion: " . $this->conn->connect_error);
        }
    }

    public function saveRecord($name, $surname, $difficulty, $reactionTime)
    {
        $stmt = $this->conn->prepare("INSERT INTO registro (name, surname, difficulty, reaction_time) VALUES (?,?,?,?)");
        $stmt->bind_param("ssss", $name, $surname, $difficulty, $reactionTime);

        if ($stmt->execute()) {
            echo "<p>Resultados guardados correctamente</p>";
        } else {
            echo "<p>Error al guardar resultados: " . $stmt->error . "</p>";
        }

        $stmt->close();
    }

    public function __destruct()
    {
        $this->conn->close();
    }

    private function checkAndCreateTable()
    {
        $checkTableQuery = "SHOW TABLES LIKE 'registro'";

        $result = $this->conn->query($checkTableQuery);

        if ($result->num_rows == 0) {
            $createTableQuery = "CREATE TABLE registro (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            surname VARCHAR(50) NOT NULL,
            difficulty VARCHAR(20) NOT NULL,
            reaction_time VARCHAR(10) NOT NULL
        )";

            if ($this->conn->query($createTableQuery) === TRUE) {
                echo "<p>Tabla 'records' creada correctamente.</p>";
            } else {
                die("Error al crear la tabla 'records': " . $this->conn->error);
            }
        }
    }
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST['name'] ?? '';
    $surname = $_POST['surname'] ?? '';
    $difficulty = $_POST['difficulty'] ?? '';
    $reactionTime = $_POST['reactionTime'] ?? '';

    if (!empty($name) && !empty($surname) && !empty($difficulty) && !empty($reactionTime)) {
        $record = new Record();
        $record->saveRecord($name, $surname, $difficulty, $reactionTime);
    } else {
        echo "<p>Por favor, completa todos los campos del formulario.</p>";
    }
}
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

    <title>F1Desktop - Juegos</title>

    <link rel="stylesheet" type="text/css" href="estilo/estilo.css">
    <link rel="stylesheet" type="text/css" href="estilo/layout.css">
    <link rel="stylesheet" type="text/css" href="estilo/semaforo.css">
    <link rel="icon" type="image/ico" href="multimedia/imágenes/f1icon.ico" sizes="16x16">

</head>

<body>
    <header>
        <h1><a href="index.html" title="Inicio">F1 Desktop</a></h1>
        <nav>
            <a href="index.html" title="Inicio">Inicio</a>
            <a href="piloto.html" title="Piloto">Piloto</a>
            <a href="noticias.html" title="Noticias">Noticias</a>
            <a href="calendario.html" title="Calendario">Calendario</a>
            <a href="meteorología.html" title="Meteorología">Meteorología</a>
            <a href="circuito.html" title="Circuito">Circuito</a>
            <a href="viajes.html" title="Viajes">Viajes</a>
            <a href="juegos.html" title="Juegos">Juegos</a>
        </nav>
    </header>
    <p>Estás en: <a href="index.html" title="Inicio">Inicio</a> >> <a href="juegos.html" title="Juegos">Juegos</a> >>
        Semáforo</p>
    <aside>
        <h2>Juegos</h2>
        <p><a href="memoria.html">Memoria</a></p>
        <p><a href="semaforo.html">Semaforo</a></p>
        <p><a href="api.html">Predicciones</a></p>
    </aside>
    <main>

    </main>
    <?php

    ?>
    <script src="js/semaforo.js"></script>
</body>

</html>