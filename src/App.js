/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Header from "./components/fragments/Header";
import Menu from "./components/fragments/Menu";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Stock from "./components/pages/Stock";
import StockCreate from "./components/pages/StockCreate";
import StockEdit from "./components/pages/StockEdit";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Report from "./components/pages/Report";
import AboutUs from "./components/pages/AboutUs";
import * as loginActions from "./actions/login.action";
import { useDispatch } from "react-redux";
import clsx from "clsx";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

// Protected Route
const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      // ternary condition
      loginActions.isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      // ternary condition
      loginActions.isLoggedIn() ? (
        <Redirect to="/stock" />
      ) : (
        <Login {...props} />
      )
    }
  />
);

const App = () => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const dispatch = useDispatch();
  const loginReducer = useSelector(({ loginReducer }) => loginReducer);

  useEffect(() => {
    dispatch(loginActions.reLogin());
  }, []);

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  return (
    <Router>
      {loginReducer.result && !loginReducer.isError && (
        <Header handleDrawerOpen={handleDrawerOpen} open={openDrawer} />
      )}
      {loginReducer.result && !loginReducer.isError && (
        <Menu open={openDrawer} handleDrawerClose={handleDrawerClose} />
      )}
      <div className={classes.drawerHeader} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]:
            openDrawer && loginReducer.result && !loginReducer.error,
        })}
      >
        <Container style={{ display: "flex", justifyContent: "center" }}>
          <Switch>
            <LoginRoute path="/login" component={Login} />
            <SecuredRoute path="/report" component={Report} />
            <SecuredRoute path="/aboutUS" component={AboutUs} />
            <Route path="/register" component={Register} />
            <SecuredRoute path="/stock" component={Stock} />
            <SecuredRoute path="/stockcreate" component={StockCreate} />
            <SecuredRoute path="/stockedit/:id" component={StockEdit} />
            <Route
              exact={true}
              path="/"
              component={() => <Redirect to="/login" />}
            />
          </Switch>
        </Container>
      </main>
    </Router>
  );
};

export default App;
