
const parseTime = (time) => {
    let parsedTime = time.slice(0, 2) + "시 "
                     + time.slice(2, 4) + "분"

    return parsedTime;
}

export default parseTime;
