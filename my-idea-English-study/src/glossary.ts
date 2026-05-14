export type GlossaryTerm = {
  term: string;
  chinese: string;
  explanation: string;
};

export const glossary: GlossaryTerm[] = [
  {
    term: "revenue recognition",
    chinese: "收入确认",
    explanation: "判断企业应该在什么时候记录收入。"
  },
  {
    term: "cash flow",
    chinese: "现金流",
    explanation: "企业现金流入和流出的情况。"
  },
  {
    term: "liquidity",
    chinese: "流动性",
    explanation: "企业用短期资产支付短期债务的能力。"
  },
  {
    term: "profit",
    chinese: "利润",
    explanation: "收入减去成本和费用后的剩余金额。"
  },
  {
    term: "asset",
    chinese: "资产",
    explanation: "企业拥有或控制、预计能带来经济利益的资源。"
  },
  {
    term: "liability",
    chinese: "负债",
    explanation: "企业需要偿还的现时义务。"
  },
  {
    term: "equity",
    chinese: "权益",
    explanation: "资产扣除负债后属于所有者的部分。"
  },
  {
    term: "balance sheet",
    chinese: "资产负债表",
    explanation: "展示企业某一时点资产、负债和权益的报表。"
  },
  {
    term: "income statement",
    chinese: "利润表",
    explanation: "展示企业一段期间收入、费用和利润的报表。"
  },
  {
    term: "current assets",
    chinese: "流动资产",
    explanation: "预计一年内可以变现或使用的资产。"
  },
  {
    term: "current liabilities",
    chinese: "流动负债",
    explanation: "预计一年内需要偿还的债务。"
  },
  {
    term: "gross margin",
    chinese: "毛利率",
    explanation: "毛利占收入的比例。"
  },
  {
    term: "net income",
    chinese: "净利润",
    explanation: "扣除所有费用和税费后的最终利润。"
  },
  {
    term: "depreciation",
    chinese: "折旧",
    explanation: "把长期资产成本分摊到使用期间。"
  },
  {
    term: "amortization",
    chinese: "摊销",
    explanation: "把无形资产成本分摊到受益期间。"
  },
  {
    term: "inventory",
    chinese: "存货",
    explanation: "企业持有用于销售或生产的商品和材料。"
  },
  {
    term: "accounts receivable",
    chinese: "应收账款",
    explanation: "客户欠企业但尚未支付的款项。"
  },
  {
    term: "accounts payable",
    chinese: "应付账款",
    explanation: "企业欠供应商但尚未支付的款项。"
  },
  {
    term: "capital expenditure",
    chinese: "资本性支出",
    explanation: "用于购买或改善长期资产的支出。"
  },
  {
    term: "working capital",
    chinese: "营运资本",
    explanation: "流动资产减去流动负债。"
  },
  {
    term: "leverage",
    chinese: "杠杆",
    explanation: "企业使用债务融资的程度。"
  },
  {
    term: "return on assets",
    chinese: "资产回报率",
    explanation: "衡量企业利用资产产生利润的效率。"
  },
  {
    term: "return on equity",
    chinese: "权益回报率",
    explanation: "衡量企业利用股东权益产生利润的效率。"
  },
  {
    term: "risk",
    chinese: "风险",
    explanation: "实际结果与预期结果不同的可能性。"
  },
  {
    term: "cost of capital",
    chinese: "资本成本",
    explanation: "企业获得资金需要付出的回报要求。"
  },
  {
    term: "discount rate",
    chinese: "折现率",
    explanation: "把未来现金流换算成现值时使用的比率。"
  },
  {
    term: "net present value",
    chinese: "净现值",
    explanation: "未来现金流现值减去初始投资后的金额。"
  },
  {
    term: "budget",
    chinese: "预算",
    explanation: "对未来收入、成本或现金流的计划。"
  },
  {
    term: "variance",
    chinese: "差异",
    explanation: "实际结果和预算或标准之间的差别。"
  },
  {
    term: "audit",
    chinese: "审计",
    explanation: "检查财务信息是否可靠和符合规则的过程。"
  }
];

export function findGlossaryTerms(text: string) {
  const normalizedText = text.toLowerCase();
  return glossary.filter((entry) => normalizedText.includes(entry.term.toLowerCase()));
}
