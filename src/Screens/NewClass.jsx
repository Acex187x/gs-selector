import React, { useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import Button from '../Atoms/Button'
import Text from '../Atoms/Text'
import Title from '../Atoms/Title'
import Student from '../Components/Student'
import { newClass } from '../core'

export default function NewClass(props) {

    const { style } = props
    const history = useHistory()

    const [students, setStudents] = useState([]);
    const addStudent = (s) => {
        const new_students = s.split(',').filter(el => el.length > 0).map(el => el.trim()).filter(el => el.length < 25);
        if (new_students.length + students.length <= 20) {
            setStudents([...new Set([...students, ...new_students])])
        } else {
            const free_slots = (20 - (new_students.length + students.length))
            setStudents([new Set([...students, ...new_students.slice(0, free_slots)])])
        }
    }

    const [studentInputValue, setStudentInputValue] = useState('')
    const [classInputValue, setClassInputValue] = useState('')

    const makeFirstLetterCapital = str => str.split('').reduce((ac, el, i, arr) => {
        return ac + ((arr[i - 1] === ' ' || arr[i - 1] === ',' || !arr[i - 1]) ? el.toUpperCase() : el.toLowerCase());
    }, '')

    const handleInput = (e) => {
        switch (e.target.id) {
            case 'student':
                setStudentInputValue(makeFirstLetterCapital(e.target.value)); break;
            case 'class':
                setClassInputValue(e.target.value); break;
            default:
                break;
        }
    }

    const handleStudentInputKeyPress = (e) => {
        if (e.nativeEvent.code === 'Enter') {
            addStudent(studentInputValue)
            setStudentInputValue('')
        }
    }

    const studentDelete = (student) => {
        const newStudents = students.filter(s => s !== student)
        if (newStudents[0] === '' && newStudents.length === 1) {
            setStudents([])
        } else {
            setStudents(newStudents)
        }
    }

    const handleButtonClick = (e) => {
        if (e.target.id === 'back') return history.push('/');
        if (classInputValue.length <= 0) { alert('Přidejte nazev třidy'); return; }
        if (students.length <= 1) { alert('Přidejte alespoň 2 studenty'); return; }
        newClass(classInputValue, students)
        history.push('/')
    }

    return (
        <StyledNewClass style={style}>
            <Container>
                <Input value={classInputValue} onChange={handleInput} id="class" placeholder={'Nazev nové třidy'}/>
                <Title>Studenty: (max. 20)</Title>
                <StudentList>
                    {
                        students && students.map(student => (
                            <Student onClick={() => studentDelete(student)}>{student}</Student>
                        ))
                    }
                    {
                        !students.length && (
                            <Student>Tady budou studenty</Student>
                        )
                    }
                </StudentList>
                <Input value={studentInputValue} onChange={handleInput} id="student" onKeyPress={handleStudentInputKeyPress} placeholder={'Přidat studenta'}/>
                <Text size={'.8rem'} style={{marginTop: 0}}>Zmačknete <kbd>Enter</kbd> abych přidat, můžete přidat více něž jednoho studenta rozdělením čárkou ( , )</Text>
                <div>
                    <Button onClick={handleButtonClick} color={'blue'} id="back">Zpět</Button>
                    <Button onClick={handleButtonClick} style={{marginLeft: '1rem'}}>Vytvořit</Button>
                </div>
            </Container>
        </StyledNewClass>
    )
}

const StyledNewClass = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 60vw;

    && > * {
        margin: 1rem;
    }
`

const Input = styled.input`
    border: 0;
    border-bottom: 1px solid black;
    padding: .3rem 1rem;
    min-width: 20rem;
    outline: 0;
    font-size: 1rem;
    font-family: 'Poppins';
    font-weight: 300;
`

const StudentList = styled.div`
    display: flex;
    max-width: 60vw;
    flex-wrap: wrap;
    justify-content: center;

    && > div {
        margin-right: 1rem;
        margin-bottom: 1rem;
    }
`