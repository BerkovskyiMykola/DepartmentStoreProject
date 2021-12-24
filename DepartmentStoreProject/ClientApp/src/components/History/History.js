import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col, Jumbotron } from "reactstrap";
import List from '../ListComponents/List'
import { getHistories, createHistory } from '../../actions/history';
import { clearMessage } from '../../actions/message';
import { useTranslation } from 'react-i18next';

const History = (props) => {
    const id = props.match.params.id;

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { type, floor, name, histories } = useSelector(state => ({
        name: state.history.name,
        floor: state.history.floor,
        type: state.history.type,
        histories: state.history.histories
    }), shallowEqual)

    useEffect(() => {
        dispatch(getHistories(id))
            .then(() => { })
            .catch(() => { props.history.push("/404") });
    }, [id, dispatch, props.history])

    const createRecord = () => {
        dispatch(createHistory(id))
            .then(() => {
                dispatch(clearMessage());
            })
            .catch(() => { })
    }

    return (
        <Container>
            <Jumbotron className="bg-dark text-white">
                <Row>
                    <Col className="text-left">
                        <h3>
                            <strong>{t("name")}: {name}</strong>
                        </h3>
                        <h3>
                            <strong>{t("floor")}: {floor}</strong>
                        </h3>
                        <h3>
                            <strong>{t("type")}: {type}</strong>
                        </h3>
                    </Col>
                    <Col className="text-right">
                        <Button onClick={() => { dispatch(getHistories(id)); }}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
            </Jumbotron>
            <Container>
                <Row>
                    <Col className="text-left"><h3>{t("histories")}</h3></Col>
                    <Col className="text-right">
                        <Button onClick={() => { createRecord(); }} color="success">{t("Create")}</Button>
                    </Col>
                </Row>
            </Container>

            <List recorts={histories.map(x => { return { ...x, dateTime: new Date(x.dateTime).toLocaleString() } })} k="historyId" columns={['name', 'pricePaid', 'amount', 'dateTime']} action={false}/>
        </Container>
    );
};

export default History;