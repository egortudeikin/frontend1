import React from 'react'

export const Button = ({label, onClick}) => {
    return (
        <button onClick={() => onClick('akscbabka')}>{label}</button>
    )
}