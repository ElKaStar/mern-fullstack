import React from 'react';
import 'materialize-css';
import {useRoutes} from "./pages/routes";
import {BrowserRouter} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/NavBar";
import {Loader} from "./components/loader";


function App() {
    const {token, userId, login, logout, init} = useAuth()
    const isAuth = !!token
    const routes = useRoutes(isAuth)

    if (!init) {
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{token, userId, login, logout, isAuth}}>
            <BrowserRouter>
                {isAuth && <Navbar/>}
                <div className="container">
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
