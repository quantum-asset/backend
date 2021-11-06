import express from "express";
import { TomaInventarioController } from "../controller/TomaInventarioController/TomaInventarioController";

const TomaInventarioRouter = express.Router();
const controller = new TomaInventarioController();
//TomaInventarioRouter = express.Router();

//listar todas las tomas de inventario
//mejora, con usuarios y locaciones
TomaInventarioRouter.get("", async (req, res) => {
  const q = req.query;
  const respuesta = await controller.list({
    filtrosKeys: Object.keys(q),
    filtrosValues: Object.values(q),
  });
  res.status(200).send(respuesta);
});

//Crear toma de inventario
TomaInventarioRouter.post("", async (req, res) => {
  //must be an array
  const { TOMA_INVENTARIO, USUARIOS, LOCACIONES } = req.body;
  if (!TOMA_INVENTARIO || !USUARIOS || !LOCACIONES) {
    res
      .status(500)
      .send(
        Response.error(
          "Datos incompletos: Debe enviar un objeto de toma de inventario y una lista de usuarios y otra de locaiciones"
        )
      );
  } else {
    //le doy el objeto de toma de inventario
    const respuestaTomaInventario = await controller.store(TOMA_INVENTARIO);

    const { insertId, affectedRows } = respuestaTomaInventario.payload;
    console.log("Toma de inventario ID: ", insertId);
    if (affectedRows === 1 && insertId !== 0) {
      //ok
      //con el id, inserto los usuarios y locaciones
      const respuestaTomaInventarioUsuarios = await controller.addUsers(
        insertId,
        USUARIOS
      );
      const respuestaTomaInventarioLocaciones = await controller.addLocaciones(
        insertId,
        LOCACIONES
      );

      if (
        respuestaTomaInventarioUsuarios &&
        respuestaTomaInventarioLocaciones
      ) {
        res
          .status(200)
          .send({
            ...respuestaTomaInventario,
            ...respuestaTomaInventarioUsuarios,
            ...respuestaTomaInventarioLocaciones,
          });
      } else {
        //intente nuevamente
        res
          .status(500)
          .send(
            Response.error(
              "Ocurrió un error al registrar la toma de invemntario. Por favor, intentelo nuevamente"
            )
          );
      }
    } else {
      //intente nuevamente
      res
        .status(500)
        .send(
          Response.error(
            "Ocurrió un error al registrar la toma de invemntario. Por favor, intentelo nuevamente"
          )
        );
    }

    if (respuesta) {
      res.status(200).send(respuesta);
    } else {
      res.status(500).send(Response.error("Ocurrió un error inesperado"));
    }
  }
});

// Procesar toma de inventario
TomaInventarioRouter.put(":id", async (req, res) => {
  const respuesta = await controller.edit(req.params.id, req.body);

  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

//eliminar 1
TomaInventarioRouter.delete(":id", (req, res) => {
  const respuesta = await controller.remove(req.query.id);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

///////////////////////////////////////////////////////////////
//                          USUARIO x TOMA INVENTARIO
///////////////////////////////////////////////////////////////

//asociar usuarios a una toma de inventario
TomaInventarioRouter.post("/usuario/:id", (req, res) => {
  //array de usuarios para asociar a una toma de inventario
});

///////////////////////////////////////////////////////////////
//                    TOMA INVENTARIO  x     LOCACION
///////////////////////////////////////////////////////////////

// Asociar locaciones a la toma de inventario
TomaInventarioRouter.post("/locacion", (req, res) => {
  //array de locaciones para asociar a una toma de inventario
});

///////////////////////////////////////////////////////////////
//                      TOMA INVENTARIO  x LOCACION x ACTIVO
///////////////////////////////////////////////////////////////

// Registrar toma de inventario de un activo
TomaInventarioRouter.post("/activo", (req, res) => {});

TomaInventarioRouter.post("/activo/evidencia", (req, res) => {
  //insert into EVIDENCIA, con el id
  //guardar en EFS
  //insert into archivo
});
// Editar toma de inventario de un activo
TomaInventarioRouter.put("/locaciones", (req, res) => {});

export { TomaInventarioRouter };
