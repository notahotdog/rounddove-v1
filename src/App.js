import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import WorkshopCreationPage from "./components/WorkshopCreationPage";
import EditWorkshop from "./components/EditWorkshop";

import { Layout } from "antd";

function App() {
  return (
    <Router>
      <div className="App">
        <Layout style={{ height: "100vh" }}>
          <NavBar />
          <Route path="/" exact component={HomePage} />
          <Route
            path="/WorkshopCreationPage"
            component={WorkshopCreationPage}
          />
          <Route
            path="/WorkshopCreationPage/EditWorkshop"
            component={EditWorkshop}
          />
        </Layout>
      </div>
    </Router>
  );
}

export default App;
