import FormDataProvider from "@/context/FormDataContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <FormDataProvider>
      <Component {...pageProps} />
    </FormDataProvider>
  );
}
