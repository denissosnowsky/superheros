import { MockedProvider } from "@apollo/client/testing";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import HeroPage from "./HeroPage";
import { HeroDocument } from "../../store/generated/graphql";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";


describe("test for hero page", () => {
  const history = createMemoryHistory();
  const route = "/heros/1";
  history.push(route);

  const mocks = [
    {
      request: {
        query: HeroDocument,
        variables: {
            heroId: "1"
        },
      },
      result: {
        data: {
          hero: {
            id:"1",
            createdAt:"2021-09-17T15:54:03.311Z",
            updatedAt:"2021-09-18T14:29:39.824Z",
            nickname:"Superman Hello",
            real_name:"Денис",
            origin_description:"dsscds",
            superpowers:"sdsd",
            catch_phrase:"sddssd",
            images:[{id: '1', name: 'g'}],
            __typename:"Hero"
          },
        },
      },
    },
  ];

  test("renders loading", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router history={history}>
          <HeroPage />
        </Router>
      </MockedProvider>
    );

    expect(screen.getByTestId("loading")).toBeTruthy();
  });
});
