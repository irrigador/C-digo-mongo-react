/**
 * @description Ações relacionadas a manipulação de sessões no sistema
 * @author Bene Lemuel Dantas Gondim
 * @file sessionActions.js
 *
 * @license Copyright (c) 2020 SIGEP DIGETI ITEP/RN
 */
import axios from "utils/axios";

export const SESSION_LOGIN_SUCCESS = "SESSION_LOGIN_SUCCESS";
export const SESSION_LOGIN_USER_NOT_FOUND = "SESSION_LOGIN_USER_NOT_FOUND";
export const SESSION_LOGIN_WRONG_PASSWORD = "SESSION_LOGIN_WRONG_PASSWORD";
export const SESSION_LOGOUT = "SESSION_LOGOUT";

export const login = (payload, router) => {
  return async (dispatch) => {
    const login = {
      cpf: payload.values.cpf,
      senha: payload.values.senha,
    };

    axios
      .post("/auth/login", login)
      .then(function (response) {
        if (response.data.info) {
          if (response.data.info.userNotFound) {
            dispatch(
              {
                type: SESSION_LOGIN_USER_NOT_FOUND,
              },
              router.history.push(`/auth/login`)
            );
          } else if (response.data.info.wrongPassword) {
            dispatch(
              {
                type: SESSION_LOGIN_WRONG_PASSWORD,
              },
              router.history.push(`/auth/login`)
            );
          }
        } else {
          dispatch(perfilUsuario(response.data.token, router));
        }
      })
      .catch(function (error) {
        console.log(error);
        router.history.push(`/auth/login`);
      });
  };
};

//Busca as informações do usuário com base no token
export const perfilUsuario = (payload, router) => {
  return async (dispatch) => {
    axios
      .get(`/usuarios/profile`, {
        headers: {
          Authorization: "Bearer " + payload,
        },
      })
      .then(function (response) {
        dispatch(
          {
            type: SESSION_LOGIN_SUCCESS,
            usuario: {
              token: payload,
              id: response.data.user.id,
              nome: response.data.user.nome,
              cpf: response.data.user.cpf,
            },
          },
          router.history.push(`/`)
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const logout = (router) => {
  return async (dispatch) => {
    dispatch(
      {
        type: SESSION_LOGOUT,
      },
      router.history.push(`/auth/login`)
    );
  };
};
