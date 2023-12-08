import { maybeCursorPaginatedItems } from "../utils";

describe("maybeCursorPaginatedItems", () => {
  const items = Array.from({ length: 100 }, (_, i) => i); // Create an array of 100 items

  test("returns all items if no cursor and limit are provided", () => {
    const result = maybeCursorPaginatedItems(items, null, null);
    expect(result.items).toEqual(items);
    expect(result.nextCursor).toEqual(items.length - 1);
  });

  test("returns first page of items with default limit", () => {
    const result = maybeCursorPaginatedItems(items, 0, 50);
    expect(result.items).toEqual(items.slice(0, 50));
    expect(result.nextCursor).toEqual(50);
  });

  test("returns paginated items based on provided cursor and limit", () => {
    const result = maybeCursorPaginatedItems(items, 70, 20);
    expect(result.items).toEqual(items.slice(70, 90));
    expect(result.nextCursor).toEqual(90);
  });

  test("returns last items of page items based on provided cursor and limit", () => {
    const result = maybeCursorPaginatedItems(items, 90, 20);
    expect(result.items).toEqual(items.slice(90, 100));
    expect(result.nextCursor).toEqual(99);
  });
});
