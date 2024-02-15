import {Nav} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";

const Header = () => {

    const nav = useNavigate();
    const loc = useLocation()

    return (
        <Nav className="justify-content-center border-bottom mb-2 pb-2 pt-2"
             variant={"pills"}
             activeKey={loc.pathname}
        >

            <Nav.Item>
                <Nav.Link onClick={() => nav("/")} eventKey={"/"}>
                    Notlar
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => nav("/create")} eventKey={"/create"}>
                    Yeni Not Oluştur
                </Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default Header