### Escuela Colombiana de Ingeniería
### Arquiecturas de Software

## Construción de un cliente 'grueso' con un API REST, HTML5, Javascript y CSS3. Parte I.

### Trabajo individual o en parejas. A quienes tuvieron malos resultados en el parcial anterior se les recomienda hacerlo individualmente.

#### Integrantes: Cristian Rodriguez y Julia Mejia

![](img/mock.png)

* Al oprimir 'Get blueprints', consulta los planos del usuario dado en el formulario. Por ahora, si la consulta genera un error, sencillamente no se mostrará nada.
* Al hacer una consulta exitosa, se debe mostrar un mensaje que incluya el nombre del autor, y una tabla con: el nombre de cada plano de autor, el número de puntos del mismo, y un botón para abrirlo. Al final, se debe mostrar el total de puntos de todos los planos (suponga, por ejemplo, que la aplicación tienen un modelo de pago que requiere dicha información).
* Al seleccionar uno de los planos, se debe mostrar el dibujo del mismo. Por ahora, el dibujo será simplemente una secuencia de segmentos de recta realizada en el mismo orden en el que vengan los puntos.


## Ajustes Backend

1. Trabaje sobre la base del proyecto anterior (en el que se hizo el API REST).
2. Incluya dentro de las dependencias de Maven los 'webjars' de jQuery y Bootstrap (esto permite tener localmente dichas librerías de JavaScript al momento de construír el proyecto):

    ```xml
    <dependency>
        <groupId>org.webjars</groupId>
        <artifactId>webjars-locator</artifactId>
    </dependency>

    <dependency>
        <groupId>org.webjars</groupId>
        <artifactId>bootstrap</artifactId>
        <version>3.3.7</version>
    </dependency>

    <dependency>
        <groupId>org.webjars</groupId>
        <artifactId>jquery</artifactId>
        <version>3.1.0</version>
    </dependency>                

    ```

## Front-End - Vistas

1. Cree el directorio donde residirá la aplicación JavaScript. Como se está usando SpringBoot, la ruta para poner en el mismo contenido estático (páginas Web estáticas, aplicaciones HTML5/JS, etc) es:  

    ```
    src/main/resources/static
    ```
    <img width="185" alt="image" src="https://github.com/juliamejia/HTML5-JS_REST_CLIENT_Blueprints-1/assets/98657146/d02cf80c-ad80-4db6-b8b7-0769d2c7e839">  


