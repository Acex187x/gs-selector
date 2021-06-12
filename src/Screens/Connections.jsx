import React, { useLayoutEffect, useEffect, useState } from 'react'
import styled from 'styled-components'
import Student from '../Components/Student'
import arrowDown from '../assets/down-arrow.svg'
import Button from '../Atoms/Button'
import ReactDOMServer from 'react-dom/server'

export default function Connections(props) {

    const { style, students } = props

    const [connections, setConnections] = useState([]);

    const handleButton = () => {
        const randomizedStudents = students
            .reduce((ac, el) => { // mix students in one array
                const selectedStudent = ac[0][~~(ac[0].length * Math.random())]; // select 1 student from lasts
                const lastsStudents = ac[0].filter(s => s !== selectedStudent); // remove selected student in lasts array 
                const randomisedStudents = [...ac[1], selectedStudent] // add selected student to result array
                return [lastsStudents, randomisedStudents]
            }, [students, []])[1]
        setConnections([...randomizedStudents, randomizedStudents[0]])
    }

    useLayoutEffect(() => { // add lead arrow for flex wrap
        [...document.getElementsByClassName('arrow')].forEach(el => el.remove())
        const connections = [...document.getElementsByClassName('connection')]
        connections.forEach((connection, i) => {
            // const arrow = document.createElement('div');
            // arrow.classList.add('arrow')
            // arrow.innerHTML = ReactDOMServer.renderToStaticMarkup(<Arrow className="arrow" src={arrowDown} />)
            // connection.appendChild(arrow)

            if (!connections[i - 1]) return;

            if (connection.getBoundingClientRect().y !== connections[i - 1].getBoundingClientRect().y) {
                // connection.innerHTML = ReactDOMServer.renderToString(<Arrow src={arrowDown} />) + connection.getElementsByClassName('student')[0]?.outerHTML + ReactDOMServer.renderToString(<Arrow src={arrowDown} />);
                const arrow = document.createElement('div');
                arrow.classList.add('arrow')
                arrow.innerHTML = ReactDOMServer.renderToStaticMarkup(<Arrow className="arrow" src={arrowDown} />)
                connection.insertBefore(arrow, connection.getElementsByClassName('student')[0])
            }
        })
    }, [connections])

    useEffect(() => {
        handleButton()
    }, [])

    return (
        <StyledConnections style={style}>
            <Grid>
                {
                    connections.map(con => (
                        <Connection className={'connection'}>
                            <Student scale={.9}>{con}</Student>
                            <Arrow src={arrowDown} />
                        </Connection>
                    ))
                }
            </Grid>
            <Control>
                <Button onClick={handleButton}>Vybrat</Button>
            </Control>
        </StyledConnections>
    )
}

const StyledConnections = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 80%;
    margin: 0 5rem;
`

const Grid = styled.div`
    /* display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-gap: 1rem; */
    width: 100%;
    margin-bottom: 2rem;
    display: flex;
    flex-wrap: wrap;
`

const Connection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 1rem;

    &&:last-child > img {
        opacity: 0;
    }
`

const Arrow = styled.img`
    height: 1rem;
    margin: 0 1rem;
    transform: rotate(-90deg);
`

const Control = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`