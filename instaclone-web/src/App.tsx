import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import Login from "./screens/Login";
import Home from "./screens/Home";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, darkTheme, lightTheme } from "./styles";
import SignUp from "./screens/SignUp";
import routes from "./routes";
import { HelmetProvider } from "react-helmet-async";
import HeaderLayout from "./components/HeaderLayout";
import Profile from "./screens/Profile";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <Router>
            <Switch>
              <Route exact path={routes.home}>
                {isLoggedIn ? (
                  <HeaderLayout>
                    <Home />
                  </HeaderLayout>
                ) : (
                  <Login />
                )}
              </Route>
              {!isLoggedIn ? (
                <Route exact path={routes.signUp}>
                  <SignUp />
                </Route>
              ) : null}
              <Route path={`/users/:username`}>
                <HeaderLayout>
                  <Profile />
                </HeaderLayout>
              </Route>
            </Switch>
          </Router>
          <GlobalStyles />
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
