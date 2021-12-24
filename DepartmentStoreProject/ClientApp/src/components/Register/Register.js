import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { register } from "../../actions/auth";

import { validateRequired, validateEmail, validateField, validatePassword } from "../../validation/validation";
import { Field, Form } from "../FormComponents";

export default function Register(props) {
    const { t } = useTranslation();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [form, setForm] = useState(null);
    const [checkBtn, setCheckBtn] = useState(null);

    const dispatch = useDispatch();

    const { message, isLoggedIn } = useSelector(state => ({
        message: state.message.message,
        isLoggedIn: state.auth.isLoggedIn
    }), shallowEqual)

    const handleRegister = (e) => {
        e.preventDefault();

        form.validateAll();

        if (checkBtn.context._errors.length === 0) {
            dispatch(register(lastname, firstname, email, password))
                .then(() => { })
                .catch(() => { });
            
        }

    }

    if (isLoggedIn) {
        return <Redirect to="/profile" />;
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <Form handleSubmit={handleRegister} setForm={(c) => { setForm(c); }}
                    message={message} setCheckBtn={(c) => { setCheckBtn(c); }} >
                    <div>
                        <Field name="email" value={email}
                            setValue={(e) => { setEmail(e.target.value) }} validations={[validateRequired(t), validateEmail(t)]} />
                        <Field name="firstname" value={firstname}
                            setValue={(e) => { setFirstname(e.target.value) }} validations={[validateRequired(t), validateField(t)]} />
                        <Field name="lastname" value={lastname}
                            setValue={(e) => { setLastname(e.target.value) }} validations={[validateRequired(t), validateField(t)]} />
                        <Field name="password" value={password}
                            setValue={(e) => { setPassword(e.target.value) }} validations={[validateRequired(t), validatePassword(t)]} />

                        <div className="form-group">
                            <button className="btn btn-primary btn-block">{t("SignUp")}</button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}