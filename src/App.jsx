import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import AuthContext from "./context/auth-context";

import { useAuth } from "./hooks/auth-hook";

import "./App.css";

import Header from "./header/Header";

import Films from "./pages/Films";

import Musiques from "./pages/musiques";

import NewItem from "./pages/NewItem";

import UpdateItem from "./pages/UpdateItem2";

import UpdateItem2 from "./pages/UpdateItem2";

// import AuthPage from './user/auth';

import LoginPage from "./pages/login";

import SignupPage from "./pages/signup";

function App() {
  const { token, login, logout, userId } = useAuth();

  console.log({ token });

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,

        token: token,

        userId: userId,

        login: login,

        logout: logout,
      }}
    >
      <div className="App">
        <h1>Bienvenue au Greta</h1>

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

          {!token && <Route path="/login" component={LoginPage} exact />}

          {!token && <Route path="/signup" component={SignupPage} exact />}

          <Route path="/musique/new" exact>
            {/* <NewItem route="musiques" /> */}

            {!token ? <Redirect to="/login" /> : <NewItem route="musiques" />}
          </Route>

          <Route path="/film/new" exact>
            <NewItem route="films" />
          </Route>

          <Route path="/musiques/:oeuvreId">
            {!token ? (
              <Redirect to="/login" />
            ) : (
              <UpdateItem2 route="musiques" />
            )}
          </Route>

          <Route path="/films/:oeuvreId">
            {/* <UpdateItem2 route="films" /> */}

            {!token ? <Redirect to="/login" /> : <UpdateItem2 route="films" />}
          </Route>

          <Redirect to="/" />
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
