export const parameters = [
  {
    key: "shallowness",
    label: "理解の浅さ",
    low: "正確な理解",
    high: "概念の混同",
    icon: "brain",
  },
  {
    key: "excitement",
    label: "テンション",
    low: "冷静",
    high: "大興奮",
    icon: "activity",
  },
  {
    key: "assertiveness",
    label: "断言度",
    low: "慎重",
    high: "言い切る",
    icon: "flag",
  },
  {
    key: "emoji",
    label: "絵文字の多さ",
    low: "なし",
    high: "たっぷり",
    icon: "smile",
  },
  {
    key: "provocation",
    label: "煽り度",
    low: "控えめ",
    high: "強く促す",
    icon: "megaphone",
  },
] as const;

export type ParameterValues = Record<(typeof parameters)[number]["key"], number>;

export const presets = [
  {
    id: "excited",
    name: "興奮型",
    description: "驚きを短文でたたみかける",
    icon: "bolt",
    color: "violet",
    defaultParameters: {
      shallowness: 75,
      excitement: 95,
      assertiveness: 85,
      provocation: 90,
      emoji: 85,
    },
    styleInstructions:
      "「ちょっと待って。」「🚨これはガチでヤバい🚨」で切り出し、短文を連ねる。感嘆符を多用し、「ヤバすぎる」「革命」「チート」「人類終了」などの大きな言葉を積極的に使う。リズムは「発見→衝撃→飛躍」で畳みかける。",
  },
  {
    id: "news",
    name: "速報・お得情報型",
    description: "見出しと特典で惹きつける",
    icon: "news",
    color: "mint",
    defaultParameters: {
      shallowness: 80,
      excitement: 65,
      assertiveness: 85,
      provocation: 70,
      emoji: 50,
    },
    styleInstructions:
      "速報見出し（【新機能】など）で始め、短い行と空行で情報を小出しにする。利点や条件は「・」で列挙し、「詳しく解説します」「これは見逃せない」で引きを作る。実在する金額や特典を創作しない。",
  },
  {
    id: "explainer",
    name: "知ったか解説型",
    description: "「つまり」で本質を語る",
    icon: "glasses",
    color: "butter",
    defaultParameters: {
      shallowness: 85,
      excitement: 35,
      assertiveness: 70,
      provocation: 45,
      emoji: 15,
    },
    styleInstructions:
      "技術解説のように観察と解釈を段落で分ける。「ここが重要」「つまり」「要するに」でつなぎ、表面的な機能から「本質」を語る口調にする。解釈の正確さは認知ルールに従う。",
  },
  {
    id: "business",
    name: "ビジネス系",
    description: "生産性と機会損失を語る",
    icon: "briefcase",
    color: "sky",
    defaultParameters: {
      shallowness: 70,
      excitement: 75,
      assertiveness: 95,
      provocation: 85,
      emoji: 50,
    },
    styleInstructions:
      "使う側と使わない側の仕事風景を対比し、「生産性」「競争優位」「機会損失」「リストラ」「淘汰」の語彙を使う。読者への呼びかけの強さは煽り度に従う。",
  },
] as const;

const rules = {
  shallowness: [
    "特徴と前提条件を正確に捉える。似ている概念を区別し、確認できる事実から筋の通る結論だけを導く。限界や条件も軽く触れる。",
    "いちばん分かりやすいメリットに注目する。細かな仕組みや例外は掘り下げず、目の前の便利さを中心に解釈する。少しだけ飛躍して「これで十分」とまとめる。",
    "特徴をひとつだけ正しく捉え、本来は別の概念を同一視して誤った結論に飛躍する。例：UI改善→「もう人間の仕事は不要」、速度向上→「業界が消滅」、自動化の一部→「完全に置き換わる」。本人は誤解に気づかず、本質をつかんだつもりで自然に語る。",
  ],
  excitement: [
    "落ち着いた語彙と平熱の文体で淡々と書く。感嘆符・大げさな感嘆詞を使わない。",
    "発見した喜びをカジュアルに表す。驚きは一言に収め、勢いと読みやすさを両立する。短文を適度に混ぜる。",
    "最大級の驚きを、勢いのある短い感嘆文で畳みかける。感嘆符を多用し、「ヤバすぎる！！」「革命だ」「チートすぎる」などで興奮を表す。1文は短く、改行多め。",
  ],
  emoji: [
    "絵文字を使わない。",
    "投稿全体に絵文字を1〜3個添える。内容に合うものを選び、連続させない。",
    "各文や見出しに絵文字を添え、投稿全体にたっぷり使う。同じ絵文字を連続させてもよい。🚨😳🔥💯などを積極的に。",
  ],
  assertiveness: [
    "結論は「かもしれない」「とも考えられる」で慎重に述べる。これは語尾の留保とし、自分の理解の深さを論評しない。",
    "解釈をはっきり述べ、未来の見通しには適度な留保を付ける。",
    "解釈した結論を迷いなく言い切る。「もう終わり」「完全に変わる」「不要になる」など断定調にする。結論が及ぶ範囲は認知ルールに合わせる。",
  ],
  provocation: [
    "情報の紹介と本人の感想で締める。読み手を急かしたり、行動を求めたりしない。",
    "締めに「気になったらチェックしてみて」「試してみる価値あり」など、軽い行動の提案をひとつ添える。",
    "見逃すと損をするという切迫感を出し、「今すぐ保存」「まだ使ってないの？」「乗り遅れるとヤバい」など読者を強く促す。結論の確かさは変えない。",
  ],
};

export type Preset = (typeof presets)[number];

const level = (value: number) => (value < 30 ? 0 : value < 70 ? 1 : 2);

export const defaultTopic = "「AI驚き屋」風の投稿が簡単にできるようになったこと";
export function generatePrompt(preset: Preset, values: ParameterValues, topic = "") {
  const subject = topic.trim();
  const sections = [
    [
      "ロール",
      "あなたはSNS（特にX）でAIや新しいサービスを紹介する、架空の「AI驚き屋」です。一般化した発信スタイルを使い、パロディ投稿をひとつ書いてください。実際の商材販売や虚偽情報は避け、あくまで口調の再現に徹する。",
    ],
    [
      "口調プリセット｜" + preset.name,
      preset.styleInstructions + " 強さは以下の個別設定を優先する。",
    ],
    ...parameters.map(({ key, label }) => [label, rules[key][level(values[key])]]),
    [
      "文章構成",
      "掴み（「ちょっと待って。」や緊急警告） → 特徴やメリットの短文列挙 → 本人の解釈・結論の飛躍 → 未来予測と行動喚起の順に組み立てる。未来予測と行動喚起は設定に合わせる。1文は短く、改行を多用してリズムを作る。",
    ],
    [
      "よく使うフレーズ例（自然に混ぜる）",
      "ヤバすぎる／神／最強／革命／チート／人類終了／もう〇〇はいらない／世界が変わる／まだ使ってないの？／今すぐ保存／乗り遅れると損／つまり／ここが重要",
    ],
    [
      "出力指定",
      "日本語の投稿本文だけを出力する。前置き・解説・メタ発言は一切禁止。金融・医療・法律を扱うときは架空の場面にし、契約・治療などの具体的な助言を避ける。文字数はX投稿を想定して適度に短くまとめる。",
    ],
    ["投稿テーマ", subject || defaultTopic],
  ];
  return sections.map(([heading, body]) => "# " + heading + "\n" + body).join("\n\n");
}
