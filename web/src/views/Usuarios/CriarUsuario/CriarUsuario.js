/**
 * @file CriarUsuario.js
 * @author Allan de Miranda Silva
 * @author Bene Lemuel Dantas Gondim
 * @description Componente da página de criação de um novo usuário no sistema
 * @version 0.0.1
 *
 * @license Copyright (c) 2020 SIGEP DIGETI ITEP/RN
 */

import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Button } from "@material-ui/core";

import { Page } from "components";
import { Header, Formulario } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: "100%",
    margin: "0 auto",
    padding: theme.spacing(3, 3, 6, 3),
  },
  aboutAuthor: {
    marginTop: theme.spacing(3),
  },
  aboutProject: {
    marginTop: theme.spacing(3),
  },
  projectCover: {
    marginTop: theme.spacing(3),
  },
  projectDetails: {
    marginTop: theme.spacing(3),
  },
  preferences: {
    marginTop: theme.spacing(3),
  },
  actions: {
    marginTop: theme.spacing(3),
  },
}));

const CriarUsuario = () => {
  const session = useSelector((state) => state.session);
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Cadastrar Usuário - SIGEP">
      <Header />
      <Formulario session={session} className={classes.aboutProject} />
      <div className={classes.actions}>
        <Button
          form="form-novo-usuario"
          type="submit"
          color="primary"
          variant="contained"
        >
          Cadastrar usuário
        </Button>
      </div>
    </Page>
  );
};

export default CriarUsuario;
