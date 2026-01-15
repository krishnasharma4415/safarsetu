const Button = ({ children, variant = 'primary', className = '', onClick, disabled, type = 'button' }) => {
    const baseClasses = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
