import { act, renderHook } from "@testing-library/react-hooks";
import { useTodoList } from "./todoListHook";
import "whatwg-fetch";

describe(useTodoList.name, () => {
  const fetchMock = jest.fn();

  const todoList = [
    { id: "todo1", text: "todo 1", done: true },
    { id: "todo2", text: "todo 2", done: false },
    { id: "todo3", text: "todo 3", done: false },
  ];

  const response = new Response(JSON.stringify(todoList), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  beforeEach(() => {
    fetchMock.mockResolvedValue(response);
    window.fetch = fetchMock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("データ取得", async () => {
    const { result } = renderHook(() => useTodoList());

    await act(async () => {
      await Promise.all(fetchMock.mock.instances);
    });

    expect(result.current).toEqual({
      todoList,
      error: undefined,
      loading: false,
    });
  });
});
