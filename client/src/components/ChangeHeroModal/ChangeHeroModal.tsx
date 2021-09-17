import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import s from "./ChangeHeroModal.module.css";
import { ChangeEvent, useState } from "react";
import { ChangeHeroMutationVariables } from "../../store/generated/graphql";
import { googleUrl } from "../../config";
import { Maybe } from "graphql/jsutils/Maybe";
import { showError } from "../../utils/showError";

type fetchedData = {
  id: string;
  createdAt: any;
  updatedAt: any;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  images?: Maybe<Array<Maybe<{ id: string; name: string }>>>;
};

interface ChangeHeroModalPropsType {
  data: fetchedData;
  isShow: number;
  setShow: (value: number) => void;
  addMutation: (args: ChangeHeroMutationVariables) => void;
}

const ChangeHeroModal: React.FC<ChangeHeroModalPropsType> = ({
  data,
  isShow,
  setShow,
  addMutation,
}) => {
  const [nickname, setNickname] = useState<string>(data.nickname);
  const [realName, setRealName] = useState<string>(data.real_name);
  const [originDescription, setOriginDescription] = useState<string>(
    data.origin_description
  );
  const [superPowers, setSuperPowers] = useState<string>(data.superpowers);
  const [catchPhrase, setCatchPhrase] = useState<string>(data.catch_phrase);
  const [photos, setPhotos] = useState<Array<File>>([]);
  const [deletePhotosId, setDeletePhotosId] = useState<Array<string>>([]);
  const [preload, setPreload] = useState<Array<string | ArrayBuffer>>(
    data.images!.length > 0
      ? data.images!.map((obj) => `${googleUrl}${obj?.name}`)
      : []
  );

  const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.currentTarget?.files && event?.currentTarget?.files.length > 0) {
      const newPhotos: Array<File> = [];
      for (let i = 0; i < event?.currentTarget?.files.length; i++) {
        newPhotos.push(event?.currentTarget?.files![i]);

        var oFReader = new FileReader();
        oFReader.readAsDataURL(event?.currentTarget?.files[i]);
        oFReader.onload = function (oFREvent) {
          setPreload((preload) => [...preload, oFREvent?.target?.result!]);
        };
      }
      setPhotos((photos) => [...photos, ...newPhotos]);
    }
  };

  const handleCancel = () => {
    setShow(0);
  };

  const handleAdd = () => {
    if (!nickname) return showError("Введите Никнейм");
    if (!realName) return showError("Введите Реальное Имя");
    if (!originDescription) return showError("Введите Происхождение");
    if (!superPowers) return showError("Введите Суперсилы");
    if (!catchPhrase) return showError("Введите Кредо");
    const args: ChangeHeroMutationVariables = {
      id: String(data.id),
      nickname: nickname!,
      realName: realName!,
      originDescription: originDescription!,
      superPowers: superPowers!,
      catchPhrase: catchPhrase!,
      addImages: photos,
      deleteImages: deletePhotosId,
    };
    addMutation(args);
    setShow(0);
  };

  const handleDeletePhoto = (name: string) => {
    setPreload(preload.filter((img) => img != name));

    const indexFromDB: number = data!
      .images!.map((obj) => `${googleUrl}${obj?.name}`)
      .indexOf(name)!;
    if (indexFromDB != -1) {
      setDeletePhotosId([...deletePhotosId, data!.images![indexFromDB]!.id!]);
    }

    for (let i = 0; i < photos.length; i++) {
      let oFReader = new FileReader();
      oFReader.readAsDataURL(photos[i]);
      oFReader.onload = function (oFREvent) {
        if (oFREvent?.target?.result! === name) {
          setPhotos(photos.filter((obj) => obj != photos[i]));
        }
      };
    }
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
                  <div className={s.deleteImg}>
                    <Button
                      onClick={() => handleDeletePhoto(item as string)}
                      variant="danger"
                    >
                      Удалить
                    </Button>
                  </div>
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
              Изменить
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ChangeHeroModal;
