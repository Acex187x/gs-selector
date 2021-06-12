import React from 'react'
import styled from 'styled-components'
import man from '../assets/man.svg'
import Text from '../Atoms/Text'
import { getRandomNumberFromString } from '../core'

const tShortCombinations = [
    ['#fe4f60', '#ff6d7a', '#e84857'],
    ['#4fa3fe', '#77b6fc', '#3192fc'],
    ['#3ae485', '#38ee88', '#34d87c'],
    ['#ebf325', '#f2f85d', '#e1e925'],
    ['#e66bdc', '#f380ea', '#d563cc'],
    ['#f0f0f0', '#f7f7f7', '#e0e0e0']
]

const hairColorCombinations = [
    ['#42434d', '#4d4e59'],
    ['#e69d4e', '#e9aa66'],
    ['#cfcfcf', '#dbdbdb'],
    ['#ece9b5', '#f5f3ca'],
    ['#68c0e9', '#8dcfee'],
    ['#eb72dc', '#ec9ce2']
]

const skinColorCombinations = [
    ['#ffebd2', '#fff3e4', '#ffd6a6', '#ffdfba'],
    ['#cca06a', '#cea87a', '#b68d5c', '#c59964'],
    ['#ffd08a', '#ffdaa3', '#ebb361', '#e9c692']
]

