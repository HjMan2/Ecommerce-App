import { Footer, Header, Content } from "./components";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function MainLayout({ children }) {
  return (
    <StylesProvider jss={jss}>
      <CssBaseline>
        <Header />
        <Content>{children}</Content>
        <Footer />
      </CssBaseline>
    </StylesProvider>
  );
}

export { MainLayout };
