import {Grade} from "../client";
import {Button, Container, ListGroupItem} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {showInfo} from "../store/modal/modalReducer";
import {AppDispatch} from "../store/store";
import {deleteGrade} from "../store/api/gradeReducer";
import GradeDetail from "./GradeDetail";
import {useState} from "react";

type Props = {
    grade: Grade
}

const GradeListItem = (props: Props) => {
    const {grade} = props
    const {student, point, id} = grade
    const dispatch = useDispatch<AppDispatch>()
    const [detailStatus, setDetailStatus] = useState(false)

    const handleDelete = () => {
        dispatch(deleteGrade(id!))
        dispatch(
            showInfo({
                title: "İşlem tamamlandı",
                content: `${student?.firstname} ${student?.lastname} - ${point} kaydı silindi`,
                redirect: null,
                refresh: true
            })
        )

    }

    return (
        <ListGroupItem className={"d-flex"}>
            <Container
                onClick={() => setDetailStatus(true)}
                role={"button"}>
                <p>Öğrenci : {student?.firstname} {student?.lastname}</p>
                <p>Puan : {point}</p>
            </Container>
            <Button onClick={handleDelete} variant={"danger"}>Sil</Button>
            {detailStatus &&
                <GradeDetail
                    grade={grade}
                    modalProps={
                        {
                            onHide: () => setDetailStatus(false),
                            show: detailStatus
                        }
                    }/>}
        </ListGroupItem>

    )
};

export default GradeListItem