import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(() => ({
  root: {},
}));

const Header = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h1" variant="h3">
            Usuários cadastrados
          </Typography>
        </Grid>
        <Grid item>
          <Button
            component={RouterLink}
            to="/usuarios/criar"
            color="primary"
            variant="contained"
          >
            <AddIcon className={classes.addIcon} />
            Cadastrar novo usuário
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
