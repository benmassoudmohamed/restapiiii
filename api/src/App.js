import React from 'react';
import './App.css';
import{BrowserRouter as Router, Route} from'react-router-dom';
import AddContact from './components/AddContact';
import Edit_contact from './components/Edit_contact';


function App() {
  return (
   <div>
     <Router>
       <Route exact path="/" componet={AddContact}/>
       <Route exact path="/Edit/:id" componet={Edit_contact}/>
     </Router>
   </div>
  );
}

export default App;
