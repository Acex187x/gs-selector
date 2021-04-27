import React from 'react'
import styled from 'styled-components'
import man from '../assets/man.svg'
import Text from '../Atoms/Text'

export default function Student(props) {

    const { style, children, scale, onClick } = props

    return (
        <StyledStudent style={style} scale={scale || 1} onClick={onClick} className="student">
            <Avatar src={man} scale={scale || 1} />
            <Text size={`${(scale || 1) * 1.2}rem`}>{children}</Text>
        </StyledStudent>
    )
}

const StyledStudent = styled.div`
    background-color: white;
    max-width: ${p => p.scale  * 20}rem;
    padding: ${p => p.scale  * 0.5}rem ${p => p.scale  * 1}rem;
    border-radius: ${p => p.scale  * 1}rem;
    display: flex;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
    align-items: center;
    user-select: none;
    
    && > span {
       display: flex;
       align-items: center; 
       margin-left: ${p => p.scale  * 0.5}rem;
    }
`

const Avatar = styled.img`
    max-height: ${p => p.scale  * 2}rem;
`