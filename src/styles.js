import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    width: 500
  },
  container: {
    display: "in-line",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  appBar: {
    flexGrow: 1
  }
}));

export default useStyles;
