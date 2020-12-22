/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import validate from "validate.js";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Button, TextField, Grid } from "@material-ui/core";

import useRouter from "utils/useRouter";
import { login } from "actions";

import { Alert } from "components";

const schema = {
  cpf: {
    format: {
      pattern:
        "([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})",
      message: "^Digite um CPF válido",
    },
    presence: { allowEmpty: false, message: "^CPF é obrigatório" },
  },
  senha: {
    presence: { allowEmpty: false, message: "^Senha é obrigatório" },
  },
};

const useStyles = makeStyles((theme) => ({
  root: {},
  fields: {
    margin: theme.spacing(-1),
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      flexGrow: 1,
      margin: theme.spacing(1),
    },
  },
  alert: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
}));

const LoginForm = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const [alertOpen, setAlertOpen] = useState(true);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(login(formState, router));
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <form
      {...rest}
      className={clsx(classes.root, className)}
      onSubmit={handleSubmit}
    >
      <div className={classes.alert}>
        {session.userNotFound || session.wrongPassword ? (
          <Alert
            variant="error"
            message={
              session.userNotFound
                ? "Usuário não encontrado"
                : "Senha incorreta"
            }
          />
        ) : null}
      </div>

      <div className={classes.fields}>
        <TextField
          error={
            hasError("cpf") || (formState.touched.cpf && !formState.cpfValido)
          }
          fullWidth
          helperText={
            hasError("cpf") || (formState.touched.cpf && !formState.cpfValido)
              ? "Digite um CPF válido"
              : null
          }
          label="CPF"
          name="cpf"
          onChange={handleChange}
          value={formState.values.cpf || ""}
          variant="outlined"
        />
        <TextField
          error={hasError("senha")}
          fullWidth
          helperText={hasError("senha") ? formState.errors.senha[0] : null}
          label="Senha"
          name="senha"
          onChange={handleChange}
          type="password"
          value={formState.values.senha || ""}
          variant="outlined"
        />
      </div>

      <Button
        className={classes.submitButton}
        color="secondary"
        disabled={!formState.isValid}
        size="large"
        type="submit"
        variant="contained"
      >
        Entrar
      </Button>
    </form>
  );
};

LoginForm.propTypes = {
  className: PropTypes.string,
};

export default LoginForm;
