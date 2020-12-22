import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Link,
} from "@material-ui/core";

import { Page } from "components";
import { LoginForm } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(6, 2),
  },
  card: {
    width: theme.breakpoints.values.sd,
    maxWidth: "100%",
    overflow: "unset",
    display: "flex",
    position: "relative",
    "& > *": {
      flexGrow: 1,
      flexBasis: "50%",
      width: "50%",
    },
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4),
  },
  media: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: theme.spacing(3),
    color: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
  },
  name: {
    marginTop: theme.spacing(1),
  },
  loginForm: {
    marginTop: theme.spacing(3),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  person: {
    marginTop: theme.spacing(2),
    display: "flex",
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const Login = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Login">
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <div className={classes.profile}>
            <RouterLink to="/">
              <img width={100} alt="Logo" src="/images/logos/logo.png" />
            </RouterLink>
            <Typography className={classes.name} variant="h4">
              SIGEP - ITEP/RN
            </Typography>
            <Typography variant="body2">
              Sistema Integrado de Gestão de Perícias
            </Typography>
            <Typography variant="body2">
              Instituto Técnico-Científico de Perícia
            </Typography>
            <Divider className={classes.divider} />
            <Typography gutterBottom variant="h3">
              Login
            </Typography>
          </div>

          <LoginForm className={classes.loginForm} />
          <Divider className={classes.divider} />
          <Link
            align="center"
            color="secondary"
            component={RouterLink}
            to="/auth/register"
            underline="always"
            variant="subtitle2"
          >
            Esqueceu a senha?
          </Link>
        </CardContent>
      </Card>
    </Page>
  );
};

export default Login;
