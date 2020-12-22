import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import axios from "utils/axios";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  List,
  Button,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {},
  carregando: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  inner: {
    minWidth: 400,
  },
  actions: {
    justifyContent: "flex-end",
  },
  arrowForwardIcon: {
    marginLeft: theme.spacing(1),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const DetailPanel = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(false);

  //CONTROLE DAS TABS
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchDados = async () => {
      setCarregando(true);
      try {
        const response = await axios.get(`/usuarios/${props.id}`, {
          headers: {
            Authorization: "Bearer " + props.session.usuario.token,
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
    <Card {...rest} className={clsx(classes.root, className)}>
      <Divider />
      <AppBar color="transparent" position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Dados pessoais" {...a11yProps(0)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {carregando ? (
          <div className={classes.carregando}>
            <CircularProgress disableShrink />
          </div>
        ) : (
          <CardContent className={classes.content}>
            <PerfectScrollbar>
              <Table className={classes.table} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row"></TableCell>
                    <TableCell align="right">
                      <Link to={{ pathname: "/usuarios/editar", id: props.id }}>
                        <Button color="secondary" startIcon={<EditIcon />}>
                          Editar detalhes
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Typography variant="h5">Identificação:</Typography>
                    </TableCell>
                    <TableCell align="left"> {props.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Typography variant="h5">
                        Nome completo do usuario:
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      {dados.nome} {dados.sobrenome}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </PerfectScrollbar>
          </CardContent>
        )}
      </TabPanel>
    </Card>
  );
};

DetailPanel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default DetailPanel;
