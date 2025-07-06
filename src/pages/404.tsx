import * as React from "react"
import Layout from "../components/layout";
import type { PageProps } from "@/types";

const NotFoundPage: React.FC<PageProps> = () => {
  return (
      <Layout pageTitle="Page Not Found">
        <p className="text-lg text-center text-emerald-900 font-bold mt-20">Page not found 🪏</p>
      </Layout>
  )
}

export default NotFoundPage