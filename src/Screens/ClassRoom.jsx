import React, { useState } from 'react'
import { useParams } from 'react-router'
import styled from 'styled-components'
import Title from '../Atoms/Title'
import BottomTabNav from '../Components/BottomTabNav'
import { getClassColorSchema, getStudentsOfClass } from '../core'
import Connections from './Connections'
import Groups from './Groups'
import SelectRandom from './SelectRandom'
import Missing from './Missing'
import List from './List'
import { Link } from 'react-router-dom'
import Text from '../Atoms/Text'
import Button from '../Atoms/Button'

const pages = {
    'random': 0,
    'connections': 1,
    'groups': 2,
    'list': 3,
}

export default function ClassRoom(props) {

    const { style } = props
    const [screen, setScreen] = useState('random')
    const [isAnimating, setIsAnimating] = useState(false);
    const params = useParams()
    const [students, setStudents] = useState(getStudentsOfClass(params.classname));
    const [sleepingStudents, setSleepingStudents] = useState([]);
    // const students = getStudentsOfClass(params.classname).filter(s => !~sleepingStudents.indexOf(s))
    const [isMissingOpen, setMissingOpen] = useState(false)
    const [isMissingOpacity, setMissingOpenOpacity] = useState(false)

    const handleSelect = (s) => {
        setScreen(s)
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 500)
    }

    const handleMissing = (s) => {
        if (students.find(ss => ss === s)) { 
            console.log(getStudentsOfClass(params.classname).length, students.length)
            if (students.length <= 2) return;
            setStudents(students.filter(ss => ss !== s))
        } else { 
            setStudents([...students, s])
        }
    }

    const openMissing = () => {
        setMissingOpen(true);
        setTimeout(() => {
            setMissingOpenOpacity(true);
        }, 0)
    }

    const closeMissing = () => {
        setMissingOpenOpacity(false);
        setTimeout(() => {
            setMissingOpen(false); 
        }, 200)
    }

    return (
        <StyledClassRoom style={style} bg={getClassColorSchema(params.classname).bg}>
            <Header>
                <Link to={'/'}><Text center size={'.8rem'}>Zpět na výběr tříd</Text></Link>
                <Title size={'2rem'} mb={'2rem'} center>Skupina {params.classname}</Title>
                <a href="#" onClick={openMissing} style={{display: 'flex', justifyContent: 'flex-end'}}><Text center size={'.8rem'}>Vybrat chybějící studenty</Text></a>
            </Header>
            <ScreenSwiper page={pages[screen]} isAnimating={isAnimating}>
                {
                    (screen === 'random' || isAnimating) && (
                        <SwiperScreenContainer>
                            <SelectRandom students={students}/>
                        </SwiperScreenContainer>
                    )
                }
                {
                    (screen === 'connections' || isAnimating) && (
                        <SwiperScreenContainer>
                            <Connections students={students} />
                        </SwiperScreenContainer>
                    )
                }
                {
                    (screen === 'groups' || isAnimating) && (
                        <SwiperScreenContainer>
                            <Groups students={students} />
                        </SwiperScreenContainer>
                    )
                }
                {
                    (screen === 'list' || isAnimating) && (
                        <SwiperScreenContainer>
                            <List students={students} />
                        </SwiperScreenContainer>
                    )
                }
            </ScreenSwiper>
            <BottomTabNav screen={screen} onSelect={handleSelect} />
            {
                isMissingOpen && (
                    <MissingContainer bg={getClassColorSchema(params.classname).bg} isOpen={isMissingOpacity}>
                        <Missing onSelect={handleMissing} allStudents={getStudentsOfClass(params.classname)} currentStudents={students} />
                        <Button onClick={closeMissing} style={{marginTop: '4rem'}}>Hotovo</Button>
                    </MissingContainer>
                )
            }
        </StyledClassRoom>
    )
}

const StyledClassRoom = styled.div`
    height: calc(100% - 4rem);
    background-color: ${p => p.bg};
    display: flex;
    flex-direction: column;
    padding: 2rem;

    && a {
        text-decoration: none;
    }
`

const ScreenSwiper = styled.div`
    transition: transform .4s ease-in-out;
    width: 400vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    transform: translateY(-${p => p.page * 100}vh);
    padding-top: calc(${p => p.isAnimating ? 0 : p.page * 100}vh + ${p => p.page * 0}rem);
    /* display: flex; */
`

const SwiperScreenContainer = styled.div`
    width: calc(100vw - 4rem);
    height: calc(100vh - 8rem);
    padding: 2rem;
    padding-top: 6rem;
`

const Back = styled.div`
    position: absolute;
    left: 2rem;
    top: 2rem;
    z-index: 5;
`

const Header = styled.div`
    width: 100%;
    display: flex;
    z-index: 5;
    /* justify-content: space-between; */
    && > * {
        flex: 1;
    }
`

const MissingContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 5rem);
    padding-bottom: 2rem;
    background-color: ${p => p.bg};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 100;

    transition: .2s opacity;
    ${p => p.isOpen ? `
        opacity: 1;
    ` : `
        opacity: 0;
    `}
`