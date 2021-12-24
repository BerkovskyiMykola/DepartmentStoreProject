import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col, Jumbotron } from "reactstrap";
import { validateField, validateRequired } from '../../validation/validation';
import { Field } from '../FormComponents';
import ModalWindow from '../ModalWindow/ModalWindow';
import List from '../ListComponents/List'
import { createShopItem, deleteShopItem, editShopItem, getShopItems } from '../../actions/shopItem';
import { clearMessage } from '../../actions/message';
import { useTranslation } from 'react-i18next';

const ShopItem = (props) => {
    const id = props.match.params.id;

    const { t } = useTranslation();
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const [model, setModel] = useState({ shopItemId: 0, name: "", price: 1, amount: 1 });

    const dispatch = useDispatch();

    const { type, floor, Name, shopItems, message } = useSelector(state => ({
        Name: state.shopItem.name,
        floor: state.shopItem.floor,
        type: state.shopItem.type,
        shopItems: state.shopItem.shopItems,
        message: state.message.message
    }), shallowEqual)

    useEffect(() => {
        dispatch(getShopItems(id))
            .then(() => { })
            .catch(() => { props.history.push("/404") });
    }, [id, dispatch, props.history])

    const createRecord = () => {
        dispatch(createShopItem(model.name, model.price, model.amount, id))
            .then(() => {
                setModalAdd(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const clearFields = () => {
        setModel({ shopItemId: 0, name: "", price: 1, amount: 1 });
    }

    const editRecord = () => {
        dispatch(editShopItem(model.shopItemId, model.name, model.price, model.amount))
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
        setModel(item);
        dispatch(clearMessage());
        setModalEdit(true);
    }

    const openHistory = () => {
        props.history.push("/histories/" + id);
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
                <Field name="name" value={model}
                    setValue={(e) => { setModel({ ...model, "name": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="price" value={model}
                    setValue={(e) => { setModel({ ...model, "price": e.target.value }) }} type="number" min={1} />
                <Field name="amount" value={model}
                    setValue={(e) => { setModel({ ...model, "amount": e.target.value }) }} type="number" min={1} />
            </ModalWindow>

            <ModalWindow modal={modalEdit} deactiveModal={() => setModalEdit(false)} textHeader={t("Edit")}
                method={editRecord} message={message} textButton={t("Edit")}
            >
                <Field name="name" value={model}
                    setValue={(e) => { setModel({ ...model, "name": e.target.value }) }} validations={[validateRequired(t), validateField(t)]} />
                <Field name="price" value={model}
                    setValue={(e) => { setModel({ ...model, "price": e.target.value }) }} type="number" min={1} />
                <Field name="amount" value={model}
                    setValue={(e) => { setModel({ ...model, "amount": e.target.value }) }} type="number" min={1} />
            </ModalWindow>
        </Container>
    );
};

export default ShopItem;