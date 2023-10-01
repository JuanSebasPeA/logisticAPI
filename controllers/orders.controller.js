// Controlador para obtener las ordenes, modificar el status de una orden y eliminar una orden.

const OrderSchema = require("../models/Orders");

const getOrders = async (req, res) => {
  try {
    const orders = await OrderSchema.find().populate("route").populate("truck");
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}; // cierre de función para obtener las ordenes

const modifyOrderStatus = async (req, res) => {
  //Primero se obtiene el id de la orden desde la url
  const { id } = req.params;
  //Se obtiene el nuevo status desde el body
  const { status } = req.body;
  try {
    // Se busca la orden por el id en la base de datos
    const order = await OrderSchema.findById(id);
    // Si no se encuentra la orden, se regresa un mensaje de error
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    } else {
      // Se modifica el status de la orden
      order.status = status;
      // Se guarda la orden con el nuevo status
      await order.save();
      // Se regresa la orden con el nuevo status
      return res.json({
        message: "Order status modified",
        order,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}; // cierre de la función para modificar el status de una orden

const deleteOrder = async (req, res) => {
  // Se obtiene el id de la orden desde la url
  const { id } = req.params;
  //Se busca la orden en la base de datos, y si no está se regresa un mensaje de error
  try {
    const order = await OrderSchema.findById(id);
    //DEBUG: console.log(order);
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    } else {
      // Si el estado de la orden es "In progress" no se puede eliminar
      //console.log(order.status);
      if (order.status === "In progress") {
        return res.json({
          message: "ERROR: This order is in progress",
        });
      } else {
        // Se elimina la orden
        await order.remove();
        return res.json({
          message: "Order deleted",
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error: Ths order could not be deleted because it is in progress",
    });
  }
}; // cierre de la función para eliminar una orden


//Controlador para asignar un camión válido a una orden
const assignTruck = async (req, res) => {
  // Se obtiene el id de la orden a la cual se le va a asignar un camión
  const { id } = req.params;
  // Se obtiene el id del camión a asignar
  const { truck } = req.body;
  // Se verifica que la orden y el camión existan
  const orderExists = await Order.findById(id);
  const truckExists = await Truck.findById(truck);
  // Si la orden o el camión no existen, se envía un mensaje de error
  if (!orderExists || !truckExists) {
      return res.json({
          message: "Error: This order or truck does not exist",
      });
  }
  // Se asigna el camión a la orden
  orderExists.truck = truck;
  // se guarda la orden con el camión asignado
  await orderExists.save();
  // Se envía un mensaje al terminar de asignar el camión
  return res.json({
      message: "Truck assigned",
      orderExists,
  });

}; // cierre de la función para asignar un camión a una orden


module.exports = {
  getOrders,
  modifyOrderStatus,
  deleteOrder,
  assignTruck,
}; // cierre de exports
