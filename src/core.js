import crypto from 'crypto-js'
const storage = window.localStorage

const classesColorSchemas = [
    {
        bg: '#c3dffc',
        accent: '#459df9',
        selectorCard: '#a3d0ff',
    },
    {
        bg: '#ebd5ff',
        accent: '#b463fe',
        selectorCard: '#e1c0ff',
    },
    {
        bg: '#c3fcd1',
        accent: '#28c74f',
        selectorCard: '#68f68b',
    },
    {
        bg: '#acf2e2',
        accent: '#00b78d',
        selectorCard: '#58f6d2',
    },
    {
        bg: '#ffde92',
        accent: '#bbb72c',
        selectorCard: '#ffd679',
    },
    {
        bg: '#ffd3e9',
        accent: '#ff54b0',
        selectorCard: '#ffbede',
    },
]

export function newClass(name, studentList) {
    let currentClasses;
    try {
        currentClasses = JSON.parse(storage.getItem('classes'))
    } catch (err) {
        currentClasses = [];
    }

    if (!Array.isArray(currentClasses)) {
        currentClasses = [];
    }

    storage.setItem('classes', JSON.stringify([
        ...currentClasses,
        {
            name, studentList
        }
    ]))
}

export function getClasses() {
    let currentClasses;
    try {
        currentClasses = JSON.parse(storage.getItem('classes')) || []
    } catch (err) {
        currentClasses = []
    }

    // type checking
    const chekedClasses = currentClasses.filter(class_ => {
        return (
            (typeof class_.name === 'string')
            && (class_.name.length > 0 )
            && (Array.isArray(class_.studentList))
            && (class_.studentList.length > 0)
        )
    })

    storage.setItem('classes', JSON.stringify(chekedClasses))

    return chekedClasses;
}

export function getStudentsOfClass(className) {
    const classes = getClasses();
    const class_ = classes.find(class_ => class_.name === className)
    if (!class_) return null;

    return class_.studentList;
}

export function randomiseArray(array) {
    return array
        .reduce((ac, el) => { // mix array in one array
            const selectedElement = ac[0][~~(ac[0].length * Math.random())]; // select 1 Element from lasts
            const lastArray = ac[0].filter(s => s !== selectedElement); // remove selected Element in lasts array 
            const randomisedArray = [...ac[1], selectedElement] // add selected Element to result array
            return [lastArray, randomisedArray]
        }, [array, []])[1]
} 

export function getRandomNumberFromString(str, maxNum, i = 0) {
    if (!str || !maxNum || !typeof str === 'string') return;
    const num = parseInt((crypto.MD5(str) + '').replace(/[^0-9]/g, '')[i]);
    const res = ~~(maxNum * (num / 10)) 
    // const hash = (crypto.MD5(str) + '').split('').reduce((a, el) => a + el.charCodeAt(), 0)
    // let res = hash;
    // while (res >= maxNum) {
    //     res -= maxNum;
    // }
    return res;
}

export function getClassColorSchema(name) {
    return classesColorSchemas[getRandomNumberFromString(name, 5, 3)];
    // return classesColorSchemas[5];
}