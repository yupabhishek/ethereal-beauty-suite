import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("ScrollToTop component", () => {
  beforeEach(() => {
    // make sure scrollRestoration is writable in the JSDOM history object
    Object.defineProperty(history, "scrollRestoration", {
      value: "auto",
      writable: true,
    });
  });

  it("disables browser scroll restoration on mount", () => {
    render(
      <MemoryRouter initialEntries={["/first"]}>
        <ScrollToTop />
      </MemoryRouter>
    );

    expect(history.scrollRestoration).toBe("manual");
  });

  it("calls window.scrollTo when the route changes", () => {
    const spy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});

    const { rerender } = render(
      <MemoryRouter initialEntries={["/first"]}>
        <ScrollToTop />
      </MemoryRouter>
    );

    expect(spy).toHaveBeenCalledWith({ top: 0, left: 0 });

    // simulate navigation by rendering with a different entry
    rerender(
      <MemoryRouter initialEntries={["/second"]}>
        <ScrollToTop />
      </MemoryRouter>
    );

    expect(spy).toHaveBeenCalledWith({ top: 0, left: 0 });

    spy.mockRestore();
  });
});
