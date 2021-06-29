/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect} from 'react'
import Header from './components/fragments/Header'
import Menu from './components/fragments/Menu'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Stock from './components/pages/Stock'
import StockCreate from './components/pages/StockCreate'
import StockEdit from './components/pages/StockEdit'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { Container } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import Report from './components/pages/Report'
import AboutUs from './components/pages/AboutUs'
import * as loginActions from './actions/login.action';
import {useDispatch} from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(20)
  }
}));

// Protected Route
const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
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
    render={props =>
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
  const classes = useStyles()
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const dispatch = useDispatch()
  const loginReducer = useSelector(({loginReducer})=> loginReducer)
  
  useEffect(() => {
    dispatch(loginActions.reLogin()) 
  }, [])

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };


  return (
    <Router>
      {loginReducer.result && !loginReducer.isError && <Header handleDrawerOpen={handleDrawerOpen} open={openDrawer} />}
      {loginReducer.result && !loginReducer.isError &&<Menu open={openDrawer} handleDrawerClose={handleDrawerClose} />}
      
      <Container className = {classes.content}>
        <Switch>
          <LoginRoute path="/login" component={Login} />
          <SecuredRoute path="/report" component={Report} />
          <SecuredRoute path="/aboutUS" component={AboutUs} />
          <Route path="/register" component={Register} />
          <SecuredRoute path="/stock" component={Stock} />
          <SecuredRoute path="/stockcreate" component={StockCreate} />
          <SecuredRoute path="/stockedit/:id" component={StockEdit} />
          <Route exact={true} path="/" component={() => <Redirect to="/login" />} />
        </Switch>
      </Container>

    </Router>
  )
}

export default App
