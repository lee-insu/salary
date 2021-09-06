import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Main from './components/main/main';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header/>
          <Switch>
            <Route exact path ='/' component={Main}/>
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
