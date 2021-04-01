import React from 'react';
import {Avatar, Button, Menu} from "antd";
import {Link} from "react-router-dom";
import {HomeOutlined, LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {Viewer} from "../../../../graphql/types";
import {useMutation} from "@apollo/client";
import {LogOut as LogOutData} from "../../../../graphql/mutations/LogOut/__generated__/LogOut";
import {LOG_OUT} from "../../../../graphql/mutations/LogOut";
import {displayErrorMessage, displaySuccessNotification} from "../../../../utils";

const {Item, SubMenu} = Menu;

interface Props {
    viewer: Viewer;
    setViewer: (viewer: Viewer) => void;
}

export const MenuItems = ({viewer, setViewer}: Props) => {
    const [logOut] = useMutation<LogOutData>(LOG_OUT, {
        onCompleted: data => {
            if (data && data.logOut) {
                setViewer(data.logOut);
                sessionStorage.removeItem("token");
                displaySuccessNotification("You've successfully logged out!")
            }
        },
        onError: data => {
            displayErrorMessage("Sorry! We weren't able to log you out. Please try again later!")
        }
    });

    const handleLogOut = () => {
        logOut();
    }

    const subMenuLogin = viewer.id && viewer.avatar ? (
        <SubMenu title={<Avatar src={viewer.avatar}/>}>
            <Item key="/user">
                <Link to={`/user/${viewer.id}`}>
                    <UserOutlined/>
                    Profile
                </Link>
            </Item>
            <Item key="/logout" onClick={handleLogOut}>
                <LogoutOutlined/>
                Log out
            </Item>
        </SubMenu>
    ) : (
        <Item>
            <Link to="/login">
                <Button type="primary">Sign in</Button>
            </Link>
        </Item>
    )

    return (
        <Menu mode="horizontal" selectable={false} className="menu">
            <Item key="/host">
                <Link to="/host">
                    <HomeOutlined/>
                    Host
                </Link>
            </Item>
            {subMenuLogin}
        </Menu>
    );
};
