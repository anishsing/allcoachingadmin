import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'  
import Footer from './components/footer/footer';
import Header from './components/header/header';
import LeftNav from './components/leftnav/lefnav';
import DashboardLayout from './components/routes/GlobalRoutes';
import GlobalRoutes from './components/routes/GlobalRoutes';
import Routes from './components/routes/routes';
import Dashboard from './Pages/Dashboard/Dashboard';

function App(props) {
  return (
    <DashboardLayout/>

     
  );
}

export default App;
