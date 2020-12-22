import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";

import axios from "utils/axios";

import { Page } from "components";
import { Header, Results } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  results: {
    marginTop: theme.spacing(3),
  },
}));

const Usuarios = () => {
  const classes = useStyles();
  const session = useSelector((state) => state.session);

  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const fetchDados = async () => {
      setCarregando(true);
      try {
        const response = await axios.get("/usuarios/", {
          headers: {
            Authorization: "Bearer " + session.usuario.token,
          },
        });
        setDados(response.data);
        setCarregando(false);
      } catch (error) {
        console.log(error);
        setCarregando(false);
      }
    };

    fetchDados();
  }, []);

  return (
    <Page className={classes.root} title="Usuarios - SIGEP">
      <Header />
      {dados && (
        <Results
          session={session}
          carregando={carregando}
          className={classes.results}
          dados={dados}
        />
      )}
    </Page>
  );
};

export default Usuarios;
