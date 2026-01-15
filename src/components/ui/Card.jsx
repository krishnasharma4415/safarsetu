const Card = ({ children, className = '', hover = false, onClick }) => {
    const cardClass = hover ? 'card-hover' : 'card';

    return (
        <div
            className={`${cardClass} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Card;
