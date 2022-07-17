import React, { useEffect } from "react";
import Routes from "./routes";
import { fetchCollections, createNewCollection } from "./services/firebase";
import Loader from "./utils/components/loader";
import "./assets/css/custom.css";
import "./assets/css/grid.css";
import * as Workforce from "./mock-data/workforce.json";

function App() {
  const [loading, setLoading] = React.useState(true);
  const fetchMasterData = async () => {
    // createNewCollection('workforce', Workforce.default);
    await fetchCollections();
    setLoading(false);
  };

  useEffect(() => {
    // console.log({ dataSet: MOCK_DATA.default });
    // createNewCollection('projects', MOCK_DATA.default);
    fetchMasterData();
  }, []);

  return <React.Fragment>{loading ? <Loader /> : <Routes />}</React.Fragment>;
}

export default App;
