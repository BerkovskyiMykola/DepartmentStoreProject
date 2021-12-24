import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col, Jumbotron } from "reactstrap";
import { validateField, validateRequired } from '../../validation/validation';
import { Field } from '../FormComponents';
import ModalWindow from '../ModalWindow/ModalWindow';
import List from '../ListComponents/List'
import { Redirect } from 'react-router-dom';
import { createShopItem, deleteShopItem, editShopItem, getShopItems } from '../../actions/shopItem';
import { clearMessage } from '../../actions/message';
import { useTranslation } from 'react-i18next';

const ShopItem = (props) => {
    const id = props.match.params.id;

    const { t } = useTranslation();
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const [shopItemId, setShopItemId] = useState(0);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(1);
    const [amount, setAmount] = useState(1);

    const dispatch = useDispatch();

    const { type, floor, Name, shopItems, message, user } = useSelector(state => ({
        Name: state.shopItem.name,
        floor: state.shopItem.floor,
        type: state.shopItem.type,
        shopItems: state.shopItem.shopItems,
        message: state.message.message,
        user: state.auth.user
    }), shallowEqual)

    useEffect(() => {
        dispatch(getShopItems(id))
            .then(() => { })
            .catch(() => { props.history.push("/404") });
    }, [id, dispatch, props.history])

    const createRecord = () => {
        dispatch(createShopItem(name, price, amount, id))
            .then(() => {
                setModalAdd(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const clearFields = () => {
        setName("");
        setPrice(1);
        setAmount(1);
        setShopItemId(0);
    }

    const editRecord = () => {
        dispatch(editShopItem(shopItemId, name, price, amount))
            .then(() => {
                setModalEdit(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const deleteRecord = (item) => {
        dispatch(deleteShopItem(item.shopItemId))
            .then(() => { })
            .catch(() => { })
    }

    const getUserValues = (item) => {
        const { shopItemId, name, price, amount } = item;
        setShopItemId(shopItemId);
        setName(name);
        setPrice(price);
        setAmount(amount);
        dispatch(clearMessage());
        setModalEdit(true);
    }

    const openHistory = () => {
        props.history.push("/histories/" + id);
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
                            <strong>{t("floor")}: {floor}</strong>
                        </h3>
                        <h3>
                            <strong>{t("type")}: {type}</strong>
                        </h3>
                    </Col>
                    <Col className="text-right">
                        <Button onClick={() => { openHistory(); }} color="success">{t("OpenHistory")}</Button>
                        <Button onClick={() => { dispatch(getShopItems(id)); }}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
            </Jumbotron>
            <Container>
                <Row>
                    <Col className="text-left"><h3>{t("shopItems")}</h3></Col>
                    <Col className="text-right">
                        <Button onClick={() => { clearFields(); setModalAdd(true); }} color="success">{t("Create")}</Button>
                    </Col>
                </Row>
            </Container>

            <List recorts={shopItems} k="shopItemId" columns={['name', 'price', 'amount']} deleteRecord={deleteRecord} editRecord={getUserValues}/>

            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader={t("Create")}
                textButton={t("Create")} method={createRecord} message={message}
            >
                <Field name="name" value={name}
                    setValue={(e) => { setName(e.target.value) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="price" value={price}
                    setValue={(e) => { setPrice(e.target.value) }} type="number" min={1} />
                <Field name="amount" value={amount}
                    setValue={(e) => { setAmount(e.target.value) }} type="number" min={1} />
            </ModalWindow>

            <ModalWindow modal={modalEdit} deactiveModal={() => setModalEdit(false)} textHeader={t("Edit")}
                method={editRecord} message={message} textButton={t("Edit")}
            >
                <Field name="name" value={name}
                    setValue={(e) => { setName(e.target.value) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="price" value={price}
                    setValue={(e) => { setPrice(e.target.value) }} type="number" min={1} />
                <Field name="amount" value={amount}
                    setValue={(e) => { setAmount(e.target.value) }} type="number" min={1} />
            </ModalWindow>
        </Container>
    );
};

export default ShopItem;