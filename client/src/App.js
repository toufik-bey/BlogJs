
import React, {Fragment} from 'react';
import './App.css';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';

import Landing from './components/Layot/Landing';
import Navbar from './components/Layot/Navbar';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';

const App = () =>(
<Router>
 <Fragment>
   <Navbar />
   <Route exact path ='/' component={Landing}/>
   <section className='container'>
   <Switch> 
   <Route exact path='/register' component={Register} />
   <Route exact path='/login' component={Login} />
   </Switch>
   </section>
 </Fragment>
 </Router>
);


export default App;
