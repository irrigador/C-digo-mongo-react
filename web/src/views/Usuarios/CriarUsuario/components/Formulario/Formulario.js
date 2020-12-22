/**
 * @file Formulario.js
 * @author Bene Lemuel Dantas Gondim
 * @description Componente do fomulário de criação de um novo usuário do sistema
 * @version 0.0.1
 *
 * @license Copyright (c) 2020 SIGEP DIGETI ITEP/RN
 */

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Select,
  MenuItem,
  Grid,
} from "@material-ui/core";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import axios from "utils/axios";
import validate from "validate.js";

import { criarUsuario } from "actions";

import useRouter from "utils/useRouter";

const useStyles = makeStyles((theme) => ({
  root: {},
  alert: {
    marginBottom: theme.spacing(3),
  },
  formGroup: {
    marginBottom: theme.spacing(3),
  },
  fieldGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
  },
  fieldHint: {
    margin: theme.spacing(1, 0),
  },
  tags: {
    marginTop: theme.spacing(1),
    "& > * + *": {
      marginLeft: theme.spacing(1),
    },
  },
  flexGrow: {
    flexGrow: 1,
  },
  dateField: {
    "& + &": {
      marginLeft: theme.spacing(2),
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const schema = {
  nome: {
    presence: { allowEmpty: false, message: "^Nome é obrigatório" },
  },
  sobrenome: {
    presence: { allowEmpty: false, message: "^Sobrenome é obrigatório" },
  },
  cpf: {
    format: {
      pattern: "[0-9]{3}[.][0-9]{3}[.][0-9]{3}[-][0-9]{2}",
      message: "^CPF inválido",
    },
    presence: { allowEmpty: false, message: "^CPF é obrigatório" },
  },
  email: {
    email: {
      message: "^Email inválido",
    },
    presence: { allowEmpty: false, message: "^E-mail é obrigatório" },
  },
  senha: {
    presence: { allowEmpty: false, message: "^Senha é obrigatória" },
  },
};

const Formulario = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
    cpfValido: false,
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  /**
   * @description Formata o Input CPF
   *
   * @param {*} value valor do campo CPF
   */
  const cpfMask = (value) => {
    return value
      .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, "$1.$2") // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1"); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  };

  /**
   * @description Obtem modificações dos dados inseridos no formulário
   *
   * @param {*} event Informações do input do formulário
   */
  const handleChange = (event) => {
    event.persist();
    {
      event.target.name === "cpf"
        ? setFormState((formState) => ({
            ...formState,
            values: {
              ...formState.values,
              [event.target.name]:
                event.target.type === "checkbox"
                  ? event.target.checked
                  : cpfMask(event.target.value),
            },
            touched: {
              ...formState.touched,
              [event.target.name]: true,
            },
          }))
        : setFormState((formState) => ({
            ...formState,
            values: {
              ...formState.values,
              [event.target.name]:
                event.target.type === "checkbox"
                  ? event.target.checked
                  : event.target.value,
            },
            touched: {
              ...formState.touched,
              [event.target.name]: true,
            },
          }));
    }
    /**
     * @description Caso o input modificado seja o do CPF ferifique sua validade
     */
    if (event.target.name === "cpf") {
      setFormState((formState) => ({
        ...formState,
        cpfValido: validateCPF(event.target.value),
      }));
    }
  };

  /**
   * @description Valida o número de CPF
   *
   * @param {String} number String com o número do CPF
   * @returns {Boolean} Caso o CPF seja um número válido
   */
  const validateCPF = (number) => {
    var cpf = number.replace(/[/.-]/g, ""); //! Limpar os possiveis caracteres ".", "-" e " " que venham junto aos números do CPF

    var Soma = 0;
    var Resto;

    for (var i = 1; i <= 9; i++) {
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) {
      Resto = 0;
    }

    if (Resto !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    Soma = 0;

    for (var i = 1; i <= 10; i++) {
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) {
      Resto = 0;
    }

    if (Resto !== parseInt(cpf.substring(10, 11))) {
      return false;
    }

    return true;
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  /**
   * @description Define a ação ao enviar o formulário
   *
   * @param {*} event Informações do formulário
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formState.cpfValido && formState.isValid) {
      await dispatch(
        criarUsuario(formState, router, props.session.usuario.token)
      );
    }
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <form
          id="form-novo-usuario"
          onSubmit={handleSubmit}
          {...rest}
          className={clsx(classes.root, className)}
        >
          <CardHeader title="Dados gerais" />
          <Grid
            className={classes.fieldGroup}
            alignItems="center"
            container
            justify="space-between"
          >
            <Grid className={classes.item} item md={6} sm={12} xs={12}>
              <FormControl style={{ minWidth: "100%" }}>
                <TextField
                  error={hasError("nome")}
                  fullWidth
                  helperText={
                    hasError("nome") ? formState.errors.nome[0] : null
                  }
                  label="Nome"
                  name="nome"
                  onChange={handleChange}
                  value={formState.values.nome || ""}
                  multiline
                  required
                />
              </FormControl>
            </Grid>
            <Grid className={classes.item} item md={5} sm={12} xs={12}>
              <FormControl style={{ minWidth: "100%" }}>
                <TextField
                  error={hasError("sobrenome")}
                  fullWidth
                  helperText={
                    hasError("sobrenome") ? formState.errors.sobrenome[0] : null
                  }
                  label="Sobrenome"
                  name="sobrenome"
                  onChange={handleChange}
                  value={formState.values.sobrenome || ""}
                  multiline
                  required
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            className={classes.fieldGroup}
            alignItems="center"
            container
            justify="space-between"
          >
            <Grid className={classes.item} item md={3} sm={3} xs={12}>
              <FormControl style={{ minWidth: "100%" }}>
                <TextField
                  error={
                    hasError("cpf") ||
                    (formState.touched.cpf && !formState.cpfValido)
                  }
                  fullWidth
                  helperText={
                    hasError("cpf") ||
                    (formState.touched.cpf && !formState.cpfValido)
                      ? "Digite um CPF válido"
                      : null
                  }
                  label="CPF"
                  name="cpf"
                  onChange={handleChange}
                  value={formState.values.cpf || ""}
                  required
                />
              </FormControl>
            </Grid>
            <Grid className={classes.item} item md={2} sm={2} xs={12}>
              <FormControl style={{ minWidth: "100%" }}>
                <TextField
                  error={hasError("matricula")}
                  fullWidth
                  helperText={
                    hasError("matricula") ? formState.errors.matricula[0] : null
                  }
                  label="Matrícula"
                  name="matricula"
                  onChange={handleChange}
                  value={formState.values.matricula || ""}
                  multiline
                  required
                />
              </FormControl>
            </Grid>
            <Grid className={classes.item} item md={3} sm={3} xs={12}>
              <FormControl style={{ minWidth: "100%" }}>
                <TextField
                  error={hasError("email")}
                  fullWidth
                  helperText={
                    hasError("email") ? formState.errors.email[0] : null
                  }
                  label="E-mail"
                  name="email"
                  onChange={handleChange}
                  value={formState.values.email || ""}
                  multiline
                  required
                />
              </FormControl>
            </Grid>
            <Grid className={classes.item} item md={3} sm={3} xs={12}>
              <FormControl style={{ minWidth: "100%" }}>
                <TextField
                  error={hasError("senha")}
                  fullWidth
                  helperText={
                    hasError("senha") ? formState.errors.senha[0] : null
                  }
                  label="Senha"
                  name="senha"
                  onChange={handleChange}
                  value={formState.values.senha || ""}
                  type="password"
                  required
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

Formulario.propTypes = {
  className: PropTypes.string,
};

export default Formulario;
