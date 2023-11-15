import "./Filters.scss";

export default function Filters({ children, ...otherProps }) {
    return (
        <div className="filters" {...otherProps}>
            {children}
        </div>
    );
}
