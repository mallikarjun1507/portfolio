import axios from "axios";
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Loader from "./components/Loader";
import Home from './pages/Home';
import Admin from "./pages/Home/Admin/index";

import { HideLoading, SetportfolioData, ReloadData } from "./redux/rootSlice";

function App() {
  const { loading, PortfolioData, reloadData } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  //  Memoized function to avoid unnecessary re-renders
  const getPortfolioData = useCallback(async () => {
    try {
      const response = await axios.get("/api/portfolio/get-portfolio-data");
      dispatch(SetportfolioData(response.data));
      dispatch(ReloadData(false));
    } catch (error) {
      console.error("Failed to fetch portfolio data:", error);
    } finally {
      dispatch(HideLoading());
    }
  }, [dispatch]);

  //  Fetch portfolio data initially
  useEffect(() => {
    if (!PortfolioData) {
      getPortfolioData();
    }
  }, [PortfolioData, getPortfolioData]);

  //  Reload data when redux flag changes
  useEffect(() => {
    if (reloadData) {
      getPortfolioData();
    }
  }, [reloadData, getPortfolioData]);

  return (
    <div className="App">
      <BrowserRouter>
        {loading && <Loader />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
