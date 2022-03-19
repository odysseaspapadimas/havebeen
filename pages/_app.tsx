import "../styles/globals.css";
import MainLayout from "../components/layouts/MainLayout";
import AuthGuard from "../helpers/AuthGuard";
import { NextComponentType, NextPage, NextPageContext } from "next";
import { SessionProvider } from "next-auth/react";
import 'react-toastify/dist/ReactToastify.css';

interface AppProps {
  pageProps: any;
  Component: NextComponentType<NextPageContext, any, {}> & {
    requireAuth: boolean;
  };
}

export type NextPageWithAuth<P = {}, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        {Component.requireAuth ? (
          <AuthGuard>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </AuthGuard>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
      <style jsx global>
        {`
          body {
            background-color: #0b0e11 !important;
            color: #fff !important;
            font-family: "Montserrat", sans-serif !important;
          }
        `}
      </style>
    </>
  );
}

export default MyApp;
