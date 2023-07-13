import "@/styles/globals.css";
import { Provider } from "@voidpkg/react-ui";
import { SessionProvider } from "next-auth/react";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    
    <SessionProvider session={session}>
      <Provider
        toastOptions={{
          position: "bottom-center",
          limit: 3,
        }}
      >
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}
