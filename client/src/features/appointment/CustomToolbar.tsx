
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const CustomToolbar = (toolbar: any) => {
    const goToBack = () => toolbar.onNavigate('PREV');
    const goToNext = () => toolbar.onNavigate('NEXT');
    const goToToday = () => toolbar.onNavigate('TODAY');
    const view = toolbar.view;
    const label = toolbar.label;

    return (
        <div className="rbc-toolbar">
            <div className="rbc-btn-group time">
                <button onClick={goToBack}>
                    <ArrowBackIosIcon />
                </button>
                <button onClick={goToToday}>
                    Today
                </button>
                <button onClick={goToNext}>
                    <ArrowForwardIosIcon />
                </button>
            </div>
            <span className="rbc-toolbar-label">{label}</span>
            <div className="rbc-btn-group">
                <button onClick={() => toolbar.onView('month')} className={view === 'month' ? 'rbc-active' : ''}>
                    Month
                </button>
                <button onClick={() => toolbar.onView('week')} className={view === 'week' ? 'rbc-active' : ''}>
                    Week
                </button>
                <button onClick={() => toolbar.onView('day')} className={view === 'day' ? 'rbc-active' : ''}>
                    Day
                </button>
            </div>
        </div>
    );
};

export default CustomToolbar
