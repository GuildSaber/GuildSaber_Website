import { decimalToHex } from "../../utils/color";

export default function Header({ guildData }) {
    const { id, name, smallName, color, description } = guildData;

    return (
        <div className="header">
            <img
                className="banner"
                src={`https://cdn.guildsaber.com/Guild/${id}/Banner.png`}
            />

            <div className="details">
                <img
                    className="logo"
                    src={`https://cdn.guildsaber.com/Guild/${id}/Logo.png`}
                />
                <div>
                    <h1 className="common-text">{name}</h1>
                    <h1
                        className="common-text smallName"
                        style={{ color: `#${decimalToHex(color)}` }}
                    >
                        {smallName}
                    </h1>
                    <p className="common-text description">
                        {description.split("\n").map(function (line, idx) {
                            return (
                                <span key={idx}>
                                    {line}
                                    <br />
                                </span>
                            );
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
}
