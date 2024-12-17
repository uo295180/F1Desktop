<?php
session_start();
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

            $_SESSION['top_records'] = $this->getTopRecords($difficulty);

            // echo "<pre>";
            // print_r($_SESSION['top_records']);
            // echo "</pre>";

            header("Location: " . $_SERVER['PHP_SELF']);
            exit();
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
        }
    }

    public function getTopRecords($difficulty)
    {
        $query = "SELECT name, surname, difficulty, reaction_time 
            FROM registro 
            WHERE difficulty = ? 
            ORDER BY reaction_time ASC 
            LIMIT 10";

        $stmt = $this->conn->prepare($query);
        $stmt->bind_param("s", $difficulty);
        $stmt->execute();
        $result = $stmt->get_result();

        $records = [];
        while ($row = $result->fetch_assoc()) {
            $records[] = $row;
        }

        $stmt->close();
        return $records;
    }

    public function renderTopRecords($records){
        echo "<h3>Top 10 Records</h3>";
        echo "<ol>";
        foreach ($records as $record) {
            echo "<li>";
            echo htmlspecialchars($record['name']) . " " . htmlspecialchars($record['surname']) . 
            " - Tiempo: " . htmlspecialchars($record['reaction_time']) . "s";            
            echo "</li>";
        }

        echo "</ol>";
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

    <link rel="stylesheet" type="text/css" href="../estilo/estilo.css">
    <link rel="stylesheet" type="text/css" href="../estilo/layout.css">
    <link rel="stylesheet" type="text/css" href="../estilo/semaforo.css">
    <link rel="icon" type="image/ico" href="../multimedia/imágenes/f1icon.ico" sizes="16x16">

</head>

<body>
    <header>
        <h1><a href="index.html" title="Inicio">F1 Desktop</a></h1>
        <nav>
            <a href="../index.html" title="Inicio">Inicio</a>
            <a href="../piloto.html" title="Piloto">Piloto</a>
            <a href="../noticias.html" title="Noticias">Noticias</a>
            <a href="../calendario.html" title="Calendario">Calendario</a>
            <a href="../meteorología.html" title="Meteorología">Meteorología</a>
            <a href="../circuito.html" title="Circuito">Circuito</a>
            <a href="viajes.php" title="Viajes">Viajes</a>
            <a href="../juegos.html" title="Juegos">Juegos</a>
        </nav>
    </header>
    <p>Estás en: <a href="../index.html" title="Inicio">Inicio</a> >> <a href="../juegos.html" title="Juegos">Juegos</a> >>
        Semáforo</p>
    <aside>
        <h2>Juegos</h2>
        <p><a href="../memoria.html">Memoria</a></p>
        <p><a href="semaforo.php">Semaforo</a></p>
        <p><a href="../api.html">Predicciones</a></p>
    </aside>
    <main>

    </main>
    <section>

    </section>
    <?php
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $name = $_POST['name'] ?? '';
        $surname = $_POST['surname'] ?? '';
        $difficulty = $_POST['difficulty'] ?? '';
        $reactionTime = $_POST['reactionTime'] ?? '';
    
        if (!empty($name) && !empty($surname)) {
            $record = new Record();
            $record->saveRecord($name, $surname, $difficulty, $reactionTime);
        } else {
            echo "<p>Por favor, completa todos los campos del formulario.</p>";
        }
    }
    
    if (!empty($_SESSION['top_records'])) {
        echo "<h3>Top 10 Récords (Difficulty: ".htmlspecialchars($_SESSION['top_records'][0]['difficulty']). ")</h3>";
        echo "<ol>";
    
        foreach ($_SESSION['top_records'] as $record) {
            echo "<li>";
            echo htmlspecialchars($record['name']) . " " . htmlspecialchars($record['surname']) . 
                " - Tiempo: " . htmlspecialchars($record['reaction_time']) . "s";
            echo "</li>";
        }
    
        echo "</ol>";
    
        unset($_SESSION['top_records']);
    }
    ?>  
    <script src="../js/semaforo.js"></script>
</body>

</html>