import React from 'react'
import { useAuthContext } from '../shared/context/AuthContext'
import s from './profile-page.module.scss'

export const ProfilePage = () => {
  const { claims } = useAuthContext()

  if (!claims) {
    return <div className={s.wrapper}>Доступ запрещён. Войдите в систему.</div>
  }

  return (
    <div className={s.wrapper}>
      <h1>Профиль</h1>
      <div className={s.profile}>
        <p><strong>Email:</strong> {claims.email}</p>
      </div>
    </div>
  )
}