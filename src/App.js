import React, { useEffect } from "react";
import Routes from "./routes";
import { fetchCollections, createNewCollection } from "./services/firebase";
import Loader from "./utils/components/loader";
import "./assets/css/custom.css";
import "./assets/css/grid.css";
import * as MOCK_DATA from "./mock-data/MOCK_DATA.json";

function App() {
  const [loading, setLoading] = React.useState(true);
  const fetchMasterData = async () => {
    await fetchCollections();
    setLoading(false);
  };

  useEffect(() => {
    console.log('userEffect');
    console.log({ dataSet: MOCK_DATA.default });
    // createNewCollection('projects', MOCK_DATA.default);
    fetchMasterData();
  }, []);

  return <React.Fragment>{loading ? <Loader /> : <Routes />}</React.Fragment>;
}

export default App;
