import { describe, it, expect, beforeEach, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Router } from "./Router";
import { getCurrPath } from "../utils";
import { Route } from "./Route";
import { Link } from "./Link";

vi.mock("../utils", () => ({
  getCurrPath: vi.fn()
}))

describe("Router", () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
  })
  it("should render without crashing", () => {
    render(<Router routes={[]} />)
    expect(true).toBeTruthy();
  })

  it("should render 404 if no route matches", () => {
    render(<Router routes={[]} DefaultComponent={() => <h1>404</h1>} />)
    expect(screen.getByText("404")).toBeTruthy();
  })

  it("should render the component if route matches", () => {
    getCurrPath.mockReturnValue("/about")
    const routes = [
      { 
        path: "/", 
        Component: () => <h1>Home</h1> 
      },
      {
        path: "/about",
        Component: () => <h1>About</h1>
      }
    ]
    render(<Router routes={routes} />)
    expect(screen.getByText("About")).toBeTruthy();
  })

  it("should navigate using Link component", async () => {
    getCurrPath.mockReturnValue("/")
    render(
      <Router>
        <Route path="/" Component={() => {
          return (
            <>
              <h1>Home</h1>
              <Link to="/about">About</Link>
            </>
          )
        }} />
        <Route path="/about" Component={() => <h1>About</h1>} />
      </Router>
    )

    const button = screen.getByText("About")
    fireEvent.click(button)

    const aboutTitle = await screen.findByText("About")
    expect(aboutTitle).toBeTruthy();
  })
});