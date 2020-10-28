import React, {useEffect, useRef} from 'react';
import {Redirect, RouteComponentProps} from "react-router-dom";
import {useMutation} from "@apollo/client";
import {Layout, Spin} from "antd";
import {
    ConnectStripe as ConnectStripeData,
    ConnectStripeVariables
} from "../../graphql/mutations/ConnectStripe/__generated__/ConnectStripe";
import {CONNECT_STRIPE} from "../../graphql/mutations/ConnectStripe";
import {Viewer} from "../../graphql/types";
import {displaySuccessNotification} from "../../utils";

interface Props {
    viewer: Viewer;
    setViewer: (viewer: Viewer) => void;
}

const {Content} = Layout;

export const Stripe = ({viewer, setViewer, history}: Props & RouteComponentProps) => {
    const [connectStripe, {data, loading, error}] = useMutation<ConnectStripeData,
        ConnectStripeVariables>(CONNECT_STRIPE, {
        onCompleted: data => {
            if (data && data.connectStripe) {
                setViewer({...viewer, hasWallet: true});
                displaySuccessNotification(
                    "You've successfully connected your Stripe Account!",
                    "You can now begin to create listings in the Host page."
                )
            }
        }
    });
    const connectStripeRef = useRef(connectStripe);

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");

        if (code) {
            connectStripeRef.current({
                variables: {
                    input: {code}
                }
            })
        } else {
            history.replace("/login");
        }
    }, [history]);

    if (data && data.connectStripe) {
        return <Redirect to={`/user/${viewer.id}`}/>
    }

    if (loading) {
        return (
            <Content className="stripe">
                <Spin size="large" tip="Connection your Stripe account..."/>
            </Content>
        )
    }

    if (error) {
        return <Redirect to={`/user/${viewer.id}?stripe_error=true`}/>
    }

    return null;
};