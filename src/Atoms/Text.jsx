import React from 'react'
import styled from 'styled-components'

export default function Text(props) {

    const { style, children, size, center } = props

    return (
        <StyledText style={style} size={size} center={center}>
            {children}
        </StyledText>
    )
}

const StyledText = styled.span`
    font-size: 1rem;
    font-family: 'Poppins';
    font-weight: 300;
    text-decoration: none;
    

    ${p => p.size ? `
        font-size: ${p.size};
    ` : ''}

    ${p => p.center ? `
        text-align: center;
    ` : ''}
`