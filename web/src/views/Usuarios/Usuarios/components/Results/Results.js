import React, { forwardRef } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, CircularProgress } from "@material-ui/core";
import MaterialTable from "material-table";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import useRouter from "utils/useRouter";

import DetailPanel from "./DetailPanel";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  carregando: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  inner: {
    minWidth: 700,
  },
  nameCell: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: "flex-end",
  },
}));

const Results = (props) => {
  const { className, dados, ...rest } = props;

  const router = useRouter();
  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Card>
        {props.carregando ? (
          <div className={classes.carregando}>
            <CircularProgress disableShrink />
          </div>
        ) : (
          <CardContent className={classes.content}>
            <PerfectScrollbar>
              <div className={classes.inner}>
                <MaterialTable
                  localization={{
                    pagination: {
                      labelDisplayedRows: "{from}-{to} de {count}",
                      labelRowsSelect: "linhas",
                      nextTooltip: "Página seguinte",
                      previousTooltip: "Página anterior",
                      lastTooltip: "Última página",
                      firstTooltip: "Primeira página",
                    },
                    toolbar: {
                      nRowsSelected: "{0} linha(s) selecionadas",
                      searchPlaceholder: "Buscar",
                    },
                    header: {
                      actions: "Ações",
                    },
                    body: {
                      emptyDataSourceMessage: "Nada para mostrar",
                      filterRow: {
                        filterTooltip: "Filtro",
                      },
                    },
                  }}
                  title=""
                  columns={[{ title: "Nome", field: "nome" }]}
                  data={dados}
                  detailPanel={(rowData) => {
                    return (
                      <DetailPanel session={props.session} id={rowData._id} />
                    );
                  }}
                  onRowClick={(event, rowData, togglePanel) => togglePanel()}
                  options={{
                    actionsColumnIndex: -1,
                    search: true,
                    pageSize: 10,
                    searchFieldStyle: {
                      flexGrow: 1,
                      height: 42,
                      //padding: theme.spacing(0, 2),
                      display: "flex",
                      alignItems: "center",
                    },
                  }}
                  icons={{
                    DetailPanel: forwardRef((props, ref) => (
                      <ArrowForwardIosIcon {...props} ref={ref} />
                    )),
                    SortArrow: forwardRef((props, ref) => (
                      <ArrowDownwardIcon {...props} ref={ref} />
                    )),
                    Search: forwardRef((props, ref) => (
                      <SearchIcon {...props} ref={ref} />
                    )),
                    ResetSearch: forwardRef((props, ref) => (
                      <ClearIcon {...props} ref={ref} />
                    )),
                    NextPage: forwardRef((props, ref) => (
                      <NavigateNextIcon {...props} ref={ref} />
                    )),
                    PreviousPage: forwardRef((props, ref) => (
                      <NavigateBeforeIcon {...props} ref={ref} />
                    )),
                    FirstPage: forwardRef((props, ref) => (
                      <FirstPageIcon {...props} ref={ref} />
                    )),
                    LastPage: forwardRef((props, ref) => (
                      <LastPageIcon {...props} ref={ref} />
                    )),
                  }}
                />
              </div>
            </PerfectScrollbar>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  vestigios: PropTypes.array.isRequired,
};

Results.defaultProps = {
  vestigios: [],
};

export default Results;
