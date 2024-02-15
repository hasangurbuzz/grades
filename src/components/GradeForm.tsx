import {Button, Container, Form} from "react-bootstrap";
import React, {useContext, useState} from "react";
import {ApiContext} from "../context/ApiContext";
import {HttpStatusCode} from "axios";
import {trChars} from "../constants/regex";
import {useDispatch} from "react-redux";
import {showInfo} from "../store/modal/modalReducer";

const GradeForm = () => {
    const dispatch = useDispatch()
    const [valid, setValid] = useState(false)
    const {gradeApi} = useContext(ApiContext)
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        point: 0
    })
    const {firstname, lastname, point} = form
    const handleInput = (e: React.ChangeEvent<any>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            event.preventDefault()
            const response = await gradeApi.gradeCreate({
                student: {
                    firstname: firstname.trim(),
                    lastname: lastname.trim()
                },
                point: point!
            })
            if (response.status === HttpStatusCode.Ok) {
                dispatch(showInfo({
                    title: "Kayıt tamamlandı",
                    content: `${firstname} ${lastname} öğrencisinin ${point} notu başarıyla kaydedildi`,
                    redirect: "/",
                    refresh: false
                }))

            } else {
                alert("fail")
            }

        }
        setValid(true)

    }

    return (
        <Form noValidate validated={valid} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="form.firstname">
                <Form.Label>Öğrenci Adı</Form.Label>
                <Form.Control
                    value={firstname}
                    onChange={handleInput}
                    name={"firstname"}
                    required
                    type="text"
                    placeholder="John"
                    pattern={trChars}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="form.lastname">
                <Form.Label>Öğrenci Soyadı</Form.Label>
                <Form.Control
                    name={"lastname"}
                    value={lastname}
                    onChange={handleInput}
                    required
                    type="text"
                    placeholder="Doe"
                    pattern={trChars}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="form.point">
                <Form.Label>Puanı</Form.Label>
                <Form.Control
                    name={"point"}
                    value={point}
                    onChange={handleInput}
                    required
                    type="number"
                    min={0}
                    max={100}
                    step={0.1}
                    placeholder="80.3"/>
            </Form.Group>
            <Container className={"justify-content-center d-flex"}>
                <Button className={"w-100"} variant={"green"} type="submit">Kaydet</Button>
            </Container>
        </Form>

    )
}

export default GradeForm