import React from "react";

const Button = ({className,text,onClick,style, disabled}) => {
    
    return (
        <div>
            <button className={className} style={style}  disabled={disabled} onClick={onClick}>{text}</button>
        </div>
    )
}

export default Button;