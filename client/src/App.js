import axios from "axios";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loader from "./components/Loader";
import Home from './pages/Home';
import { HideLoading, SetportfolioData, ReloadData } from "./redux/rootSlice";
import Admin from "./pages/Home/Admin/index";

function App() {
  const { loading, PortfolioData, reloadData} = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const getPortfolioData = async () => {
    try {
      const response = await axios.get("/api/portfolio/get-portfolio-data");
      dispatch(SetportfolioData(response.data));
      dispatch(ReloadData(false));
      dispatch(HideLoading())
    } catch (error) {
      dispatch(HideLoading())
    }

  };

  useEffect(() => {
    if (!PortfolioData) {
      getPortfolioData();
    }
  }, [PortfolioData]);

  useEffect(() => {
    if (reloadData) {
      getPortfolioData();
    }
  }, [reloadData]);

  return (
    <div className="App">
      <BrowserRouter>
        {loading ? <Loader /> : null}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

