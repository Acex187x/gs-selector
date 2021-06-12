import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import styled, { createGlobalStyle } from 'styled-components'
import Button from '../Atoms/Button'
import Text from '../Atoms/Text'
import Title from '../Atoms/Title'
import Student from '../Components/Student'
import { newClass } from '../core'
import close from '../assets/close.svg'
import ContentEditable from 'react-contenteditable'
import { renderToString } from 'react-dom/server'
import { EvpKDF } from 'crypto-js'



export default function NewClass(props) {

    const { style } = props
    const history = useHistory()
    const nameInputRef = useRef(null);

    useEffect(() => {
        if (nameInputRef.current) {
            nameInputRef.current.focus()
        }
    }, [nameInputRef])

    const [classInputValue, setClassInputValue] = useState('')

    const makeFirstLetterCapital = str => str.split('').reduce((ac, el, i, arr) => {
        return ac + ((arr[i - 1] === ' ' || arr[i - 1] === ',' || !arr[i - 1]) ? el.toUpperCase() : el.toLowerCase());
    }, '')

    const handleInput = (e) => {
        switch (e.target.id) {
            case 'class':
                setClassInputValue(e.target.value); break;
            default:
                break;
        }
    }

    const handleButtonClick = (e) => {
        if (classInputValue.length <= 0) { alert('Přidejte nazev třidy'); return; }
        if (students.length <= 1) { alert('Přidejte alespoň 2 studenty'); return; }
        if ([...new Set(students)].length !== students.length) { alert('Jmena se nemusí opakovat'); return; }
        newClass(classInputValue, students)
        history.push('/')
    }

    const [studentsInput, setStudentsInput] = useState('');
    const [students, setStudents] = useState([]);
    const handleContentEdit = e => {
        const text = e.nativeEvent.target.innerText.replaceAll('\n', '')
        console.log(text);

        setStudentsInput(text
            .split(',')
            // .map((el, i) => el.trim().length > 0 ? `<span class="student">${el.trim()}</span>` : '')
            .map((el, i) => el.trim().length > 0 ? 
                renderToString(<Student scale='.8'>{makeFirstLetterCapital(el)}</Student>)
            : '')
            .slice(0, 20)
            .join(',')
        );
        setStudents(text.split(',').map(el => el.trim()))
        // console.log(studentsInput)
        // console.log(e.nativeEvent.target.innerText);
    }

    return (
        <StyledNewClass style={style}>
            <StudentStyle />
            <Container>
                <BackHeader style={{marginBottom: '5rem'}}>
                    <Title size="2rem">Nova třida</Title>
                    <Back onClick={() => history.push('/')}/>
                </BackHeader>
                <ClassInput ref={nameInputRef} value={classInputValue} onChange={handleInput} id="class" placeholder={'Nazev nové třidy'}/>
                <div style={{width: '100%', margin: '2rem 0 5rem 0'}}>
                    <Title>Studenty: <span style={{color: '#757575', fontSize: '.7rem'}}>(max. 20, oddělené čárkou)</span></Title>
                    <StudentList>
                        <ContentEditable 
                            style={{width: '100%', height: '100%', outline: 0}}
                            html={studentsInput}
                            onChange={handleContentEdit}
                        />
                    </StudentList>
                </div>
                <div>
                    <Button onClick={handleButtonClick} style={{minWidth: '10rem'}}>Vytvořit</Button>
                </div>
            </Container>
        </StyledNewClass>
    )
}

const StudentStyle = createGlobalStyle`
    .student {
        display: inline-flex;
        margin: 0 .2rem .5rem .5rem;
    }
`

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
    align-items: flex-start;
    justify-content: center;
    min-height: 60vh;
    min-width: 40vw;

    margin: 0 1rem;

    @media (max-width: 800px) {
        width: calc(100vw - 2rem);
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
    border-radius: 0;
`

const ClassInput = styled.input`
    border: 0;
    border-bottom: 1px solid black;
    padding: .1rem 1rem;
    /* margin-bottom: 5rem!important; */
    padding-left: 0;
    /* min-width: 20rem; */
    outline: 0;
    font-size: 2rem;
    font-family: 'Poppins';
    font-weight: 300;
    border-radius: 0;
`

const StudentList = styled.div`
    display: flex;
    min-width: calc(100% - 2rem);
    flex-wrap: wrap;
    justify-content: flex-start;
    outline: 0;
    cursor: text;
    background-color: #eeeeee;
    border-radius: 1rem;
    padding: 1rem;
    padding-bottom: .5rem;
    margin-top: .5rem;
    min-height: 3.3rem;
    max-width: 40vw;
    
    @media (max-width: 800px) {
        max-width: unset;
        width: 90vw;
    }
    

    /* && > div {
        margin-right: 1rem;
        margin-bottom: 1rem;
    } */
`

const BackHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const Back = styled.div`
    height: 1.5rem;
    width: 1.5rem;
    background-image: url(${close});
    background-repeat: no-repeat;
    background-size: 1.5rem;
    background-position: 99% center;
    cursor: pointer;
`