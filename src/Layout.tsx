import Header from "./components/Header";
import {Outlet} from "react-router-dom";
import {Container} from "react-bootstrap";
import InformationModal from "./components/InformationModal";

const Layout = () => {
    return (
        <>
            <Header/>
            <Container>
                <Outlet/>
            </Container>
            <InformationModal/>
        </>
    )
}

export default Layout