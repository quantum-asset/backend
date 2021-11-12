import express from "express";
import { TomaInventarioController } from "../controller/TomaInventarioController/TomaInventarioController.js";
import { Response } from "../response/Response.js";

const TomaInventarioRouter = express.Router();
const controller = new TomaInventarioController();
//TomaInventarioRouter = express.Router();

//listar todas las tomas de inventario
//mejora, con usuarios y locaciones
//y ademas querys en la tabla  TOMA_INVENTARIO
TomaInventarioRouter.get("", async (req, res) => {
  /*   const q = req.query;
  const respuesta = await controller.list({
    filtrosKeys: Object.keys(q),
    filtrosValues: Object.values(q),
  });
  res.status(200).send(respuesta); */
  //     /toma-inventario?
  const q = req.query;
  const respuestaTomaInventario = await controller.list({
    filtrosKeys: Object.keys(q),
    filtrosValues: Object.values(q),
  });
  console.log("tomas de inv", respuestaTomaInventario.payload);
  const tomasDeInventario = respuestaTomaInventario.payload;

  let responseTomaInventario = [];
  if (tomasDeInventario && tomasDeInventario.length > 0) {
    for (let i = 0; i < tomasDeInventario.length; i++) {
      const currentTomaInventario = tomasDeInventario[i];
      //listo las locaciones de esta toma de inventario
      const listaTomasInventarioLocaciones = await controller.listLocaciones({
        filtrosKeys: ["ID_TOMA_INVENTARIO"],
        filtrosValues: [currentTomaInventario.ID_TOMA_INVENTARIO],
      });
      //listo los usuarios asociados, los activos no, porque podrian
      //agregarse activos a la locacion antes de la realizacion de la toma de inventario
      const listaTomasInventarioUsuarios = await controller.listUsers({
        filtrosKeys: ["ID_TOMA_INVENTARIO"],
        filtrosValues: [currentTomaInventario.ID_TOMA_INVENTARIO],
      });
      //retorno el objeto completo
      responseTomaInventario.push({
        TOMA_INVENTARIO: currentTomaInventario,
        LOCACIONES: listaTomasInventarioLocaciones.payload,
        USUARIOS: listaTomasInventarioUsuarios.payload,
      });
    }
    res
      .status(200)
      .send(
        Response.ok(
          "success",
          responseTomaInventario,
          "Se listaron correctamente las tomas de inventario"
        )
      );
  } else {
    //error al listar
    res
      .status(500)
      .send(
        Response.error(
          "Ocurrió un error al registrar la toma de invemntario. Por favor, intentelo nuevamente"
        )
      );
  }
  /// listar tomas de inventario
  /// por cada ID_TOMA_INVENTARIO
  // buscar usuarios
  // buscar locaciones
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
    const respuestaTomaInventario = await controller.store([TOMA_INVENTARIO]);

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
        res.status(200).send(
          Response.ok(
            "ok",
            {
              responseInventario: respuestaTomaInventario,
              responseUsuarios: respuestaTomaInventarioUsuarios,
              responseInventarioLocaciones: respuestaTomaInventarioLocaciones,
            },
            "Se registraron correctamente la toma de inventarios con sus locaciones y usuarios"
          )
        );
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
  }
});

///////////////////////////////////////////////////////////////
//                          USUARIO x TOMA INVENTARIO
///////////////////////////////////////////////////////////////

