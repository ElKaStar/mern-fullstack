import React from 'react';
import 'materialize-css';
import {useRoutes} from "./pages/routes";
import {BrowserRouter} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";


function App() {
    const {token, userId, login, logout} = useAuth()
    const isAuth = !!token
    const routes = useRoutes(isAuth)

    return (
        <AuthContext.Provider value={{token, userId, login, logout, isAuth}}>
            <BrowserRouter>
                <div className="container">
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
