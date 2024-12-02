import { Route, Switch } from "wouter";
import HomePage from "@/components/pages/Home.page";
import AddEntryPage from "./components/pages/AddEntry.page";
import LoginPage from "./components/pages/Login.page";
import { SecureProvider } from "./components/providers/SecureProvider";

function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/add-entry">
        <SecureProvider>
          <AddEntryPage />
        </SecureProvider>
      </Route>
      <Route path="/">
        <SecureProvider>
          <HomePage />
        </SecureProvider>
      </Route>
    </Switch>
  );
}

export default App;
