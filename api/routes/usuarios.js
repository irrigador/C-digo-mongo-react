/**
 * @description Rota que trata da manipulação de usuários no sistema
 * @author Bene Lemuel Dantas Gondim
 * @file usuarios.js
 *
 * @license Copyright (c) 2020 SIGEP DIGETI ITEP/RN
 */

const express = require("express");
const router = express.Router();

const Usuario = require("../models/usuario.model");

router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.route("/criar").post((req, res) => {
  new Usuario(req.body).save((err, usuario) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "Usuario registrado com sucesso!", usuario });
    }
  });
});

module.exports = router;
