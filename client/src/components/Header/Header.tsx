import s from "./Header.module.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

interface HeaderPropsType {
    btnOnClick: () => void;
    text: string;
    color: string;
    position: 'end' | 'start';
    icon?: string
}

const Header: React.FC<HeaderPropsType> = ( {btnOnClick, text, color, position, icon} ) => {
  return (
    <div className={s.header}>
      <Container className={s.container} style={{justifyContent: position}}>
        <Button onClick={() => btnOnClick()} variant={color} size="lg">
          {
            icon && <i className={icon}></i>
          } {text}
        </Button>
      </Container>
    </div>
  );
};

export default Header;
