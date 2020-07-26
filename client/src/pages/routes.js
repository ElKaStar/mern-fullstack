import React from 'react'
import {LinkPage} from "./LinkPage";
import {CreatePage} from "./CreatePage";
import {DetailedPage} from "./DetailedPage";
import {Redirect, Route, Switch} from "react-router-dom";
import {AuthPage} from "./AuthPage";
import {NotesPage} from "./Notes";




export const useRoutes = (isAuth) => {

    if (isAuth) {
        return (
            <Switch>
                <Route path="/link" exact>
                    <LinkPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/detail/:id">
                    <DetailedPage />
                </Route>
                <Route path="/notes">
                    <NotesPage />
                </Route>
                <Redirect to="/create" />
            </Switch>

        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )

}