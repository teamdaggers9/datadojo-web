import React, { useEffect } from "react";
import Routes from "./routes";
import { fetchCollections } from "./services/firebase";
import Loader from './utils/components/loader';
import './assets/css/custom.css';
import './assets/css/grid.css';

function App() {
  const [loading, setLoading] = React.useState(true);

  const fetchMasterData = async () => {
    await fetchCollections();
    setLoading(false);
  };

  useEffect(() => {
    fetchMasterData();
  }, []);

  return (
    <React.Fragment>
      {
        loading ? <Loader /> : <Routes />
      }
    </React.Fragment>
  );
}

export default App;
