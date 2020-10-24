import React from 'react';
import {Layout} from "antd";
import logo from "./assets/logo.png";
import {Link} from "react-router-dom";
import {MenuItems} from "./components/MenuItems";
import {Viewer} from "../../graphql/types";

const {Header} = Layout;

interface Props {
    viewer: Viewer;
    setViewer: (viewer: Viewer) => void;
}

export const AppHeader = ({viewer, setViewer}: Props) => {
    return (
        <Header className="app-header">
            <div className="app-header__logo-search-section">
                <div className="app-header__logo">
                    <Link to="/">
                        <img src={logo} alt="Logo"/>
                    </Link>
                </div>
            </div>
            <div className="app-header__menu-section">
                <MenuItems viewer={viewer} setViewer={setViewer}/>
            </div>
        </Header>
    );
};