export default function Student(props) {
    const { style, children, scale, onClick, sleeping, onMouseDown, id, grabbing, grab } = props
    let tShortColor, hairColor, skinColor;
    if (children && typeof children === 'string') {
        tShortColor = tShortCombinations[getRandomNumberFromString(children, tShortCombinations.length, 0)]
        hairColor = hairColorCombinations[getRandomNumberFromString(children, hairColorCombinations.length, 1)]
        skinColor = skinColorCombinations[getRandomNumberFromString(children, skinColorCombinations.length, 2)]
    } else {
        tShortColor = tShortCombinations[0]
        hairColor = hairColorCombinations[0]
        skinColor = skinColorCombinations[0]
    }
    // const tShortColor = tShortCombinations[~~(Math.random() * tShortCombinations.length)]
    // const hairColor = hairColorCombinations[~~(Math.random() * hairColorCombinations.length)]
    // const skinColor = skinColorCombinations[~~(Math.random() * skinColorCombinations.length)]

    if (children) {
        if (typeof children === 'string' && children.toLowerCase().includes('boichenko')) {
            hairColor = ['#e69d4e', '#e9aa66'];
            skinColor = ['#ffebd2', '#fff3e4', '#ffd6a6', '#ffdfba'];
            tShortColor = ['#4fa3fe', '#77b6fc', '#3192fc'];
        }

        if (typeof children === 'string' && children.toLowerCase().includes('šetek')) {
            hairColor = ['white', 'white'];
        }

        if (typeof children === 'string' && children.toLowerCase().includes('saparalieva')) {
            hairColor = hairColorCombinations[0]
            skinColor = skinColorCombinations[2]
            tShortColor = tShortCombinations[1]
        }
    }

    return (
        <StyledStudent style={style} scale={scale || 1} onClick={onClick} onMouseDown={onMouseDown} className="student" sleeping={sleeping} id={id} grabbing={grabbing} grab={grab}>
            {/* <Avatar src={man} scale={scale || 1} /> */}
            <svg id="Layer_1" enable-background="new 0 0 464.056 464.056" height={`${(scale || 1)  * 2.5}rem`} viewBox="0 0 464.056 464.056" width={`${(scale || 1) * 2.5}rem`}
                xmlns="http://www.w3.org/2000/svg">
                <path d="m386.028 416.796v39.26c0 4.42-3.58 8-8 8h-292c-4.42 0-8-3.58-8-8v-39.26c0-41.19 33.39-74.56 74.59-74.57 14.56-.01 27.38-7.5 34.76-18.86 7.414-11.394 6.65-21.302 6.65-29.31l.15-.37c-35.9-14.86-61.15-50.23-61.15-91.5v-3.13c-14.255 0-25-11.265-25-24.54v-41.56c-.32-14.47.34-65.5 37.2-101.03 42.86-41.31 110.78-37.93 159.98-15.83 1.6.72 1.55 3.01-.07 3.68l-12.83 5.28c-1.92.79-1.51 3.62.55 3.84l6.23.67c29.83 3.19 57.54 19.39 74.72 46.35.46.73.33 1.84-.26 2.47-10.6 11.21-16.52 26.09-16.52 41.56v54.57c0 13.55-10.99 24.54-24.54 24.54h-1.46v3.13c0 41.27-25.25 76.64-61.15 91.5l.15.37c0 7.777-.827 17.82 6.65 29.31 7.38 11.36 20.2 18.85 34.76 18.86 41.2.01 74.59 33.38 74.59 74.57z" fill={skinColor[3]}/>
                <path d="m386.028 416.796v39.26c0 4.418-3.582 8-8 8h-292c-4.418 0-8-3.582-8-8v-39.26c0-41.19 33.395-74.555 74.585-74.57 14.564-.005 27.387-7.504 34.765-18.86 25.754 22.002 63.531 22.015 89.3 0 7.377 11.356 20.201 18.855 34.765 18.86 41.19.015 74.585 33.38 74.585 74.57z" fill={tShortColor[0]}/>
                <path d="m373.804 75.921c.464.729.334 1.833-.259 2.461-10.597 11.218-16.517 26.093-16.517 41.564v54.57c0 12.388-9.333 24.54-26 24.54v-61.77c0-26.51-21.49-48-48-48h-102c-26.51 0-48 21.49-48 48v61.77c-14.255 0-25-11.265-25-24.54v-41.56c-.32-14.47.34-65.5 37.2-101.03 42.857-41.311 110.784-37.929 159.976-15.827 1.6.719 1.558 3.01-.065 3.678l-12.831 5.282c-1.918.79-1.514 3.617.548 3.838l6.232.669c29.835 3.187 57.538 19.387 74.716 46.355z" fill={hairColor[0]}/>
                <path d="m331.028 202.186c0 54.696-44.348 99-99 99-51.492 0-99-40.031-99-102.13v-61.77c0-26.51 21.49-48 48-48h102c26.51 0 48 21.49 48 48z" fill={skinColor[0]}/>
                <path d="m313.028 447.056h-24c-4.418 0-8-3.582-8-8s3.582-8 8-8h24c4.418 0 8 3.582 8 8s-3.581 8-8 8z" fill="#fff"/>
                <path d="m209.612 266.114c16.277 10.183 3.442 35.156-14.376 28.004-36.634-14.704-62.208-50.404-62.208-91.932v-64.9c0-10.084 3.11-19.442 8.422-27.168 6.514-9.473 21.578-5.288 21.578 7.168v64.9c0 36.51 19.192 66.79 46.584 83.928z" fill={skinColor[1]}/>
                <path d="m271.158 310.476c-24.637 10.313-51.712 11.113-78.26 0 1.356-5.626 1.13-9.27 1.13-16.42l.15-.37c24.082 9.996 51.571 10.016 75.7 0l.15.37c0 7.153-.226 10.796 1.13 16.42z" fill={skinColor[2]}/>
                <path d="m192.91 366.383c-3.698 1.163-7.664 1.804-11.916 1.841-41.296.364-74.966 33.017-74.966 74.315v7.517c0 7.732-6.268 14-14 14h-6c-4.418 0-8-3.582-8-8v-39.26c0-41.191 33.395-74.555 74.585-74.57 14.564-.005 27.387-7.504 34.765-18.86 2.974 2.54 6.158 4.823 9.512 6.822 14.753 8.791 12.402 31.044-3.98 36.195z" fill={tShortColor[1]}/>
                <path d="m271.146 366.383c3.698 1.163 7.664 1.804 11.916 1.841 41.296.364 74.966 33.017 74.966 74.315v7.517c0 7.732 6.268 14 14 14h6c4.418 0 8-3.582 8-8v-39.26c0-41.191-33.395-74.555-74.585-74.57-14.564-.005-27.387-7.504-34.765-18.86-2.974 2.54-6.158 4.823-9.512 6.822-14.752 8.791-12.402 31.044 3.98 36.195z" fill={tShortColor[2]}/>
                <path d="m305.138 19.776c-11.758 4.839-13.434 5.906-17.508 5.274-65.674-10.18-123.294 16.993-142.862 80.786v.01c-7.32 8.42-11.74 19.42-11.74 31.44v37.523c0 16.188-25 17.315-25-.293v-41.56c-.32-14.47.34-65.5 37.2-101.03 42.86-41.31 110.78-37.93 159.98-15.83 1.6.72 1.55 3.01-.07 3.68z" fill={hairColor[1]}/>
            </svg>
            <Text size={`${(scale || 1) * 1.2}rem`}>{children}</Text>
        </StyledStudent>
    )
}

const StyledStudent = styled.div`
    background-color: white;
    max-width: ${p => p.scale  * 20}rem;
    padding: ${p => p.scale  * 0.5}rem ${p => p.scale  * 1}rem;
    border-radius: ${p => p.scale  * 1}rem;
    display: flex;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
    align-items: center;
    user-select: none;
    z-index: 10;
    ${p => p.onClick ? `
        cursor: pointer; 
    ` : ''}

    ${p => p.grab ? `
        cursor: grab; 
    ` : ''}

    ${p => p.grabbing ? `
        cursor: grabbing; 
    ` : ''}
    
    && > span {
       display: flex;
       align-items: center; 
       margin-left: ${p => p.scale  * 0.5}rem;
    }

    transition: opacity .2s, transform .2s;
    ${p => p.sleeping ? `
        opacity: .5;
        transform: scale(.95);
    ` : ''}
`

const Avatar = styled.img`
    max-height: ${p => p.scale  * 2}rem;
`