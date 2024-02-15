import {Button, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../store/store";
import {useNavigate} from "react-router-dom";
import {hideInfo} from "../store/modal/modalReducer";


const InformationModal = () => {
    const {infoModal} = useSelector((state: IRootState) => state.modal)
    const dispatch = useDispatch()
    const nav = useNavigate()
    const onClose = () => {
        const {redirect} = infoModal
        if (redirect.status) {
            nav(redirect.path!)
        }
        if (redirect.refresh) {
            nav(0)
        }
        dispatch(
            hideInfo()
        )
    }

    return (
        <Modal
            onHide={onClose}
            show={infoModal.visible}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {infoModal.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    {infoModal.content}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>Tamam</Button>
            </Modal.Footer>
        </Modal>
    )

}

export default InformationModal