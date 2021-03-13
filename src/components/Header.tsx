import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import '../Styles/Header.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: "100%",
      marginBottom: "40px",
    },
    bgColor: {
      backgroundColor: "#343A40",
    },
    text: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bgColor}>
        <Toolbar>
          <div className={classes.text}>
            <div>
              Données des entreprises
            </div>
            <div>
              API LaBonneBoite
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}