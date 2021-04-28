import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../Atoms/Button'
import Title from '../Atoms/Title'
import Student from '../Components/Student'

export default function SelectRandom(props) {

    const { style, students } = props

    const [leftGroup, setLeftGroup] = useState([]);
    const [rightGroup, setRightGroup] = useState([]);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [direction, setDirection] = useState(0); // 0 - left to right, 1 - right to left

    useEffect(() => {
        setLeftGroup(students);
        setRightGroup([]);
        setCurrentStudent(null);
    }, [])

    const handleButton = () => {
        if ([leftGroup, rightGroup][direction].length <= 0) { // change direction when the list is empty
            setDirection(1 - direction)
        }

        const setFromGroup = [setLeftGroup, setRightGroup][direction];
        const setToGroup = [setLeftGroup, setRightGroup][1 - direction];
        const fromGroup = [leftGroup, rightGroup][direction];
        const toGroup = [leftGroup, rightGroup][1 - direction];

        currentStudent && setToGroup([...toGroup, currentStudent])
        const selectedStudent = fromGroup[~~(Math.random() * fromGroup.length)]
        setFromGroup(fromGroup.filter(student_ => student_ !== selectedStudent))
        setCurrentStudent(selectedStudent)
    }

    const reverseGroup = (name) => {
        if (leftGroup.find(n => n === name)) {
            setLeftGroup(leftGroup.filter(n => n !== name))  
            setRightGroup([...rightGroup, name])
        } else {
            setRightGroup(rightGroup.filter(n => n !== name))
            setLeftGroup([...leftGroup, name])
        }
    }

    const returnCurrent = () => {
        if (!currentStudent) return;
        const setFromGroup = [setLeftGroup, setRightGroup][direction];
        const fromGroup = [leftGroup, rightGroup][direction];

        setFromGroup([...fromGroup, currentStudent])
        setCurrentStudent(null)
    }

    return (
        <StyledSelectRandom style={style}>
            <StudentTable>
                {
                    leftGroup.map((student_, i) => (
                        <Student scale={0.7} key={student_ + 'r'} onClick={() => reverseGroup(student_)}>{student_}</Student>
                    ))
                }
            </StudentTable>
            <Control>
                <Title>Odpovída teď:</Title>
                <Student style={!currentStudent ? {opacity: 0} : {}} onClick={returnCurrent}>{currentStudent}</Student>
                <Button ph={'3rem'} onClick={handleButton}>Dalsí</Button>
            </Control>
            <StudentTable>
                {
                    rightGroup.map((student_, i) => (
                        <Student scale={0.7} key={student_ + 'l'} onClick={() => reverseGroup(student_)}>{student_}</Student>
                    ))
                }
            </StudentTable>
        </StyledSelectRandom>
    )
}

const StyledSelectRandom = styled.div`
    display: flex;
    width: 100%;
    height: 80%;
    justify-content: space-between;
    align-items: center;
    position: relative;
`

const StudentTable = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    min-width: 30rem;
`

const Control = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    && > * {
        margin: 1.5rem 0;
    }
`