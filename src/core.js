const storage = window.localStorage
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
        currentClasses = JSON.parse(storage.getItem('classes'))
    } catch (err) {
        currentClasses = []
    }

    console.log(currentClasses)

    // type checking
    const chekedClasses = currentClasses.filter(class_ => {
        // console.log( typeof class_.name === 'string', class_.name.length > 0 ,Array.isArray(class_c.studentList),class_.studentList.length > 0)
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