//listart tomas de inventario desde un ID_USUARIO
TomaInventarioRouter.get("/usuario/:id", async (req, res) => {
  //array de usuarios para asociar a una toma de inventario
  const id = req.params.id;
  if (!id) {
    res.status(500).send(Response.error("No se envio el id de usuario"));
  }
  const respuestaUsuarioXTomaInventario = await controller.listUsers({
    filtrosKeys: ["USUARIO.ID_USUARIO"],
    filtrosValues: [id],
  });

  console.log(
    "respuestaUsuarioXTomaInventario",
    respuestaUsuarioXTomaInventario
  );
  const listaUsuariosXTomaInventario = JSON.parse(
    JSON.stringify(respuestaUsuarioXTomaInventario)
  ).payload;
  //confirmo que haya al menos 1
  if (listaUsuariosXTomaInventario.length === 0) {
    res
      .status(200)
      .send(Response.ok("ok", [], "No hay Usuarios con el id seleccionado"));
  }

  // Tengo una lista de ID_TOMA_INVENTARIO DEL USUARIO
  const usuariosXTomaInventario = listaUsuariosXTomaInventario;
  //continiuar solo si se encontrol a las tomas de inventario dado el usuario

  if (usuariosXTomaInventario) {
    let tomasDeInventarioXUsuario = [];

    //por cada toma de inventario encontrada
    for (let i = 0; i < usuariosXTomaInventario.length; i++) {
      const currentUTI = usuariosXTomaInventario[i];
      const { ID_TOMA_INVENTARIO } = currentUTI;
      console.log("currentUTI", currentUTI);
      console.log("ID_TOMA_INVENTARIO", ID_TOMA_INVENTARIO);

      //busco al objeto de Toma de inventario
      const respuestaTomasInventario = await controller.list({
        filtrosKeys: ["ID_TOMA_INVENTARIO"],
        filtrosValues: [ID_TOMA_INVENTARIO],
      });
      console.log("respuestaTomasInventario", respuestaTomasInventario);

      const tomasInventario = respuestaTomasInventario.payload;
      /// por cada toma de INventario busco locaciones

      for (let j = 0; j < tomasInventario.length; j++) {
        const currentTI = tomasInventario[j];
        const { ID_TOMA_INVENTARIO } = currentTI;

        const respuestaLocacionesCurrent = await controller.listLocaciones({
          filtrosKeys: ["ID_TOMA_INVENTARIO"],
          filtrosValues: [ID_TOMA_INVENTARIO],
        });

        tomasDeInventarioXUsuario.push({
          TOMA_INVENTARIO: {
            ...currentTI,
            ...{ LOCACIONES: respuestaLocacionesCurrent.payload },
          },
        });
      }

      //busco las locaciones por cada toma de inventario
    }

    res
      .status(200)
      .send(
        Response.ok(
          "success",
          tomasDeInventarioXUsuario,
          "Se listaron correctamente las tomas de inventario por usuario y locaciones"
        )
      );
  } else {
    //error
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
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
TomaInventarioRouter.get("/activo", async (req, res) => {
  try {
    const { ID_LOCACION, ID_TOMA_INVENTARIO_X_LOCACION } = req.query;
    const respuestaTomaInventarioXActivo =
      await controller.listActivoXTomaInventarioXLcacion(
        ID_LOCACION,
        ID_TOMA_INVENTARIO_X_LOCACION
      );
    console.log("tomas de inv", respuestaTomaInventarioXActivo.payload);
    res.status(200).send(respuestaTomaInventarioXActivo);
  } catch (error) {
    console.log("error", error);
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});
/**
 * req.body = [{ID_A,ID_TOMA_INV_LOC,ID_USUARIO},{},{},{},{}]
 */
TomaInventarioRouter.post("/activo", async (req, res) => {
  try {
    const respuestaTomaInventarioXActivo =
      await controller.addActivoXTomaInventarioXLcacion(req.body);
    res.status(200).send(respuestaTomaInventarioXActivo);
  } catch (error) {
    console.log("error", error);
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

TomaInventarioRouter.post("/activo/evidencia", async(req, res) => {
  //insert into EVIDENCIA, con el id
  //guardar en EFS
  //insert into archivo
});
// Editar toma de inventario de un activo
TomaInventarioRouter.put("/locaciones/:idLocacion/:idTomaInventario", async(req, res) => {
  try {
    const respuesta = await controller.editLocacionXTomaInventario(req.params.idLocacion,req.params.idTomaInventario, req.body);
    res.status(200).send(respuesta);
  } catch (error) {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

/////// CONTINUA GESTION TOMAS DE INVENTARIO
// Procesar toma de inventario
//fecha fin automatica
//obsevaciones
//por procesar
TomaInventarioRouter.put("/:id", async (req, res) => {
  try {
    const respuesta = await controller.edit(req.params.id, req.body);
    res.status(200).send(respuesta);
  } catch (error) {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

//eliminar 1
TomaInventarioRouter.delete("", async (req, res) => {
  const respuesta = await controller.remove(req.query.id);
  if (respuesta) {
    res.status(200).send(respuesta);
  } else {
    res.status(500).send(Response.error("Ocurrió un error inesperado"));
  }
});

export { TomaInventarioRouter };
