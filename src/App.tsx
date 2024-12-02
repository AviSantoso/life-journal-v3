import { Route, Switch } from "wouter";
import HomePage from "@/components/pages/Home.page";
import AddEntryPage from "./components/pages/AddEntry.page";

function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/add-entry" component={AddEntryPage} />
    </Switch>
  );
}

export default App;
