import * as React from "react"
import Layout from "../components/layout";
import type { PageProps } from "../types";

const NotFoundPage: React.FC<PageProps> = () => {
  return (
      <Layout pageTitle="Page Not Found">
        <p></p>
      </Layout>
  )
}

export default NotFoundPage