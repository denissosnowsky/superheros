import s from "./Header.module.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

interface HeaderPropsType {
    btnOnClick: (arg: boolean) => void;
}

const Header: React.FC<HeaderPropsType> = ( {btnOnClick} ) => {
  return (
    <div className={s.header}>
      <Container className={s.container}>
        <Button onClick={() => btnOnClick(true)} variant="success" size="lg">
          <i className="bi bi-plus-circle"></i> Добавить героя
        </Button>
      </Container>
    </div>
  );
};

export default Header;
