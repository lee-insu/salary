import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Main from './components/main/main';
import Onboard from './components/onboard/onboard';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <div className="session">
        <Header/>
          <Switch>
            <Route exact path ='/' component={Main}/>
            <Route exact path ='/onboard' component={Onboard}/>
          </Switch>
          </div>
          <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
