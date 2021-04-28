import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import styled from 'styled-components'
import Text from '../Atoms/Text'
import { getClassColorSchema } from '../core'

const names = ['Kunratický Špek', '@Acex187x', 'Illia Špek', 'Špekovy Hacker', '@my_acex', 'Občan Ukrajiny', 'Detektyvní Špek', 'Občan Kryveho Rohu']
const name = names[~~(Math.random() * names.length)]

export default function Footer(props) {

    const { style } = props
    const history = useHistory()
    const [color, setColor] = useState()
    const params = useParams();
    // useEffect(() => {
    //     if (history.location.pathname === '/' || history.location.pathname === '/new-class') {
    //         setColor('white')
    //     } else {
    //         setColor(getClassColorSchema(history.location.state))
    //     }
    // }, [history.location.pathname])

    // history.listen((location, action) => {
    //     if (location.pathname === '/' || history.location.pathname === '/new-class') {
    //         setColor('white')
    //     } else {
    //         setColor('#c3fcd1')
    //     }
    // });


    return (
        <StyledFooter style={style} color={params.classname ? getClassColorSchema(params.classname).bg || 'white' : 'white'}>
            <Text size={'0.8rem'}>Made with ❤️ by {name || 'Kunratický Špek'}</Text>
            <Text size={'0.6rem'}>Special for GoStudy, Andrea Bublikova and Jan Šetek</Text>
        </StyledFooter>
    )
}

const StyledFooter = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    min-height: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background-color: #c3fcd1; */
    background-color: ${p => p.color};

    && > * {
        opacity: 0.5;
    }
`