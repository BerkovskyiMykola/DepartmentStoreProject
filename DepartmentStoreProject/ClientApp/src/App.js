import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import User from "./components/User/User";
import { Home } from "./components/Home";
import NotFound from "./components/NotFound";
import DepartmentStore from "./components/DepartmentStore/DepartmentStore";
import Shop from "./components/Shop/Shop";
import ShopItem from "./components/ShopItem/ShopItem";
import History from "./components/History/History";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './utils/history';
import EventBus from "./common/EventBus";
import { useTranslation } from "react-i18next";

export default function App() {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const { user } = useSelector(state => ({
        user: state.auth.user,
    }), shallowEqual)

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage());
        });

        EventBus.on("logout", () => {
            dispatch(logout());
        });

        return () => { EventBus.remove("logout"); }
    }, [dispatch])

    const logOut = (e) => {
        e.preventDefault();
        dispatch(logout());
    }

    return (
        <Router history={history}>
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        DepartmentStoreProject
                    </Link>

                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a href="/" className="nav-link" onClick={(e) => { e.preventDefault(); i18n.changeLanguage("en"); }}>
                                EN
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/" className="nav-link" onClick={(e) => { e.preventDefault(); i18n.changeLanguage("ua"); }}>
                                UA
                            </a>
                        </li>
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                {t("Home")}
                            </Link>
                        </li>
                    </div>

                    <div className="navbar-nav ml-auto">
                        {user ? (
                            <><li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {t("Profile")}
                                </Link>
                            </li>
                                {user.role === "Admin" &&
                                    <li className="nav-item">
                                        <Link to={"/users"} className="nav-link">
                                            {t("Users")}
                                        </Link>
                                    </li>
                                }
                                {user.role === "User" &&
                                    <li className="nav-item">
                                        <Link to={"/departmentStores"} className="nav-link">
                                            {t("departmentStores")}
                                        </Link>
                                    </li>
                                }
                                <li className="nav-item">
                                    <a href="/login" className="nav-link" onClick={logOut}>
                                        {t("LogOut")}
                                    </a>
                                </li></>
                        ) : (
                            <><li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    {t("Login")}
                                </Link>
                            </li><li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    {t("SignUp")}
                                </Link>
                            </li></>
                        )}
                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/users" component={User} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/departmentStores" component={DepartmentStore} />
                        <Route exact path="/shops/:id" component={Shop} />
                        <Route exact path="/shopItems/:id" component={ShopItem} />
                        <Route exact path="/histories/:id" component={History} />
                        <Route exact path="/404" component={NotFound} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

