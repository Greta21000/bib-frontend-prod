import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AuthContext from "./context/auth-context";
import { useAuth } from "./hooks/auth-hook";

import Films from "./pages/Films";
import Musiques from "./pages/Musiques";
import Header from "./header/header";
import NewItem from "./pages/NewItem";
import UpdateItem from "./pages/Update";
import Login from "./pages/Login";

function App() {
  const {token, login, userId } = useAuth();
  console.log({token})
  console.log("!token : ", !token)
  return (
    <AuthContext.Provider
    value={{
      isLoggedIn: !!token,
      token: token,
      userId: userId,
      login: login,
      logout: () => {}
    }}
    >
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
    </AuthContext.Provider>
  );
}

export default App;
