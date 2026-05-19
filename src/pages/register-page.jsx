import React, { useState } from 'react'
import s from './register-page.module.scss'
import { Field, Form, Formik } from 'formik'
import * as Yup from "yup"
import { useAuthContext } from '../shared/context/AuthContext'
import { useNavigate } from 'react-router-dom'

export const RegisterPage = () => {

  const { register } = useAuthContext()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState(null)

  const validateScheme = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[а-яА-ЯёЁ\s]*$/, "Только русские символы")
      .min(2, "Минимум 2 символа")
      .required("Имя обязательно"),
    lastName: Yup.string()
      .matches(/^[а-яА-ЯёЁ\s]*$/, "Только русские символы")
      .min(2, "Минимум 2 символа",)
      .nullable(),
    email: Yup.string()
      .email("Это не E-mail")
      .required("Поля должны быть заполнены"),
    password: Yup.string()
      .min(8, "Минимум 8 символов")
      .max(30, "Максимум 30 символов")
      .required("Поля должны быть заполнены"),
  });

  return (
    <div className={s.wrapper}>
      <Formik
        validationSchema={validateScheme}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: null,
        }}
        onSubmit={({email, password, firstName, lastName}) => {
          register({email, password, firstName, lastName})
        }}
      >
        {({ errors, isValid, touched, isSubmitting }) => (
          <Form className={s.form}>
            <Field
              type="text"
              className={s.input}
              placeholder="Имя"
              name="firstName"
            />
            {touched?.firstName && errors?.firstName?.length ? errors?.firstName : ""}
            <Field
              type="text"
              className={s.input}
              placeholder="Фамилия"
              name="lastName"
            />
            {touched?.lastName && errors?.lastName?.length > 0 ? errors?.lastName : ""}
            <Field
              type="text"
              className={s.input}
              placeholder="E-mail"
              name="email"
            />
            {touched?.email && errors?.email?.length > 0 ? errors?.email : ""}
            <Field
              type="password"
              className={s.input}
              placeholder="qwerty123"
              name="password"
            />
            {touched?.password && errors?.password?.length > 0 ? errors?.password : ""}

            {errorMessage ? <div style={{ color: 'crimson', marginTop: 8 }}>{errorMessage}</div> : null}

            <button
              className={s.submit}
              type="submit"
              disabled={!isValid || !touched?.email || !touched?.password || !touched?.firstName || isSubmitting}
            >
              ВОЙТИ
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}