import * as React from "react";
import NavBar from "../components/navbar"
import Footer from "./footer";
import "normalize.css"
import "./global.scss"
import * as Styles from './layout.module.scss';

const Layout = ({ pageTitle, children }) => {
    return (
        <main className={Styles.container}>
            <title>{pageTitle}</title>
            <NavBar />
            <div className={Styles.content}>
                {children}
            </div>
            <Footer />
        </main>
    )
}

export default Layout