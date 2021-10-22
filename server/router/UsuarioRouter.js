import express from "express";

const UsuarioRouter = express.Router();

//UsuarioRouter = express.Router();

//listar todo
UsuarioRouter.get("", async (req, res) => {});

//insertar 1 o varios
UsuarioRouter.post("", async (req, res) => {
  


});

//editar uno
UsuarioRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
});

//eliminar 1
UsuarioRouter.delete("/:id", async (req, res) => {});

export { UsuarioRouter };
