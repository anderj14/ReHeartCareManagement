import dayjs from "dayjs";

const formatDateTime = (date: string) => {
    return dayjs(date).isValid() ? dayjs(date).format('MMMM D, YYYY') : 'Invalid Date';
};

export default formatDateTime;