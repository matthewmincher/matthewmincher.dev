import * as React from "react";
import NavBar from "../components/navbar"
import Footer from "./footer";
import "normalize.css"
import "./global.scss"
import {Helmet} from "react-helmet";
import type { LayoutProps } from "@/types";

const Layout: React.FC<LayoutProps> = ({ pageTitle, children }) => {
    return (
        <>
            <Helmet
                htmlAttributes={{
                    lang: 'en'
                }}
            >
                <title>{pageTitle} | matthewmincher.dev</title>
            </Helmet>
            <main className="border-t-4 border-emerald-900 box-border min-h-screen flex flex-col">
                <title>{pageTitle}</title>
                <NavBar />
                <div className="flex-grow overflow-hidden">
                    {children}
                </div>
                <Footer />
            </main>
        </>
    )
}

export default Layout
