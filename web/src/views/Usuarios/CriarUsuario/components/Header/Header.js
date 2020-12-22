/**
 * @file CriarUsuario.js
 * @author Allan de Miranda Silva
 * @description Componente com o cabeçalho do formulário de criação de um novo usuário para o sistema
 * @version 0.0.1
 * 
 * @license Copyright (c) 2020 SIGEP DIGETI ITEP/RN
 */

import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
}));

const Header = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography component="h2" gutterBottom variant="overline">
        Usuarios
      </Typography>
      <Typography component="h1" variant="h3">
        Cadastrar novo usuario
      </Typography>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
