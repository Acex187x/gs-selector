import React from 'react'
import styled from 'styled-components'
import Text from '../Atoms/Text'
import Title from '../Atoms/Title'

export default function ClassCard(props) {

    const { style, name, count, plus, onClick } = props

    return (
        <StyledClassCard style={style} plus={plus} onClick={onClick}>
            {
                plus ? (
                    <Title center size={'3rem'}>+</Title>
                ) : (<>
                    <Title center size={'1.5rem'}>{name}</Title>
                    <Text center>{count}</Text>
                </>)
            }
        </StyledClassCard>
    )
}

const StyledClassCard = styled.div`
    min-width: 4rem;
    min-height: 4rem;
    border-radius: 1rem;
    padding: 1rem;
    background-color: #75EE6A;
    box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    cursor: pointer;

    transition: transform .2s;

    &&:hover {
        transform: scale(1.03);
    }

    &&:active {
        transform: scale(.97);
    }

    ${p => p.plus ? `
        background: white;
    ` : ''}
`