2. Cree, en el directorio anterior, la página index.html, sólo con lo básico: título, campo para la captura del autor, botón de 'Get blueprints', campo donde se mostrará el nombre del autor seleccionado,

    ```html
    <label style="margin-left:2rem">Author</label>
    <input id = "AuthorInput"style = "margin-left:2rem" name="Author" type="text"></input>
    <button style = "margin-left:2rem" id="GetBlueprintsButton" onclick="Blueprint.actualizarPlanos()">GetbluePrints</button>
    <br><br><br>
    ```

    [la tabla HTML](https://www.w3schools.com/html/html_tables.asp) donde se mostrará el listado de planos (con sólo los encabezados), y un campo donde se mostrará el total de puntos de los planos del autor. Recuerde asociarle identificadores a dichos componentes para facilitar su búsqueda mediante selectores.
    
    ```html
    <table style = "width:30%;margin-left:2rem">
        <tr>
            <thead>
            <th text-align="center">BluePrint name</th>
            <th text-align="center">Number of points</th>
            <th text-align="center">Open</th>
            <th></th>
            </thead>
        </tr>
    </table>
    <br><br>
    <label style = "margin-left:2rem" id="blueprintsPointsLabel">Total user points</label><label style = "margin-left:2rem" id="totalPoints"></label>
    <br>
    ```

3. En el elemento \<head\> de la página, agregue las referencia a las librerías de jQuery, Bootstrap y a la hoja de estilos de Bootstrap. 
    ```html
    <head>
        <title>Blueprints</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <script src="/webjars/jquery/jquery.min.js"></script>
        <script src="/webjars/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <link rel="stylesheet"
          href="/webjars/bootstrap/3.3.7/css/bootstrap.min.css" />
    </head>
    ```


4. Suba la aplicación (mvn spring-boot:run), y rectifique:
    1. Que la página sea accesible desde:
    ```
    http://localhost:8080/index.html
    ```
    
    <img width="336" alt="image" src="https://github.com/juliamejia/HTML5-JS_REST_CLIENT_Blueprints-1/assets/98657146/24e9e971-2e01-4127-9453-11b45673be31">  

    2. Al abrir la consola de desarrollador del navegador, NO deben aparecer mensajes de error 404 (es decir, que las librerías de JavaScript se cargaron     correctamente).
   <img width="860" alt="image" src="https://github.com/juliamejia/HTML5-JS_REST_CLIENT_Blueprints-1/assets/98657146/856887ee-fcb6-4efd-9a83-c481333adad1">  

## Front-End - Lógica

1. Ahora, va a crear un Módulo JavaScript que, a manera de controlador, mantenga los estados y ofrezca las operaciones requeridas por la vista. Para esto tenga en cuenta el [patrón Módulo de JavaScript](https://toddmotto.com/mastering-the-module-pattern/), y cree un módulo en la ruta static/js/app.js .

2. Copie el módulo provisto (apimock.js) en la misma ruta del módulo antes creado. En éste agréguele más planos (con más puntos) a los autores 'quemados' en el código.

3. Agregue la importación de los dos nuevos módulos a la página HTML (después de las importaciones de las librerías de jQuery y Bootstrap):
    ```html
    <script src="js/apimock.js"></script>
    <script src="js/app.js"></script>
    ```

4. Haga que el módulo antes creado mantenga de forma privada:
    * El nombre del autor seleccionado.
    * El listado de nombre y tamaño de los planos del autor seleccionado. Es decir, una lista objetos, donde cada objeto tendrá dos propiedades: nombre de plano, y número de puntos del plano.

    Junto con una operación pública que permita cambiar el nombre del autor actualmente seleccionado.
   


5. Agregue al módulo 'app.js' una operación pública que permita actualizar el listado de los planos, a partir del nombre de su autor (dado como parámetro). Para hacer esto, dicha operación debe invocar la operación 'getBlueprintsByAuthor' del módulo 'apimock' provisto, enviándole como _callback_ una función que:

    * Tome el listado de los planos, y le aplique una función 'map' que convierta sus elementos a objetos con sólo el nombre y el número de puntos.

    * Sobre el listado resultante, haga otro 'map', que tome cada uno de estos elementos, y a través de jQuery agregue un elemento \<tr\> (con los respectvos \<td\>) a la tabla creada en el punto 4. Tenga en cuenta los [selectores de jQuery](https://www.w3schools.com/JQuery/jquery_ref_selectors.asp) y [los tutoriales disponibles en línea](https://www.tutorialrepublic.com/codelab.php?topic=faq&file=jquery-append-and-remove-table-row-dynamically). Por ahora no agregue botones a las filas generadas.

    * Sobre cualquiera de los dos listados (el original, o el transformado mediante 'map'), aplique un 'reduce' que calcule el número de puntos. Con este valor, use jQuery para actualizar el campo correspondiente dentro del DOM.
      
    ```js
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
    ```

6. Asocie la operación antes creada (la de app.js) al evento 'on-click' del botón de consulta de la página.
   
   ```html
   <button style = "margin-left:2rem" id="GetBlueprintsButton" onclick="Blueprint.actualizarPlanos()">GetbluePrints</button>
   ```

7. Verifique el funcionamiento de la aplicación. Inicie el servidor, abra la aplicación HTML5/JavaScript, y rectifique que al ingresar un usuario existente, se cargue el listado del mismo.  
    <img width="306" alt="image" src="https://github.com/juliamejia/HTML5-JS_REST_CLIENT_Blueprints-1/assets/98657146/7b4e17b3-f884-4f99-bedf-5e27dbf2f637">  
   

## Para la próxima semana

8. A la página, agregue un [elemento de tipo Canvas](https://www.w3schools.com/html/html5_canvas.asp), con su respectivo identificador. Haga que sus dimensiones no sean demasiado grandes para dejar espacio para los otros componentes, pero lo suficiente para poder 'dibujar' los planos.
   
   ```html
   <canvas id="myCanvas" width="300" height="300" style="margin-top:-15rem  ;margin-left:70rem; border:1px solid rgb(7, 0, 41);"></canvas>
   ```

9. Al módulo app.js agregue una operación que, dado el nombre de un autor, y el nombre de uno de sus planos dados como parámetros, haciendo uso del método getBlueprintsByNameAndAuthor de apimock.js y de una función _callback_:
    * Consulte los puntos del plano correspondiente, y con los mismos dibuje consectivamente segmentos de recta, haciendo uso [de los elementos HTML5 (Canvas, 2DContext, etc) disponibles](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_canvas_tut_path)* Actualice con jQuery el campo <div> donde se muestra el nombre del plano que se está dibujando (si dicho campo no existe, agruéguelo al DOM).

10. Verifique que la aplicación ahora, además de mostrar el listado de los planos de un autor, permita seleccionar uno de éstos y graficarlo. Para esto, haga que en las filas generadas para el punto 5 incluyan en la última columna un botón con su evento de clic asociado a la operación hecha anteriormente (enviándo como parámetro los nombres correspondientes).

11. Verifique que la aplicación ahora permita: consultar los planos de un auto y graficar aquel que se seleccione.  
    <img width="524" alt="image" src="https://github.com/juliamejia/HTML5-JS_REST_CLIENT_Blueprints-1/assets/98657146/daf428b2-997b-4297-a3c7-40f02fd84946">   
    <img width="520" alt="image" src="https://github.com/juliamejia/HTML5-JS_REST_CLIENT_Blueprints-1/assets/98657146/0f372d9d-7c7f-4c97-a650-51e5f19501a2">  

12. Una vez funcione la aplicación (sólo front-end), haga un módulo (llámelo 'apiclient') que tenga las mismas operaciones del 'apimock', pero que para las mismas use datos reales consultados del API REST. Para lo anterior revise [cómo hacer peticiones GET con jQuery](https://api.jquery.com/jquery.get/), y cómo se maneja el esquema de _callbacks_ en este contexto.
    * Adjuntado en el directorio indicado  

13. Modifique el código de app.js de manera que sea posible cambiar entre el 'apimock' y el 'apiclient' con sólo una línea de código.
    Basta con llamar a la función 'getBlueprintsByNameAndAuthor' del módulo 'apimock' o 'apiclient' según la implementación seleccionada. En:
    
    ```js
    function dibujarPlano(id) {
        var ID = id["id"].substring(0, id["id"].length - 1)
        var canvasM = $("#myCanvas");
        canvas = $("#myCanvas")[0];
        var ctx = canvas.getContext("2d");
        canvas.width = canvas.width;
        // Llama a la función 'getBlueprintsByNameAndAuthor' del módulo 'apimock' o 'apiclient' según la implementación seleccionada.
        apiclient.getBlueprintsByNameAndAuthor($("#AuthorInput").val(), ID, fun);
    ```
    
14. Revise la [documentación y ejemplos de los estilos de Bootstrap](https://v4-alpha.getbootstrap.com/examples/) (ya incluidos en el ejercicio), agregue los elementos necesarios a la página para que sea más vistosa, y más cercana al mock dado al inicio del enunciado.
    * Se modifica el index.html para que la pagina se vea de la siguiente manera
      <img width="661" alt="image" src="https://github.com/juliamejia/HTML5-JS_REST_CLIENT_Blueprints-1/assets/98657146/4a324d26-2c09-42e8-900e-5a574baa4dd6">  

      
