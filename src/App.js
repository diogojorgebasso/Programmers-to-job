import { AuthProvider } from "./contexts/AuthContext";
import FlagsProvider from "./contexts/FlagsProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
/*auth*/
import PrivateRoute from "./components/auth/PrivateRoute";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import UpdateProfile from "./components/auth/UpdateProfile";
import Profile from "./components/auth/Profile";

import ForgotPassword from "./components/auth/ForgotPassword";
/*site*/
import Dashboard from "./components/site/Dashboard";
import Contato from "./components/site/Contato";
import Payment from "./components/site/Payment";
import PrivacyPolice from "./components/site/PrivacyPolice";
import Tof from "./components/site/Tof";
import Thanks from "./components/site/Thanks";
import NoMatch from "./components/site/NoMatch";
export default function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          {" "}
          {/* Insert here the promotions in remote config*/}
          <FlagsProvider
            defaults={{
              someAwesomeFeatureEnabled: true,
            }}
          >
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/contato" component={Contato} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/perfil" component={Profile} />
              <Route path="/politica-privacidade" component={PrivacyPolice} />
              <Route path="/tof" component={Tof} />
              <Route path="/pagamento" component={Payment} />
              <Route path="/pagamento/Thanks" component={Thanks} />
              <Route path="/forgot-password" component={ForgotPassword} />{" "}
              <Route path="*" component={NoMatch} />
            </Switch>
          </FlagsProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}
