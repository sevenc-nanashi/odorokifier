export const parameters = [
  { key: "shallowness", label: "理解の浅さ", low: "正確な理解", high: "概念の混同", icon: "brain" },
  { key: "excitement", label: "テンション", low: "冷静", high: "大興奮", icon: "activity" },
  { key: "assertiveness", label: "断言度", low: "慎重", high: "言い切る", icon: "flag" },
  { key: "provocation", label: "煽り度", low: "控えめ", high: "強く促す", icon: "megaphone" },
] as const;

export type ParameterValues = Record<(typeof parameters)[number]["key"], number>;

export const presets = [
  {
    id: "excited",
    name: "興奮型",
    description: "驚きを短文でたたみかける",
    icon: "bolt",
    color: "violet",
    defaultParameters: { shallowness: 75, excitement: 95, assertiveness: 85, provocation: 90 },
    styleInstructions:
      "「ちょっと待って。」と発見を切り出し、短文を連ねる。驚きが強いときは「ヤバすぎる」「革命」などの大きな言葉を使う。",
  },
  {
    id: "news",
    name: "速報・お得情報型",
    description: "見出しと特典で惹きつける",
    icon: "news",
    color: "mint",
    defaultParameters: { shallowness: 80, excitement: 65, assertiveness: 85, provocation: 70 },
    styleInstructions:
      "速報見出しで始め、短い行と空行で情報を小出しにする。利点や条件は「・」で列挙し、「詳しく解説します」で引きを作る。実在する金額や特典を創作しない。",
  },
  {
    id: "explainer",
    name: "知ったか解説型",
    description: "「つまり」で本質を語る",
    icon: "glasses",
    color: "butter",
    defaultParameters: { shallowness: 85, excitement: 35, assertiveness: 70, provocation: 45 },
    styleInstructions:
      "技術解説のように、観察と解釈を段落で分ける。「ここが重要」「つまり」でつなぎ、本質を説明する語り口にする。解釈の正確さは認知ルールに従う。",
  },
  {
    id: "business",
    name: "ビジネス系",
    description: "生産性と機会損失を語る",
    icon: "briefcase",
    color: "sky",
    defaultParameters: { shallowness: 70, excitement: 75, assertiveness: 95, provocation: 85 },
    styleInstructions:
      "使う側と使わない側の仕事風景を対比し、生産性、競争優位、機会損失の語彙を使う。読者への呼びかけの強さは煽り度に従う。",
  },
];

const rules = {
  shallowness: [
    "特徴と前提条件を正確に捉える。似ている概念を区別し、確認できる事実から筋の通る結論だけを導く。",
    "いちばん分かりやすいメリットに注目する。細かな仕組みや例外は掘り下げず、目の前の便利さを中心に解釈する。",
    "特徴をひとつだけ正しく捉え、本来は別の概念を同一視して誤った結論に飛躍する。本人は誤解に気づかず、本質をつかんだつもりで自然に語る。",
  ],
  excitement: [
    "落ち着いた語彙と平熱の文体で淡々と書く。感嘆符・絵文字・大げさな感嘆詞を使わない。",
    "発見した喜びをカジュアルに表す。驚きは一言に収め、勢いと読みやすさを両立する。",
    "最大級の驚きを、勢いのある短い感嘆文で畳みかける。感嘆符や絵文字を使い、反応の大きさで興奮を表す。",
  ],
  assertiveness: [
    "結論は「かもしれない」「とも考えられる」で慎重に述べる。これは語尾の留保とし、自分の理解の深さを論評しない。",
    "解釈をはっきり述べ、未来の見通しには適度な留保を付ける。",
    "解釈した結論を迷いなく言い切る。未来に触れる場合も断定調にする。結論が及ぶ範囲は認知ルールに合わせる。",
  ],
  provocation: [
    "情報の紹介と本人の感想で締める。読み手を急かしたり、行動を求めたりしない。",
    "締めに「気になったらチェックしてみて」など、軽い行動の提案をひとつ添える。",
    "見逃すと損をするという切迫感を出し、今すぐ保存や確認をするように読者を強く促す。結論の確かさは変えない。",
  ],
};

export type Preset = (typeof presets)[number];

const level = (value: number) => (value < 30 ? 0 : value < 70 ? 1 : 2);

function cognitiveRule(value: number, topic: string) {
  const band = level(value);
  const base = rules.shallowness[band];
  if (!/リボ(?:払い|ルビング払い)?/.test(topic) || band === 1) return base;
  return (
    base +
    (band === 0
      ? " 毎月の支払額と手数料を含む総支払額を区別し、月々の額だけで総費用の安さを判断しない。"
      : " たとえば登場人物は、毎月の支払額を一定にできる点から、商品の総費用まで安くなると思い込む。")
  );
}

export function generatePrompt(preset: Preset, values: ParameterValues, topic = "") {
  const subject = topic.trim();
  const sections = [
    [
      "ロール",
      "あなたはSNSでAIや新しいサービスを紹介する、架空の「AI驚き屋」です。一般化した発信スタイルを使い、パロディ投稿をひとつ書いてください。",
    ],
    [
      "口調プリセット｜" + preset.name,
      preset.styleInstructions + " 強さは以下の個別設定を優先する。",
    ],
    ["理解の浅さ", cognitiveRule(values.shallowness, subject)],
    ...parameters.slice(1).map(({ key, label }) => [label, rules[key][level(values[key])]]),
    [
      "文章構成",
      "掴み → 特徴やメリット → 本人の解釈・結論の順に組み立てる。未来予測と行動喚起は設定に合わせる。",
    ],
    [
      "出力指定",
      "日本語の投稿本文だけを出力する。金融・医療・法律を扱うときは架空の場面にし、契約・治療などの具体的な助言を避ける。",
    ],
    ["投稿テーマ", subject || "「AI驚き屋」風の投稿が簡単にできるようになったこと"],
  ];
  return sections.map(([heading, body]) => "# " + heading + "\n" + body).join("\n\n");
}
