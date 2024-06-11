

const borderColor = (status: any) => {
    switch (status) {
        case 'Scheduled':
            return '#4d7997'; // Green
        case 'Completed':
            return '#a7d7c5'; // Light Green
        case 'Cancelled':
            return '#828282'; // Dark Grey
        case 'Rescheduled':
            return '#90CAF9'; // Blue
        case 'No Show':
            return '#f48fb1'; // Pink
        default:
            return '#f2f2f2'; // Light Grey (Default)
    }
};

export default borderColor;