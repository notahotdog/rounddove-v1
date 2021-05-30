import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import WorkshopCreationPage from "./components/WorkshopCreationPage";
// import UploadDataPage from "./components/UploadDataPage";
import UploadDataPage from "./components/UploadData";
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
            exact
            component={WorkshopCreationPage}
          />
          <Route
            path="/WorkshopCreationPage/EditWorkshop"
            exact
            component={EditWorkshop}
          />

          <Route
            path="/WorkshopCreationPage/UploadData"
            exact
            component={UploadDataPage}
          />
        </Layout>
      </div>
    </Router>
  );
}

export default App;
