import logo from './logo.svg';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import BurgerSection from './burgerSection';
import Container from "react-bootstrap/Container" 
import BurgeryNavbar from './burgeryNavbar';
import Stack from "react-bootstrap/Stack";

import burgery from './burgery.json';

class Burger{
  constructor(name,price,ingredients,desc){
    this.nazwa = name;
    this.cena = price;
    this.skladniki = ingredients;
    this.opis = desc;
  }
}


function App() {

  var burgirs = [new Burger("burg1", 2.5, "jakies rzeczy", "dobry burgerek dla kazdego"),
  new Burger("burg2", 3.5, "inne jakies rzeczy", "ten burger jest za drogi aodjioasjidojasiojdioasjoidjiaosjdsaiojdioasjiodjasiojdioas!")];



  return (
    <div className="App">
      <BurgeryNavbar/>
      <hr/>
      <Container fluid='true'>
        <Stack gap={3}>
        <div className='section'>
          <BurgerSection name="Popularne" burgers={burgery}/>
        </div>
        <hr/>
        <div className='section'>
          {/* <BurgerSection name="Najnowsze" burgers={burgirs}/> */}
        </div>
        </Stack>
      </Container>
      <hr/>
    </div>
  );
}

export default App;
