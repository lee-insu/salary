import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Main from './components/main/main';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <div className="session">
        <Header/>
          <Switch>
            <Route exact path ='/' component={Main}/>
          </Switch>
          </div>
          <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
