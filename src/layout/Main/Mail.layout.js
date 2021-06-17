import { Footer, Header, Content } from "./components";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <Content>{ children }</Content>
      <Footer />
    </>
  );
}

export { MainLayout };
