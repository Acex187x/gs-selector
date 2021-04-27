import React from 'react'
import styled from 'styled-components'

export default function Title(props) {

    const { style, children, size, mb, center, id} = props

    return (
        <StyledTitle style={style} size={size} mb={mb} center={center} id={id}>
            {children}
        </StyledTitle>
    )
}

const StyledTitle = styled.span`
    font-size: 1rem;
    font-family: 'Poppins';
    font-weight: 500;
    line-height: 1.2;

    ${p => p.size ? `
        font-size: ${p.size};
    ` : ''}

    ${p => p.mb ? `
        margin-bottom: ${p.mb};
    ` : ''}

    ${p => p.center ? `
        text-align: center;
    ` : ''}
`