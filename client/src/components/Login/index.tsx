import React, {useEffect, useRef} from 'react';
import {Card, Layout, Spin, Typography} from "antd";
import googleLogo from "./assets/google_logo.jpg";
import {Viewer} from "../../graphql/types";
import {useApolloClient, useMutation} from "@apollo/client";
import {AuthUrl as AuthUrlData} from "../../graphql/queries/AuthUrl/__generated__/AuthUrl";
import {AUTH_URL} from "../../graphql/queries/AuthUrl";
import {LogIn as LogInData, LogInVariables} from "../../graphql/mutations/LogIn/__generated__/LogIn";
import {LOG_IN} from "../../graphql/mutations/LogIn";
import {displayErrorMessage, displaySuccessNotification} from "../../utils";
import {Redirect} from "react-router-dom";
import {ErrorBanner} from "../ErrorBanner";

const {Content} = Layout;
const {Text, Title} = Typography;

interface Props {
    setViewer: (viewer: Viewer) => void;
}

export const Login = ({setViewer}: Props) => {
    const client = useApolloClient();
    const [
        logIn,
        {data: logInData, loading: logInLoading, error: logInError}
    ] = useMutation<LogInData, LogInVariables>(LOG_IN, {
        onCompleted: data => {
            if (data && data.logIn) {
                setViewer(data.logIn);
                displaySuccessNotification("You've successfully logged in!");
            }
        }
    });

    const logInRef = useRef(logIn);

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");

        if (code) {
            logInRef.current({
                variables: {
                    input: {code}
                }
            })
        }
    }, []);

    const handleAuthorize = async () => {
        try {
            const {data} = await client.query<AuthUrlData>({
                query: AUTH_URL
            });
            window.location.href = data.authUrl;
        } catch (error) {
            displayErrorMessage("Sorry! We weren't able to log you in. Please try again later!")
        }
    }

    if (logInLoading) {
        return (
            <Content className="log-in">
                <Spin size="large" tip="Logging you in..."/>
            </Content>
        )
    }

    if (logInData && logInData.logIn) {
        const {id: viewerId} = logInData.logIn;
        return <Redirect to={`/user/${viewerId}`}/>
    }

    const logInErrorBannerElement = logInError ? (
        <ErrorBanner description="Sorry! We weren't able to log you in. Please try again later!"/>
    ) : null;

    return (
        <Content className="log-in">
            {logInErrorBannerElement}
            <Card className="log-in-card">
                <div className="log-in-card__intro">
                    <Title level={3} className="log-in-card__intro-title">
                        Log in to Wanderung!
                    </Title>
                    <Text>Sign in with Google to start booking available rentals!</Text>
                </div>
                <button className="log-in-card__google-button" onClick={handleAuthorize}>
                    <img
                        src={googleLogo}
                        alt="Google Logo"
                        className="log-in-card__google-button-logo"
                    />
                    <span className="log-in-card__google-button-text">
                        Sign in with Google
                    </span>
                </button>
            </Card>
        </Content>
    );
};

export default Login;