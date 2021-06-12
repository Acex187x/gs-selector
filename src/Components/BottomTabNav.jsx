import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import random from '../assets/random.svg'
import connections from '../assets/connections.svg'
import groups from '../assets/groups.svg'
import list from '../assets/list.svg'
import Text from '../Atoms/Text'

export default function BottomTabNav(props) {

    const { style, onSelect, screen } = props
    // const [selected, setSelected] = useState('random');

    // useEffect(() => {
    //     if (onSelect) {
    //         onSelect(selected);
    //     }
    // }, [selected])

    return (
        <StyledBottomTabNav style={style}>
            <Tab onClick={() => onSelect('random')}>
                <TabImage src={random} selected={screen === 'random'}/>
                <Text>Random</Text>
            </Tab>
            <Tab onClick={() => onSelect('connections')}>
                <TabImage src={connections} selected={screen === 'connections'}/>
                <Text>Vztahy</Text>
            </Tab>
            <Tab onClick={() => onSelect('groups')}>
                <TabImage src={groups} selected={screen === 'groups'}/>
                <Text>Skupiny</Text>
            </Tab>
            <Tab onClick={() => onSelect('list')}>
                <TabImage src={list} selected={screen === 'list'}/>
                <Text>Seznam</Text>
            </Tab>
        </StyledBottomTabNav>
    )
}

const StyledBottomTabNav = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 2rem;
    margin-bottom: 5vh;
    transition: opacity .4s;
    opacity: .4;
    &&:hover {
        opacity: 1;
    }
`

const Tab = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 2rem;
    cursor: pointer;
    user-select: none;
    min-width: 5rem;

    &&:hover > img {
        filter: unset;
        transform: unset;
    }

    &&:active > img {
        transition-delay: 0;
        transition-timing-function: ease-out;
        transform: scale(.8);
    }

    &&:last-child {
        margin-right: 4rem;
    }
`

const TabImage = styled.img`
    margin-bottom: 1rem;
    height: 3rem;
    transition: filter .3s .05s, transform .3s .05s;

    ${p => !p.selected ? `
        filter: grayscale(1);
        transform: scale(.8);
    ` : ''}
`