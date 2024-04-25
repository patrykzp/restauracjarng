import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";


function BurgeryNavbar(){
    return (
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">test</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Oferty</Nav.Link>
            <Nav.Link href="#features">O nas</Nav.Link>
            <Nav.Link href="#pricing">FAQ</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
}

export default BurgeryNavbar;