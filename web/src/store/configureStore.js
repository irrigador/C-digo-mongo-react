/**
 * @description Configuração do store do Redux
 * @author Bene Lemuel Dantas Gondim
 * @file configureStore.js
 *
 * @license Copyright (c) 2020 SIGEP DIGETI ITEP/RN
 */

import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";

import rootReducer from "reducers";
import axios from "utils/axios";

//LOGGER
function logger({ getState }) {
  return (next) => (action) => {
    const log = {
      antes: getState(),
      action: action,
      depois: null,
    };
    // console.log("state antes do dispatch", getState());
    // console.log("ação do dispatch", action);

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action);

    // console.log("state depois do dispatch", getState());
    log.depois = getState();
    // console.log(log);

    // axios
    //   .post("/logger/criar", log)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  };
}

// const loggerMiddleware = createLogger();

export default function configureStore(preloadedState = {}) {
  const middlewares = [thunkMiddleware, logger]; // loggerMiddleware
  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
