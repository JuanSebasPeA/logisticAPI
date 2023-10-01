//Controlador de las rutas
//Este controlador contiene una función para crear una ruta a partir de dos puntos, otras función para modificar una ruta y otra función para eliminar una ruta.
require("dotenv").config();

//Importando el modelo de las rutas
const Route = require("../models/Rout");
//Importando el modelo de los puntos
const PointsSchema = require("../models/Points");
const axios = require("axios");



//---------------------------------------------------------------------------------------
//Función para crear una ruta
const createRoute = async (req, res) => {
  // se obtienen los puntos de la petición, donde vendrán los id de los puntos
  const { points } = req.body;

  //DEBUG: console.log(points);
  //Se verifica que ambos puntos existan en la base de datos
  const point1 = await PointsSchema.findById(points[0]);
  const point2 = await PointsSchema.findById(points[1]);

  //Si alguno de los puntos no existe, se envía un mensaje de error
  if (!point1 || !point2) {
    return res.json({
      message: "Error: One of the points does not exist",
    });
  } // ciere de la condición para que existan los dos puntos

  //Se verifica que no haya una ruta con los puntos enviados
  const routeExists = await Route.findOne({
    points: [point1._id, point2._id],
  });
  //Si la ruta existe, se envía un mensaje de error
  if (routeExists) {
    return res.json({
      message: "Error: This route already exists",
    });
  } // cierre de la condición para verificar que no exista la ruta

  //Si todo salió bien se crea la ruta con los puntos enviados
  const newRoute = new Route({
    points: [point1._id, point2._id],
  });

  //Se guarda la ruta en la base de datos
  await newRoute.save();

  //Se envía un mensaje al terminar de crear la ruta
  return res.json({
    message: "Route created",
    newRoute,
  });
}; // Cirre ala función para crear puntos


//---------------------------------------------------------------------------------------
//Función para modificar una ruta
const modifyRoute = async (req, res) => {
  // Se obtiene el id de la ruta a modificar
  const { id } = req.params;
  //Se obtiene el id de los puntos a modificar
  const { points } = req.body;
  //Se verifica que la ruta exista
  const routeExists = await Route.findById(id);
  //Si la ruta no existe, se envía un mensaje de error
  if (!routeExists) {
    return res.json({
      message: "Error: This route does not exist",
    });
  }
  //Se verifica que ambos puntos existan en la base de datos
  const point1 = await PointsSchema.findOne({ pacedId: points[0] });
  const point2 = await PointsSchema.findOne({ pacedId: points[1] });
  //Si alguno de los puntos no existe, se envía un mensaje de error
  if (!point1 || !point2) {
    return res.json({
      message: "Error: One of the points does not exist",
    });
  } // ciere de la condición para que existan los dos puntos
  //Se verifica que no haya una ruta con los puntos enviados
  const newRouteExists = await Route.findOne({
    points: [point1._id, point2._id],
  });
  //Si la ruta existe, se envía un mensaje de error
  if (newRouteExists) {
    return res.json({
      message: "Error: This route already exists",
    });
  } // cierre de la condición para verificar que no exista la ruta
  // Si todo salió bien se modifica la ruta con los nuevos puntos
  const routeModified = await Route.findByIdAndUpdate(
    id,
    {
      points: [point1._id, point2._id],
    },
    { new: true }
  );

  //Se envía un mensaje al terminar de modificar la ruta
  return res.json({
    message: "Route modified",
    routeModified,
  });
}; // ciere de la función para modificar una ruta


//---------------------------------------------------------------------------------------
// Función para listar todas las rutas
const getRoutes = async (req, res) => {
  //Se obtienen todas las rutas de la base de datos
  const routes = await Route.find().populate("points");
  //Se imprimen las rutas en la consola
  //console.log('Routes', JSON.stringify(routes, null, 2));
  /* routes.forEach(route => {
        console.log('placeId1', route.points[0].location);
        console.log('placeId2', route.points[1].location);
    }); */

  //Generando mensaje para que cada ruta muestre los puntos que la conforman ccon el formato: FROM - TO
  const routesMessage = routes.map((route) => {
    return `FROM: ${route.points[0].location.name} TO: ${route.points[1].location.name}`;
  });

  //Se envían las rutas
  return res.json({
    message: "Routes",
    routesMessage,
  });
}; // ciere de la función para listar todas las rutas

