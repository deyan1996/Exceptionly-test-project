import React, { useEffect, useReducer } from "react";
import {Card, CardHeader, CardContent, CardActions, Button, TextField} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

type State = {
    username: string
    password: string
    isButtonDisabled: boolean
    helperText: string
    isError: boolean
};

const initialState: State = {
    username: '',
    password: '',
    isButtonDisabled: true,
    helperText: '',
    isError: false
}

type Action = {type: 'setUsername', payload: string} | 
{type: 'setPassword', payload: string} | 
{type: 'setButtonDisabled', payload: boolean} | 
{type: 'loginSuccess', payload: string} | 
{type: 'loginFailed', payload: string} | 
{type: 'setIsError', payload: boolean};

const reducer = (state: State, action: Action) : State => {
    switch(action.type) {
        case 'setUsername': 
            return {
                ...state,
                username: action.payload,
            }
        case 'setPassword': 
            return {
                ...state,
                password: action.payload,
            }
        case 'setButtonDisabled': 
            return {
                ...state,
                isButtonDisabled: action.payload,
            }
        case 'loginSuccess': 
            return {
                ...state,
                helperText: action.payload,
                isError: false
            }
        case 'loginFailed': 
            return {
                ...state,
                helperText: action.payload,
                isError: true
            }
        case 'setIsError':
            return {
                ...state,
                isError: action.payload
            }
    }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#3f3f3f',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }
  })
);

const Login = () => {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleLogin = () => {
        dispatch({
            type: 'loginSuccess',
            payload: 'Login successfully'
        });
    }

    useEffect(() => {
        if(state.username.trim() && state.password.trim()) {
            dispatch({
                type: 'setButtonDisabled',
                payload: false
            });
        }
        else {
            dispatch({
                type: 'setButtonDisabled',
                payload: true
            })
        }
    }, [state.username, state.password])

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if(event.code == 'Enter'){
            state.isButtonDisabled || handleLogin();
        }
    }

    const handleUsernameChange : React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: 'setUsername',
            payload: event.target.value
        });
    };

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: 'setPassword',
            payload: event.target.value
        });
    };

    return (
        <form className={classes.container}>
            <Card className={classes.card}>
                <CardHeader title="Login Here" className={classes.header}/>
                <CardContent>
                    <TextField
                        id="username"
                        type="email"
                        label="username"
                        placeholder="username"
                        error={state.isError}
                        onChange={handleUsernameChange}
                        onKeyDown={handleKeyPress}
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        id="password"
                        type="password"
                        label="password"
                        placeholder="password"
                        error={state.isError}
                        helperText={state.helperText}
                        onChange={handlePasswordChange}
                        onKeyDown={handleKeyPress}
                        fullWidth
                        margin="normal"
                    />
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLogin}
                        disabled={state.isButtonDisabled}
                        className={classes.loginBtn}
                    >
                    Login
                    </Button>
                </CardActions>
            </Card>
        </form>
    )
}

export default Login;