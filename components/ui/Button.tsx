import React, { CSSProperties } from "react";
import styles from "./Button.module.css"; 

export type ButtonMode = "sm" | "xs" | "lg" | "md" | undefined;

interface ButtonProps {
    mode?: ButtonMode;
    customStyle?: CSSProperties; 
    content?: string; 
    onClick?: () => void; 
  }
  
  const Button: React.FC<ButtonProps> = ({
    mode = "md", 
    customStyle,
    content,
    onClick, 
  }) => {
    const modeClass = styles[mode];
  
    return (
      <button className={`${styles.button} ${modeClass}`} style={customStyle} onClick={onClick}>
        {content}
      </button>
      
    );
  };
  
  export default Button;