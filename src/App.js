import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import About from "./pages/About";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import JobDetail from "./components/JobDetail";
import JobsList from "./components/JobsList";

import { useState } from "react";

function App() {
  const history = useHistory();
  const [isAuthenticate, setIsAuthenticate] = useState(true);
  const authenticate = () => {
    setIsAuthenticate(true);
    history.push("/jobs");
  };
  const ProtectedRoute = (props) => {
    if (isAuthenticate === true) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };
  return (
    <div className="App">
      <Switch>
        <Route path="/about" exact component={About} />
        <Route
          path="/login"
          component={() => <Login authenticate={authenticate} />}
        />
        <Route path="/" exact component={Homepage} />
        <Route path="/jobs" exact component={JobsList} />
        <ProtectedRoute path="/job/:id" exact component={JobDetail} />
      </Switch>
    </div>
  );
}

export default App;
