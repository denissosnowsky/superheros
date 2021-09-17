import Header from "../Header/Header";
import s from "./ErrorPage.module.css";
import { useHistory } from "react-router-dom";
import Row from "react-bootstrap/Row";

const ErrorPage: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <Header
        text={"Вернутся к списку"}
        btnOnClick={() => history.push("/heros")}
        color={"primary"}
        position={"start"}
        icon={"bi bi-arrow-left-circle"}
      />
      <Row>
        <div className={s.text}>{"Ошибка"}</div>
      </Row>
    </>
  );
};

export default ErrorPage;
