import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Films from "./pages/Films";
import Musiques from "./pages/Musiques";
import Header from "./header/header";
import NewItem from "./pages/NewItem";
import UpdateItem from "./pages/Update";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      
      <h1>Bienvenue au GRETA</h1>
      <Router>
      <Header />
        <Route path="/" exact>
          <Musiques />
        </Route>
        <Route path="/musiques" exact>
          <Musiques />
        </Route>
        <Route path="/films" exact>
          <Films />
        </Route>
        <Route path="/musique/new" exact>
          <NewItem route="musiques" />
        </Route>
        <Route path="/film/new" exact>
          <NewItem route="films" />
        </Route>
        <Route path="/update" exact>
          <UpdateItem />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
      </Router>
    </div>
  );
}

export default App;
