/**
 * @file usuariosActions.js
 * @author Bene Lemuel Dantas Gondim
 * @description Ações relacionadas a manipulação dos usuários do sistema
 * @version 0.0.1
 *
 * @license Copyright (c) 2020 SIGEP DIGETI ITEP/RN
 */

import axios from "utils/axios";

export const CRIAR_USUARIO_SUCESSO = "CRIAR_USUARIO_SUCESSO";

/**
 * @description Define a criação de um novo usuário para o sistema
 *
 * @param {*} payload Valores necessário para criar um novo usuário
 * @param {*} router Rota da página
 * @returns Dados do novo usuário
 */
export const criarUsuario = (payload, router, token) => {
  return async (dispatch) => {
    const novoUsuario = {
      nome: payload.values.nome,
      sobrenome: payload.sobrenome,
      cpf: payload.values.cpf,
      matricula: payload.values.matricula,
      email: payload.values.email,
    };

    axios
      .post("/usuarios/criar", novoUsuario, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(function (response) {
        dispatch(router.history.push(`/usuarios/`));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
