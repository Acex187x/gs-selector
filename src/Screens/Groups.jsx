import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../Atoms/Button'
import Student from '../Components/Student'
import _ from 'lodash'
import { randomiseArray } from '../core'
import Text from '../Atoms/Text'

const modesColumn = { // connection of group mode and grid-template-columns in groups 
    S2: '1',
    S3: '1',
    S4: '2',
    S5: '1',
    S6: '1',
    T2: '2',
    T3: '1',
    T4: '1'
}

const groupsName = [
    ["Smažene","Šileny","Půvabny","Neuralní", "Armadní","Skvěly", "Mystický", "Červené", "Zkušení"],
    ["pražaky","špeky","krevety","policisté","kočky","psy", "kouzelníky", "mikrovlnky", "komunistove"],
]

const randomName = () => groupsName.map(el => el[~~(el.length * Math.random())]).join(' ')

export default function Groups(props) {

    const { style, students } = props
    const [groups, setGroups] = useState([]);
    const [mode, setMode] = useState('S2');

    const generateNewGroups = (mode) => { // mode<string> mode[0]<'S' | 'T'> (students or team) mode[1]<number>
        setMode(mode);
        if (mode[0] === 'S') {
            let chunked = _.chunk(randomiseArray(students), parseInt(mode.slice(1)))
            if (_.last(chunked).length === 1) {
                chunked = [..._.dropRight(chunked, 2), [..._.last(_.dropRight(chunked, 1)), ..._.last(chunked)]]
            }
            setGroups(chunked)
        } else if (mode[0] === 'T') {
            let chunked = _.chunk(randomiseArray(students), parseInt(~~(students.length / parseInt(mode.slice(1)))))
            console.log(chunked.length, parseInt(mode.slice(1)))
            if (chunked.length > parseInt(mode.slice(1))) {
                chunked = [..._.dropRight(chunked, 2), [..._.last(_.dropRight(chunked, 1)), ..._.last(chunked)]]
            }
            setGroups(chunked)
        }
    }

    useEffect(() => {
        generateNewGroups('S2')
    }, [])

    const handleButton = e => {
        generateNewGroups(e.target.id)
    }
    
    return (
        <StyledGroups style={style}>
            <GroupsContainer>
                {
                    groups.map((el, key) => (
                        <Group name={randomName()} key={key} cols={modesColumn[mode]}>
                            {
                                el.map((s, i) => (
                                    <GroupElement>
                                        <Text style={{marginRight: '1rem'}}>{i + 1}.</Text> 
                                        <Student scale={0.8}>{s}</Student>
                                    </GroupElement>
                                ))
                            }
                        </Group>
                    ))
                }
            </GroupsContainer>
            <Buttons>
                <Button onClick={handleButton} id="S2" ph={'1rem'}>2 students</Button>
                <Button onClick={handleButton} id="S3" ph={'1rem'}>3 students</Button>
                <Button onClick={handleButton} id="S4" ph={'1rem'}>4 students</Button>
                <Button onClick={handleButton} id="S5" ph={'1rem'}>5 students</Button>
                <Button onClick={handleButton} id="S6" ph={'1rem'}>6 students</Button>
                <Button onClick={handleButton} id="T2" ph={'1rem'}>2 teams</Button>
                <Button onClick={handleButton} id="T3" ph={'1rem'}>3 teams</Button>
                <Button onClick={handleButton} id="T4" ph={'1rem'}>4 teams</Button>
            </Buttons>
        </StyledGroups>
    )
}

const StyledGroups = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 60%;
`

const GroupsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: .5rem;
`

const Group = styled.div`
    display: grid;
    grid-template-columns: repeat(${p => p.cols}, 1fr);
    grid-gap: 1rem;
    padding: 1rem;
    margin: 1rem;
    

    border-radius: 1rem;
    border: 1px solid black;

    position: relative;
    &&::before {
        content: '${p => p.name}';
        font-size: .6rem;
        font-family: 'Poppins';
        font-weight: 300;
        background-color: #c3fcd1;
        position: absolute;
        top: -0.5rem;
        left: 1rem;
    }

`

const Buttons = styled.div`
    position: absolute;
    bottom: -5rem;
    && > * {
        margin: 0 1rem;
    }
`

const GroupElement = styled.div`
    display: flex;
    align-items: center;
`