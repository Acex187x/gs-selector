import React from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import { getClassColorSchema } from '../core'
import Title from './Title'

// ph === padding horizontal

export default function Button(props) {

    const { style, children, ph, onClick, id } = props
    const params = useParams()

    const color = params.classname ? getClassColorSchema(params.classname).accent || props.color : props.color

    return (
        <StyledButton style={style} ph={ph} color={color} onClick={onClick} id={id}>
            <Title id={id} size={'1.2rem'}>{children}</Title>
        </StyledButton>
    )
}

const StyledButton = styled.button`
    color: white;
    border-radius: 5rem;
    background-color: #28c74f;
    border: 0;
    padding: .5rem 1.5rem;
    outline: 0;
    cursor: pointer;
    transition: transform .2s;
    user-select: none;

    ${p => p.color ? `
        background-color: ${p.color};
    ` : ''}

    ${p => p.ph ? `
        padding-left: ${p.ph};
        padding-right: ${p.ph};
    ` : ''}

    &&:hover {
        transform: scale(1.03);
    }

    &&:active {
        transform: scale(.97);
    }
`