//---------------------------------------------------------------------------------------
// Función para Obtener las coordenadas de los points a través de su place Id utilizando la API de Google Maps. Obtener la distancia respectiva en KM de la ruta creada
const getRoutesInfo = async (req, res) => {
  //se usa la api de google maps para obtener las coordenadas de los puntos de la ruta
  const routes = await Route.find().populate("points");
  // Se extrae la información de los puntos de la cada ruta y se almacena en un array
  const pointsRoutes = routes.map((ruta) => {
    return {
      point1: ruta.points[0].location,
      point2: ruta.points[1].location,
    };
  });

  // Con el nombre de cada punto se obtiene el elemento completo de la ruta
  const pointsRoutesComplete = pointsRoutes.map(async (ruta) => {
    console.log("punto1", ruta.point1.placeId);
    console.log("punto2", ruta.point2.placeId);

    // Se obtiene el elemento completo de cada punto
    const point1 = await PointsSchema.findOne({ pacedId: ruta.point1.placeId });
    const point2 = await PointsSchema.findOne({ pacedId: ruta.point2.placeId });
  });

  //obteniendo las coordenadas
  const pointsRoutesCoordinates = pointsRoutes.map((route) => {
    // Se obtienen las coordenadas de cada punto de la ruta usando la API de Google Maps y el placeId de cada punto
    const coordinates = axios
      .get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${route.point1.placeId}&fields=geometry&key=${process.env.API_KEY}`
      )
      .then((res) => {
        // DEBUG:
        console.log(res.data.result.geometry.location);
        // se retorna la coordenada del punto
        return res.data.result.geometry.location;
      })
      .catch((err) => {
        console.log(err);
      });
    return coordinates;
  });


  //Controlador para eliminar una ruta dado su id
const deleteRoute = async (req, res) => {
  // Se obtiene el id de la ruta a eliminar
  const { id } = req.params;
  //Se verifica que la ruta exista
  const routeExists = await Route.findById(id);
  //Si la ruta no existe, se envía un mensaje de error
  if (!routeExists) {
    return res.json({
      message: "Error: This route does not exist",
    });
  }
  //Si todo salió bien se elimina la ruta
  await Route.findByIdAndDelete(id);
  //Se envía un mensaje al terminar de eliminar la ruta
  return res.json({
    message: "Route deleted",
  });
}; // ciere de la función para eliminar una ruta


  // Se obtiene la distancia entre los puntos de cada ruta usando la API de Google Maps y el placeId de cada punto
  const distanceRoutes = pointsRoutes.map((route) => {
    // Se obtiene la distancia entre los puntos de cada ruta usando la API de Google Maps y el placeId de cada punto
    const distance = axios
      .get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=place_id:${route.point1.placeId}&destinations=place_id:${route.point2.placeId}&key=${process.env.API_KEY}`
      )
      .then((res) => {
        // DEBUG:
        console.log(res.data.rows[0].elements[0].distance.text);
        // se retorna la distancia entre los puntos de la ruta
        return res.data.rows[0].elements[0].distance.text;
      })
      .catch((err) => {
        console.log(err);
      });
    return distance;
  });

  // Se agrega en un mismo arreglo toda la información de las rutas
  const routesInfo = routes.map((route, index) => {
    return {
      route: route,
      coordinates: pointsRoutesCoordinates[index],
      distance: distanceRoutes[index],
    };
  });

  // Se envía la información de las rutas
  return res.json({
    message: "Routes Info",
    routesInfo,
  });
}; // cierre de función con la información de las rutas

module.exports = {
  createRoute,
  modifyRoute,
  getRoutes,
  deleteRoute,
  getRoutesInfo,
};
