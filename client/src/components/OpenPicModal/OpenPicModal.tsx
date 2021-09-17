import s from "./OpenPicModal.module.css";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

interface OpenPicModalPropsType {
  isShow: string;
  setShow: (value: string) => void;
  image: string;
}

const OpenPicModal: React.FC<OpenPicModalPropsType> = ({
  isShow,
  setShow,
  image,
}) => {
  const handleExit = () => {
    setShow("");
  };

  return (
    <Modal
      size="lg"
      show={Boolean(isShow)}
      onHide={() => {}}
      className={s.wrapper}
    >
      <Modal.Header>
        <Modal.Title id="example-modal-sizes-title-lg">
          <div onClick={handleExit} className={s.exit}>
            <i className="bi bi-x-circle"></i>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <div className={s.imgWrapper}>
            <img alt="heroImg" src={image} />
          </div>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default OpenPicModal;
