import './App.css'
import Auth from './components/Auth/Auth'
import Home from './components/Home/Home'
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Auth} />
        <Route exact path='/home' component={Home} />
      </Switch>
    </div>
  );
}

export default App;
