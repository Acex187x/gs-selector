import React from 'react'
import styled from 'styled-components'
import Text from '../Atoms/Text'
import Title from '../Atoms/Title'
import { getClassColorSchema, deleteClass } from '../core';
import deleteIcon from '../assets/minus.svg'

export default function ClassCard(props) {

    const { style, name, count, plus, onClick, editing } = props

    const color = getClassColorSchema(name) || 'white';

    return (
        <StyledClassCard style={style} plus={plus} onClick={!editing && onClick} color={color.bg} editing={editing}>
            {
                plus ? (
                    <Title center size={'3rem'}>+</Title>
                ) : (<>
                    <Title center size={'1.5rem'}>{name}</Title>
                    <Text center>{count}</Text>
                </>)
            }
            {
                !plus && editing && <RemoveButton onClick={() => deleteClass(name)}></RemoveButton>
            }
        </StyledClassCard>
    )
}

const StyledClassCard = styled.div`
    min-width: 4rem;
    min-height: 4rem;
    border-radius: 1rem;
    padding: 1rem;
    background-color: ${p => p.color};
    box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    cursor: pointer;
    position: relative;

    transition: transform .2s;
    ${p => !p.editing ? `
        &&:hover {
            transform: scale(1.03);
        }

        &&:active {
            transform: scale(.97);
        }
    ` : ''}

    ${p => p.plus ? `
        background: white;
    ` : ''}
`

const RemoveButton = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 2rem;
    background-image: url(${deleteIcon});
    background-repeat: no-repeat;
    background-size: 1.5rem;
    background-position: center center;

    position: absolute;
    right: -.5rem;
    top: -.5rem;

    transition: transform .2s;
    &&:hover {
        transform: scale(1.2);
    }

    &&:active {
        transform: scale(.97);
    }
`