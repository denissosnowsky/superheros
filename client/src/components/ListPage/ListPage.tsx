import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import {
  useAddHeroMutation,
  useChangeHeroMutation,
  useCountHerosQuery,
  useDeleteHeroMutation,
  useHerosQuery,
} from "../../store/generated/graphql";
import AddHeroModal from "../AddHeroModal/AddHeroModal";
import Header from "../Header/Header";
import ListItem from "../ListItem/ListItem";
import Loading from "../Loading/Loading";
import PaginationFC from "../Pagination/Pagination";
import s from "./ListPage.module.css";
import { NetworkStatus } from "@apollo/client";
import defaultImg from "../../assets/person.png";
import ErrorPage from "../ErrorPage/ErrorPage";
import { googleUrl } from "../../config";
import DeleteHeroModal from "../DeleteHeroModal/DeleteHeroModal";
import ChangeHeroModal from "../ChangeHeroModal/ChangeHeroModal";
import { showSuccess } from "../../utils/showSucces";
import { showError } from "../../utils/showError";

interface ListPagePropsType {}

const ListPage: React.FC = () => {
  const TAKE = 5;

  const [page, setPage] = useState(1);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState<number>(0); //save here hero's id to delete in the modal
  const [openChange, setOpenChange] = useState<number>(0); //save here hero's id to change in the modal

  const {
    data: dataHeros,
    loading: loadingHeros,
    error: errorHeros,
    fetchMore: fetchMoreHeros,
    networkStatus: networkStatusHeros,
  } = useHerosQuery({
    variables: {
      herosSkip: (page - 1) * TAKE,
      herosTake: TAKE,
    },
  });
console.log('fetch');
  const {
    data: dataCount,
    loading: loadingCount,
    error: errorCount,
  } = useCountHerosQuery();

  const [
    deleteHero,
    { data: dataDelete, loading: loadingDelete, error: errorDelete },
  ] = useDeleteHeroMutation({
    refetchQueries: ["Heros", "CountHeros"],
    onCompleted(data) {
      data
        ? showSuccess("Герой успешно удален!")
        : showError("Ошибка. Герой не удален!");
    },
    onError(error) {
      showError("Ошибка. Герой не удален!");
    },
  });

  const [
    addHero,
    { data: dataAddHero, loading: loadingAddHero, error: errorAddHero },
  ] = useAddHeroMutation({
    refetchQueries: ["Heros", "CountHeros"],
    onCompleted(data) {
      data
        ? showSuccess("Герой успешно добавлен!")
        : showError("Ошибка. Герой не добавлен!");
    },
    onError(error) {
      showError("Ошибка. Герой не добавлен!");
    },
  });

  const [
    changeHero,
    {
      data: dataChangeHero,
      loading: loadingChangeHero,
      error: errorChangeHero,
    },
  ] = useChangeHeroMutation({
    refetchQueries: ["Heros", "CountHeros"],
    onCompleted(data) {
      data
        ? showSuccess("Герой успешно изменен!")
        : showError("Ошибка. Герой не изменен!");
    },
    onError(error) {
      showError("Ошибка. Герой не изменен!");
    },
  });

  useEffect(() => {
    fetchMoreHeros({
      variables: {
        skip: (page - 1) * TAKE,
        take: TAKE,
      },
    });
  }, [page]);

  if (
    errorHeros ||
    errorAddHero ||
    errorCount ||
    errorDelete ||
    errorChangeHero
  ) {
    return <ErrorPage />;
  }

  return (
    <>
      {openAdd && (
        <AddHeroModal
          isShow={openAdd}
          setShow={setOpenAdd}
          addMutation={(args) =>
            addHero({
              variables: args,
            })
          }
        />
      )}
      {Boolean(openDelete) && (
        <DeleteHeroModal
          isShow={openDelete}
          setShow={setOpenDelete}
          addMutation={() =>
            deleteHero({
              variables: {
                deleteHeroId: String(openDelete),
              },
            })
          }
        />
      )}
      {Boolean(openChange) && (
        <ChangeHeroModal
          isShow={openChange}
          setShow={setOpenChange}
          data={
            dataHeros!.heros!.filter(
              (obj) => obj?.id === String(openChange)
            )[0]!
          }
          addMutation={(args) =>
            changeHero({
              variables: args,
            })
          }
        />
      )}
      <Header
        btnOnClick={() => setOpenAdd(true)}
        text={"Добавить героя"}
        color={"success"}
        position={"end"}
        icon={"bi bi-plus-circle"}
      />
      <div>
        <Container className={s.container}>
          {loadingAddHero ||
          loadingHeros ||
          loadingCount ||
          loadingDelete ||
          loadingChangeHero ||
          networkStatusHeros === NetworkStatus.refetch ? (
            <Loading />
          ) : (
            <>
              <ListGroup>
                {dataHeros && dataHeros!.heros!.length > 0 ? (
                  dataHeros!.heros!.map((item) => (
                    <ListItem
                      deleteClb={() => setOpenDelete(+item?.id!)}
                      changeClb={() => setOpenChange(+item?.id!)}
                      key={item?.id}
                      name={item?.nickname!}
                      id={item?.id!}
                      img={
                        item!.images!.length > 0
                          ? `${googleUrl}${item?.images![0]!.name!}`
                          : defaultImg
                      }
                    />
                  ))
                ) : (
                  <div className={s.empty}>Список пустой</div>
                )}
              </ListGroup>
              <PaginationFC
                page={page}
                setPage={setPage}
                pageSize={TAKE}
                allCount={dataCount?.countHeros!}
              />
            </>
          )}
        </Container>
      </div>
    </>
  );
};

export default ListPage;
