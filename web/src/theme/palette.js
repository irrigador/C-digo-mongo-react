import { colors } from "@material-ui/core";

const white = "#FFFFFF";
const black = "#000000";
const primary = "#205C59";
const secondary = "#30B59E";
const text = "#302F37";
const link = "#E4D172";

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: primary,
    main: primary,
    light: primary,
  },
  secondary: {
    contrastText: white,
    dark: secondary,
    main: secondary,
    light: secondary,
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: text,
    secondary: text,
    link: link,
  },
  link: link,
  icon: colors.blueGrey[600],
  background: {
    default: "#F4F6F8",
    paper: white,
  },
  divider: colors.grey[200],
};
