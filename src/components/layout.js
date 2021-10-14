import * as React from "react";
import NavBar from "../components/navbar"
import Footer from "./footer";
import "normalize.css"
import "./global.scss"
import * as Styles from './layout.module.scss';
import {Helmet} from "react-helmet";
import {withPrefix} from "gatsby-link";

const Layout = ({ pageTitle, children }) => {
    return (
        <>
            <Helmet>
                <title>{pageTitle} | matthewmincher.dev</title>
            </Helmet>
            <main className={Styles.container}>
                <title>{pageTitle}</title>
                <NavBar />
                <div className={Styles.content}>
                    {children}
                </div>
                <Footer />
            </main>
        </>
    )
}

export default Layout