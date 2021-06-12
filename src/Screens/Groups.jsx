import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Button from '../Atoms/Button'
import Student from '../Components/Student'
import _ from 'lodash'
import { getClassColorSchema, randomiseArray } from '../core'
import Text from '../Atoms/Text'
import { useParams } from 'react-router'

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

// Smažení, Šílení, Půvabní, Neutrální? Armádní, Skvělí, Mystičtí, Červení, Zkušení - Pražáci, komunisté, policisté, psi, kouzelníci
// Smažené, Šílené, Půvabné, Neutrální, Armádní, Skvělé, Mystické, Červené, Zkušené + špeky, krevety, kočky,

const groupsName = [
    ["Smažené","Šílení","Půvabní","Neurální", "Armadní","Skvělí", "Mystičtí", "Červené", "Zkušené"],
    ["Pražáci","špeky","krevety","policisté","kočky","psi", "kouzelníci", "mikrovlnky", "komunisté"],
]

const randomName = () => groupsName.map(el => el[~~(el.length * Math.random())]).join(' ')

export default function Groups(props) {

    const { style, students } = props
    const [groups, setGroups] = useState([]);
    const [mode, setMode] = useState('S2');
    const [names, setNames] = useState([]);
    const params = useParams()

    const [currentDraggedStudent, setCurrentDraggedStudent] = useState(null)
    const mouseDragStartCoords = useRef({y: 0, x: 0})

    const handleStudentDrag = (name, e) => {
        setCurrentDraggedStudent(name);
        mouseDragStartCoords.current = { x: e.clientX, y: e.clientY }
    }

    const mouseMove = (e) => {
        if (currentDraggedStudent && document.getElementById('dragged')) {
            document.getElementById('dragged').style.transition = 'unset';
            document.getElementById('dragged').style.zIndex = '100';
            document.getElementById('dragged').style.transform = [
                `scale(.95)`,
                `translateY(${e.clientY - mouseDragStartCoords.current.y}px)`,
                `translateX(${e.clientX - mouseDragStartCoords.current.x}px)`
            ].join(' ')
        }
    }

    const mouseUp = (e) => {
        if (currentDraggedStudent && document.getElementById('dragged')) {
            document.getElementById('dragged').style.transform = '';
            document.getElementById('dragged').style.zIndex = '';
            const [x, y] = [e.clientX, e.clientY];
            [...document.getElementsByClassName('group')].forEach((el) => {
                const b = el.getBoundingClientRect();
                if (
                    x > b.x && x < b.x + b.width &&
                    y > b.y && y < b.y + b.height
                ) {
                    parseInt(el.id.replace('group', ''))
                    setGroups(groups.map((group, i) => {
                        if (i === parseInt(el.id.replace('group', ''))) {
                            if (!group.find(s => s === currentDraggedStudent)) {
                                group.push(currentDraggedStudent)
                            }
                        } else {
                            if (group.find(s => s === currentDraggedStudent)) {
                                group = group.filter(s => s !== currentDraggedStudent)
                            }
                        }
                        return group;
                    }))
                }
            })
            setCurrentDraggedStudent(null);
        }
    }

    const generateNewGroups = (mode) => { // mode<string> mode[0]<'S' | 'T'> (students or team) mode[1]<number>
        setMode(mode);
        if (mode[0] === 'S') {
            let chunked = _.chunk(randomiseArray(students), parseInt(mode.slice(1)))
            console.log(chunked, _.last(chunked))
            if (_.last(chunked).length === 1) {
                chunked = [..._.dropRight(chunked, 2), [..._.last(_.dropRight(chunked, 1)), ..._.last(chunked)]]
            }
            setGroups(chunked)
        } else if (mode[0] === 'T') {
            let chunked = _.chunk(randomiseArray(students), parseInt(~~(students.length / parseInt(mode.slice(1)))))
            console.log(chunked, _.last(chunked))
            if (chunked.length > parseInt(mode.slice(1))) {
                chunked = [..._.dropRight(chunked, 2), [..._.last(_.dropRight(chunked, 1)), ..._.last(chunked)]]
            }
            setGroups(chunked)
        }
        setNames(Array(20).fill('').map(el => randomName()))
    }

    useEffect(() => {
        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp)

        return () => {
            document.removeEventListener('mousemove', mouseMove)
            document.removeEventListener('mouseup', mouseUp)
        }
    }, [currentDraggedStudent])

    useEffect(() => {
        generateNewGroups('S2')
    }, [])

    useEffect(() => {
        if (groups.find(g => g.length <= 0)) {
            setGroups(groups.filter(g => g.length > 0))
        }
    }, [groups])

    const handleButton = e => {
        generateNewGroups(e.target.id)
    }
    
    return (
        <StyledGroups style={style}>
            <GroupsContainer>
                {
                    groups.map((el, key) => (
                        <Group name={names[key]} key={key} cols={modesColumn[mode]} bg={getClassColorSchema(params.classname).bg} className='group' id={`group${key}`}>
                            {
                                el.map((s, i) => (
                                    <GroupElement key={i}>
                                        <Text style={{marginRight: '1rem'}}>{i + 1}.</Text> 
                                        {
                                            currentDraggedStudent === s
                                            ? <Student 
                                                scale={0.8}
                                                id='dragged'
                                                grabbing
                                            >{s}</Student>
                                            : <Student 
                                                grab
                                                scale={0.8} 
                                                onMouseDown={(e) => handleStudentDrag(s, e)}
                                            >{s}</Student>
                                        }
                                    </GroupElement>
                                ))
                            }
                        </Group>
                    ))
                }
            </GroupsContainer>
            <Buttons>
                <Button onClick={handleButton} id="S2" ph={'1rem'}>2 studenti</Button>
                <Button onClick={handleButton} id="S3" ph={'1rem'}>3 studenti</Button>
                <Button onClick={handleButton} id="S4" ph={'1rem'}>4 studenti</Button>
                <Button onClick={handleButton} id="S5" ph={'1rem'}>5 studentů</Button>
                <Button onClick={handleButton} id="S6" ph={'1rem'}>6 studentů</Button>
                <Button onClick={handleButton} id="T2" ph={'1rem'}>2 skupiny</Button>
                <Button onClick={handleButton} id="T3" ph={'1rem'}>3 skupiny</Button>
                <Button onClick={handleButton} id="T4" ph={'1rem'}>4 skupiny</Button>
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
    align-content: flex-start;
    border-radius: 1rem;
    border: 1px solid black;

    position: relative;
    &&::before {
        content: '${p => p.name}';
        font-size: .8rem;
        font-family: 'Poppins';
        font-weight: 300;
        background-color: ${p => p.bg};
        position: absolute;
        top: -0.65rem;
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