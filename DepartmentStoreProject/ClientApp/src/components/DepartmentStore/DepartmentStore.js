import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col } from "reactstrap";
import { validateAddress, validateField, validateRequired } from '../../validation/validation';
import { Field } from '../FormComponents';
import ModalWindow from '../ModalWindow/ModalWindow';
import List from '../ListComponents/List'
import { Redirect } from 'react-router-dom';
import { getDepartmentStores, createDepartmentStore, editDepartmentStore, deleteDepartmentStore } from '../../actions/departmentStore';
import { clearMessage } from '../../actions/message';
import { useTranslation } from 'react-i18next';

const DepartmentStore = (props) => {
    const { t } = useTranslation();
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const [model, setModel] = useState({ departmentStoreId: 0, name: "", address: "" });

    const dispatch = useDispatch();

    const { departmentStores, message, user } = useSelector(state => ({
        departmentStores: state.departmentStore.departmentStores,
        message: state.message.message,
        user: state.auth.user
    }), shallowEqual)

    useEffect(() => {
        dispatch(getDepartmentStores());
    }, [dispatch])

    const createRecord = () => {
        dispatch(createDepartmentStore(model.name, model.address))
            .then(() => {
                setModalAdd(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const clearFields = () => {
        setModel({ departmentStoreId: 0, name: "", address: "" });
    }

    const editRecord = () => {
        dispatch(editDepartmentStore(model.departmentStoreId, model.name, model.address))
            .then(() => {
                setModalEdit(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const deleteRecord = (item) => {
        dispatch(deleteDepartmentStore(item.departmentStoreId))
            .then(() => { })
            .catch(() => { })
    }

    const openPage = (item) => {
        props.history.push("/shops/" + item.departmentStoreId);
    }

    const getUserValues = (item) => {
        setModel(item);
        dispatch(clearMessage());
        setModalEdit(true);
    }

    if (!user) {
        return <Redirect to="/login" />;
    }
    if (user.role === "Admin") {
        return <Redirect to="/profile" />;
    }

    return (
        <Container>
            <Container>
                <Row>
                    <Col className="text-left"><h3>{t("departmentStores")}</h3></Col>
                    <Col className="text-right">
                        <Button onClick={() => { clearFields(); setModalAdd(true); }} color="success">{t("Create")}</Button>
                        <Button onClick={() => { dispatch(getDepartmentStores()); }}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
            </Container>

            <List recorts={departmentStores} k="departmentStoreId" columns={['name', 'address']} deleteRecord={deleteRecord} editRecord={getUserValues} openPage={openPage}/>

            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader={t("Create")}
                textButton={t("Create")} method={createRecord} message={message}
            >
                <Field name="name" value={model}
                    setValue={(e) => { setModel({ ...model, "name": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="address" value={model}
                    setValue={(e) => { setModel({ ...model, "address": e.target.value }) }} validations={[validateRequired(t), validateAddress(t)]} />
            </ModalWindow>

            <ModalWindow modal={modalEdit} deactiveModal={() => setModalEdit(false)} textHeader={t("Edit")}
                method={editRecord} message={message} textButton={t("Edit")}
            >
                <Field name="name" value={model}
                    setValue={(e) => { setModel({ ...model, "name": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="address" value={model}
                    setValue={(e) => { setModel({ ...model, "address": e.target.value }) }} validations={[validateRequired(t), validateAddress(t)]} />
            </ModalWindow>
        </Container>
    );
};

export default DepartmentStore;