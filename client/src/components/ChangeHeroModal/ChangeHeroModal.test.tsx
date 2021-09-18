import ChangeHeroModal, { fetchedData } from "./ChangeHeroModal";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";

afterEach(cleanup);

describe("modal for hero change", () => {
  const data: fetchedData = {
    id: "1",
    createdAt: null,
    updatedAt: null,
    nickname: "NickName",
    real_name: "RealName",
    origin_description: "Origin",
    superpowers: "SuperPowers",
    catch_phrase: "Phrase",
    images: [],
  };

  test("initial inputs shoudn't have values from data", async () => {
    render(
      <ChangeHeroModal
        data={data}
        isShow={1}
        setShow={(value) => {}}
        addMutation={(args) => {}}
      />
    );

    const inputs = screen.getAllByRole("textbox");
    expect(inputs[0]).toHaveValue("NickName");
    expect(inputs[1]).toHaveValue("RealName");
    expect(inputs[2]).toHaveValue("Origin");
    expect(inputs[3]).toHaveValue("SuperPowers");
    expect(inputs[4]).toHaveValue("Phrase");
  });

  test("Delete preload image button should decrease the length of preload state ", async () => {
    const data: fetchedData = {
      id: "1",
      createdAt: null,
      updatedAt: null,
      nickname: "NickName",
      real_name: "RealName",
      origin_description: "Origin",
      superpowers: "SuperPowers",
      catch_phrase: "Phrase",
      images: [{
        id: '1',
        name: "image"
      }],
    };

    render(
      <ChangeHeroModal
        data={data}
        isShow={1}
        setShow={(value) => {}}
        addMutation={(args) => {}}
      />
    );

    const btn = screen.getAllByText("Удалить")[0];

    const preLength = screen.getAllByTestId('img').length;

    fireEvent.click(btn);

    expect(preLength).toBe(1);
    expect(()=>{
      screen.getAllByTestId('img')
    }).toThrowError();
  });
});
