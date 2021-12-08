import { Switch, Route } from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Home from './components/Home/Home'

export default (
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route exact path='/home' component={Home} />
    </Switch>
)