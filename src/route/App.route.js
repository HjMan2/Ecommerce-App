import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { MainLayout } from "../layout";
import {
  AdminDashboard,
  Login,
  Cart,
  Home,
  Products,
  Shipping,
  Product,
  NotFound,
  ResultPayment,
} from "../pages";

function AppRoute() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/admin-dashboard/:activeTab?">
          <AdminDashboard />
        </Route>
        <Route exact path="/cart">
          <MainLayout>
            <Cart />
          </MainLayout>
        </Route>
        <Route exact path="/shipping">
          <MainLayout>
            <Shipping />
          </MainLayout>
        </Route>
        <Route
          path="/dargah-pardakht.html"
          onEneter={() => window.location.reload()}
        />
        <Route path="/result-payment">
          <MainLayout>
            <ResultPayment />
          </MainLayout>
        </Route>
        <Route path="/product/:productId">
          <MainLayout>
            <Product />
          </MainLayout>
        </Route>
        <Route path="/search/:activeTab">
          <MainLayout>
            <Products />
          </MainLayout>
        </Route>
        <Route path="/not-found">
          <NotFound />
        </Route>
        <Route exact path="/">
          <MainLayout>
            <Home />
          </MainLayout>
        </Route>
        <Redirect to="/not-found" />
      </Switch>
    </Router>
  );
}

export default AppRoute;
