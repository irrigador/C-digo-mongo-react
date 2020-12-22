import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import ptBRLocale from "date-fns/locale/pt-BR";

const SelecionarData = (props) => {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.callback(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBRLocale}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          variant="inline"
          format="dd/MM/yyyy"
          maxDate={Date.now()}
          maxDateMessage="Selecione uma data anterior ao dia de hoje"
          id={props.label}
          label={props.label}
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

SelecionarData.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  state: PropTypes.string,
  onFilter: PropTypes.func,
  onSearch: PropTypes.func,
};

export default SelecionarData;
