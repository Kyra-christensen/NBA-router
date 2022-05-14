import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Detail from './views/Detail';
import List from './views/List';

export default function App() {
  return (
    <>
      <Switch>
        <Route path="/films/:id">
          <Detail/>
        </Route>
        <Route exact path="/">
          <Header/>
          <List/>
        </Route>
      </Switch>
    </>
  );
}
