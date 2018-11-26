import * as actionType from './actionTypes';
import axios from 'axios';

export const authStart = ()=>{
    return {
        type: actionType.AUTH_START
    }
}

export const authSuccess = (idToken, userId, user)=>{
    return {
        type: actionType.AUTH_SUCCESS,
        idToken: idToken, 
        userId: userId, 
        user: user
    }
}

export const authFail = (error) =>{
    return {
        type: actionType.AUTH_FAIL,
        error: error
    }
}

export const logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionType.AUTH_LOGOUT
    }
}

export const checkAuthTimeout=(expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const auth = (email, password) =>{
    return dispatch=>{
        dispatch(authStart());
        const authData = {
            email: email, 
            password: password, 
            returnSecureToken: true
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA14dDnNeK8niqLK4xA1LKKxwvTXyVxmxI', authData)
        .then( response => { 
            console.log(response)
            const expiresIn = new Date(new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('expirationDate', expiresIn)
            localStorage.setItem('userId', response.data.localId)
            dispatch(authSuccess(response.data.idToken, response.data.localId, response.data))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(err=>{
            console.log(err)
            dispatch(authFail(err))
        })
    }
}

export const authCheckState = () => {
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate < new Date()){
            dispatch(logout())
            }else{
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
            } 
        }
    }
}