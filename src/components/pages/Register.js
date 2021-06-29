import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    CardMedia,
    Button,
    Typography,
    TextField,
} from "@material-ui/core";
import { Formik } from 'formik';
import axios from 'axios'
import { apiUrl, server } from '../../Constants';
import Alert from '@material-ui/lab/Alert';

import { useDispatch, useSelector } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345
    },
    media: {
        height: 200
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));



export default function Register(props) {
    const classes = useStyles();
    // const dispatch = useDispatch()
    // const loginReducer = useSelector(({ loginReducer }) => loginReducer)

    const [isError, setIsError] = useState(false)
    const [showDialog, setShowDialog] = useState(false)

    function showForm({ values, handleChange, handleSubmit, isSubmitting }) {
        return (
            (
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={values.username}
                        onChange={handleChange}
                        id="username"
                        label="Username"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        value={values.password}
                        onChange={handleChange}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    {isError && <Alert severity="error">Error, Your registration was failed</Alert>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={isSubmitting}
                    >
                        Register
                    </Button>
                    <Button
                        fullWidth
                        size="small"
                        color="primary"
                        onClick={() => props.history.goBack()}
                    >
                        Cancel
                    </Button>
                </form>
            )
        )
    }

    return (
        <div>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.media}
                    image={`${process.env.PUBLIC_URL}/images/authen_header.jpg`}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Register
                    </Typography>
                    <Formik initialValues={{ username: "admin", password: "1234" }} onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true)
                        axios.post(apiUrl + "/" + server.REGISTER_URL, values).then(result => {
                            setSubmitting(false)
                            // alert(JSON.stringify(result.data))
                            const { data } = result
                            if (data.result === "ok") {
                                // dispatch(loginActions.setSuccess())
                                setShowDialog(true)
                            } else {
                                // dispatch(loginActions.hasError("Error, you are not permission"))
                                setIsError(true)
                            }
                        })
                            .catch(error => {
                                setIsError(true)
                                console.log(error)
                            })
                    }}>
                        {props => showForm(props)}
                    </Formik>
                </CardContent>
            </Card>
            <Dialog
                open={showDialog}
                
                keepMounted
                
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Congraturation!!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                       Your Registration is successful
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  onClick={() => {props.history.push("/login")}} color="primary">
                        Close(Go To Login)
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}