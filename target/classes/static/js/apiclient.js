// Creación de un módulo llamado 'apiclient' para realizar peticiones a una API REST.
var apiclient = (function () {
    // Definición de la URL base de la API REST.
    var apiUrl = "http://localhost:8080/blueprints/";

    // Devuelve un objeto con dos funciones para interactuar con la API REST.
    return {
        // Función para obtener planos por autor.
        getBlueprintsByAuthor: function (authname, callback) {
            $.ajax({
                // URL completa para la consulta de planos por autor.
                url: apiUrl + authname,
                type: 'GET',          // Tipo de solicitud HTTP: GET.
                dataType: 'json',    // Tipo de datos esperado en la respuesta: JSON.
                success: function (data) {
                    // Manejo de éxito: llama al callback con los datos recibidos.
                    callback(data);
                },
                error: function (error) {
                    // Manejo de error: muestra un mensaje de error en la consola y llama al callback con una lista vacía.
                    console.error('Error al obtener planos por autor:', error);
                    callback([]);
                }
            });
        },

        // Función para obtener un plano por nombre y autor.
        getBlueprintsByNameAndAuthor: function (authname, bpname, callback) {
            $.ajax({
                // URL completa para la consulta de un plano por nombre y autor.
                url: apiUrl + authname + '/' + bpname,
                type: 'GET',          // Tipo de solicitud HTTP: GET.
                dataType: 'json',    // Tipo de datos esperado en la respuesta: JSON.
                success: function (data) {
                    // Manejo de éxito: llama al callback con los datos recibidos.
                    callback(data);
                },
                error: function (error) {
                    // Manejo de error: muestra un mensaje de error en la consola y llama al callback con un valor nulo.
                    console.error('Error al obtener plano por nombre y autor:', error);
                    callback(null);
                }
            });
        }
    };
})();
