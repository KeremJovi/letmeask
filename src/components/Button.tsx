import { ButtonHTMLAttributes } from "react";
import "../styles/button.scss";

//usa-se essa linha quando se quer passar qualquer propriedade/atributo que seria passado para um elemento HTML
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button className={`button ${isOutlined ? "outlined" : ""}`} {...props} />
  );
}

export default Button;
