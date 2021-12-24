import React, { useEffect, useState } from 'react'
import Select from "react-validation/build/select";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col } from "reactstrap";
import { validateEmail, validateField, validatePassword, validateRequired } from '../../validation/validation';
import { Field } from '../FormComponents';
import ModalWindow from '../ModalWindow/ModalWindow';
import List from '../ListComponents/List'
import { createUser, deleteUser, editUser, getUsers } from '../../actions/user';
import { clearMessage } from '../../actions/message';
import datebaseService from '../../services/datebase.service';
import { useTranslation } from 'react-i18next';

const User = (props) => {
    const { t } = useTranslation();
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const [model, setModel] = useState({ userId: 0, firstname: "", lastname: "", email: "", password: "", role: "User" });

    const dispatch = useDispatch();

    const { users, message } = useSelector(state => ({
        users: state.user.users,
        message: state.message.message
    }), shallowEqual)

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch])

    const createRecord = () => {
        dispatch(createUser(model.lastname, model.firstname, model.role, model.email, model.password))
            .then(() => {
                setModalAdd(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const clearFields = () => {
        setModel({ userId: 0, firstname: "", lastname: "", email: "", password: "", role: "User" });
    }

    const editRecord = () => {
        dispatch(editUser(model.userId, model.lastname, model.firstname, model.role))
            .then(() => {
                setModalEdit(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const deleteRecord = (item) => {
        dispatch(deleteUser(item.userId))
            .then(() => { })
            .catch(() => { })
    }

    const getUserValues = (item) => {
        setModel(item);
        dispatch(clearMessage());
        setModalEdit(true);
    }

    const createBackup = () => {
        datebaseService.backup().then(() => { alert("Success") }).catch(() => { alert("Error") });
    }

    const restoreDatabase = () => {
        datebaseService.restore().then(() => { alert("Success") }).catch(() => { alert("Error") });
    }

    return (
        <Container>
            <Container>
                <Row>
                    <Col className="text-left"><h3>{t("Users")}</h3></Col>
                    <Col className="text-right">
                        <Button onClick={createBackup} color="info">{t("CreateBackup")}</Button>
                        <Button onClick={restoreDatabase} color="warning">{t("RestoreDatabase")}</Button>
                        <Button onClick={() => { clearFields(); setModalAdd(true) }} color="success">{t("Create")}</Button>
                        <Button onClick={() => { dispatch(getUsers()); }}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
            </Container>

            <List recorts={users} k="userId" columns={['firstname', 'lastname', 'email', 'role']} deleteRecord={deleteRecord} editRecord={getUserValues} />

            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader={t("Create")}
                textButton={t("Create")} method={createRecord} message={message}
            >
                <Field name="email" value={model}
                    setValue={(e) => { setModel({ ...model, "email": e.target.value }) }} validations={[validateRequired(t), validateEmail(t)]} />
                <Field name="firstname" value={model}
                    setValue={(e) => { setModel({ ...model, "firstname": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="lastname" value={model}
                    setValue={(e) => { setModel({ ...model, "lastname": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="password" value={model}
                    setValue={(e) => { setModel({ ...model, "password": e.target.value }) }} validations={[validateRequired(t), validatePassword(t)]} />
                <div className="form-group">
                    <label htmlFor="role">{t("role")}</label>
                    <Select className="form-control" name="role" value={model.role} onChange={(e) => setModel({ ...model, "role": e.target.value })}>
                        <option value='User'>User</option>
                        <option value='Admin'>Admin</option>
                    </Select>
                </div>
            </ModalWindow>

            <ModalWindow modal={modalEdit} deactiveModal={() => setModalEdit(false)} textHeader={t("Edit")}
                method={editRecord} message={message} textButton={t("Edit")}
            >
                <p>{t("email")}: {model.email}</p>
                <Field name="firstname" value={model}
                    setValue={(e) => { setModel({ ...model, "firstname": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="lastname" value={model}
                    setValue={(e) => { setModel({ ...model, "lastname": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <div className="form-group">
                    <label htmlFor="role">{t("role")}</label>
                    <Select className="form-control" name="role" value={model.role} onChange={(e) => setModel({ ...model, "role": e.target.value })}>
                        <option value='User'>User</option>
                        <option value='Admin'>Admin</option>
                    </Select>
                </div>
            </ModalWindow>
        </Container>
    );
};

export default User;