import React from 'react'
import styled from 'styled-components'
import Title from '../Atoms/Title'
import Student from '../Components/Student'

export default function Missing(props) {

    const { style, students, onSelect, missingList } = props

    return (
        <StyledMissing style={style}>
            <Title size='3rem'>Kdo ještě spí?</Title>
            <Students>
                {
                    students.map(s => (
                        <Student scale='.8' onClick={() => onSelect(s)} sleeping={missingList.find(ss => ss === s)}>{s}</Student>
                    ))
                }
            </Students>
        </StyledMissing>
    )
}

const StyledMissing = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    height: 65%;
`

const Students = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;

`