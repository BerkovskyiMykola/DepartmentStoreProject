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

    const [departmentStoreId, setDepartmentStoreId] = useState(0);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [form, setForm] = useState(null);
    const [checkBtn, setCheckBtn] = useState(null);

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
        dispatch(createDepartmentStore(name, address))
            .then(() => {
                setModalAdd(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const clearFields = () => {
        setName("");
        setAddress("");
        setDepartmentStoreId(0);
    }

    const editRecord = () => {
        dispatch(editDepartmentStore(departmentStoreId, name, address))
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

    const getUserValues = (item) => {
        const { departmentStoreId, name, address } = item;
        setAddress(address);
        setDepartmentStoreId(departmentStoreId);
        setName(name);
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

            <List recorts={departmentStores} k="departmentStoreId" columns={['name', 'address']} deleteRecord={deleteRecord} editRecord={getUserValues}/>

            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader={t("Create")}
                setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }}
                textButton={t("Create")} method={createRecord} form={form} message={message}
            >
                <Field title={t("name")} name="name" value={name}
                    setValue={(e) => { setName(e.target.value) }} validations={[validateRequired(t), validateField(t)]} />
                <Field title={t("address")} name="address" value={address}
                    setValue={(e) => { setAddress(e.target.value) }} validations={[validateRequired(t), validateAddress(t)]} />
            </ModalWindow>

            <ModalWindow modal={modalEdit} deactiveModal={() => setModalEdit(false)} textHeader={t("Edit")}
                setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }}
                method={editRecord} message={message} form={form} textButton={t("Edit")}
            >
                <Field title={t("name")} name="name" value={name}
                    setValue={(e) => { setName(e.target.value) }} validations={[validateRequired(t), validateField(t)]} />
                <Field title={t("address")} name="address" value={address}
                    setValue={(e) => { setAddress(e.target.value) }} validations={[validateRequired(t), validateAddress(t)]} />
            </ModalWindow>
        </Container>
    );
};

export default DepartmentStore;