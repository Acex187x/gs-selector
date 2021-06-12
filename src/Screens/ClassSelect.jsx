import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import Title from '../Atoms/Title'
import ClassCard from '../Components/ClassCard'
import { getClasses, newClass } from '../core'

export default function ClassSelect() {
    const history = useHistory()
    const [editing, setEditing] = useState(false);
    let classes;
    try {
        classes = JSON.parse(localStorage.getItem('classes')) || [];
    } catch(err) {
        classes = [];
    }

    // if (!classes.find(el => el.name === 'B1')) {
    //     newClass("B1", [
    //         "Asadov Eldar",
    //         "Bilytskyi Oleksii",
    //         "Buliienko Sofiia",
    //         "Harnaha Veronika",
    //         "Kostygova Ekaterina",
    //         "Liaposhchenko Kateryna",
    //         "Lyamkin Alexander",
    //         "Molchanova Marharyta",
    //         "Movchan Daria",
    //         "Popadenko Nazar",
    //         "Riabukha Oleksandra",
    //         "Seleznova Daria",
    //         "Shekhovtsov Ivan",
    //         "Shlykov Heorhii",
    //         "Stytsiura Varvara",
    //         "Tkachenko Hleb",
    //         "Voronenko Mariia"
    //     ])
    //     classes = JSON.parse(localStorage.getItem('classes'))
    // }

    // if (!classes.find(el => el.name === 'B2')) {
    //     newClass("B2", [
    //         "Abramov Dmitriy",
    //         "Afanasov Valerii",
    //         "Alibaeva Akdaana",
    //         "Boichenko Kseniia",
    //         "Ivanov Vladyslav",
    //         "Kharitonov Nikita",
    //         "Lietin Anatolii",
    //         "Maksimov Oleksandr",
    //         "Nurmamatov Argen",
    //         "Polishchuk Kateryna",
    //         "Sagadatov Konstantin",
    //         "Sakal Vasyl",
    //         "Saparalieva Dayana",
    //         "Sasi Mykyta",
    //         "Sorokin Andrii",
    //         "Zabolotnyi Illia"
    //     ])
    //     classes = JSON.parse(localStorage.getItem('classes'))
    // }

    return (
        <Wrapper>
            <Title size={'2rem'} mb={'.5rem'}>Zvolte třidu</Title>
            <div style={{marginBottom: '2rem'}}>
                <a href='#' onClick={(e) => {
                    e.preventDefault()
                    setEditing(!editing)
                }}>{editing ? '(hotovo)' : '(pravit)'}</a>
            </div>
            <Classes>
                {
                    classes.map(class_ => (
                        <ClassCard 
                            editing={editing}
                            onClick={() => history.push(`/classroom/${class_.name}`)}
                            name={class_.name}
                            count={class_.studentList.length + ' 🙋'}
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
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 2rem;
`