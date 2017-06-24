
const parseDate = (date) => {
    let parsedDate = date.slice(0, 4) + "년 "
                + date.slice(4, 6) + "월 "
                + date.slice(6, 8) + "일";

    return parsedDate;
}

export default parseDate;
