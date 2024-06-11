
interface CustomDateHeaderProps {
    label: string;
}

const CustomDateHeader: React.FC<CustomDateHeaderProps> = ({ label }) => {
    const [date, day] = label.split(' ');

    return (
        <div className="rbc-header">
            <button type="button" className="rbc-button-link">
                <span className="rbc-date">{date}</span>
                <span className="rbc-day">{day}</span>
            </button>
        </div>
    );
};

export default CustomDateHeader