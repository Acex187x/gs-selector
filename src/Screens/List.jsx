import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../Atoms/Button'
import Text from '../Atoms/Text'
import Student from '../Components/Student'
import { randomiseArray } from '../core'

export default function List(props) {

    const { style, students } = props
    const [list, setList] = useState([]);

    const handleButton = () => {
        setList(randomiseArray(students))
    }

    useEffect(() => {
        setList(randomiseArray(students))
    }, [])

    return (
        <StyledList style={style}>
            <ListBody>
                {
                    list.map((s, i) => (
                        <ListElement>
                            <Text style={{marginRight: '1rem'}}>{i + 1}.</Text>
                            <Student scale={0.8}>{s}</Student>
                        </ListElement>
                    ))
                }
            </ListBody>
            <Control>
                <Button onClick={handleButton}>Vybrat</Button>
            </Control>
        </StyledList>
    )
}

const StyledList = styled.div`
    height: 70%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Control = styled.div`
    position: absolute;
    bottom: -4rem;
    display: flex;
    justify-content: center;
    width: 100%;
`

const ListBody = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    min-width: 50rem;
`

const ListElement = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`