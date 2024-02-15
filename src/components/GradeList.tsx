import {DirectionType, PageRequest, SortType} from "../client";
import GradeListItem from "./GradeListItem";
import {Button, Container, Dropdown, Form, InputGroup, ListGroup, Pagination} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, IRootState} from "../store/store";
import {fetchGrades} from "../store/api/gradeReducer";
import React, {useEffect, useState} from "react";
import {directionTypes, sortTypes} from "../constants/api";


const GradeList = () => {
    let limit = 6
    const {items, total, loading} = useSelector((state: IRootState) => state.grade)
    const dispatch = useDispatch<AppDispatch>()
    const [pageRequest, setPageRequest] = useState<PageRequest>(
        {
            start: 0,
            limit: 5,
            order: {
                sort: SortType.StudentFirstname,
                direction: "ASC"
            }
        }
    )
    const [page, setPage] = useState(1)
    const [searchState, setSearchState] = useState({
        firstname: "",
        lastname: "",
        searchTerm: ""
    })
    useEffect(() => {
        setPageRequest(prev => ({
            ...prev,
            start: (page - 1) * limit
        }))
    }, [page]);

    const paginationItems = []
    const pageCount = Math.ceil(total / limit)
    for (let i = 1; i <= pageCount; i++) {
        paginationItems.push(
            <Pagination.Item
                key={i}
                active={i === page}
                onClick={() => setPage(i)}
            >
                {i}
            </Pagination.Item>
        )
    }

    const handleSortType = (key: string | null) => {
        setPageRequest(prev => ({
            ...prev,
            order: {
                sort: key as SortType,
                direction: prev.order!.direction
            }
        }))
    }

    const handleDirectionType = (key: string | null) => {
        setPageRequest(prev => ({
            ...prev,
            order: {
                sort: prev.order!.sort,
                direction: key as DirectionType
            }
        }))
    }

    useEffect(() => {
        dispatch(
            fetchGrades({
                pageRequest: pageRequest,
                firstname: searchState.firstname,
                lastname: searchState.lastname
            }))
    }, [pageRequest]);

    if (items.length === 0 && loading) {
        return (
            <Container className={"d-flex justify-content-center"}>
                <p className={"fs-1"}>Loading</p>
            </Container>
        )
    }

    const onSearchSubmit = () => {
        if (searchState.searchTerm.length === 0) {
            return
        }
        setPageRequest(prev => ({
            ...prev,
            start: 0
        }))
    }

    const onSearchChange = (e: React.ChangeEvent<any>) => {
        const terms = searchState.searchTerm.split(" ")
        setSearchState(prev => ({
            ...prev,
            searchTerm: e.target.value,
            firstname: terms[0] || "",
            lastname: terms[1] || ""
        }))
    }

    return (
        <>
            <Container className={"d-flex flex-column align-items-center"}>
                <Container>
                    <InputGroup className="mb-3">
                        <Form.Control
                            value={searchState.searchTerm}
                            onChange={onSearchChange}
                            placeholder="Ara"
                        />
                        <Button onClick={onSearchSubmit}>Ara</Button>
                    </InputGroup>
                </Container>
                <Container className={"d-flex justify-content-end mt-3 mb-3 align-items-center"}>
                    <h6>Sıralama Tercihi</h6>
                    <Dropdown className={"ms-3 me-3"} onSelect={handleDirectionType}>
                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                            {directionTypes.filter(x => x.key == pageRequest.order?.direction)[0].value}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                directionTypes.map(({key, value}) => {
                                    return (
                                        <Dropdown.Item eventKey={key}>
                                            {value}
                                        </Dropdown.Item>
                                    )
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown onSelect={handleSortType}>
                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                            {sortTypes.filter(x => x.key == pageRequest.order?.sort)[0].value}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                sortTypes.map(({key, value}) => {
                                    return (
                                        <Dropdown.Item eventKey={key}>
                                            {value}
                                        </Dropdown.Item>
                                    )
                                })
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Container>
            <ListGroup>
                {
                    items.map(grade =>
                        <GradeListItem key={grade.id} grade={grade}/>
                    )
                }
            </ListGroup>
            <Container className={"d-flex justify-content-center fixed-bottom"}>
                <Pagination>
                    {paginationItems}
                </Pagination>
            </Container>
        </>
    )
}

export default GradeList;