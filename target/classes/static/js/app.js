// Definición de un módulo llamado 'Blueprint'.
Blueprint = (function () {

    var Author = $("#AuthorInput").val(); // Variable para almacenar el valor del campo de entrada de autor.
    var blueprints; // Almacenamiento temporal de planos.
    var UserPoints; // Puntos de usuario.
    var planoM; // Almacenamiento temporal de planos mapeados.
    var bp; // Plano actual.
    var Point; // Punto.
    var canvas; // Área de dibujo en lienzo.

    // Función de callback para cargar los planos.
    var fun = function (list) {
        blueprints = list;
        console.log(blueprints)
    }

    // Función de prueba que muestra una alerta.
    function prueba() {
        alert("Se supone que entra")
    }

    /**
     * Actualiza el total de puntos de los planos.
     */
    function actualizarTotalUPoints() {
        let points = 0;
        // Mapeo de puntos de planoM y cálculo de la suma de puntos.
        var pointsM = planoM.map(function (plano) {
            return plano.puntos;
        })
        points = pointsM.reduce(getSum, 0); // Suma de puntos.
        console.log(points);
        UserPoints = $("#totalPoints").html(points);
    }

    // Función auxiliar para sumar valores en un array.
    function getSum(total, sum) {
        return total + sum;
    }

    // Función para dibujar un plano.
    function dibujarPlano() {
    }

    /**
     * Cambia el autor de un plano.
     * @param {Blueprint} bluePrint Plano al cual se actualiza el autor.
     * @param {String} newAuthor Nuevo autor del plano.
     */
    cambiarNombreAutor = function (bluePrint, newAuthor) {
    }

    /**
     * Actualiza los planos a mostrar según el autor dado.
     */
    function actualizarPlanos() {
        console.log($("#AuthorInput").val());
        // Llama a la función 'getBlueprintsByAuthor' del módulo 'apimock' o 'apiclient' según la implementación seleccionada.
        apimock.getBlueprintsByAuthor($("#AuthorInput").val(), fun);
        var bps = blueprints;
        console.log(bps);
        // Mapeo de planos y creación de objetos plano.
        var bps2 = bps.map(function (bp) {
            var plano = { nombre: bp.name, puntos: bp.points.length };
            return plano;
        });
        console.log(bps2);
        planoM = bps2;
        $("table tbody").empty();
        // Creación de tabla de planos en el documento HTML.
        var BlueprintTable = bps2.map(function (plano) {
            var columna = "<tr><td align=\"center\" id=\"" + plano.nombre + "_\">" + plano.nombre + "</td><td align=\"center\">" + plano.puntos + "</td><td><button onclick=\"Blueprint.dibujarPlano(" + plano.nombre + "_)\">Open</button></td></tr>";
            $("table tbody").append(columna);
            return columna;
        });
        console.log(BlueprintTable);
        actualizarTotalUPoints();
    }

    /**
     * Dibuja un plano en el lienzo.
     * @param {Object} id Identificador del plano.
     */
    function dibujarPlano(id) {
        var ID = id["id"].substring(0, id["id"].length - 1)
        var canvasM = $("#myCanvas");
        canvas = $("#myCanvas")[0];
        var ctx = canvas.getContext("2d");
        canvas.width = canvas.width;

        // Llama a la función 'getBlueprintsByNameAndAuthor' del módulo 'apimock' o 'apiclient' según la implementación seleccionada.
        apimock.getBlueprintsByNameAndAuthor($("#AuthorInput").val(), ID, fun);

        var bps = blueprints;
        ctx.moveTo(bps.points[0]["x"], bps.points[0]["y"]);
        for (let i = 1; i < bps.points.length; i++) {
            ctx.lineTo(bps.points[i]["x"], bps.points[i]["y"]);
        }
        ctx.stroke();
    }

    // Devuelve un objeto público con las funciones disponibles para su uso externo.
    return {
        prueba: prueba,
        actualizarPlanos: actualizarPlanos,
        dibujarPlano: dibujarPlano
    }

})();

Blueprint; // Fin del módulo Blueprint.
