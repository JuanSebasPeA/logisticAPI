
# Funcionalidad de la API: 

Esta API está diseñada para gestionar un sistema de seguimiento de órdenes que involucra cinco modelos principales:
1. AUTH - Encargado de la autenticación y gestión de usuarios.
2. Points - Almacena localizaciones exactas.
3. Trucks - Permite asignar camiones a órdenes.
4. Routes - Define rutas compuestas por dos puntos.
5. Orders - Gestiona el estado, camión y ruta de las órdenes

-Autenticación (con el modelo AUTH)

La autenticación es esencial para interactuar con la API. Aquí se describen los endpoints relacionados con la autenticación:

    POST /auth/signin: Permite crear un nuevo usuario proporcionando un email y una contraseña.

    POST /auth/login: Permite iniciar sesión y genera un token de acceso para el usuario.


-Localizaciones Exactas (Points)

Los puntos exactos son utilizados para definir ubicaciones precisas en el sistema:

    GET /points: Obtiene una lista de todas las localizaciones existentes.


-Camiones (Trucks)

Los camiones son utilizados para asignarlos a las órdenes, este es el endpoint para listar los camiones:

    GET /trucks: Obtiene una lista de todos los camiones existentes.


-Rutas (Routes)

Las rutas son utilizadas para definir el camino que deben seguir los camiones para completar las órdenes:

    GET /routes: Obtiene una lista de todas las rutas existentes.

    POST /routes: Permite crear una nueva ruta proporcionando un punto de inicio y un punto de fin(que estén en la bd).

    GET /routes/info: Obtiene información sobre una ruta en específico, con distancia en km.

    PUT /routes/:id: Permite modificar una ruta existente proporcionando un punto de inicio y un punto de fin(que estén en la bd).

    DELETE /routes/:id: Permite eliminar una ruta existente, siempre y cuando no esté asignada a una orden en progresso.


-Órdenes (Orders)

Las órdenes son el elemento principal de la API, ya que son las que se encargan de gestionar el estado de las órdenes, el camión asignado y la ruta que debe seguir el camión:

    GET /orders: Obtiene una lista de todas las órdenes existentes.

    PUT /orders/:id: Permite modificar una orden existente proporcionando un estado, un camión y una ruta(que estén en la bd).

    DELETE /orders/:id: Permite eliminar una orden existente, siempre y cuando no esté en progresso.

    PUT /orders/trucks/:id: Permite asignar un camión a una orden existente.



# Cómo se abordó el problema:

Para abordar el problema se implementó una API RESTful con Node.js y Express.js, utilizando una base de datos no relacional MongoDB y un ORM llamado Mongoose. 

La primera parte de la API se basa en un signin (registro) y login (inicio de sesión) para la autenticación de los usuarios. Para esto se utilizó el modelo AUTH, el cual se encarga de gestionar los usuarios y sus credenciales. La autenticación es esencial para interactuar con la API, ya que se requiere un token de acceso para poder realizar cualquier petición.

El desarrollo de la solución a nivel interno se basó principalmente en la separación de los modelos, rutas y controladores, aegurando un bajo acomplamiento entre cada uno de los componentes de la API. Primero se trabajó en los modelos, rutas y controladores indeoendientes o que no dependen estrictamente de otros modelos. El orden en que se fueron trabajando los modelos fue el siguiente: Points, Trucks, Routes y Orders.

Para el modelo Points se implementó un CRUD básico, ya que no se requiere de ninguna funcionalidad adicional. Para el modelo Trucks se implementó un CRUD básico. Para el modelo Routes se implementó un CRUD básico, pero se agregó un método para obtener la distancia entre dos puntos, utilizando la API de Google Maps. Para el modelo Orders se implementó un CRUD básico, pero se agregó un método para asignar un camión a la orden.
    

ENDPOINTS: 
            /api/login --> POST
            /api/signin --> POST
            /api/users --> GET
            /api/points --> GET
            /api/trucks --> GET
            /api/routes --> GET
            /api/orders --> GET
            /api/orders/truck/:id --> PUT
            /api/orders/:id --> PUT
            /api/orders/:id --> DELETE
            /api/routes/:id --> PUT
            /api/routes/:id --> DELETE"
            /api/routes/info  --> GET