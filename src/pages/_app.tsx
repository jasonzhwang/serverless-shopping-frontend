import React from "react";
import { AppProps } from "next/app";
import "../styles/globals.css";
import Head from "next/head";
import Layout from "../layout";

const TaoTalkApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>TaoTalk</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="TaoTalk" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};
export default TaoTalkApp;
