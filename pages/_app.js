import React from "react";
import Head from "next/head";
import { ApolloProvider } from "@apollo/react-hooks";
import withData from "../utils/apollo";
import styles from './css/styles.css'


const App = ({ Component, pageProps, apollo }) => {
  return (
    <ApolloProvider client={apollo}>
      <Head>
        <title>Website title</title>
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  )
};

// Wraps all components in the tree with the data provider
export default withData(App);