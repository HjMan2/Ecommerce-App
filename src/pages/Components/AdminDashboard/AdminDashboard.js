import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { TabPanel } from "../../../common/Components/TabPanel";
import { Orders } from "./Components/Orders/Orders";
import { AllProducts } from "./Components/AllProducts/AllProducts";
import { NumberInStock } from "./Components/NumberInStock/NumberInStock";
import { AdminNavBar } from "./Components/AdminNavBar/AdminNavBar";
import Container from "@material-ui/core/Container";
function AdminDashboard() {
  const { activeTab } = useParams()
  const DEFAULT_ACTIVE_TAB = activeTab || "orders"
  const history = useHistory()
  useEffect(() => {
    if(!activeTab) {
      history.push(`/admin-dashboard/${DEFAULT_ACTIVE_TAB}`)
    }
  }, [activeTab, history, DEFAULT_ACTIVE_TAB])
  const [value, setValue] = useState(DEFAULT_ACTIVE_TAB);
  const onValueChange = (e, newValue) => {
    if(newValue !== activeTab) {
      history.push(`/admin-dashboard/${newValue}`)
      setValue(newValue);
    }
  };
  return (
    <>
      <AdminNavBar value={value} onValueChange={onValueChange} />
      <Container>
        <TabPanel value={value} index="all-products">
        <AllProducts />
        </TabPanel>
        <TabPanel value={value} index="number-in-stock">
          <NumberInStock />
        </TabPanel>
        <TabPanel value={value} index="orders">
        <Orders />
        </TabPanel>
      </Container>
    </>
  );
}

export { AdminDashboard };
