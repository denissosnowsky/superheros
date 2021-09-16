import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import s from "./AddHeroModal.module.css";
import { ChangeEvent, useState } from "react";
import { AddHeroMutationVariables } from "../../store/generated/graphql";

interface AddHeroModalPropsType {
  isShow: boolean;
  setShow: (value: boolean) => void;
  addMutation: (args: AddHeroMutationVariables) => void;
}

const AddHeroModal: React.FC<AddHeroModalPropsType> = ({
  isShow,
  setShow,
  addMutation,
}) => {
  const [nickname, setNickname] = useState<string>("");
  const [realName, setRealName] = useState<string>("");
  const [originDescription, setOriginDescription] = useState<string>("");
  const [superPowers, setSuperPowers] = useState<string>("");
  const [catchPhrase, setCatchPhrase] = useState<string>("");
  const [photos, setPhotos] = useState<FileList | undefined>(undefined);
  const [preload, setPreload] = useState<Array<string | ArrayBuffer>>([]);

  const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.currentTarget?.files && event?.currentTarget?.files.length > 0) {
      setPhotos(event?.currentTarget?.files);

      for (let i = 0; i < event?.currentTarget?.files.length; i++) {
        var oFReader = new FileReader();
        oFReader.readAsDataURL(event?.currentTarget?.files[i]);
        oFReader.onload = function (oFREvent) {
          setPreload(preload => [...preload, oFREvent?.target?.result!]) 
        };
      }
    }
  };

  const handleCancel = () => {
    setShow(false);
  };

  const handleAdd = () => {
    if (!nickname) return /* showError("Введите Никнейм") */;
    if (!realName) return /* showError("Введите Реальное Имя") */;
    if (!originDescription) return /* showError("Введите Происхождение") */;
    if (!superPowers) return /* showError("Введите Суперсилы") */;
    if (!catchPhrase) return /* showError("Введите Кредо") */;
    const args: AddHeroMutationVariables = {
      nickname: nickname!,
      realName: realName!,
      originDescription: originDescription!,
      superPowers: superPowers!,
      catchPhrase: catchPhrase!,
      images: photos,
    };
    addMutation(args);
    setShow(false);
    /* showSuccess('Балон добавлен'); */
  };

  return (
    <Modal size="lg" show={isShow} onHide={() => {}} className={s.wrapper}>
      <Modal.Header>
        <Modal.Title id="example-modal-sizes-title-lg">
          Добавить героя
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} className="m-3" controlId="nickname">
            <Col md={3} className={s.firstCol}>
              <Form.Label column sm="2">
                Никнейм:
              </Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                placeholder="Введите никнейм"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-3" controlId="name">
            <Col md={3} className={s.firstCol}>
              <Form.Label column sm="2">
                Реальное имя:
              </Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                placeholder="Введите реальное имя"
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-3" controlId="origin">
            <Col md={3} className={s.firstCol}>
              <Form.Label column sm="2">
                Происхождение:
              </Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                as="textarea"
                placeholder="Введите происхождение"
                value={originDescription}
                onChange={(e) => setOriginDescription(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-3" controlId="powers">
            <Col md={3} className={s.firstCol}>
              <Form.Label column sm="2">
                Суперсилы:
              </Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                as="textarea"
                placeholder="Введите суперсилы"
                value={superPowers}
                onChange={(e) => setSuperPowers(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="m-3" controlId="credo">
            <Col md={3} className={s.firstCol}>
              <Form.Label column sm="2">
                Кредо:
              </Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                type="text"
                placeholder="Введите кредо"
                value={catchPhrase}
                onChange={(e) => setCatchPhrase(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Col className={s.imageCol}>
              <div className={s.imgHeader}>
                <input
                  type={"file"}
                  onChange={handlePhoto}
                  name="img"
                  id="img"
                  multiple
                />
                <label htmlFor="img" className={s.imgLabel}></label>
                <Button variant="white" className={s.imageBtn}>
                  Добавить фото...
                </Button>
              </div>
            </Col>
          </Form.Group>
        </Form>
        <Row className={s.preloadRow}>
          <>
            {preload.length > 0 &&
              preload.map((item, i) => (
                <Col key={i} md={3} className={s.preloadCol}>
                  <img alt="preloadImg" src={item as string} />
                </Col>
              ))}
          </>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button
              variant="danger"
              className="my-2 w-75"
              onClick={handleCancel}
            >
              Отменить
            </Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button variant="success" className="my-2 w-75" onClick={handleAdd}>
              Добавить
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default AddHeroModal;
