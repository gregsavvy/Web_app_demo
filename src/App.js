import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import GoodsList from "./components/goods-list.component";
import Admin from "./components/admin.component";
import GoodsEdit from "./components/goods-edit.component";
import GoodsCreate from "./components/goods-create.component";
import UserCreate from "./components/user-create.component";

function App() {
  return (
    <Router>
      <Navbar />
        <br/>
        <Route path="/" exact component={GoodsList} />
        <Route path="/admin" exact component={Admin} />
        <Route path="/edit/:id" exact component={GoodsEdit} />
        <Route path="/create" exact component={GoodsCreate} />
    </Router>
  );
}

export default App;
