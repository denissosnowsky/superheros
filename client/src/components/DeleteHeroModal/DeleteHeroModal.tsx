import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import s from "./DeleteHeroModal.module.css";

interface DeleteHeroModalPropsType {
  isShow: number;
  setShow: (value: number) => void;
  addMutation: () => void;
}

const DeleteHeroModal: React.FC<DeleteHeroModalPropsType> = ({
  isShow,
  setShow,
  addMutation,
}) => {
  const handleCancel = () => {
    setShow(0);
  };

  const handleConfirm = () => {
    addMutation();
    setShow(0);
    /* showSuccess('Балон добавлен'); */
  };

  return (
    <Modal size="lg" show={Boolean(isShow)} onHide={() => {}} className={s.wrapper}>
      <Modal.Header>
        <Modal.Title id="example-modal-sizes-title-lg">
          Вы точно хотите удалить героя?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button
              variant="danger"
              className="my-2 w-75"
              onClick={handleCancel}
            >
              Нет
            </Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button
              variant="success"
              className="my-2 w-75"
              onClick={handleConfirm}
            >
              Да
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteHeroModal;
