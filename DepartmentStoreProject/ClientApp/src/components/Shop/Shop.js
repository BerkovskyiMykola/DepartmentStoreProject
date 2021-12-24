import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col, Jumbotron } from "reactstrap";
import { validateField, validateRequired } from '../../validation/validation';
import { Field } from '../FormComponents';
import ModalWindow from '../ModalWindow/ModalWindow';
import List from '../ListComponents/List'
import { Redirect } from 'react-router-dom';
import { createShop, deleteShop, editShop, getShops } from '../../actions/shop';
import { clearMessage } from '../../actions/message';
import { useTranslation } from 'react-i18next';

const Shop = (props) => {
    const id = props.match.params.id;

    const { t } = useTranslation();
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [shopId, setShopId] = useState(0);
    const [name, setName] = useState("");
    const [floor, setFloor] = useState(0);
    const [type, setType] = useState("");

    const dispatch = useDispatch();

    const { Address, Name, shops, message, user } = useSelector(state => ({
        Name: state.shop.name,
        Address: state.shop.address,
        shops: state.shop.shops,
        message: state.message.message,
        user: state.auth.user
    }), shallowEqual)

    useEffect(() => {
        dispatch(getShops(id))
            .then(() => { })
            .catch(() => { props.history.push("/404") });
    }, [id, dispatch, props.history])

    const createRecord = () => {
        dispatch(createShop(name, floor, type, id))
            .then(() => {
                setModalAdd(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const clearFields = () => {
        setName("");
        setFloor(1);
        setType("");
        setShopId(0);
    }

    const editRecord = () => {
        dispatch(editShop(shopId, name, floor, type))
            .then(() => {
                setModalEdit(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const deleteRecord = (item) => {
        dispatch(deleteShop(item.shopId))
            .then(() => { })
            .catch(() => { })
    }

    const getUserValues = (item) => {
        const { shopId, name, floor, type } = item;
        setName(name);
        setFloor(floor);
        setType(type);
        setShopId(shopId);
        dispatch(clearMessage());
        setModalEdit(true);
    }

    const openPage = (item) => {
        props.history.push("/shopItems/" + item.shopId);
    }

    if (!user) {
        return <Redirect to="/login" />;
    }
    if (user.role === "Admin") {
        return <Redirect to="/profile" />;
    }

    return (
        <Container>
            <Jumbotron className="bg-dark text-white">
                <Row>
                    <Col className="text-left">
                        <h3>
                            <strong>{t("name")}: {Name}</strong>
                        </h3>
                        <h3>
                            <strong>{t("address")}: {Address}</strong>
                        </h3>
                    </Col>
                    <Col className="text-right">
                        <Button onClick={() => { dispatch(getShops(id)); }}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
            </Jumbotron>
            <Container>
                <Row>
                    <Col className="text-left"><h3>{t("shops")}</h3></Col>
                    <Col className="text-right">
                        <Button onClick={() => { clearFields(); setModalAdd(true); }} color="success">{t("Create")}</Button>
                    </Col>
                </Row>
            </Container>

            <List recorts={shops} k="shopId" columns={['name', 'floor', 'type']} deleteRecord={deleteRecord} editRecord={getUserValues} openPage={openPage}/>

            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader={t("Create")}
                textButton={t("Create")} method={createRecord} message={message}
            >
                <Field title={t("name")} name="name" value={name}
                    setValue={(e) => { setName(e.target.value) }} validations={[validateRequired(t), validateField(t)]} />
                <Field title={t("floor")} name="floor" value={floor}
                    setValue={(e) => { setFloor(e.target.value) }} type="number" min={1} />
                <Field title={t("type")} name="type" value={type}
                    setValue={(e) => { setType(e.target.value) }} validations={[validateRequired(t), validateField(t)]} />
            </ModalWindow>

            <ModalWindow modal={modalEdit} deactiveModal={() => setModalEdit(false)} textHeader={t("Edit")}
                method={editRecord} message={message} textButton={t("Edit")}
            >
                <Field title={t("name")} name="name" value={name}
                    setValue={(e) => { setName(e.target.value) }} validations={[validateRequired(t), validateField(t)]} />
                <Field title={t("floor")} name="floor" value={floor}
                    setValue={(e) => { setFloor(e.target.value) }} type="number" min={1} />
                <Field title={t("type")} name="type" value={type}
                    setValue={(e) => { setType(e.target.value) }} validations={[validateRequired(t), validateField(t)]} />
            </ModalWindow>
        </Container>
    );
};

export default Shop;