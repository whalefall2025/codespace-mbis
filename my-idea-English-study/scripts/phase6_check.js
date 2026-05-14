async function phase6Check(page) {
  const mustBeVisible = async (locator, name) => {
    if (!(await locator.isVisible())) {
      throw new Error(`${name} was not visible`);
    }
  };

  await page.goto("http://localhost:5173/");
  await page.waitForLoadState("networkidle");

  await mustBeVisible(page.getByRole("heading", { name: "Finance Reading Assistant" }), "Input heading");
  await mustBeVisible(page.getByText("Privacy / 隐私"), "Privacy notice");
  await mustBeVisible(page.getByText("Accuracy / 准确性"), "Accuracy notice");
  await mustBeVisible(page.getByText("Academic Integrity / 学术诚信"), "Academic integrity notice");

  await page
    .getByLabel("Paste your English reading / 粘贴英文阅读材料")
    .fill(
      "Revenue recognition affects reported profit.\n\n" +
        "Cash flow and liquidity help investors judge risk."
    );
  await page.getByRole("button", { name: "Translate / 翻译" }).click();
  await page.waitForURL("**/results");

  await mustBeVisible(page.getByRole("heading", { name: "Results Workspace" }), "Results heading");
  await mustBeVisible(
    page.getByRole("heading", { name: "Side-by-side reading / 对照阅读" }),
    "Side-by-side heading"
  );
  await mustBeVisible(
    page.getByText("演示中文段落 1：Revenue recognition affects reported profit."),
    "Mock translation"
  );
  await mustBeVisible(
    page.getByRole("complementary", { name: "Terminology sidebar / 术语侧栏" }),
    "Terminology sidebar"
  );
  await mustBeVisible(page.getByText("revenue recognition / 收入确认"), "Glossary term");
  await mustBeVisible(
    page.getByRole("heading", { name: "Reading logic analysis / 阅读逻辑分析" }),
    "Analysis heading"
  );

  await page.reload();
  await page.waitForLoadState("networkidle");
  await mustBeVisible(page.getByText("Demo result loaded / 演示结果已加载"), "Reloaded session result");

  await page.getByRole("button", { name: "Hide terminology / 隐藏术语" }).click();
  if (await page.getByRole("complementary", { name: "Terminology sidebar / 术语侧栏" }).isVisible()) {
    throw new Error("Terminology sidebar remained visible after hide");
  }

  await page.getByRole("button", { name: "Show terminology / 显示术语" }).click();
  await mustBeVisible(
    page.getByRole("complementary", { name: "Terminology sidebar / 术语侧栏" }),
    "Terminology sidebar after show"
  );

  await page.screenshot({ path: "/tmp/finance-reading-results.png", fullPage: true });
}
