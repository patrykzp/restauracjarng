
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';
import Accordion from 'react-bootstrap/Accordion'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'holderjs';
import { useState } from 'react';
import BurgerCanvas from './BurgerCanvas';


const badgesRarity = {
  [100] : "secondary",
  [40] : "primary",
  [10] : "danger",
  [2] : "warning"
}
const getBadgeColor = chance =>{
  // 50
  var currentRarity = "secondary"
  var curMinChance = 0
  Object.keys(badgesRarity).map((badgeChance)=>{
    if (chance <= badgeChance && curMinChance < chance){
      curMinChance = badgeChance
      currentRarity = badgesRarity[badgeChance]
    }
  })
  return currentRarity
}

function BurgerCard({burgerClass}){
    
    const [show, setShow] = useState(false);
    const [burgerBuyMenuShow, setBurgerBuyMenuShow] = useState(false);
    const [burgerOpening, setBurgerOpening] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const closeBurgerMenu = () =>{
        setBurgerBuyMenuShow();
        setBurgerOpening(false);
    }

    return (
    <>
    <Card className='burgerCard' style={{ width: '18rem', height:"23rem" }}>
        <Card.Img variant="top" src="holder.js/100px120?text=Burgerek" />
        <Card.Body style={{display: "flex", flexDirection: "column" }}>
            <Card.Title>{burgerClass.nazwa}</Card.Title>
            
            <Card.Subtitle className="mb-2 text-muted">{burgerClass.cena} zł</Card.Subtitle>
            <Card.Text>
            {burgerClass.opis}
            </Card.Text>
            <hr/>
            <Stack direction="horizontal" gap={3} style={{display: "flex", flexGrow:1, flexDirection:"row", alignItems:"flex-end"}}>
                
                <Button size="sm" variant="outline-secondary" onClick={()=>handleShow(true)}>Info</Button>
                <Button variant='outline-success ms-auto' onClick={()=>setBurgerBuyMenuShow(true)}>Kup i otwórz</Button>
            </Stack>
        </Card.Body>
    </Card>
    <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Składniki dla {burgerClass.nazwa}:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:'center'}}>
        <Accordion>
        {
          
          burgerClass.skladniki.map((kategoria, i)=>{
            return (
              <>
              
                <Accordion.Item eventKey={i} style={{width:"30rem"}}>
                  <Accordion.Header>{Object.keys(kategoria)}</Accordion.Header>
                  <Accordion.Body>
                  <ul>
                  {
                    kategoria[Object.keys(kategoria)].opcje?.map((opcja)=>{
                      return (<li>{opcja.nazwa} <Badge pill bg={getBadgeColor(opcja.szansa)}>{opcja.szansa}%</Badge></li>)
                    })
                  }
                  </ul>
                  </Accordion.Body>
                </Accordion.Item>

              {/* <Card style={{ margin:"0.25rem", width:"15rem", height:"15rem" }}>
              <Card.Body style={{display: "flex", flexDirection: "column" }}>
                <Card.Title> {Object.keys(kategoria)} </Card.Title>
                <Card.Text>
                  <ul>
                  {
                    kategoria[Object.keys(kategoria)].opcje?.map((opcja)=>{
                      return (<li>{opcja.nazwa} <Badge pill bg={getBadgeColor(opcja.szansa)}>{opcja.szansa}%</Badge></li>)
                    })
                  }
                  </ul>
                </Card.Text>
                </Card.Body>
              </Card> */}
              </>
            )
          })
        }
        </Accordion>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Zamknij
          </Button>
        </Modal.Footer>
      </Modal>
    <Modal show={burgerBuyMenuShow} onHide={()=>setBurgerBuyMenuShow(false)}>
    <Modal.Header closeButton>
        <Modal.Title>{burgerClass.nazwa}</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
            <BurgerCanvas burgerOpenedCallback={()=>{
                setBurgerOpening(false)
              }} isOpening={burgerOpening} skladniki={burgerClass.skladniki}/>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={()=>setBurgerOpening(true)  }>
            Kup
          </Button>
          <Button variant="secondary" onClick={()=>closeBurgerMenu()  }>
            Zamknij
          </Button>
        </Modal.Footer>
    </Modal>

    </>

    )
}

export default BurgerCard;