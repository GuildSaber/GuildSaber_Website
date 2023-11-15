import { decimalToHex } from "../../utils/color";
import "./Card.scss";

export default function Card({
    title,
    color,
    children,
    contentClass,
    ...otherProps
}) {
    return (
        <div className="card" {...otherProps}>
            <h3
                className="common-text title"
                style={{ "--guild-color": `#${decimalToHex(color)}` }}
            >
                {title}
            </h3>
            <div className={contentClass}>{children}</div>
        </div>
    );
}
