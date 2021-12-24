import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { clearMessage } from "../../actions/message";
import { editUser, getUser } from "../../actions/profile";
import { validateField, validateRequired } from "../../validation/validation";
import { Field } from "../FormComponents";
import ModalWindow from "../ModalWindow/ModalWindow";
import { Row, Button, Col, Container, Jumbotron } from "reactstrap";

export default function Profile(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [modalEdit, setModalEdit] = useState(false);
    const [form, setForm] = useState(null);
    const [checkBtn, setCheckBtn] = useState(null);

    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");

    const { profile, user, message } = useSelector(state => ({
        profile: state.profile.profile,
        user: state.auth.user,
        message: state.message.message
    }), shallowEqual)

    useEffect(() => {
        dispatch(getUser())
            .then(() => { })
            .catch(() => { props.history.push("/404") });
    }, [dispatch, props.history])

    const editRecord = () => {
        dispatch(editUser(user.userId, lastname, firstname))
            .then(() => {
                setModalEdit(false);
                dispatch(clearMessage());
            })
            .catch(() => { })
    }

    if (!user) {
        return <Redirect to="/login" />;
    }

    return (
        <Container>
            <Jumbotron className="bg-dark text-white">
                <Row>
                    <Col className="text-left">
                        <h3>
                            <strong>{t("Profile")}: {profile.lastname} {profile.firstname}</strong>
                        </h3>
                    </Col>
                    <Col className="text-right">
                        <Button onClick={() => { dispatch(clearMessage()); setModalEdit(true); setLastname(profile.lastname); setFirstname(profile.firstname); }}>
                            {t("Edit")}
                        </Button>
                    </Col>
                </Row>
            </Jumbotron>
            <p>
                <strong>{t("email")}:</strong> {profile.email}
            </p>
            <p>
                <strong>{t("role")}:</strong> {profile.role}
            </p>
            <ModalWindow modal={modalEdit} deactiveModal={() => { setModalEdit(false); }} textHeader={t("Edit")}
                setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }}
                textButton={t("Edit")} method={editRecord} form={form} message={message}
            >
                <Field title={t("lastname")} name="lastname" value={lastname}
                    setValue={(e) => { setLastname(e.target.value) }} validations={[validateRequired(t), validateField(t)]} />
                <Field title={t("firstname")} name="firstname" value={firstname}
                    setValue={(e) => { setFirstname(e.target.value) }} validations={[validateRequired(t), validateField(t)]} />
            </ModalWindow>
        </Container>
    );
}