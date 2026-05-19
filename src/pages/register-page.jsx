import React, { useState } from "react";
import s from "./register-page.module.scss";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup'

export const RegisterPage = () => {

  const validateScheme = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[а-яА-ЯёЁ]{2,}$/, "Только русские символы, минимум 2")
      .required("Все поля должны быть заполнены"),
    lastName: Yup.string()
      .matches(/^[а-яА-ЯёЁ]{2,}$/, "Только русские символы, минимум 2")
      .notRequired(),
    email: Yup.string()
      .email("Это не E-mail, перепиши пж, на E-mail")
      .required("Все поля должны быть заполнены"),
    password: Yup.string()
      .min(8, "Минимум 8 символов")
      .max(20, "Максимум 20 символов")
      .required("Все поля должны быть заполнены"),
  });

  return (
    <div className={s.wrapper}>
      <Formik
        validationSchema={validateScheme}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          alert(`\nИмя: ${values?.firstName}\nФамилия: ${values?.lastName}\nE-mail: ${values?.email}\nПароль: ${values?.password}\n`);
        }}
      >
        {({ errors, isValid, touched }) => (
          <Form className={s.form}>
            <Field
              type="text"
              className={s.input}
              placeholder="Имя"
              name="firstName"
              autoComplete="off"
            />
            {errors?.firstName?.length > 0 ? errors?.firstName : ""}
            <Field
              type="text"
              className={s.input}
              placeholder="Фамилия"
              name="lastName"
              autoComplete="off"
            />
            {errors?.lastName?.length > 0 ? errors?.lastName : ""}
            <Field
              type="email"
              className={s.input}
              placeholder="E-mail"
              name="email"
              autoComplete="username"
            />
            {errors?.email?.length > 0 ? errors?.email : ""}
            <Field
              type="password"
              className={s.input}
              placeholder="qwerty123"
              name="password"
              autoComplete="new-password"
            />
            {errors?.password?.length > 0 ? errors?.password : ""}
            <button className={s.submit} type="submit" disabled={!isValid || (!touched?.firstName || !touched?.email || !touched?.password)}>
              ЗАРЕГИСТРИРОВАТЬСЯ
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};