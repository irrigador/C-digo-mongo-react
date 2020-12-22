/**
 * @description Ações relacionadas a definição do state da aplicação
 * @author Bene Lemuel Dantas Gondim
 * @file sessionReducer.js
 *
 * @license Copyright (c) 2020 SIGEP DIGETI ITEP/RN
 */
import * as actionTypes from "actions";

//Estado inicial da sessão no redux
const initialState = {
  loggedIn: false,
  userNotFound: false,
  wrongPassword: false,
  usuario: {
    token: "",
    id: "",
    nome: "",
    cpf: "",
  },
};

//Trata as possibilidades de login, se sucesso, define o estado do redux armazenando as informações do usuário
const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SESSION_LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        usuario: {
          token: action.usuario.token,
          id: action.usuario.id,
          nome: action.usuario.nome,
          cpf: action.usuario.cpf,
        },
      };
    }

    case actionTypes.SESSION_LOGIN_USER_NOT_FOUND: {
      return {
        ...state,
        userNotFound: true,
      };
    }

    case actionTypes.SESSION_LOGIN_WRONG_PASSWORD: {
      return {
        ...state,
        wrongPassword: true,
      };
    }

    case actionTypes.SESSION_LOGOUT: {
      return {
        ...initialState,
      };
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;
