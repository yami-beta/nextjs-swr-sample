import { act, renderHook } from "@testing-library/react-hooks";
import { useTodo } from "./todoHook";
import "whatwg-fetch";

describe(useTodo.name, () => {
  const fetchMock = jest.fn();

  const todo = { id: "todo1", text: "todo 1", done: true };

  const response = new Response(JSON.stringify(todo), {
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
    const { result } = renderHook(() => useTodo("todo1"));

    await act(async () => {
      await Promise.all(fetchMock.mock.instances);
    });

    expect(result.current).toEqual({
      todo,
      error: undefined,
      loading: false,
    });
  });
});
