import React from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import Title from '../Atoms/Title'
import ClassCard from '../Components/ClassCard'
import { getClasses } from '../core'

export default function ClassSelect() {
    const history = useHistory()
    
    const classes = getClasses()
    console.log(classes);

    return (
        <Wrapper>
            <Title size={'2rem'} mb={'2rem'}>Zvolte třidu</Title>
            <Classes>
                {
                    classes.map(class_ => (
                        <ClassCard 
                            onClick={() => history.push(`/classroom/${class_.name}`)}
                            name={class_.name}
                            count={class_.studentList.length + ' students'}
                        />
                    ))
                }
                <ClassCard 
                    onClick={() => history.push('/new-class')}
                    plus
                />
            </Classes>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
`

const Classes = styled.div`
    display: grid;
    max-width: 60%;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
`