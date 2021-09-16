import s from "./ListItem.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

interface ListItemPropsType {
    img: string
    name: string
    deleteClb: () => void
    changeClb: () => void
}

const ListItem: React.FC<ListItemPropsType> = ( {img, name, deleteClb, changeClb} ) => {
  return (
    <>
      <ListGroup.Item>
        <Row className={s.row}>
          <Col md={2} className={s.imgCol}>
            <img
              alt="hero"
              src={img}
              className={s.image}
            />
          </Col>
          <Col md={3} className={s.nameCol}>
            {name}
          </Col>
          <Col md={{ span: 3, offset: 4 }} className={s.bntsCol}>
            <Button className={s.btn}
              onClick={()=>changeClb()}
            >Изменить</Button>
            <Button className={s.btn} variant="danger"
              onClick={()=>deleteClb()}
            >
              Удалить
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  );
};

export default ListItem;
