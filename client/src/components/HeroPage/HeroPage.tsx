import Header from "../Header/Header";
import s from "./HeroPage.module.css";
import { useHistory, useParams } from "react-router-dom";
import { useHeroQuery } from "../../store/generated/graphql";
import ErrorPage from "../ErrorPage/ErrorPage";
import Loading from "../Loading/Loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import defaultImg from "../../assets/person.png";
import { googleUrl } from "../../config";
import { useState } from "react";
import OpenPicModal from "../OpenPicModal/OpenPicModal";

interface HeroPagePropsType {}

const HeroPage: React.FC<HeroPagePropsType> = () => {
  const history = useHistory();
  const params: { id: string } = useParams();

  const { data, loading, error } = useHeroQuery({
    variables: { heroId: params.id },
  });

  const [openPic, setOpenPic] = useState<string>("");

  if (error) {
    return <ErrorPage />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {Boolean(openPic) && (
        <OpenPicModal isShow={openPic} setShow={setOpenPic} image={openPic} />
      )}
      <Header
        text={"Вернутся к списку"}
        btnOnClick={() => history.push("/heros")}
        color={"primary"}
        position={"start"}
        icon={"bi bi-arrow-left-circle"}
      />
      <Container data-testid='container'>
        <Row className={s.infoRow}>
          <Col md={4}>
            <div className={s.imgWrapper}>
              <img
                alt="heroImg"
                src={
                  data!.hero!.images && data!.hero!.images!.length > 0
                    ? `${googleUrl}${data!.hero!.images[0]!.name!}`
                    : defaultImg
                }
              />
            </div>
          </Col>
          <Col md={8}>
            <Row className={s.listRow}>
              <Col md={3} className={s.title}>
                {"Никнейм: "}
              </Col>
              <Col md={9} className={s.desc}>
                {data?.hero?.nickname}
              </Col>
            </Row>
            <Row className={s.listRow}>
              <Col md={3} className={s.title}>
                {"Реальное имя: "}
              </Col>
              <Col md={9} className={s.desc}>
                {data?.hero?.real_name}
              </Col>
            </Row>
            <Row className={s.listRow}>
              <Col md={3} className={s.title}>
                {"Происхождение: "}
              </Col>
              <Col md={9} className={s.desc}>
                {data?.hero?.origin_description}
              </Col>
            </Row>
            <Row className={s.listRow}>
              <Col md={3} className={s.title}>
                {"Суперсилы: "}
              </Col>
              <Col md={9} className={s.desc}>
                {data?.hero?.superpowers}
              </Col>
            </Row>
            <Row>
              <Col md={3} className={s.title}>
                {"Кредо: "}
              </Col>
              <Col md={9} className={s.desc}>
                {data?.hero?.catch_phrase}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className={s.photosRow}>
          <Row className={s.photosRowHeader}>
            <span>{"Галерея"}</span>
          </Row>
          <Row className={s.photosRowMain}>
            {data!.hero!.images && data!.hero!.images!.length > 0 ? (
              data!.hero!.images.map((item) => (
                <Col key={item?.id} md={3} className={s.galleryPhoto}>
                  <div onClick={() => setOpenPic(`${googleUrl}${item?.name}`)}>
                    <img alt="heroImg" src={`${googleUrl}${item?.name}`} />
                  </div>
                </Col>
              ))
            ) : (
              <div className={s.emptyPhotos}>Пока что нет фото</div>
            )}
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default HeroPage;
