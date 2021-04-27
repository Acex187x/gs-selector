import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import styled from 'styled-components'
import Text from '../Atoms/Text'

export default function Footer(props) {

    const { style } = props
    const history = useHistory()
    const [color, setColor] = useState()

    useEffect(() => {
        if (history.location.pathname === '/') {
            setColor('white')
        } else {
            setColor('#c3fcd1')
        }
    }, [history.location.pathname])

    history.listen((location, action) => {
        if (location.pathname === '/') {
            setColor('white')
        } else {
            setColor('#c3fcd1')
        }
    });


    return (
        <StyledFooter style={style} color={color}>
            <Text size={'0.8rem'}>Made with ❤️ by Kunratický Špek</Text>
        </StyledFooter>
    )
}

const StyledFooter = styled.div`
    min-height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: #c3fcd1; */
    background-color: ${p => p.color};
`