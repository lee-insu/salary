import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import ContentsList from './components/contentsList/contentsList';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Login from './components/login/login';
import Main from './components/main/main';
import Onboard from './components/onboard/onboard';
import Register from './components/register/register';
import Research from './components/research/research';
import ResearchContent from './components/research/research_content/research_content';
import Search from './components/search/search';
import {firebaseAuth} from './service/firebase';
import {getUser} from './service/store';


function App({getUser}) {

  const [login,getLogin] = useState(false);

  useEffect(()=> {
    firebaseAuth.onAuthStateChanged(user => {
      if(user) {
        getUser(user);
        getLogin(true);
      }else {
        getLogin(false);
      }
    })
  },[])



  return (
    <div className="app">
      <BrowserRouter>
      <div className="session">
        <Header login={login} />
          <Switch>
            <Route exact path ='/' component={Main}/>
            <Route exact path ='/onboard/:author/:id' component={Onboard}/>
            <Route exact path ='/research' component={Research}/> 
            <Route exact path ='/research/:date/:id' component={ResearchContent}/>
            <Route exact path = '/login' component={Login}/>
            <Route exact path = '/register' component={Register} />
            <Route exact path = '/search/:id' component={Search}/>
            <Route exact path = '/appcontents/:id' component={ContentsList}/>
          </Switch>
          </div>
          <Footer/>
      </BrowserRouter>
    </div>
  );
}



const mapDispatchToProps = (dispatch) => {
  return {
    getUser:(user) => dispatch(getUser(user))
  }
}



export default connect(null,mapDispatchToProps) (App);
