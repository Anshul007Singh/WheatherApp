import React, { createContext, useReducer } from "react";

const AuthContext = createContext({
    state:null,
    onLogin: () => { },
    onLogout: () => { },
});

const authReducer = (state, action) => {
    
    if (action.type === 'login') {
        localStorage.setItem("isLogin", true);
            return {
                ...state,
                isAuthenticated: true,
            };
    }

    if (action.type === 'logout') {
        localStorage.clear();
        return {
            ...state,
            isAuthenticated: false,
        }
    }
}

export const AuthContextProvider = ({ children }) => {
    
    const [state, dispatch] = useReducer(authReducer, { 
        isAuthenticated: localStorage.getItem('isLogin') ? true : false,
     });

    const onLogin = () => {
        dispatch({ type: 'login' });
    }

    const onLogout = () => {
        dispatch({type:'logout'})
    }

    const authContext = {
        state:state.isAuthenticated,
        onLogout,
        onLogin,
    }

    return <AuthContext.Provider value={authContext}>
              {children}
           </AuthContext.Provider>
}

export default AuthContext;