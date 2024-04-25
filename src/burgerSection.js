import './BurgerCard';
import Stack from "react-bootstrap/Stack";
import BurgerCard from './BurgerCard';
import Container from "react-bootstrap/Container";
function BurgerSection({name, burgers}){
    return (
        <Container>
            <h2>{name}</h2>
            <Stack direction="horizontal" gap={3} >
            {
                burgers.map((obj)=>{
                    return <BurgerCard burgerClass={obj}/>
                })
            }
            </Stack>
        </Container>
    )
}

export default BurgerSection;