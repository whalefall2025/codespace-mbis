import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("input page", () => {
  beforeEach(() => {
    sessionStorage.clear();
    window.history.pushState({}, "", "/");
  });

  it("shows bilingual notices, counts words, and blocks empty submission", async () => {
    const user = userEvent.setup();

    render(<App />);

    expect(
      screen.getByRole("heading", { name: /finance reading assistant/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/金融阅读助手/)).toBeInTheDocument();
    expect(screen.getByText(/privacy/i)).toBeInTheDocument();
    expect(screen.getByText(/隐私/)).toBeInTheDocument();
    expect(screen.getByText(/accuracy/i)).toBeInTheDocument();
    expect(screen.getByText(/准确性/)).toBeInTheDocument();
    expect(screen.getByText(/academic integrity/i)).toBeInTheDocument();
    expect(screen.getByText(/学术诚信/)).toBeInTheDocument();

    const input = screen.getByLabelText(/paste your english reading/i);
    await user.type(input, "Revenue recognition affects profit.");
    expect(screen.getByText(/4 \/ 5,000 words/i)).toBeInTheDocument();

    await user.clear(input);
    await user.click(screen.getByRole("button", { name: /translate/i }));

    expect(screen.getByText(/paste some english text/i)).toBeInTheDocument();
    expect(screen.getByText(/请输入英文文本/)).toBeInTheDocument();
  });

  it("blocks passages above the 5,000 word demo limit", async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByLabelText(/paste your english reading/i);
    fireEvent.change(input, { target: { value: "revenue ".repeat(5001) } });
    await user.click(screen.getByRole("button", { name: /translate/i }));

    expect(
      screen.getByText(/supports up to 5,000 words/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/5,000 个英文单词以内/)).toBeInTheDocument();
  });

  it("keeps results as the only other route with a way back to input", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/results");

    render(<App />);

    expect(
      screen.getByRole("heading", { name: /results workspace/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/结果阅读区/)).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /back to input/i }));

    expect(
      screen.getByRole("heading", { name: /finance reading assistant/i })
    ).toBeInTheDocument();
  });

  it("generates a browser-only demo result, stores it, and loads it on results", async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByLabelText(/paste your english reading/i);
    await user.type(
      input,
      "Revenue recognition affects reported profit.\n\nCash flow helps investors evaluate liquidity."
    );
    await user.click(screen.getByRole("button", { name: /translate/i }));

    expect(
      screen.getByRole("heading", { name: /results workspace/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/demo result loaded/i)).toBeInTheDocument();
    expect(screen.getByText(/2 paragraphs prepared/i)).toBeInTheDocument();
    expect(screen.getByText(/演示中文段落 1/)).toBeInTheDocument();

    const storedResult = JSON.parse(
      sessionStorage.getItem("finance-reading-current-result") ?? "null"
    );

    expect(storedResult).toMatchObject({
      sourceParagraphs: [
        "Revenue recognition affects reported profit.",
        "Cash flow helps investors evaluate liquidity."
      ],
      translatedParagraphs: [
        "演示中文段落 1：Revenue recognition affects reported profit.",
        "演示中文段落 2：Cash flow helps investors evaluate liquidity."
      ],
      analysis: {
        keyArguments: ["Demo analysis placeholder for reading structure."],
        logicSummary: "Demo logic placeholder for classroom review."
      }
    });
  });

  it("replaces the previous session result on a new valid submission", async () => {
    const user = userEvent.setup();

    render(<App />);

    let input = screen.getByLabelText(/paste your english reading/i);
    await user.type(input, "Revenue is recognized when control transfers.");
    await user.click(screen.getByRole("button", { name: /translate/i }));

    await user.click(screen.getByRole("link", { name: /back to input/i }));

    input = screen.getByLabelText(/paste your english reading/i);
    await user.type(input, "Liquidity ratios compare current assets and liabilities.");
    await user.click(screen.getByRole("button", { name: /translate/i }));

    const storedResult = JSON.parse(
      sessionStorage.getItem("finance-reading-current-result") ?? "null"
    );

    expect(storedResult.sourceParagraphs).toEqual([
      "Liquidity ratios compare current assets and liabilities."
    ]);
    expect(storedResult.sourceParagraphs).not.toContain(
      "Revenue is recognized when control transfers."
    );
  });

  it("shows matched English and Simple Chinese paragraphs in a read-only side-by-side workspace", async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByLabelText(/paste your english reading/i);
    await user.type(
      input,
      "Revenue recognition affects reported profit.\n\nCash flow helps investors evaluate liquidity."
    );
    await user.click(screen.getByRole("button", { name: /translate/i }));

    expect(
      screen.getByRole("heading", { name: /side-by-side reading/i })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: /original english/i })).toHaveLength(2);
    expect(screen.getAllByRole("heading", { name: /simple chinese/i })).toHaveLength(2);

    expect(screen.getByText("Revenue recognition affects reported profit.")).toBeInTheDocument();
    expect(screen.getByText("Cash flow helps investors evaluate liquidity.")).toBeInTheDocument();
    expect(
      screen.getByText("演示中文段落 1：Revenue recognition affects reported profit.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("演示中文段落 2：Cash flow helps investors evaluate liquidity.")
    ).toBeInTheDocument();

    expect(screen.getByText(/paragraph 1 \/ 段落 1/i)).toBeInTheDocument();
    expect(screen.getByText(/paragraph 2 \/ 段落 2/i)).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByText(/analysis preview/i)).not.toBeInTheDocument();
  });

  it("shows relevant fixed glossary terms in a hideable terminology sidebar without inline highlighting", async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByLabelText(/paste your english reading/i);
    await user.type(
      input,
      "Revenue recognition affects profit.\n\nCash flow and liquidity help investors judge risk."
    );
    await user.click(screen.getByRole("button", { name: /translate/i }));

    const sidebar = screen.getByRole("complementary", { name: /terminology sidebar/i });
    const sidebarContent = within(sidebar);

    expect(screen.getByRole("heading", { name: /terminology/i })).toBeInTheDocument();
    expect(sidebarContent.getByText(/revenue recognition/i)).toBeInTheDocument();
    expect(sidebarContent.getByText(/收入确认/)).toBeInTheDocument();
    expect(sidebarContent.getByText(/cash flow/i)).toBeInTheDocument();
    expect(sidebarContent.getAllByText(/现金流/).length).toBeGreaterThan(0);
    expect(sidebarContent.getByText(/liquidity/i)).toBeInTheDocument();
    expect(sidebarContent.getByText(/流动性/)).toBeInTheDocument();

    expect(sidebarContent.queryByText(/balance sheet/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("mark")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /hide terminology/i }));
    expect(
      screen.queryByRole("complementary", { name: /terminology sidebar/i })
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /show terminology/i }));
    expect(
      screen.getByRole("complementary", { name: /terminology sidebar/i })
    ).toBeInTheDocument();
  });

  it("shows a same-page demo analysis panel that supports structure understanding", async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByLabelText(/paste your english reading/i);
    await user.type(
      input,
      "Revenue recognition affects reported profit.\n\nCash flow helps investors evaluate liquidity."
    );
    await user.click(screen.getByRole("button", { name: /translate/i }));

    expect(screen.getByRole("heading", { name: /reading logic analysis/i })).toBeInTheDocument();
    const analysisPanel = screen
      .getByRole("heading", { name: /reading logic analysis/i })
      .closest("section");
    expect(analysisPanel).not.toBeNull();
    const analysis = within(analysisPanel!);

    expect(analysis.getAllByText(/demo analysis/i).length).toBeGreaterThan(0);
    expect(analysis.getByText(/not assignment-ready writing/i)).toBeInTheDocument();
    expect(analysis.getByText(/demo analysis placeholder for reading structure/i)).toBeInTheDocument();
    expect(analysis.getByText(/demo logic placeholder for classroom review/i)).toBeInTheDocument();
    expect(screen.getByRole("list", { name: /key arguments/i })).toBeInTheDocument();

    expect(window.location.pathname).toBe("/results");
    expect(screen.queryByText(/thesis statement/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/essay paragraph/i)).not.toBeInTheDocument();
  });
});
