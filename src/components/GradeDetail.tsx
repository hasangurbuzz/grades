import {Grade} from "../client";
import {Button, Modal, ModalProps} from "react-bootstrap";
import {gradeApi} from "../store/api/gradeReducer";
import {useEffect, useState} from "react";
import {formatDate} from "../constants/api";

type Props = {
    grade: Grade
    modalProps: ModalProps
}

const GradeDetail = (props: Props) => {
    const {grade, modalProps} = props
    const [data, setData] = useState<Grade | null>(null)
    useEffect(() => {
        gradeApi.gradeGet(grade.id!)
            .then(res => {
                setData(res.data)
            })
    }, []);

    if (data === null) {
        return (
            <Modal
                show={true}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <p>
                        Loading
                    </p>
                </Modal.Body>
            </Modal>
        )
    }

    return (
        <Modal
            {...modalProps}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {data.student?.firstname} {data.student?.lastname}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Puan: {data.point}
                </p>
                <p>
                    Oluşturulma Tarihi: {formatDate(data.detail!.createdAt!)}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={modalProps.onHide}>Tamam</Button>
            </Modal.Footer>
        </Modal>
    )

}

export default GradeDetail