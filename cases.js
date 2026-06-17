/* ======================================================================
 * Core Identity Detective — case data
 * ----------------------------------------------------------------------
 * This file holds ONLY content. No UI logic lives here, so cases can be
 * edited (and eventually grown toward one Fiscal Year = 20 cases) without
 * touching index.html.
 *
 * Field contract (keep deterministic so the renderer stays simple):
 *   id          unique kebab-case string, e.g. "case-001".
 *   difficulty  one of "easy" | "medium" | "hard".
 *   <visible>   every player-visible string is a { en, zh } pair, never bare.
 *   telemetry[].status  one of "normal" | "warning" | "alarming" | "unknown"
 *               (maps to green / yellow / red / gray).
 *   choices[].id  stable string, unique within the case.
 *   answer      must equal exactly one choices[].id, OR the sentinel "none"
 *               which scores every choice as wrong (used for joke / ghost
 *               cases that have no knowable cause). The correct cause is the
 *               label of the matching choice, so it is NOT repeated elsewhere.
 *   actualCause  ONLY for `answer: "none"` cases: a { en, zh } pair naming the
 *               real (unknowable / off-list) cause, since no choice carries it.
 *               Omit it whenever `answer` points to a real choice.
 *   tags        optional array of lowercase-hyphenated strings. Used by the
 *               achievements system to recognize themes (e.g. "not-a-layoff",
 *               "insufficient-telemetry"). Safe to omit; absent = no tags.
 *
 * `cases` is declared at global scope so index.html's main script can read
 * it. Load order in index.html: this file first, then the game script.
 * ==================================================================== */
const cases = [
  {
    id: "case-001",
    difficulty: "easy",
    tags: ["sync", "it-was-the-backend"],
    title: { en: "The Missing Photo", zh: "消失的头像" },
    intro: {
      en: "A coworker's profile photo disappeared overnight.",
      zh: "一位同事的头像一夜之间消失了。",
    },
    telemetry: [
      {
        key: { en: "Alias", zh: "Alias" },
        value: { en: "jdoe", zh: "jdoe" },
        status: "normal",
      },
      {
        key: { en: "Photo", zh: "头像" },
        value: { en: "Missing", zh: "消失" },
        status: "warning",
      },
      {
        key: { en: "Manager", zh: "manager" },
        value: { en: "Present", zh: "存在" },
        status: "normal",
      },
      {
        key: { en: "Groups", zh: "Groups" },
        value: { en: "12", zh: "12" },
        status: "normal",
      },
      {
        key: { en: "Profile", zh: "个人页面" },
        value: { en: "Visible", zh: "可见" },
        status: "normal",
      },
    ],
    choices: [
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
      {
        id: "transfer",
        label: { en: "Internal Transfer", zh: "内部转组" },
      },
      {
        id: "sync_failure",
        label: { en: "Identity Sync Failure", zh: "身份同步炸了" },
      },
      { id: "vacation", label: { en: "Vacation", zh: "休假中" } },
    ],
    answer: "sync_failure",
    explanation: {
      en: "Only the photo is missing. The manager, GAL visibility, and groups are still normal. This is more likely a sync issue than an actual disappearance.",
      zh: "只有头像消失了，manager、地址簿可见性和 Groups 都还正常。看着不像人真没了，更像是同步服务又炸了。",
    },
    resultFlavor: {
      correct: {
        en: "Good catch. You did not over-escalate a profile photo bug into an HR incident.",
        zh: "判断正确。你没有把一个头像 bug 升级成 HR 事件。",
      },
      wrong: {
        en: "The avatar fired, but only because the backend was on fire.",
        zh: "头像确实消失了，但只是因为后端着火了。",
      },
    },
  },
  {
    id: "case-002",
    difficulty: "easy",
    tags: ["transfer", "not-a-layoff"],
    title: { en: "The Quiet Transfer", zh: "平静转组" },
    intro: {
      en: "A coworker's record changed, but nobody announced anything.",
      zh: "一位同事的记录悄悄变了，没人发公告。",
    },
    telemetry: [
      {
        key: { en: "Photo", zh: "头像" },
        value: { en: "Visible", zh: "可见" },
        status: "normal",
      },
      {
        key: { en: "Manager", zh: "manager" },
        value: { en: "Changed", zh: "已变更" },
        status: "warning",
      },
      {
        key: { en: "Title", zh: "Title" },
        value: { en: "Same", zh: "不变" },
        status: "normal",
      },
      {
        key: { en: "Cost Center", zh: "Cost Center" },
        value: { en: "Changed", zh: "已变更" },
        status: "warning",
      },
      {
        key: { en: "Profile", zh: "个人页面" },
        value: { en: "Visible", zh: "可见" },
        status: "normal",
      },
    ],
    choices: [
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
      {
        id: "transfer",
        label: { en: "Internal Transfer", zh: "内部转组" },
      },
      {
        id: "sync_failure",
        label: { en: "Identity Sync Failure", zh: "身份同步炸了" },
      },
      { id: "promotion", label: { en: "Promotion", zh: "升职了" } },
    ],
    answer: "transfer",
    explanation: {
      en: "Manager and cost center changed while the title stayed the same and GAL is still visible. That is the signature of a lateral move, not a departure.",
      zh: "manager 和 Cost Center 变了，但 Title 没变、地址簿还可见。这是平级换组的样子，不是离职。",
    },
    resultFlavor: {
      correct: {
        en: "Calmly read as a transfer. No drama generated.",
        zh: "冷静判断为转组，没有制造 drama。",
      },
      wrong: {
        en: "You wrote a farewell message for someone who just moved two desks over.",
        zh: "你给一个只是挪了个工位的人写了深情的离别赠言。",
      },
    },
  },
  {
    id: "case-003",
    difficulty: "hard",
    tags: ["ghost", "insufficient-telemetry"],
    title: { en: "The Ghost Account", zh: "幽灵账号" },
    intro: {
      en: "An account exists, but every signal points nowhere.",
      zh: "账号是在的，可每个信号都指不到任何地方。",
    },
    telemetry: [
      {
        key: { en: "Photo", zh: "头像" },
        value: { en: "NULL", zh: "NULL" },
        status: "unknown",
      },
      {
        key: { en: "Manager", zh: "manager" },
        value: { en: "NULL", zh: "NULL" },
        status: "unknown",
      },
      {
        key: { en: "Groups", zh: "Groups" },
        value: { en: "0", zh: "0" },
        status: "alarming",
      },
      {
        key: { en: "Profile", zh: "个人页面" },
        value: { en: "Visible", zh: "可见" },
        status: "normal",
      },
      {
        key: { en: "Teams", zh: "Teams" },
        value: { en: "Unknown", zh: "未知" },
        status: "unknown",
      },
    ],
    choices: [
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
      {
        id: "transfer",
        label: { en: "Internal Transfer", zh: "内部转组" },
      },
      {
        id: "sync_failure",
        label: { en: "Identity Sync Failure", zh: "身份同步炸了" },
      },
      {
        id: "contractor",
        label: { en: "Service Account", zh: "服务账号" },
      },
    ],
    answer: "none",
    actualCause: { en: "Nobody knows", zh: "没人知道" },
    explanation: {
      en: "Half the fields are NULL, groups are zero, but GAL is still visible. The evidence is genuinely insufficient. The honest answer is: nobody knows.",
      zh: "一半字段是 NULL，Groups 是 0，但地址簿还可见。证据是真不够，老实说就是：没人知道。",
    },
    resultFlavor: {
      correct: {
        en: "There was no correct answer. The telemetry was insufficient. Whatever you picked, the truth stayed hidden.",
        zh: "这题没有正确答案。数据不足。无论你选什么，真相都还藏着。",
      },
      wrong: {
        en: "There was no correct answer. The telemetry was insufficient. Whatever you picked, the truth stayed hidden.",
        zh: "这题没有正确答案。数据不足。无论你选什么，真相都还藏着。",
      },
    },
  },
  {
    id: "case-004",
    difficulty: "medium",
    tags: ["reorg", "org-chart"],
    title: { en: "Reorg Weather", zh: "组织架构调整" },
    intro: {
      en: "Two managers up the chain changed on the same day.",
      zh: "上报链上两级 manager 在同一天变了。",
    },
    telemetry: [
      {
        key: { en: "Manager", zh: "manager" },
        value: { en: "Changed", zh: "已变更" },
        status: "warning",
      },
      {
        key: { en: "Skip Manager", zh: "skip manager" },
        value: { en: "Changed", zh: "已变更" },
        status: "warning",
      },
      {
        key: { en: "Title", zh: "Title" },
        value: { en: "Same", zh: "不变" },
        status: "normal",
      },
      {
        key: { en: "Groups", zh: "Groups" },
        value: { en: "Normal", zh: "正常" },
        status: "normal",
      },
      {
        key: { en: "Profile", zh: "个人页面" },
        value: { en: "Visible", zh: "可见" },
        status: "normal",
      },
    ],
    choices: [
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
      {
        id: "transfer",
        label: { en: "Internal Transfer", zh: "内部转组" },
      },
      { id: "reorg", label: { en: "Reorg", zh: "组织架构调整" } },
      { id: "promotion", label: { en: "Promotion", zh: "升职了" } },
    ],
    answer: "reorg",
    explanation: {
      en: "Both the manager and skip-level changed at once while title, groups, and GAL stayed put. When the chain shifts above you but your own record is intact, that is reorg weather.",
      zh: "manager 和 skip manager 同时变了，而 Title、Groups、地址簿都没动。当你头顶的汇报链变了、但你自己完好无损，这只是一次重组天气。",
    },
    resultFlavor: {
      correct: {
        en: "You read the weather, not the panic. The org moved; the person did not.",
        zh: "你读的是天气，不是恐慌。动的是组织，不是人。",
      },
      wrong: {
        en: "You filed an HR incident over an org-chart weather change.",
        zh: "你为组织架构变化提了一个事故单给 HR，大家笑了你一个月。",
      },
    },
  },
  {
    id: "case-005",
    difficulty: "medium",
    tags: ["training", "not-a-departure"],
    title: {
      en: "The Three-Day Disappearance",
      zh: "神秘消失的三天",
    },
    intro: {
      en: "A coworker disappeared from normal activities for three business days.",
      zh: "一位同事连着三个工作日没在日常露面。",
    },
    telemetry: [
      {
        key: { en: "Calendar", zh: "日历" },
        value: { en: "Busy for 3 days", zh: "连续三天忙碌" },
        status: "warning",
      },
      {
        key: { en: "Teams Status", zh: "Teams 状态" },
        value: { en: "Mostly Away", zh: "长期离开" },
        status: "warning",
      },
      {
        key: { en: "Lunch Presence", zh: "午饭出勤" },
        value: { en: "Missing", zh: "未出现" },
        status: "warning",
      },
      {
        key: { en: "Org Chart", zh: "组织架构" },
        value: { en: "Unchanged", zh: "无变化" },
        status: "normal",
      },
      {
        key: { en: "Profile", zh: "个人页面" },
        value: { en: "Visible", zh: "可见" },
        status: "normal",
      },
    ],
    choices: [
      {
        id: "job_search",
        label: {
          en: "Interviewing Elsewhere",
          zh: "正在面试",
        },
      },
      {
        id: "layoff",
        label: {
          en: "Layoff Preparation",
          zh: "即将被裁",
        },
      },
      {
        id: "startup",
        label: {
          en: "Leaving for a Startup",
          zh: "准备跳槽创业公司",
        },
      },
      {
        id: "dei_training",
        label: {
          en: "DEI Training",
          zh: "参加 DEI 培训",
        },
      },
    ],
    answer: "dei_training",
    explanation: {
      en: "The employee was attending a three-day DEI training program. The telemetry was accurate. The theory was not.",
      zh: "TA 连着三天去上 DEI 培训。数据没撒谎，是你的脑补太丰富。",
    },
    resultFlavor: {
      correct: {
        en: "Correct. Sometimes a disappearing coworker is simply learning something.",
        zh: "正确。有时候消失的同事真的只是在上课。",
      },
      wrong: {
        en: "BAD END: Built a complete departure theory around a training course.",
        zh: "BAD END：围绕一次培训，你为同事编造了一整套离职故事。",
      },
    },
  },
  {
    id: "case-006",
    difficulty: "medium",
    tags: ["interview", "actually-leaving"],
    title: { en: "The Calendar Tells All", zh: "日历什么都招了" },
    intro: {
      en: "A coworker keeps booking 'Dentist' appointments. Their teeth have never looked better.",
      zh: "一位同事最近频繁预约“看牙”，但是你觉得 TA 的牙齿也没变好。",
    },
    telemetry: [
      {
        key: { en: "Calendar", zh: "日历" },
        value: { en: "Recurring 'Dentist'", zh: "反复出现“看牙”" },
        status: "warning",
      },
      {
        key: { en: "Camera", zh: "摄像头" },
        value: { en: "Always On", zh: "全程开启" },
        status: "warning",
      },
      {
        key: { en: "Attire", zh: "着装" },
        value: { en: "Suddenly Formal", zh: "突然正装" },
        status: "warning",
      },
      {
        key: { en: "LinkedIn", zh: "领英" },
        value: { en: "Open to Work (secret)", zh: "悄悄开了求职意向" },
        status: "alarming",
      },
      {
        key: { en: "Profile", zh: "个人页面" },
        value: { en: "Visible", zh: "可见" },
        status: "normal",
      },
    ],
    choices: [
      { id: "dentist", label: { en: "Genuinely the Dentist", zh: "真的去看牙" } },
      { id: "interview", label: { en: "Interviewing Elsewhere", zh: "在外面面试" } },
      { id: "training", label: { en: "Offsite Training", zh: "外出培训" } },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
    ],
    answer: "interview",
    explanation: {
      en: "Camera always on, suddenly formal, secret 'Open to Work', and a dentist with implausible availability. Nobody has this many dental emergencies. They are interviewing.",
      zh: "摄像头全程开、突然穿正装、偷偷开了求职意向，还有一个空档多得离谱的牙医。没人会有这么多次牙科急诊，这就是在面试。",
    },
    resultFlavor: {
      correct: {
        en: "You read the formal-wear-on-a-Tuesday signal correctly. Wish them luck silently.",
        zh: "你正确读出了“周二穿正装”这个信号。你在心里默默祝 TA 好运。",
      },
      wrong: {
        en: "You believed in the dentist. The dentist was a Zoom link.",
        zh: "你选择相信那真的是牙医。那个牙医其实是个 Zoom 链接。",
      },
    },
  },
  {
    id: "case-007",
    difficulty: "easy",
    tags: ["training", "not-a-departure", "it-was-the-backend"],
    title: { en: "The One-Week Vanishing", zh: "消失整整一周" },
    intro: {
      en: "A coworker dropped off everything for exactly five business days. No goodbye, no reorg.",
      zh: "一位同事正好五个工作日从所有地方消失了。没有告别，你也没听说 reorg。",
    },
    telemetry: [
      {
        key: { en: "Mailbox", zh: "邮箱" },
        value: { en: "Last action: clicked a link", zh: "只是点了个链接" },
        status: "alarming",
      },
      {
        key: { en: "Account Flag", zh: "账号标记" },
        value: { en: "Security Hold", zh: "安全冻结" },
        status: "alarming",
      },
      {
        key: { en: "Calendar", zh: "日历" },
        value: { en: "'Mandatory Training' x5", zh: "“强制培训”连续五天" },
        status: "warning",
      },
      {
        key: { en: "Org Chart", zh: "组织架构" },
        value: { en: "Unchanged", zh: "无变化" },
        status: "normal",
      },
      {
        key: { en: "Profile", zh: "个人页面" },
        value: { en: "Visible", zh: "可见" },
        status: "normal",
      },
    ],
    choices: [
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
      { id: "vacation", label: { en: "Vacation", zh: "休假中" } },
      {
        id: "security_training",
        label: { en: "Phishing-Click Security Training", zh: "钓鱼邮件安全培训" },
      },
      { id: "sabbatical", label: { en: "Sabbatical", zh: "停薪留职" } },
    ],
    answer: "security_training",
    explanation: {
      en: "Mailbox last action was 'clicked a link', the account got a Security Hold, and the calendar reads 'Mandatory Training' for exactly five days. They clicked the test phish. They are in re-education for a week.",
      zh: "邮箱最后操作是“点了个链接”，账号被安全冻结，日历上正好五天“强制培训”。TA 点了那封钓鱼测试邮件，被送去再教育一周。",
    },
    resultFlavor: {
      correct: {
        en: "Correct. The disappearance was a punishment, not a departure. They will be back, humbled.",
        zh: "正确。这次消失是惩罚，不是离职。TA 会回来的，而且变成了网络安全专家。",
      },
      wrong: {
        en: "It was never HR. It was one curious click on a link titled 'URGENT: Your Payslip'.",
        zh: "这从来不是 HR 的事。只是有人好奇地点了一封标题为“紧急：关于你的工资条”的邮件。",
      },
    },
  },
  {
    id: "case-008",
    difficulty: "medium",
    tags: ["startup", "actually-leaving"],
    title: { en: "Leaving for the Rocket Ship", zh: "登上那艘火箭" },
    intro: {
      en: "A coworker is suddenly very excited about 'agentic workflows' and 'pre-seed'.",
      zh: "一位同事突然对“agent 工作流”和“pre-seed”异常兴奋。",
    },
    telemetry: [
      {
        key: { en: "Slack Status", zh: "Slack 状态" },
        value: { en: "🚀 building something", zh: "🚀 在搞点事情" },
        status: "warning",
      },
      {
        key: { en: "Equity Talk", zh: "聊股权频率" },
        value: { en: "Up 400%", zh: "上升 400%" },
        status: "warning",
      },
      {
        key: { en: "Manager", zh: "manager" },
        value: { en: "Present", zh: "存在" },
        status: "normal",
      },
      {
        key: { en: "2-Week Notice", zh: "离职通知" },
        value: { en: "Submitted", zh: "已提交" },
        status: "alarming",
      },
      {
        key: { en: "Profile", zh: "个人页面" },
        value: { en: "Visible (for now)", zh: "可见（暂时）" },
        status: "normal",
      },
    ],
    choices: [
      { id: "reorg", label: { en: "Reorg", zh: "组织架构调整" } },
      { id: "promotion", label: { en: "Promotion", zh: "升职了" } },
      { id: "startup", label: { en: "Leaving for a Startup", zh: "跳槽去创业公司" } },
      { id: "vacation", label: { en: "Vacation", zh: "休假中" } },
    ],
    answer: "startup",
    explanation: {
      en: "Rocket emoji status, a 400% spike in equity talk, and an actual two-week notice on file. This one is not a theory. They are boarding the rocket ship.",
      zh: "火箭 emoji 状态、聊工资和股权的频率涨了 400%、还有一封实打实的离职通知。这次不是猜测，TA 真的要坐火箭了！",
    },
    resultFlavor: {
      correct: {
        en: "Correct. Ask for the referral bonus terms before they leave.",
        zh: "正确。趁 TA 还没走，你赶紧求 TA 能不能带你走。",
      },
      wrong: {
        en: "You called it a vacation. The 'vacation' has a cap table.",
        zh: "你说这是休假。可是这个“休假”，是带股权结构表的。",
      },
    },
  },
  {
    id: "case-009",
    difficulty: "hard",
    tags: ["startup", "title-change", "actually-leaving"],
    title: { en: "Member of Technical Staff", zh: "成为 MTS" },
    intro: {
      en: "A senior coworker's title quietly changed to something both fancier and vaguer.",
      zh: "一位资深同事的 Title 悄悄变了，既更高级又更模糊。",
    },
    telemetry: [
      {
        key: { en: "Title", zh: "Title" },
        value: { en: "→ Member of Technical Staff", zh: "→ Member of Technical Staff" },
        status: "warning",
      },
      {
        key: { en: "Level Field", zh: "职级字段" },
        value: { en: "NULL", zh: "NULL" },
        status: "unknown",
      },
      {
        key: { en: "Cost Center", zh: "Cost Center" },
        value: { en: "New tiny lab", zh: "新成立的小 lab" },
        status: "warning",
      },
      {
        key: { en: "Manager", zh: "manager" },
        value: { en: "Founder", zh: "创始人本人" },
        status: "alarming",
      },
      {
        key: { en: "Profile", zh: "个人页面" },
        value: { en: "Visible", zh: "可见" },
        status: "normal",
      },
    ],
    choices: [
      { id: "promotion", label: { en: "Internal Promotion", zh: "内部升职" } },
      { id: "reorg", label: { en: "Reorg", zh: "组织架构调整" } },
      {
        id: "ai_startup",
        label: { en: "Joined an AI Lab as MTS", zh: "去 AI lab 当 Member of Technical Staff 了" },
      },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
    ],
    answer: "ai_startup",
    explanation: {
      en: "'Member of Technical Staff' with a NULL level, a brand-new tiny lab cost center, and the founder as direct manager. The flat-title-plus-no-level combo is the signature of an AI lab, not a promotion.",
      zh: "Title 是“Member of Technical Staff”、职级字段是 NULL、Cost Center 是个新成立的小 lab、直属 manager 是创始人。扁平 Title 加没有职级，这是 AI lab 的味儿，不是升职。",
    },
    resultFlavor: {
      correct: {
        en: "Correct. 'No levels here, we're all just MTS' is itself a level.",
        zh: "正确。“我们这儿没有职级，大家都是 Member of Technical Staff”，这句话本身就是一种职级。",
      },
      wrong: {
        en: "You read a flat title as a promotion. The org chart had no floor under it.",
        zh: "你把一个扁平 Title 读成了升职，但是那张组织架构图底下什么也没有。",
      },
    },
  },
  {
    id: "case-010",
    difficulty: "hard",
    tags: ["bad-end", "cross-cultural", "joke"],
    title: { en: "Support Your Country", zh: "支持你的国家" },
    intro: {
      en: "During World Cup season, a coworker tried to make friendly small talk. It did not go to plan.",
      zh: "世界杯期间，一位同事想找你友好地寒暄。结果没往 TA 设想的方向走。",
    },
    telemetry: [
      {
        key: { en: "Small Talk Topic", zh: "寒暄话题" },
        value: { en: "World Cup", zh: "世界杯" },
        status: "warning",
      },
      {
        key: { en: "Phrase Detected", zh: "检测到的关键词" },
        value: { en: "'your country'", zh: "“你的国家”" },
        status: "alarming",
      },
      {
        key: { en: "Your Response", zh: "你的回应" },
        value: {
          en: "'Do I look Japanese or Korean to you?'",
          zh: "“我看起来像日本人或者韩国人吗？”",
        },
        status: "alarming",
      },
      {
        key: { en: "Badge", zh: "工牌" },
        value: { en: "Flashing", zh: "一闪一闪" },
        status: "alarming",
      },
      {
        key: { en: "Coworker Status", zh: "同事状态" },
        value: { en: "Panic", zh: "陷入恐慌" },
        status: "alarming",
      },
    ],
    choices: [
      {
        id: "miscommunication",
        label: { en: "Cultural Miscommunication", zh: "跨文化误会" },
      },
      { id: "hr_incident", label: { en: "HR Incident", zh: "HR 事件" } },
      {
        id: "cn_men_football",
        label: { en: "Chinese Men's Football", zh: "中国男足" },
      },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
    ],
    answer: "cn_men_football",
    explanation: {
      en: "There was no safe answer. The real root cause, as always, traces back to Chinese men's football. The telemetry merely recorded the fallout.",
      zh: "这题没有安全答案。真正的 root cause，一如既往，最后都能追溯到中国男足身上。数据只是把余震记了下来。",
    },
    resultFlavor: {
      correct: {
        en: "BAD END: Support Your Country. You found the root cause. Knowing it did not help anyone.",
        zh: "BAD END：支持你的国家。你找到了 root cause，但没能帮到任何人。",
      },
      wrong: {
        en: "BAD END: Support Your Country. You asked an innocent World Cup question. You are still thinking about the reply.",
        zh: "BAD END：支持你的国家。你问了一个无辜的世界杯问题。你至今仍在反思那句回答。",
      },
    },
  },
  {
    id: "case-011",
    difficulty: "easy",
    tags: ["name-change", "it-was-the-backend"],
    title: { en: "The Stranger in the Org Chart", zh: "组织架构里的陌生人" },
    intro: {
      en: "A new name appeared in your team. Same desk, same projects, nobody remembers hiring them.",
      zh: "你的组里冒出一个新名字。同样的工位、同样的项目，但没人记得招过这个人。",
    },
    telemetry: [
      {
        key: { en: "Display Name", zh: "显示名" },
        value: { en: "Changed", zh: "已变更" },
        status: "warning",
      },
      {
        key: { en: "Alias", zh: "Alias" },
        value: { en: "Unchanged", zh: "未变" },
        status: "normal",
      },
      {
        key: { en: "Hire Date", zh: "入职日期" },
        value: { en: "3 years ago", zh: "三年前" },
        status: "normal",
      },
      {
        key: { en: "HR Record", zh: "HR 记录" },
        value: { en: "Legal name update", zh: "法定姓名更新" },
        status: "normal",
      },
      {
        key: { en: "Profile", zh: "个人页面" },
        value: { en: "Visible", zh: "可见" },
        status: "normal",
      },
    ],
    choices: [
      { id: "new_hire", label: { en: "A New Hire", zh: "新来的同事" } },
      { id: "impersonation", label: { en: "Account Takeover", zh: "账号被盗" } },
      { id: "name_change", label: { en: "Legal Name Change", zh: "改了法定姓名" } },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
    ],
    answer: "name_change",
    explanation: {
      en: "Same alias, same desk, same three-year tenure, and an HR record literally labeled 'legal name update'. Nobody new arrived. Someone just changed their name.",
      zh: "Alias 没变、工位没变、入职三年没变，HR 记录上白纸黑字写着“法定姓名更新”。没有新人来，只是有人结婚了。",
    },
    resultFlavor: {
      correct: {
        en: "Correct. The alias never lies. The display name is just a costume.",
        zh: "正确。Alias 从不说谎，显示名只是件外套。",
      },
      wrong: {
        en: "You declared a coworker a stranger. They sit two desks away and remember your birthday.",
        zh: "你把坐在两张桌子外的同事判成了“陌生人”，流程上很完整，人情上很危险。",
      },
    },
  },
  {
    id: "case-012",
    difficulty: "easy",
    tags: ["it-was-the-backend", "sync"],
    title: { en: "Everyone Turned Grey", zh: "所有人都变灰了" },
    intro: {
      en: "This morning every single profile photo in the company became the default grey silhouette.",
      zh: "今天早上，全公司每一个人的头像都变成了默认的灰色小人。",
    },
    telemetry: [
      {
        key: { en: "Affected Users", zh: "受影响用户" },
        value: { en: "All of them", zh: "全部" },
        status: "alarming",
      },
      {
        key: { en: "Org Chart", zh: "组织架构" },
        value: { en: "Unchanged", zh: "无变化" },
        status: "normal",
      },
      {
        key: { en: "Photo Service", zh: "头像服务" },
        value: { en: "503", zh: "503" },
        status: "alarming",
      },
      {
        key: { en: "Your Own Photo", zh: "你自己的头像" },
        value: { en: "Also grey", zh: "也变灰了" },
        status: "warning",
      },
      {
        key: { en: "Profile", zh: "个人页面" },
        value: { en: "Visible", zh: "可见" },
        status: "normal",
      },
    ],
    choices: [
      { id: "mass_layoff", label: { en: "Mass Layoff", zh: "大规模裁员" } },
      { id: "photo_outage", label: { en: "Photo Service Outage", zh: "头像服务挂了" } },
      { id: "reorg", label: { en: "Company-wide Reorg", zh: "全公司重组" } },
      { id: "security_breach", label: { en: "Security Breach", zh: "安全入侵" } },
    ],
    answer: "photo_outage",
    explanation: {
      en: "Everyone is affected, the org chart is intact, the photo service is returning 503, and even your own face is grey. When the whole company breaks at once, it is never the people. It is the backend.",
      zh: "所有人都受影响、组织架构完好、头像服务返回 503、连你自己的脸都灰了。全公司同时坏掉的时候，从来不是人出了问题，是后端。",
    },
    resultFlavor: {
      correct: {
        en: "Correct. When everyone breaks at once, suspect the service, not the staff.",
        zh: "正确。当所有人同时坏掉的时候，要怀疑的是服务，不是同事。",
      },
      wrong: {
        en: "You read a 503 as a layoff. The only thing that got let go was the image CDN.",
        zh: "你把一个 HTTP 503 读成了裁员。唯一被“优化”掉的是图片 CDN。",
      },
    },
  },
  {
    id: "case-013",
    difficulty: "medium",
    tags: ["not-a-departure", "leave"],
    title: { en: "The Long Out-of-Office", zh: "超长的 OOF" },
    intro: {
      en: "A coworker set an out-of-office reply months long and went quiet. The desk is still theirs.",
      zh: "一位同事设了一条长达数月的 OOF 自动回复，然后没了声音。工位还在。",
    },
    telemetry: [
      {
        key: { en: "OOF Reply", zh: "OOF 回复" },
        value: { en: "Active, 4 months", zh: "已开启，四个月" },
        status: "warning",
      },
      {
        key: { en: "Cost Center", zh: "Cost Center" },
        value: { en: "Unchanged", zh: "无变化" },
        status: "normal",
      },
      {
        key: { en: "Manager", zh: "manager" },
        value: { en: "Same", zh: "不变" },
        status: "normal",
      },
      {
        key: { en: "Desk Assignment", zh: "工位分配" },
        value: { en: "Reserved", zh: "保留中" },
        status: "normal",
      },
      {
        key: { en: "Profile", zh: "个人页面" },
        value: { en: "Visible", zh: "可见" },
        status: "normal",
      },
    ],
    choices: [
      { id: "quit", label: { en: "Quietly Quit", zh: "悄悄离职" } },
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
      { id: "leave", label: { en: "Extended Leave", zh: "长假 / 育儿假" } },
      { id: "sabbatical_fired", label: { en: "Fired Mid-Sabbatical", zh: "停薪留职期间被开" } },
    ],
    answer: "leave",
    explanation: {
      en: "Cost center unchanged, manager unchanged, desk reserved, GAL visible, and a multi-month OOF. Everything points to someone who is coming back. This is leave, not a departure.",
      zh: "Cost center 没变、manager 没变、工位保留、地址簿可见，还有一条数月的 OOF。每个信号都指向一个会回来的人。这是休长假，不是离职。",
    },
    resultFlavor: {
      correct: {
        en: "Correct. A reserved desk is a promise that someone is coming back.",
        zh: "正确。一个被保留的工位，是一句“TA 会回来”的承诺。",
      },
      wrong: {
        en: "You wrote them off. They are coming back in spring, well-rested and slightly offended.",
        zh: "你提前给同事写了讣告。可是 TA 春天就回来，精神饱满，而且有点被冒犯。",
      },
    },
  },
  {
    id: "case-014",
    difficulty: "medium",
    tags: ["actually-leaving", "actually-a-layoff"],
    title: { en: "Sometimes It Really Is", zh: "有时候它就是" },
    intro: {
      en: "You have learned to never guess layoff. This time, the signals are different.",
      zh: "你已经学会了永远不猜裁员。但这一次，信号不太一样。",
    },
    telemetry: [
      {
        key: { en: "Profile", zh: "个人页面" },
        value: { en: "Removed", zh: "已移除" },
        status: "alarming",
      },
      {
        key: { en: "Badge Access", zh: "门禁权限" },
        value: { en: "Revoked", zh: "已撤销" },
        status: "alarming",
      },
      {
        key: { en: "Laptop", zh: "笔记本" },
        value: { en: "Return shipped", zh: "已寄回" },
        status: "alarming",
      },
      {
        key: { en: "Mailbox", zh: "邮箱" },
        value: { en: "Auto-reply: severance", zh: "自动回复：补偿事宜" },
        status: "alarming",
      },
      {
        key: { en: "Org Chart", zh: "组织架构" },
        value: { en: "Position closed", zh: "岗位已关闭" },
        status: "alarming",
      },
    ],
    choices: [
      { id: "transfer", label: { en: "Quiet Transfer", zh: "平静转组" } },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
      { id: "leave", label: { en: "Extended Leave", zh: "长假" } },
    ],
    answer: "layoff",
    explanation: {
      en: "GAL removed, badge revoked, laptop returned, severance auto-reply, position closed. Every signal points the same direction. The hardest lesson in this job is that sometimes the obvious answer is the true one.",
      zh: "地址簿移除、门禁撤销、笔记本寄回、补偿自动回复、岗位关闭。每一个信号都指向同一个方向。这份工作最难的一课是：有时候那个显而易见的答案，就是真的。",
    },
    resultFlavor: {
      correct: {
        en: "Correct, and not happy about it. Skepticism is a tool, not a religion.",
        zh: "正确，但你并不开心。有些时候知道了太多会让你不幸福。",
      },
      wrong: {
        en: "You out-clevered yourself. Five red signals lined up and you called it a sync bug.",
        zh: "你聪明过了头，五个红色信号排成一排，你却说这是同步 bug。",
      },
    },
  },
  {
    id: "case-015",
    difficulty: "medium",
    tags: ["promotion", "title-change"],
    title: { en: "Suddenly Has Reports", zh: "突然有了下属" },
    intro: {
      en: "A coworker's name now has a little expand arrow next to it in the org chart.",
      zh: "一位同事的名字旁边，在组织架构里突然多了个展开箭头。",
    },
    telemetry: [
      {
        key: { en: "Direct Reports", zh: "直属下属" },
        value: { en: "0 → 4", zh: "0 → 4" },
        status: "warning",
      },
      {
        key: { en: "Their Manager", zh: "TA 的 manager" },
        value: { en: "Unchanged", zh: "不变" },
        status: "normal",
      },
      {
        key: { en: "Title", zh: "Title" },
        value: { en: "+ Manager", zh: "+ manager" },
        status: "warning",
      },
      {
        key: { en: "Cost Center", zh: "Cost Center" },
        value: { en: "Same", zh: "不变" },
        status: "normal",
      },
      {
        key: { en: "Profile", zh: "个人页面" },
        value: { en: "Visible", zh: "可见" },
        status: "normal",
      },
    ],
    choices: [
      { id: "reorg", label: { en: "Reorg", zh: "组织架构调整" } },
      { id: "transfer", label: { en: "Transfer", zh: "转组" } },
      { id: "became_manager", label: { en: "Promoted to Manager", zh: "升职 manager" } },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
    ],
    answer: "became_manager",
    explanation: {
      en: "Their own manager is unchanged, cost center is the same, but four reports appeared under them and the title gained 'Manager'. They did not move. People moved under them.",
      zh: "TA 自己的 manager 没变、Cost Center 没变，但下面挂了四个人，Title 多了“Manager”。TA 没有动，是有人被挪到了 TA 下面。",
    },
    resultFlavor: {
      correct: {
        en: "Correct. The expand arrow is the tell. They are someone's boss now.",
        zh: "正确。TA 现在是别人的老板了。",
      },
      wrong: {
        en: "You missed the four people who appeared under their name. They noticed.",
        zh: "你没注意到 TA 名下突然多出来的四个人，但那四个人注意到了。",
      },
    },
  },
  {
    id: "case-016",
    difficulty: "hard",
    tags: ["insufficient-telemetry", "ghost"],
    title: { en: "The Account That Was Always There", zh: "一直都在的账号" },
    intro: {
      en: "A service account starts showing up in human meeting invites. It has no manager and no face.",
      zh: "一个服务账号开始出现在真人的会议邀请里。它没有 manager，也没有脸。",
    },
    telemetry: [
      {
        key: { en: "Account Type", zh: "账号类型" },
        value: { en: "Service (?)", zh: "服务账号（？）" },
        status: "unknown",
      },
      {
        key: { en: "Manager", zh: "manager" },
        value: { en: "NULL", zh: "NULL" },
        status: "unknown",
      },
      {
        key: { en: "Meeting Invites", zh: "会议邀请" },
        value: { en: "Now included", zh: "已被拉进" },
        status: "warning",
      },
      {
        key: { en: "Last Password Set", zh: "上次设置密码" },
        value: { en: "Never", zh: "从未" },
        status: "unknown",
      },
      {
        key: { en: "Profile", zh: "个人页面" },
        value: { en: "Hidden", zh: "隐藏" },
        status: "unknown",
      },
    ],
    choices: [
      { id: "new_hire", label: { en: "Misclassified New Hire", zh: "被错分类的新人" } },
      { id: "bot", label: { en: "A Bot Someone Added", zh: "有人加进来的 Bot" } },
      { id: "breach", label: { en: "Compromised Account", zh: "被攻击的账号" } },
      { id: "contractor", label: { en: "Contractor", zh: "外包" } },
    ],
    answer: "none",
    actualCause: { en: "Insufficient Telemetry", zh: "数据不足" },
    explanation: {
      en: "Type is a question mark, manager is NULL, password was never set, GAL is hidden. Every field that could identify this account is empty. You cannot conclude what it is. The honest answer is: not enough data.",
      zh: "类型是个问号、manager 是 NULL、密码从未设置、地址簿隐藏。每一个能识别它的字段都是空的。你根本断不出它是什么。老实说：数据不够。",
    },
    resultFlavor: {
      correct: {
        en: "Correct. 'I don't know' is a valid finding when every field is empty.",
        zh: "正确。当每个字段都是空的，“我不知道”就是一个合格的结论。",
      },
      wrong: {
        en: "You named a thing that gave you nothing to name it by. Confidence is not evidence.",
        zh: "你简直是在乱猜，自信不等于证据。",
      },
    },
  },
  {
    id: "case-017",
    difficulty: "hard",
    tags: ["reorg", "org-chart"],
    title: { en: "The Whole Tree Moved", zh: "整棵树都挪了" },
    intro: {
      en: "Your coworker's manager changed. So did their manager's manager. So did three levels up.",
      zh: "你同事的 manager 变了。TA 的 manager 的 manager 也变了。往上三层全变了。",
    },
    telemetry: [
      {
        key: { en: "Manager", zh: "manager" },
        value: { en: "Changed", zh: "已变更" },
        status: "warning",
      },
      {
        key: { en: "Skip Manager", zh: "skip manager" },
        value: { en: "Changed", zh: "已变更" },
        status: "warning",
      },
      {
        key: { en: "Skip-Skip Manager", zh: "skip-skip manager" },
        value: { en: "Changed", zh: "已变更" },
        status: "warning",
      },
      {
        key: { en: "Title", zh: "Title" },
        value: { en: "Same", zh: "不变" },
        status: "normal",
      },
      {
        key: { en: "Headcount", zh: "团队人数" },
        value: { en: "Same", zh: "不变" },
        status: "normal",
      },
    ],
    choices: [
      { id: "promotion", label: { en: "Promotion", zh: "升职了" } },
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
      { id: "reorg", label: { en: "Org Reorg", zh: "组织架构调整" } },
      { id: "transfer", label: { en: "Personal Transfer", zh: "个人转组" } },
    ],
    answer: "reorg",
    explanation: {
      en: "Three levels of management changed at once, but the title and headcount stayed the same. A single person did not move. The whole branch was repotted. That is a reorg.",
      zh: "连着三层管理层同时变了，但 Title 和人数没变。不是一个人动了，是整根树被换了花盆。这是组织架构调整。",
    },
    resultFlavor: {
      correct: {
        en: "Correct. When three levels move together, nobody chose it. Weather, not decision.",
        zh: "正确。当三层一起动，没人是自己选的。这是大环境，不是决定。",
      },
      wrong: {
        en: "You read a tectonic shift as a personal move. Whole continents drifted; one person did not.",
        zh: "你把一次板块运动理解成了个人选择。漂移的是整块大陆，不是某一个人。",
      },
    },
  },
  {
    id: "case-018",
    difficulty: "medium",
    tags: ["title-change", "it-was-the-backend"],
    title: { en: "Title: undefined", zh: "Title：undefined" },
    intro: {
      en: "A respected senior engineer's title now literally reads 'undefined' across every tool.",
      zh: "一位受人尊敬的资深工程师，TA 的 Title 现在在所有工具里都写着“undefined”。",
    },
    telemetry: [
      {
        key: { en: "Title", zh: "Title" },
        value: { en: "undefined", zh: "undefined" },
        status: "alarming",
      },
      {
        key: { en: "Level", zh: "职级" },
        value: { en: "Unchanged (high)", zh: "未变（很高）" },
        status: "normal",
      },
      {
        key: { en: "Recent HR Edit", zh: "近期 HR 修改" },
        value: { en: "Title field, yesterday", zh: "Title 字段，昨天" },
        status: "warning",
      },
      {
        key: { en: "Other Fields", zh: "其它字段" },
        value: { en: "All normal", zh: "全部正常" },
        status: "normal",
      },
      {
        key: { en: "Profile", zh: "个人页面" },
        value: { en: "Visible", zh: "可见" },
        status: "normal",
      },
    ],
    choices: [
      { id: "demotion", label: { en: "Secret Demotion", zh: "暗中降级" } },
      { id: "data_bug", label: { en: "Title Field Data Bug", zh: "Title 字段数据 bug" } },
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
      { id: "promotion", label: { en: "Promotion In Progress", zh: "升职流程中" } },
    ],
    answer: "data_bug",
    explanation: {
      en: "The level is unchanged and high, every other field is normal, and HR edited just the title field yesterday. A literal 'undefined' is a serialization bug, not a career event. Someone pushed a null into a string field.",
      zh: "职级没变而且很高、其它字段全正常、HR 昨天只动了 Title 字段。一个字面意义的“undefined”是序列化 bug，不是职业事件。有人把一个 null 塞进了字符串字段。",
    },
    resultFlavor: {
      correct: {
        en: "Correct. 'undefined' is JavaScript leaking, not a demotion.",
        zh: "正确。'undefined' 是 JavaScript 漏了出来，不是降级。",
      },
      wrong: {
        en: "You read a null pointer as a career crisis. The only thing undefined was the data.",
        zh: "你把一个空指针读成了职业危机。唯一 undefined 的是那条数据。",
      },
    },
  },
  {
    id: "case-019",
    difficulty: "hard",
    tags: ["interview", "actually-leaving"],
    title: { en: "The Counteroffer", zh: "挽留 offer" },
    intro: {
      en: "A coworker who was clearly interviewing suddenly stopped, then got a raise. Or did they leave?",
      zh: "一位明显在面试的同事，突然不面了，然后涨薪了。还是说，TA 其实走了？",
    },
    telemetry: [
      {
        key: { en: "Interview Signals", zh: "面试信号" },
        value: { en: "Dropped to zero", zh: "归零" },
        status: "normal",
      },
      {
        key: { en: "Comp Ratio", zh: "薪资比例" },
        value: { en: "Adjusted up", zh: "上调" },
        status: "warning",
      },
      {
        key: { en: "Manager", zh: "manager" },
        value: { en: "Same", zh: "不变" },
        status: "normal",
      },
      {
        key: { en: "Profile", zh: "个人页面" },
        value: { en: "Visible", zh: "可见" },
        status: "normal",
      },
      {
        key: { en: "Retention Note", zh: "保留备注" },
        value: { en: "HR: counteroffer accepted", zh: "已接受挽留" },
        status: "normal",
      },
    ],
    choices: [
      { id: "left", label: { en: "Left for the Other Job", zh: "去了那份新工作" } },
      { id: "counteroffer", label: { en: "Accepted a Counteroffer", zh: "接受了挽留 offer" } },
      { id: "promotion", label: { en: "Regular Promotion", zh: "正常升职" } },
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
    ],
    answer: "counteroffer",
    explanation: {
      en: "Interview signals dropped to zero, comp was adjusted up, manager unchanged, GAL visible, and HR literally noted 'counteroffer accepted'. They were leaving, then they weren't. The company paid to keep them.",
      zh: "面试信号归零、薪资上调、manager 没变、地址簿可见，HR 备注白纸黑字写着“已接受挽留”。TA 本来要走，后来没走。公司花钱把 TA 留下了。",
    },
    resultFlavor: {
      correct: {
        en: "Correct. The raise was a leash, and it worked. For now.",
        zh: "正确。那笔涨薪暂时奏效了。",
      },
      wrong: {
        en: "You buried someone who is still at their desk, now slightly richer and slightly bored.",
        zh: "你埋葬了一个还坐在工位上的人。TA 现在钱多了一点，也寂寞了一点。",
      },
    },
  },
  {
    id: "case-020",
    difficulty: "hard",
    tags: ["bad-end", "joke", "it-was-the-backend"],
    title: { en: "It Was DNS", zh: "是 DNS 的锅" },
    intro: {
      en: "Photos gone, names scrambled, org chart frozen, everyone offline. You have seen every symptom in this game at once.",
      zh: "头像没了、名字乱了、组织架构冻住、所有人离线。你在这个鱿鱼游戏里见过的所有症状，此刻同时出现了。",
    },
    telemetry: [
      {
        key: { en: "Photo Service", zh: "头像服务" },
        value: { en: "Down", zh: "宕机" },
        status: "alarming",
      },
      {
        key: { en: "Profile", zh: "个人页面" },
        value: { en: "Unreachable", zh: "无法连接" },
        status: "alarming",
      },
      {
        key: { en: "Org Chart API", zh: "组织架构 API" },
        value: { en: "Timeout", zh: "超时" },
        status: "alarming",
      },
      {
        key: { en: "Everything Else", zh: "其它一切" },
        value: { en: "Also timeout", zh: "也超时" },
        status: "alarming",
      },
      {
        key: { en: "Last Change", zh: "最后变更" },
        value: { en: "A DNS record", zh: "一条 DNS 记录" },
        status: "warning",
      },
    ],
    choices: [
      { id: "mass_layoff", label: { en: "Apocalyptic Layoff", zh: "世界末日级裁员" } },
      { id: "breach", label: { en: "Total Security Breach", zh: "全面安全入侵" } },
      { id: "dns", label: { en: "It Was DNS", zh: "是 DNS 的问题" } },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
    ],
    answer: "dns",
    explanation: {
      en: "Every service timing out at once, and the last change was a single DNS record. It is always DNS. It has always been DNS. It will always be DNS.",
      zh: "所有服务同时超时，而最后一次变更是一条 DNS 记录。永远是 DNS，一直都是 DNS，将来也永远会是 DNS。",
    },
    resultFlavor: {
      correct: {
        en: "Correct. The graduation certificate of every on-call engineer: it was DNS.",
        zh: "正确。每一个 on-call 工程师的毕业证书上都写着：是 DNS 的问题。",
      },
      wrong: {
        en: "BAD END: It was DNS. It is always DNS. You will remember this next time. You will not.",
        zh: "BAD END：是 DNS 的错，总是 DNS 的错。你下次会记住吗？你不会的。",
      },
    },
  },
  {
    id: "case-021",
    difficulty: "medium",
    tags: ["it-was-the-backend", "sync"],
    title: { en: "Two People, One Record", zh: "两个人，一条记录" },
    intro: {
      en: "A coworker's profile now shows two job titles, two phone numbers, and two birthdays.",
      zh: "一位同事的页面现在显示两个职位、两个电话、两个生日。",
    },
    telemetry: [
      { key: { en: "Display Name", zh: "显示名" }, value: { en: "Correct", zh: "正确" }, status: "normal" },
      { key: { en: "Job Title", zh: "职位" }, value: { en: "Two values", zh: "两个值" }, status: "alarming" },
      { key: { en: "Phone", zh: "电话" }, value: { en: "Two values", zh: "两个值" }, status: "alarming" },
      { key: { en: "Namesake in GAL", zh: "地址簿同名者" }, value: { en: "Exists", zh: "存在" }, status: "warning" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "promotion", label: { en: "Dual Role / Promotion", zh: "身兼两职 / 升职" } },
      { id: "merge_bug", label: { en: "Two Records Merged", zh: "两条记录被合并" } },
      { id: "impersonation", label: { en: "Account Takeover", zh: "账号被盗" } },
      { id: "transfer", label: { en: "Transfer", zh: "转组" } },
    ],
    answer: "merge_bug",
    explanation: {
      en: "There is a namesake in the GAL, and every duplicated field is exactly two values. The directory merged two different humans into one record. Nobody got promoted; a join got the key wrong.",
      zh: "地址簿里有一个同名者，而每个重复字段都正好是两个值。目录把两个不同的人合并成了一条记录。没人升职，是某个 join 用错了 key。",
    },
    resultFlavor: {
      correct: { en: "Correct. One record, two souls. Classic primary-key collision.", zh: "正确。一条记录，两个灵魂，经典的主键撞车。" },
      wrong: { en: "You promoted a database bug. It will not thank you.", zh: "你给一个数据库 bug 发了升职。它不会感谢你的。" },
    },
  },
  {
    id: "case-022",
    difficulty: "easy",
    tags: ["it-was-the-backend"],
    title: { en: "The Sideways Face", zh: "歪掉的脸" },
    intro: {
      en: "A coworker's photo is suddenly rotated 90 degrees. They look very relaxed about it.",
      zh: "一位同事的头像突然旋转了 90 度。照片里的 TA 看起来毫不在意。",
    },
    telemetry: [
      { key: { en: "Photo", zh: "头像" }, value: { en: "Rotated 90°", zh: "旋转 90°" }, status: "warning" },
      { key: { en: "Upload Time", zh: "上传时间" }, value: { en: "This morning", zh: "今早" }, status: "normal" },
      { key: { en: "EXIF Orientation", zh: "EXIF 方向" }, value: { en: "Ignored", zh: "被忽略" }, status: "warning" },
      { key: { en: "Everything Else", zh: "其它一切" }, value: { en: "Normal", zh: "正常" }, status: "normal" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "layoff", label: { en: "Something's Wrong (Layoff?)", zh: "出事了（裁员？）" } },
      { id: "exif_bug", label: { en: "EXIF Orientation Bug", zh: "EXIF 方向 bug" } },
      { id: "prank", label: { en: "A Prank", zh: "有人恶搞" } },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
    ],
    answer: "exif_bug",
    explanation: {
      en: "Fresh upload this morning, EXIF orientation flag ignored, everything else normal. The phone tagged the photo as rotated and the viewer did not honor it. It is a pixel problem, not a people problem.",
      zh: "手机给照片打了旋转标记，而显示端没遵守。这是 EXIF 问题，不是人的问题。",
    },
    resultFlavor: {
      correct: { en: "Correct. Tilt your head, not your conclusions.", zh: "正确。该歪的是你的头，不是你的结论。" },
      wrong: { en: "You read a rotated JPEG as a career event. Turn the photo, not the org chart.", zh: "你把一张旋转的 JPEG 读成了职业事件。该转的是照片，不是组织架构。" },
    },
  },
  {
    id: "case-023",
    difficulty: "easy",
    tags: ["it-was-the-backend"],
    title: { en: "Born in 1970", zh: "生于 1970" },
    intro: {
      en: "A coworker's hire date now reads January 1, 1970. They do not look 56 years tenured.",
      zh: "一位同事的入职日期现在显示 1970 年 1 月 1 日，可是该同事看起来没有 56 年工龄。",
    },
    telemetry: [
      { key: { en: "Hire Date", zh: "入职日期" }, value: { en: "1970-01-01", zh: "1970-01-01" }, status: "warning" },
      { key: { en: "Tenure Badge", zh: "工龄徽章" }, value: { en: "56 years", zh: "56 年" }, status: "alarming" },
      { key: { en: "Manager", zh: "manager" }, value: { en: "Same", zh: "不变" }, status: "normal" },
      { key: { en: "Other Dates", zh: "其它日期" }, value: { en: "Also reset", zh: "也被重置" }, status: "warning" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "veteran", label: { en: "A True Veteran", zh: "真·元老" } },
      { id: "epoch_bug", label: { en: "Unix Epoch Null Date", zh: "Unix 纪元空日期" } },
      { id: "rehire", label: { en: "Rehired Employee", zh: "返聘员工" } },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
    ],
    answer: "epoch_bug",
    explanation: {
      en: "1970-01-01 is timestamp zero. Several date fields reset together. A null date got rendered as the Unix epoch. Nobody has 56 years of tenure; somebody has a NULL.",
      zh: "1970-01-01 是时间戳 0。好几个日期字段一起被重置。一个空日期被渲染成了 Unix 纪元。没人有 56 年工龄，只是有人是 NULL。",
    },
    resultFlavor: {
      correct: { en: "Correct. The epoch claims another victim.", zh: "正确。epoch 又收割了一名受害者。" },
      wrong: { en: "You gave a NULL a 56-year service award. Hope it likes the watch.", zh: "你给一个 NULL 颁了 56 年服务奖，希望它喜欢那块水晶纪念碑。" },
    },
  },
  {
    id: "case-024",
    difficulty: "hard",
    tags: ["it-was-the-backend", "org-chart"],
    title: { en: "The Manager Loop", zh: "manager 闭环" },
    intro: {
      en: "A reports to B. B reports to A. The org chart has eaten its own tail.",
      zh: "A 向 B 汇报，B 向 A 汇报。组织架构图咬住了自己的尾巴。",
    },
    telemetry: [
      { key: { en: "A's Manager", zh: "A 的 manager" }, value: { en: "B", zh: "B" }, status: "warning" },
      { key: { en: "B's Manager", zh: "B 的 manager" }, value: { en: "A", zh: "A" }, status: "alarming" },
      { key: { en: "Org Tree Render", zh: "组织树渲染" }, value: { en: "Stack overflow", zh: "栈溢出" }, status: "alarming" },
      { key: { en: "Recent Import", zh: "近期导入" }, value: { en: "HR feed, last night", zh: "HR 数据，昨晚" }, status: "warning" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Both visible", zh: "两人都可见" }, status: "normal" },
    ],
    choices: [
      { id: "copilot_promo", label: { en: "Co-Leadership Setup", zh: "双负责人结构" } },
      { id: "cycle_bug", label: { en: "Import Created a Cycle", zh: "导入造成环引用" } },
      { id: "reorg", label: { en: "Reorg In Progress", zh: "重组进行中" } },
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
    ],
    answer: "cycle_bug",
    explanation: {
      en: "A reports to B and B reports to A, the tree renderer hit a stack overflow, and an HR feed imported last night. A real org chart is a tree, not a loop. The import wrote a cycle.",
      zh: "A 向 B 汇报、B 向 A 汇报、组织树渲染栈溢出、昨晚刚导入 HR 数据。真实的组织架构是一棵树，不是一个环。是导入写出了循环引用。",
    },
    resultFlavor: {
      correct: { en: "Correct. Trees do not have loops. Bad imports do.", zh: "正确。树没有环，导入才有。" },
      wrong: { en: "You theorized co-leadership from a stack overflow. The only thing leading here is to infinity.", zh: "你从一个栈溢出里推出了斜线汇报和共同管理。这里唯一通向的是无穷大。" },
    },
  },
  {
    id: "case-025",
    difficulty: "medium",
    tags: ["it-was-the-backend", "sync"],
    title: { en: "Seen Twice", zh: "出现了两次" },
    intro: {
      en: "A coworker appears twice in the GAL. Same face, same alias, two entries.",
      zh: "一位同事在地址簿里出现了两次。同一张脸、同一个 alias、两个条目。",
    },
    telemetry: [
      { key: { en: "GAL Entries", zh: "地址簿条目" }, value: { en: "2 (identical)", zh: "2 个（相同）" }, status: "warning" },
      { key: { en: "Alias", zh: "Alias" }, value: { en: "Same on both", zh: "两个相同" }, status: "alarming" },
      { key: { en: "One Entry Status", zh: "其中一条状态" }, value: { en: "Stale", zh: "陈旧" }, status: "warning" },
      { key: { en: "Manager", zh: "manager" }, value: { en: "Same", zh: "不变" }, status: "normal" },
      { key: { en: "Org Chart", zh: "组织架构" }, value: { en: "Single node", zh: "单个节点" }, status: "normal" },
    ],
    choices: [
      { id: "twin", label: { en: "Secret Twin", zh: "隐藏的双胞胎" } },
      { id: "dedup_bug", label: { en: "Failed Deduplication", zh: "去重失败" } },
      { id: "rehire", label: { en: "Rehired With New Account", zh: "返聘开了新账号" } },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
    ],
    answer: "dedup_bug",
    explanation: {
      en: "Same alias on both entries, one marked stale, org chart still shows a single node. The directory failed to dedupe an old and new copy of the same person. One human, two rows.",
      zh: "两条都是同一个 alias、其中一条标记为陈旧、组织架构仍是单个节点。目录没能把同一个人的新旧两份合并去重。一个人，两行。",
    },
    resultFlavor: {
      correct: { en: "Correct. DISTINCT was on vacation.", zh: "正确。DISTINCT 那天休假了。" },
      wrong: { en: "You invented a twin. The only twin here is a stale row.", zh: "你编出了一个双胞胎，这里唯一的双胞胎是两条陈旧记录。" },
    },
  },
  {
    id: "case-026",
    difficulty: "easy",
    tags: ["not-a-departure"],
    title: { en: "The Empty Week", zh: "空白的一周" },
    intro: {
      en: "Your coworker, and everyone near them, has a fully blocked calendar next week.",
      zh: "你的同事，以及 TA 身边所有人，下周的日历都被整块占满了。",
    },
    telemetry: [
      { key: { en: "Calendar", zh: "日历" }, value: { en: "Blocked, whole team", zh: "整组屏蔽" }, status: "warning" },
      { key: { en: "Event Title", zh: "事件标题" }, value: { en: "'Team Offsite'", zh: "“团队 Offsite”" }, status: "normal" },
      { key: { en: "Location", zh: "地点" }, value: { en: "A hotel", zh: "某酒店" }, status: "normal" },
      { key: { en: "Org Chart", zh: "组织架构" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "mass_layoff", label: { en: "Team Layoff", zh: "整组裁员" } },
      { id: "offsite", label: { en: "Team Offsite", zh: "团队团建" } },
      { id: "reorg", label: { en: "Reorg", zh: "重组" } },
      { id: "training", label: { en: "Training", zh: "培训" } },
    ],
    answer: "offsite",
    explanation: {
      en: "The whole team is blocked, the event literally says 'Team Offsite' at a hotel, and the org chart is unchanged. Nobody is leaving. Everybody is going to do trust falls.",
      zh: "整组都被屏蔽、事件白纸黑字写着在酒店的“团队 Offsite”、组织架构没变。没人要走，大家只是要去玩信任背摔。",
    },
    resultFlavor: {
      correct: { en: "Correct. The only thing at risk is the icebreaker budget.", zh: "正确。唯一有风险的是 icebreaker 的预算。" },
      wrong: { en: "You read a team-building trip as a bloodbath. They are doing kayaking.", zh: "你把一次团建读成了大屠杀，其实人家在划皮划艇。" },
    },
  },
  {
    id: "case-027",
    difficulty: "medium",
    tags: ["not-a-departure", "leave"],
    title: { en: "Maternity Cover", zh: "产假顶岗" },
    intro: {
      en: "A new name appears doing your coworker's exact job. Your coworker is nowhere to be seen.",
      zh: "一个新名字出现了，干着你同事一模一样的活。而你的同事不见了踪影。",
    },
    telemetry: [
      { key: { en: "New Person's Title", zh: "新人的 Title" }, value: { en: "X (maternity cover)", zh: "X（产假顶岗）" }, status: "warning" },
      { key: { en: "Original Person", zh: "原同事" }, value: { en: "Still in GAL", zh: "仍在地址簿" }, status: "normal" },
      { key: { en: "Original's Desk", zh: "原同事工位" }, value: { en: "Reserved", zh: "保留" }, status: "normal" },
      { key: { en: "Cost Center", zh: "Cost Center" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Both visible", zh: "两人都可见" }, status: "normal" },
    ],
    choices: [
      { id: "replaced", label: { en: "Quietly Replaced", zh: "被悄悄换掉了" } },
      { id: "mat_cover", label: { en: "Someone Covering Leave", zh: "有人在顶替休假" } },
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
      { id: "transfer", label: { en: "Transfer", zh: "转组" } },
    ],
    answer: "mat_cover",
    explanation: {
      en: "The new person's title literally says 'maternity cover', the original is still in the GAL with a reserved desk, and the cost center is unchanged. They were not replaced. Someone is keeping the seat warm.",
      zh: "新人的 Title 白纸黑字写着“产假顶岗”、原同事仍在地址簿且工位保留、cost center 没变。TA 没被换掉，只是有人在帮 TA 暖座位。",
    },
    resultFlavor: {
      correct: { en: "Correct. Read the title suffix before writing the eulogy.", zh: "写悼词之前先读一下 Title 后缀。" },
      wrong: { en: "You replaced someone who is coming back in three months, well-rested.", zh: "你把一个三个月后就精神饱满回来的人给替换了？！" },
    },
  },
  {
    id: "case-028",
    difficulty: "easy",
    tags: ["not-a-departure", "it-was-the-backend"],
    title: { en: "Forever Presenting", zh: "永远在演示" },
    intro: {
      en: "A coworker's Teams status has said 'Presenting' for nine straight days.",
      zh: "一位同事的 Teams 状态已经连续九天显示“正在演示”。",
    },
    telemetry: [
      { key: { en: "Teams Status", zh: "Teams 状态" }, value: { en: "Presenting (9 days)", zh: "正在演示（9 天）" }, status: "warning" },
      { key: { en: "Actual Meetings", zh: "实际会议" }, value: { en: "None ongoing", zh: "没有在进行" }, status: "normal" },
      { key: { en: "Messages", zh: "消息" }, value: { en: "Replying normally", zh: "正常回复" }, status: "normal" },
      { key: { en: "Org Chart", zh: "组织架构" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "busy_leaving", label: { en: "Too Busy, About to Quit", zh: "忙到要离职" } },
      { id: "stuck_status", label: { en: "Stuck Presence Status", zh: "状态卡住了" } },
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
      { id: "leave", label: { en: "On Leave", zh: "休假中" } },
    ],
    answer: "stuck_status",
    explanation: {
      en: "Nine days of 'Presenting' with no ongoing meetings, while they reply to messages normally. Nobody presents for nine days. The presence flag got stuck after a screen share never cleanly ended.",
      zh: "连续九天“正在演示”却没有任何在进行的会议，同时消息照常回复。没人能演示九天。是一次屏幕共享没干净结束，状态标记卡住了。",
    },
    resultFlavor: {
      correct: { en: "Correct. The status lied. The human is fine.", zh: "正确。状态在撒谎，TA 人好得很。" },
      wrong: { en: "You read a stuck flag as a resignation. They were eating lunch the whole time.", zh: "你把一个卡住的标记读成了辞职。人家这九天一直在坚持吃午饭。" },
    },
  },
  {
    id: "case-029",
    difficulty: "medium",
    tags: ["not-a-departure"],
    title: { en: "All Caps, Instant Replies", zh: "全大写，秒回" },
    intro: {
      en: "A normally calm coworker is suddenly typing in ALL CAPS and replying within seconds, day and night.",
      zh: "一位平时很冷静的同事突然开始全大写打字，而且不分昼夜地秒回。",
    },
    telemetry: [
      { key: { en: "Message Style", zh: "消息风格" }, value: { en: "ALL CAPS", zh: "全大写" }, status: "warning" },
      { key: { en: "Reply Latency", zh: "回复延迟" }, value: { en: "< 5s, 24h", zh: "< 5 秒，全天" }, status: "warning" },
      { key: { en: "Calendar", zh: "日历" }, value: { en: "'On-Call' this week", zh: "本周“On-Call”" }, status: "normal" },
      { key: { en: "Org Chart", zh: "组织架构" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "breakdown", label: { en: "Stress, About to Quit", zh: "压力崩溃要离职" } },
      { id: "oncall", label: { en: "On-Call Rotation", zh: "在 On-Call" } },
      { id: "hacked", label: { en: "Account Hacked", zh: "账号被黑" } },
      { id: "promotion", label: { en: "Promotion", zh: "升职了" } },
    ],
    answer: "oncall",
    explanation: {
      en: "Their calendar says 'On-Call' this week, replies are instant around the clock, and the org chart is unchanged. They are not breaking down. They are paging-duty awake at 3am, typing fast in the dark.",
      zh: "日历显示本周“On-Call”、回复全天候秒回、组织架构没变。TA 不是崩溃了，是被事故逼到凌晨三点还醒着，在黑暗里飞快打字。",
    },
    resultFlavor: {
      correct: { en: "Correct. That is not panic, that is a pager.", zh: "正确。那不是恐慌，那是个事故。" },
      wrong: { en: "You diagnosed burnout. It was a rotation. Bring them coffee.", zh: "你诊断成了倦怠。其实是 oncall。给 TA 递杯咖啡吧。" },
    },
  },
  {
    id: "case-030",
    difficulty: "medium",
    tags: ["not-a-departure", "leave"],
    title: { en: "Reply To Someone Else", zh: "请联系另一个人" },
    intro: {
      en: "A coworker's auto-reply now redirects everything to a colleague you have never heard of.",
      zh: "一位同事的自动回复现在把所有事都转给一个你从没听过的同事。",
    },
    telemetry: [
      { key: { en: "Auto-Reply", zh: "自动回复" }, value: { en: "Contact: another person", zh: "请联系：另一个人" }, status: "warning" },
      { key: { en: "Duration", zh: "时长" }, value: { en: "6 months", zh: "六个月" }, status: "warning" },
      { key: { en: "Cost Center", zh: "Cost Center" }, value: { en: "Temporarily moved", zh: "临时调动" }, status: "warning" },
      { key: { en: "Return Date", zh: "返回日期" }, value: { en: "Set", zh: "已设定" }, status: "normal" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "quit", label: { en: "Quit", zh: "离职了" } },
      { id: "secondment", label: { en: "Secondment / Loan", zh: "借调 / 外派" } },
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
      { id: "transfer", label: { en: "Permanent Transfer", zh: "永久转组" } },
    ],
    answer: "secondment",
    explanation: {
      en: "A six-month redirect, a temporary cost center move, and a set return date. They were lent to another team, not lost. The return date is the tell.",
      zh: "六个月的转接、临时的 cost center 调动、还有一个已设定的返回日期。TA 是被借调到另一个团队，不是走了。返回日期就是线索。",
    },
    resultFlavor: {
      correct: { en: "Correct. A return date means they are coming back.", zh: "正确。有返回日期，就说明 TA 会回来。" },
      wrong: { en: "You closed the file on someone with a scheduled return date.", zh: "你给一个有明确返回日期的人宣判了死刑。" },
    },
  },
  {
    id: "case-031",
    difficulty: "medium",
    tags: ["actually-leaving"],
    title: { en: "Cake Budget Detected", zh: "检测到蛋糕预算" },
    intro: {
      en: "There is a calendar invite for your coworker with a cake emoji and a 30-year number.",
      zh: "日历上出现了一个给你同事的邀请，带着蛋糕 emoji 和一个“30 年”的数字。",
    },
    telemetry: [
      { key: { en: "Calendar Event", zh: "日历事件" }, value: { en: "Farewell 🎂", zh: "欢送会 🎂" }, status: "warning" },
      { key: { en: "Tenure", zh: "工龄" }, value: { en: "30 years", zh: "30 年" }, status: "normal" },
      { key: { en: "Account End Date", zh: "账号截止日" }, value: { en: "End of month", zh: "月底" }, status: "alarming" },
      { key: { en: "Tone of Emails", zh: "邮件语气" }, value: { en: "Nostalgic", zh: "怀旧" }, status: "warning" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible (ends soon)", zh: "可见（即将结束）" }, status: "warning" },
    ],
    choices: [
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
      { id: "retirement", label: { en: "Retirement", zh: "退休" } },
      { id: "transfer", label: { en: "Transfer", zh: "转组" } },
      { id: "sabbatical", label: { en: "Sabbatical", zh: "停薪留职" } },
    ],
    answer: "retirement",
    explanation: {
      en: "Thirty years tenure, a farewell party with cake, nostalgic emails, and a scheduled account end date. This is a planned, celebrated exit. They are retiring, not being cut.",
      zh: "三十年工龄、带蛋糕的欢送会、怀旧的邮件、还有一个计划好的账号截止日。这是一次有计划、被庆祝的告别。TA 是退休，不是被裁。",
    },
    resultFlavor: {
      correct: { en: "Correct. Thirty years earns the cake. Wish them well.", zh: "正确。蛋糕是真的，退休也是真的；其余流程交给 HR。" },
      wrong: { en: "You called a retirement party a layoff. Eat some cake and apologize.", zh: "你把退休欢送会说成了裁员。赶紧吃块蛋糕道个歉吧。" },
    },
  },
  {
    id: "case-032",
    difficulty: "medium",
    tags: ["actually-leaving"],
    title: { en: "Open To Work", zh: "求职意向已公开" },
    intro: {
      en: "A coworker's GAL entry is gone and their public profile elsewhere now has a green ring.",
      zh: "一位同事的地址簿条目没了，而该同事在别处的公开主页加上了一圈绿环。",
    },
    telemetry: [
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Removed", zh: "已移除" }, status: "alarming" },
      { key: { en: "Public Profile", zh: "公开主页" }, value: { en: "#OpenToWork", zh: "#OpenToWork" }, status: "alarming" },
      { key: { en: "Badge Access", zh: "门禁权限" }, value: { en: "Revoked", zh: "已撤销" }, status: "alarming" },
      { key: { en: "Last Day Email", zh: "离职邮件" }, value: { en: "Sent", zh: "已发出" }, status: "warning" },
      { key: { en: "Org Chart", zh: "组织架构" }, value: { en: "Node removed", zh: "节点移除" }, status: "alarming" },
    ],
    choices: [
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
      { id: "left", label: { en: "Resigned / Left", zh: "已离职" } },
      { id: "leave", label: { en: "On Leave", zh: "休假中" } },
      { id: "reorg", label: { en: "Reorg", zh: "重组" } },
    ],
    answer: "left",
    explanation: {
      en: "GAL removed, badge revoked, a last-day email sent, the org node deleted, and a public 'Open To Work' banner. Every signal agrees. They resigned. Not every disappearance is a backend bug.",
      zh: "地址簿移除、门禁撤销、离职邮件已发、组织节点删除、公开主页挂上“求职中”。每个信号都一致，该同事离职了。不是每次消失都是后端 bug。",
    },
    resultFlavor: {
      correct: { en: "Correct. Sometimes gone means gone.", zh: "正确。有时候“走了”就是真的走了。" },
      wrong: { en: "You blamed sync. They literally posted Open To Work.", zh: "你又甩锅给同步！人家都公开发了求职意向了。" },
    },
  },
  {
    id: "case-033",
    difficulty: "hard",
    tags: ["actually-a-layoff", "actually-leaving"],
    title: { en: "The Cost Center Went Dark", zh: "整个 Cost Center 熄灯了" },
    intro: {
      en: "An entire cost center closed overnight. Forty people moved to a holding code.",
      zh: "一整个 cost center 一夜之间关闭了，四十个人被拉进了一个临时“过渡”会议。",
    },
    telemetry: [
      { key: { en: "Cost Center", zh: "Cost Center" }, value: { en: "Closed", zh: "已关闭" }, status: "alarming" },
      { key: { en: "Affected People", zh: "受影响人数" }, value: { en: "~40", zh: "约 40" }, status: "alarming" },
      { key: { en: "Holding Code", zh: "临时代码" }, value: { en: "'Transition'", zh: "“过渡”" }, status: "alarming" },
      { key: { en: "Badge Access", zh: "门禁权限" }, value: { en: "Expiring", zh: "即将过期" }, status: "alarming" },
      { key: { en: "WARN Notice", zh: "裁员预告通知" }, value: { en: "Filed", zh: "已提交" }, status: "alarming" },
    ],
    choices: [
      { id: "reorg", label: { en: "Reorg", zh: "重组" } },
      { id: "mass_transfer", label: { en: "Mass Transfer", zh: "集体转组" } },
      { id: "layoff", label: { en: "Department Layoff", zh: "部门裁员" } },
      { id: "offsite", label: { en: "Offsite", zh: "团建" } },
    ],
    answer: "layoff",
    explanation: {
      en: "A closed cost center, ~40 people parked in a 'Transition' code, expiring badges, and a filed WARN notice. A reorg moves people between trees; this deletes the tree. This is a layoff.",
      zh: "关闭的 cost center、约 40 人被塞进“过渡”列表、即将过期的门禁、已提交的裁员预告通知。重组是把人在树之间挪动，这是把整棵树删掉。这是裁员。",
    },
    resultFlavor: {
      correct: { en: "Correct, grimly. The holding code is a waiting room.", zh: "正确，但沉重。" },
      wrong: { en: "You called a WARN notice an offsite. There is no hotel at the end of this.", zh: "你把一张裁员预告读成了团建，但是这条路的尽头没有酒店。" },
    },
  },
  {
    id: "case-034",
    difficulty: "medium",
    tags: ["actually-leaving"],
    title: { en: "Welcome to the Alumni Network", zh: "欢迎加入校友网络" },
    intro: {
      en: "A coworker's account type quietly switched from 'Employee' to 'Alumni'.",
      zh: "一位同事的账号类型悄悄从“员工”变成了“校友”。",
    },
    telemetry: [
      { key: { en: "Account Type", zh: "账号类型" }, value: { en: "Employee → Alumni", zh: "员工 → 校友" }, status: "alarming" },
      { key: { en: "Mailbox", zh: "邮箱" }, value: { en: "Forwarding off", zh: "转发已关" }, status: "warning" },
      { key: { en: "Internal Access", zh: "内网权限" }, value: { en: "Removed", zh: "已移除" }, status: "alarming" },
      { key: { en: "Alumni Portal", zh: "校友门户" }, value: { en: "Invited", zh: "已邀请" }, status: "normal" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Removed", zh: "已移除" }, status: "alarming" },
    ],
    choices: [
      { id: "sabbatical", label: { en: "Sabbatical", zh: "停薪留职" } },
      { id: "left_alumni", label: { en: "Left, Moved to Alumni", zh: "毕业愉快" } },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
      { id: "transfer", label: { en: "Transfer", zh: "转组" } },
    ],
    answer: "left_alumni",
    explanation: {
      en: "The account type literally changed to 'Alumni', internal access was removed, and they were invited to the alumni portal. This is a formal, clean offboarding. They left on good terms.",
      zh: "账号类型白纸黑字变成了“校友”、内网权限移除、收到校友门户邀请。这是一次正式、体面的离职流程。TA 好聚好散地走了。",
    },
    resultFlavor: {
      correct: { en: "Correct. Alumni means graduated, not glitched.", zh: "正确。“校友”是被毕业了，不是出 bug 了。" },
      wrong: { en: "You called a clean offboarding a sync error. They are at the alumni mixer.", zh: "你把一次干净的离职流程说成了同步错误。人家在校友酒会上呢。" },
    },
  },
  {
    id: "case-035",
    difficulty: "hard",
    tags: ["not-a-departure", "leave"],
    title: { en: "The Visa Check", zh: "签证 Check" },
    intro: {
      en: "A coworker vanished abruptly mid-project. Their work authorization field shows a flag.",
      zh: "一位同事在项目中途突然消失了，TA 的“工作授权”字段上挂着一个标记。",
    },
    telemetry: [
      { key: { en: "Work Auth", zh: "工作授权" }, value: { en: "Under review", zh: "审核中" }, status: "warning" },
      { key: { en: "Status", zh: "状态" }, value: { en: "On leave (1-2 mo)", zh: "休假中（1-2 月）" }, status: "warning" },
      { key: { en: "Cost Center", zh: "Cost Center" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "Return Date", zh: "返回日期" }, value: { en: "Estimated", zh: "已预估" }, status: "normal" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "fired", label: { en: "Forced Out", zh: "被迫离开" } },
      { id: "visa_leave", label: { en: "Visa / Immigration Check", zh: "签证 / 移民审查" } },
      { id: "quit", label: { en: "Quietly Quit", zh: "悄悄离职" } },
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
    ],
    answer: "visa_leave",
    explanation: {
      en: "Work authorization is 'under review', the leave is a month or two, the cost center is unchanged, and there is an estimated return date. This is an immigration processing pause, not a departure. The paperwork moves slowly; the job is still theirs.",
      zh: "工作授权显示“审核中”、休假一两个月、cost center 没变、还有一个预估返回日期，TA 的签证被安全调查了。手续走得慢，但岗位还是 TA 的。",
    },
    resultFlavor: {
      correct: { en: "Correct. The border is slow, the seat is kept.", zh: "正确。大使馆很慢，座位给 TA 留着。" },
      wrong: { en: "You wrote them off over a paperwork delay. They are stuck in a consulate queue, not gone.", zh: "你因为一次手续延迟就给 TA 写了讣告，TA 只是卡在领事馆排队，不是走了。" },
    },
  },
  {
    id: "case-036",
    difficulty: "medium",
    tags: ["promotion", "title-change"],
    title: { en: "The Acting Prefix", zh: "“代理”前缀" },
    intro: {
      en: "A coworker's title gained the word 'Acting' at the front overnight.",
      zh: "一位同事的 Title 一夜之间在最前面多了“Acting”一词。",
    },
    telemetry: [
      { key: { en: "Title", zh: "Title" }, value: { en: "Acting + senior role", zh: "代理 + 高级岗" }, status: "warning" },
      { key: { en: "Level", zh: "职级" }, value: { en: "Unchanged", zh: "未变" }, status: "normal" },
      { key: { en: "Predecessor", zh: "前任" }, value: { en: "On leave", zh: "休假中" }, status: "warning" },
      { key: { en: "Duration Note", zh: "时限备注" }, value: { en: "'Interim'", zh: "“临时”" }, status: "warning" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "promotion", label: { en: "Full Promotion", zh: "正式升职" } },
      { id: "acting", label: { en: "Acting / Interim Role", zh: "代理 / 临时岗" } },
      { id: "reorg", label: { en: "Reorg", zh: "重组" } },
      { id: "transfer", label: { en: "Transfer", zh: "转组" } },
    ],
    answer: "acting",
    explanation: {
      en: "The title says 'Acting', the level did not change, the predecessor is on leave, and there is an 'interim' note. This is a temporary fill-in, not a real promotion. The level field is the truth-teller.",
      zh: "Title 写着“Acting”、职级没变、前任在休假、还有“临时”备注。这是临时顶岗，不是真升职。职级字段才是说真话的那个。",
    },
    resultFlavor: {
      correct: { en: "Correct. 'Acting' is a hat, not a raise.", zh: "正确。“代理”是顶帽子，不是涨薪。" },
      wrong: { en: "You promoted someone who is just covering until the boss is back.", zh: "你给一个只是临时顶到老板生完孩子回来的人发了升职。" },
    },
  },
  {
    id: "case-037",
    difficulty: "medium",
    tags: ["promotion", "title-change"],
    title: { en: "Suddenly On Every List", zh: "突然进了所有名单" },
    intro: {
      en: "A coworker just got added to a dozen leadership distribution lists in one morning.",
      zh: "一位同事在一个上午被加进了十几个 leadership 邮件组。",
    },
    telemetry: [
      { key: { en: "New DLs", zh: "新邮件组" }, value: { en: "12 leadership lists", zh: "12 个管理层组" }, status: "warning" },
      { key: { en: "Direct Reports", zh: "直属下属" }, value: { en: "Increased", zh: "增加" }, status: "warning" },
      { key: { en: "Title", zh: "Title" }, value: { en: "+ Director", zh: "+ Director" }, status: "warning" },
      { key: { en: "Their Manager", zh: "TA 的 manager" }, value: { en: "Now a VP", zh: "变成了 VP" }, status: "warning" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "spam", label: { en: "Mailing List Spam Bug", zh: "邮件组错了" } },
      { id: "into_leadership", label: { en: "Moved Into Leadership", zh: "进入管理层" } },
      { id: "transfer", label: { en: "Transfer", zh: "转组" } },
      { id: "reorg", label: { en: "Reorg", zh: "重组" } },
    ],
    answer: "into_leadership",
    explanation: {
      en: "Twelve leadership lists, more direct reports, a '+ Director' title, and a manager who is now a VP. The list membership tracks the title and the reports. They moved up into leadership.",
      zh: "12 个管理层组、更多直属下属、Title 加了“Director”、manager 变成了 VP。邮件组的变化和 Title、下属是一致的。TA 升职进了管理层。",
    },
    resultFlavor: {
      correct: { en: "Correct. The DLs followed the promotion, not the other way around.", zh: "正确。是邮件组跟着人走，不是反过来。" },
      wrong: { en: "You called a directorship a spam bug. Reply-all your congratulations.", zh: "你把一次升任总监说成了刷错邮件组，赶紧回复全体一句 congratulations 吧。" },
    },
  },
  {
    id: "case-038",
    difficulty: "hard",
    tags: ["promotion", "title-change"],
    title: { en: "Level Up, Title Same", zh: "升级了，头衔没变" },
    intro: {
      en: "A coworker's level field ticked up by one, but their title text is unchanged.",
      zh: "一位同事的职级字段加了一，但 Title 文字没变。",
    },
    telemetry: [
      { key: { en: "Level", zh: "职级" }, value: { en: "+1", zh: "+1" }, status: "warning" },
      { key: { en: "Title Text", zh: "Title 文字" }, value: { en: "Unchanged", zh: "未变" }, status: "normal" },
      { key: { en: "Comp Band", zh: "薪资带" }, value: { en: "Adjusted up", zh: "上调" }, status: "warning" },
      { key: { en: "Manager", zh: "manager" }, value: { en: "Same", zh: "不变" }, status: "normal" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "data_bug", label: { en: "Level Field Glitch", zh: "职级字段出错" } },
      { id: "inband_promo", label: { en: "In-Band (Silent) Promotion", zh: "静默升级" } },
      { id: "transfer", label: { en: "Transfer", zh: "转组" } },
      { id: "reorg", label: { en: "Reorg", zh: "重组" } },
    ],
    answer: "inband_promo",
    explanation: {
      en: "Level went up by one, comp band adjusted up, manager unchanged, title text the same. Many ladders promote within the same title text. The comp change confirms it is real, not a glitch.",
      zh: "职级加一、Compa ratio 上调、manager 没变、Title 文字不变。很多职级体系在同一个 Title 文字下也能升级。W-2 表是真的。",
    },
    resultFlavor: {
      correct: { en: "Correct. Not all promotions rename you. Some just pay you.", zh: "不是所有升职都给你改名，有些只给你涨钱。" },
      wrong: { en: "You called a raise a glitch. The comp band disagrees.", zh: "你把一次涨薪说成了 bug。Compa ratio 不同意。" },
    },
  },
  {
    id: "case-039",
    difficulty: "easy",
    tags: ["joke", "bad-end"],
    title: { en: "Root Cause: Monday", zh: "Root Cause：周一" },
    intro: {
      en: "Everything is broken. All the telemetry is normal. The only correlation is the day.",
      zh: "一切都坏了。所有数据都正常。唯一的相关线索是星期几。",
    },
    telemetry: [
      { key: { en: "All Systems", zh: "所有系统" }, value: { en: "Normal", zh: "正常" }, status: "normal" },
      { key: { en: "User Mood", zh: "用户心情" }, value: { en: "Low", zh: "低落" }, status: "warning" },
      { key: { en: "Coffee Level", zh: "咖啡库存" }, value: { en: "Empty", zh: "空了" }, status: "alarming" },
      { key: { en: "Day of Week", zh: "星期几" }, value: { en: "Monday", zh: "周一" }, status: "alarming" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "outage", label: { en: "Real Outage", zh: "真的故障" } },
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
      { id: "monday", label: { en: "It Is Just Monday", zh: "只是周一而已" } },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
    ],
    answer: "monday",
    explanation: {
      en: "Every system is normal, the only red signals are an empty coffee pot and the calendar saying Monday. There is no incident. There is only the slow dread of the week beginning.",
      zh: "系统正常，唯一的红色信号是咖啡壶和日历上的“周一”。没有故障，只有新一周开始时那种缓慢的恐惧。",
    },
    resultFlavor: {
      correct: { en: "Correct. Nothing is broken. It is just Monday. Refill the pot.", zh: "正确。什么都没坏，只是周一，把咖啡壶满上吧。" },
      wrong: { en: "BAD END: You opened an incident bridge for Monday. Monday cannot be mitigated.", zh: "BAD END：你为“周一”拉了一个应急会议，但是周一是一场无法缓解的灾难。" },
    },
  },
  {
    id: "case-040",
    difficulty: "hard",
    tags: ["joke", "bad-end"],
    title: { en: "Mercury Is In Retrograde", zh: "水星逆行" },
    intro: {
      en: "Deploys fail, calls drop, configs revert. An astrology app on someone's desk is blinking.",
      zh: "部署失败、通话掉线、配置回滚。某人桌上的星座 App 正在闪烁。",
    },
    telemetry: [
      { key: { en: "Deploys", zh: "部署" }, value: { en: "Flaky", zh: "时好时坏" }, status: "warning" },
      { key: { en: "Network", zh: "网络" }, value: { en: "Intermittent", zh: "间歇性" }, status: "warning" },
      { key: { en: "Root Cause Found", zh: "已找到根因" }, value: { en: "No", zh: "没有" }, status: "unknown" },
      { key: { en: "Astrology App", zh: "星座 App" }, value: { en: "Mercury retrograde", zh: "水星逆行" }, status: "alarming" },
      { key: { en: "Engineer Morale", zh: "工程师士气" }, value: { en: "Superstitious", zh: "开始信命" }, status: "warning" },
    ],
    choices: [
      { id: "real_bug", label: { en: "An Actual Bug", zh: "一个真 bug" } },
      { id: "retrograde", label: { en: "Mercury Retrograde", zh: "水星逆行" } },
      { id: "dns", label: { en: "It Was DNS", zh: "是 DNS 的锅" } },
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
    ],
    answer: "retrograde",
    explanation: {
      en: "Flaky everything, no root cause found, and the only thing that correlates is a planet. When the postmortem has no answer, engineers reach for the stars. This is a joke case: the honest root cause is 'we never found it'.",
      zh: "什么都时好时坏、找不到根因，唯一能对上的是一颗行星。当复盘写不出结论时，工程师就开始仰望星空。“水逆”是个玩笑：诚实的根因是“我们一直没找到”。",
    },
    resultFlavor: {
      correct: { en: "Correct, astrologically. The real RCA is 'unknown'. Mercury took the blame.", zh: "正确，从占星学上说。真正的根因是“未知”。锅让水星背了。" },
      wrong: { en: "BAD END: You filed a real bug against a planet. It will not be fixed by next sprint.", zh: "BAD END：你给一颗行星提了个 bug，它才不会在下个 sprint 修好呢！" },
    },
  },
  {
    id: "case-041",
    difficulty: "medium",
    tags: ["joke", "it-was-the-backend"],
    title: { en: "Off By One Hour", zh: "差了一个小时" },
    intro: {
      en: "Everyone's timestamps are exactly one hour off and half the meetings shifted overnight.",
      zh: "所有人的时间戳都正好差了一个小时，半数会议一夜之间挪了位置。",
    },
    telemetry: [
      { key: { en: "Timestamps", zh: "时间戳" }, value: { en: "+1 hour", zh: "+1 小时" }, status: "warning" },
      { key: { en: "Date", zh: "日期" }, value: { en: "Second Sunday of March", zh: "三月第二个周日" }, status: "alarming" },
      { key: { en: "Server TZ", zh: "服务器时区" }, value: { en: "Did not update", zh: "没更新" }, status: "warning" },
      { key: { en: "People", zh: "人员" }, value: { en: "All present", zh: "全员在岗" }, status: "normal" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "outage", label: { en: "Calendar Outage", zh: "日历故障" } },
      { id: "dst", label: { en: "Daylight Saving Time", zh: "夏令时切换" } },
      { id: "hacked", label: { en: "Someone Tampered", zh: "有人动了手脚" } },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
    ],
    answer: "dst",
    explanation: {
      en: "It is the second Sunday of March, the clocks moved forward an hour, and a server forgot to follow. Nobody disappeared, time just did. Twice a year, everyone becomes a timezone debugger.",
      zh: "今天是三月第二个周日，时钟往前拨了一小时，而某台服务器忘了跟上，没人消失，是时间消失了，每年两次大家都得当一回时区测试员。",
    },
    resultFlavor: {
      correct: { en: "Correct. Spring forward, debug later.", zh: "正确，春天往前拨一小时，bug 就留着晚点修吧。" },
      wrong: { en: "You filed an outage against the planet's orbit. It will not be rolled back.", zh: "你给地球公转提了个事故，它才不会为了你回滚。" },
    },
  },
  {
    id: "case-042",
    difficulty: "hard",
    tags: ["joke", "it-was-the-backend"],
    title: { en: "The Emoji That Broke Everything", zh: "搞垮一切的 emoji" },
    intro: {
      en: "A coworker added an emoji to their display name and three internal tools fell over.",
      zh: "一位同事在显示名里加了个 emoji，紧接着三个内部工具集体趴窝。",
    },
    telemetry: [
      { key: { en: "Display Name", zh: "显示名" }, value: { en: "Name + 🦄", zh: "名字 + 🦄" }, status: "warning" },
      { key: { en: "Tool A", zh: "工具 A" }, value: { en: "500 error", zh: "500 错误" }, status: "alarming" },
      { key: { en: "Tool B", zh: "工具 B" }, value: { en: "Truncates name", zh: "名字被截断" }, status: "warning" },
      { key: { en: "Encoding", zh: "编码" }, value: { en: "4-byte UTF-8", zh: "4 字节 UTF-8" }, status: "alarming" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "attack", label: { en: "Injection Attack", zh: "注入攻击" } },
      { id: "unicode_bug", label: { en: "Unicode Edge Case", zh: "Unicode 边界 case" } },
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
    ],
    answer: "unicode_bug",
    explanation: {
      en: "A 4-byte UTF-8 emoji in a field that assumed 3 bytes maximum, and the tools that never tested by GenZ users fell over. Not an attack, just a unicorn the database could not swallow.",
      zh: "一个 4 字节的 UTF-8 emoji 被塞进了只允许 3 字节的字段里，那些从没见过 GenZ 用户的工具就这么倒了，不是攻击，只是一只数据库咽不下去的独角兽 🦄🦄🦄。",
    },
    resultFlavor: {
      correct: { en: "Correct. 🦄 contains a stack trace.", zh: "正确，那只 🦄 里藏着一整段堆栈报错。" },
      wrong: { en: "You called an emoji an attacker. The only thing it injected was whimsy.", zh: "你把一个 emoji 当成了攻击者，它注入的唯一东西是一点童心。" },
    },
  },
  {
    id: "case-043",
    difficulty: "medium",
    tags: ["joke", "bad-end"],
    title: { en: "Blame the Intern", zh: "甩锅给实习生" },
    intro: {
      en: "A bad config shipped. The team agrees it was the intern. You go to find the intern.",
      zh: "一个坏配置上线了，全队一致认定是实习生干的，你去找那个实习生。",
    },
    telemetry: [
      { key: { en: "Bad Commit Author", zh: "提交作者" }, value: { en: "'intern'", zh: "“实习生”" }, status: "warning" },
      { key: { en: "Intern's Account", zh: "实习生账号" }, value: { en: "Deactivated", zh: "已停用" }, status: "alarming" },
      { key: { en: "Intern's Last Day", zh: "实习生的 last day" }, value: { en: "Last week", zh: "上周" }, status: "alarming" },
      { key: { en: "Commit Date", zh: "提交日期" }, value: { en: "Yesterday", zh: "昨天" }, status: "alarming" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Removed", zh: "已移除" }, status: "warning" },
    ],
    choices: [
      { id: "intern", label: { en: "It Was The Intern", zh: "就是实习生干的" } },
      { id: "not_intern", label: { en: "Cannot Have Been The Intern", zh: "不可能是实习生" } },
      { id: "ghost", label: { en: "A Ghost Did It", zh: "是幽灵干的" } },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
    ],
    answer: "not_intern",
    explanation: {
      en: "The intern's account was deactivated last week. Yesterday's bad commit therefore came from someone still employed. A deactivated account cannot push code. The blame was comfortable but the timeline says it was one of you.",
      zh: "实习生的账号上周就停用了，事故也是上周，可那个坏提交是昨天才进来的，一个停用的账号是推不了代码的，甩锅虽然舒服，但时间线说凶手就在你们中间。",
    },
    resultFlavor: {
      correct: { en: "Correct. The intern has an alibi. Look in the mirror.", zh: "正确，实习生有不在场证明，照照镜子吧。" },
      wrong: { en: "BAD END: You blamed someone who left last week. The bug is still here. So is the real author.", zh: "BAD END：你怪了一个上周就走的人，bug 还在，真正的作者也还在。" },
    },
  },
  {
    id: "case-044",
    difficulty: "medium",
    tags: ["immigration", "not-a-layoff"],
    title: { en: "The Req That Vanished", zh: "消失的招聘需求" },
    intro: {
      en: "An open headcount position you were recruiting for just closed in the system.",
      zh: "一直在招的一个岗位突然在系统里关闭了。",
    },
    telemetry: [
      { key: { en: "Req Status", zh: "招聘需求" }, value: { en: "Closed", zh: "已关闭" }, status: "warning" },
      { key: { en: "Reason Field", zh: "原因" }, value: { en: "'PERM sponsorship coordination'", zh: "PERM 赞助" }, status: "normal" },
      { key: { en: "Employee Affected", zh: "涉及员工" }, value: { en: "China-based IC", zh: "中国籍 IC" }, status: "normal" },
      { key: { en: "Legal Counsel", zh: "法律顾问" }, value: { en: "Copied on emails", zh: "在邮件抄送里" }, status: "normal" },
      { key: { en: "That Employee Status", zh: "该员工状态" }, value: { en: "Active, working normally", zh: "在职，正常工作" }, status: "normal" },
    ],
    choices: [
      { id: "budget_freeze", label: { en: "Budget Freeze", zh: "预算冻结" } },
      { id: "layoff_prep", label: { en: "Layoff Signal", zh: "裁员信号" } },
      { id: "perm_sponsorship", label: { en: "PERM Sponsorship Hold", zh: "PERM 流程中" } },
      { id: "role_canceled", label: { en: "Role Canceled", zh: "岗位取消" } },
    ],
    answer: "perm_sponsorship",
    explanation: {
      en: "The reason field literally says 'PERM sponsorship coordination'. A China-based IC's green card sponsorship is in progress, and the req is frozen to avoid complications with labor certification. When PERM moves forward, staffing decisions pause. The employee is still here; the paperwork is just moving slowly.",
      zh: "原因字段明确写着 PERM 赞助。这只是一位中国籍 IC 的绿卡申请在推进，招聘需求被冻结以避免和劳工证明产生冲突。TA 还在这儿好好上班，只是文件在走流程。",
    },
    resultFlavor: {
      correct: { en: "Correct. The req froze, not the job. PERM paperwork moves slowly.", zh: "正确。冻的是招聘需求，不是岗位。PERM 文件走得慢。" },
      wrong: { en: "You read a frozen req as a layoff signal. Someone's just doing green card paperwork.", zh: "你把一个冻结的招聘需求读成了裁员信号。人家只是在走绿卡手续。" },
    },
  },
  {
    id: "case-045",
    difficulty: "medium",
    tags: ["insufficient-telemetry"],
    title: { en: "Active Only at 3 AM", zh: "只在凌晨三点活跃" },
    intro: {
      en: "A coworker's activity only ever shows up at 3 AM your time. You suspect the worst.",
      zh: "一位同事的活动永远只出现在你这边的凌晨三点，你开始往坏处想。",
    },
    telemetry: [
      { key: { en: "Activity Window", zh: "活跃时段" }, value: { en: "3 AM your TZ", zh: "你时区凌晨 3 点" }, status: "warning" },
      { key: { en: "Their Timezone", zh: "TA 的时区" }, value: { en: "Not set", zh: "未设置" }, status: "alarming" },
      { key: { en: "Office", zh: "办公地" }, value: { en: "Blank", zh: "空白" }, status: "warning" },
      { key: { en: "Output Quality", zh: "产出质量" }, value: { en: "Fine", zh: "正常" }, status: "normal" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "burnout", label: { en: "Burning Out", zh: "熬夜燃尽" } },
      { id: "timezone", label: { en: "Just a Different Timezone", zh: "只是时区不同" } },
      { id: "moonlighting", label: { en: "Secretly Moonlighting", zh: "偷偷在接私活" } },
      { id: "leaving", label: { en: "About to Quit", zh: "要离职了" } },
    ],
    answer: "none",
    actualCause: { en: "Timezone Unknown, Can't Tell", zh: "时区不明，判不了" },
    explanation: {
      en: "Their timezone is not set and office is blank, so 3 AM your time could be 3 PM theirs. Output is fine. Without their timezone you cannot tell exhaustion from a perfectly normal afternoon. Not enough to judge.",
      zh: "时区没设、办公地也空着，所以你这边的凌晨三点，可能正是 TA 那边的下午三点，产出也都正常，既然没有时区信息，你根本分不清这是熬夜还是一个再普通不过的下午。",
    },
    resultFlavor: {
      correct: { en: "Correct. 3 AM here is lunch somewhere. Set the timezone before you worry.", zh: "正确，全球化时代。这里的凌晨三点是别处的午饭点，先把时区填上再操心。" },
      wrong: { en: "You diagnosed burnout across a timezone you never checked. They were eating lunch.", zh: "你隔着一个没核对过的时区诊断了倦怠，人家正在吃午饭呢。" },
    },
  },
  {
    id: "case-046",
    difficulty: "hard",
    tags: ["insufficient-telemetry", "ghost"],
    title: { en: "Everything Normal, Nobody Home", zh: "一切正常，无人应答" },
    intro: {
      en: "Every field on this coworker reads normal, but no one has reached them in two weeks.",
      zh: "这位同事的每一个字段都显示正常，可整整两周没人联系上 TA。",
    },
    telemetry: [
      { key: { en: "All Fields", zh: "所有字段" }, value: { en: "Normal", zh: "正常" }, status: "normal" },
      { key: { en: "Last Reply", zh: "最后回复" }, value: { en: "14 days ago", zh: "14 天前" }, status: "warning" },
      { key: { en: "Calendar", zh: "日历" }, value: { en: "Empty", zh: "空的" }, status: "unknown" },
      { key: { en: "Status Reason", zh: "状态原因" }, value: { en: "None given", zh: "未说明" }, status: "unknown" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "leave", label: { en: "Definitely On Leave", zh: "肯定在休假" } },
      { id: "quit", label: { en: "Definitely Quit", zh: "肯定离职了" } },
      { id: "deep_work", label: { en: "Heads-Down on a Secret Project", zh: "在憋一个保密项目" } },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
    ],
    answer: "none",
    actualCause: { en: "Normal Fields, No Reason, Can't Tell", zh: "字段正常但无原因，判不了" },
    explanation: {
      en: "Normal fields tell you the directory was not touched; they do not tell you where the human is. An empty calendar with no stated reason fits leave, a sabbatical, or quiet trouble equally. The data cannot choose for you.",
      zh: "字段正常只说明目录没被改过，并不告诉你人在哪里，一个没有任何说明的空日历，既可能是休假、可能是停薪留职、也可能是悄悄出了状况，数据替你选不了。",
    },
    resultFlavor: {
      correct: { en: "Correct. Normal is not the same as fine. Go check on them.", zh: "正确，“正常”不等于“没事”，赶紧去看看 TA 吧。" },
      wrong: { en: "You read 'all fields normal' as 'all is well'. Maybe knock on the door first.", zh: "你把“所有字段正常”读成了“一切都好”，也许先去敲敲门。" },
    },
  },
  {
    id: "case-047",
    difficulty: "medium",
    tags: ["ghost", "insufficient-telemetry"],
    title: { en: "Too Many Hands", zh: "太多双手" },
    intro: {
      en: "One account is logging in from five cities a day. Somehow this is fine.",
      zh: "一个账号一天之内从五座城市登录，而这居然是正常的。",
    },
    telemetry: [
      { key: { en: "Login Cities", zh: "登录城市" }, value: { en: "5 per day", zh: "每天 5 个" }, status: "warning" },
      { key: { en: "Account Type", zh: "账号类型" }, value: { en: "Shared / team", zh: "共享 / 团队" }, status: "normal" },
      { key: { en: "Named Owner", zh: "实名归属" }, value: { en: "None", zh: "无" }, status: "warning" },
      { key: { en: "MFA", zh: "MFA" }, value: { en: "Shared token", zh: "共享令牌" }, status: "warning" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Listed as team", zh: "登记为团队" }, status: "normal" },
    ],
    choices: [
      { id: "hacked", label: { en: "Account Compromised", zh: "账号被盗" } },
      { id: "shared", label: { en: "It's a Shared Account", zh: "这是共享账号" } },
      { id: "person", label: { en: "One Very Busy Person", zh: "一个超忙的人" } },
      { id: "none", label: { en: "Can't Attribute to a Person", zh: "归不到具体某个人" } },
    ],
    answer: "shared",
    explanation: {
      en: "The account type literally says shared, there is no named owner, and the GAL lists it as a team. Five cities a day is normal when five people share one login. You cannot attribute any single action to a person, and that is by design.",
      zh: "账号类型明确写着共享、没有实名归属、地址簿里登记的也是团队，五个人共用一个登录，一天五座城市就很正常，你没法把任何一次操作归到某个人头上，这是设计使然。",
    },
    resultFlavor: {
      correct: { en: "Correct. Five cities, one login, zero mystery.", zh: "正确，五座城市，一个登录，零悬念。" },
      wrong: { en: "You raised a breach alert on a help desk rota. They share the password on purpose.", zh: "你对着一个客服轮班表拉响了入侵警报，人家是故意共用密码的。" },
    },
  },
  {
    id: "case-048",
    difficulty: "medium",
    tags: ["security"],
    title: { en: "Permissions Gone, Person Stays", zh: "权限没了，人还在" },
    intro: {
      en: "A coworker's permissions zeroed out overnight, yet they are at their desk, confused.",
      zh: "一位同事的权限一夜清零，可 TA 正坐在工位上，一脸懵。",
    },
    telemetry: [
      { key: { en: "Permissions", zh: "权限" }, value: { en: "Revoked", zh: "已撤销" }, status: "alarming" },
      { key: { en: "Person Present", zh: "人是否在" }, value: { en: "Yes", zh: "在" }, status: "normal" },
      { key: { en: "Access Review", zh: "权限审查" }, value: { en: "Just ran", zh: "刚跑完" }, status: "warning" },
      { key: { en: "Manager", zh: "manager" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "fired", label: { en: "Being Fired", zh: "被开了" } },
      { id: "access_review", label: { en: "Access Review Cleanup", zh: "权限审查清理" } },
      { id: "hacked", label: { en: "Account Hacked", zh: "账号被黑" } },
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
    ],
    answer: "access_review",
    explanation: {
      en: "An access review just ran, the manager is unchanged, and the person is right there. Periodic reviews strip permissions nobody re-attested to. It is annoying, not a firing. They re-request and move on.",
      zh: "权限审查刚刚跑完、manager 没变、人就在那儿坐着，周期性审查会把没人 Approve 的权限统统收掉，这很烦，但 TA 重新申请一下就好了。",
    },
    resultFlavor: {
      correct: { en: "Correct. The robot revoked it, not the boss. Re-request and move on.", zh: "正确，是机器人收的，不是老板，重新申请就完事了。" },
      wrong: { en: "You read a compliance sweep as a termination. Hand them the access-request form.", zh: "你把一次合规扫描读成了解雇，快把权限申请表递给 TA 吧。" },
    },
  },
  {
    id: "case-049",
    difficulty: "hard",
    tags: ["security"],
    title: { en: "Litigation Hold", zh: "法务保留" },
    intro: {
      en: "A coworker's mailbox suddenly cannot delete anything, and a legal flag appeared.",
      zh: "一位同事的邮箱突然什么都删不掉，还冒出来一个法务标记。",
    },
    telemetry: [
      { key: { en: "Mailbox Delete", zh: "邮箱删除" }, value: { en: "Blocked", zh: "被阻止" }, status: "warning" },
      { key: { en: "Legal Flag", zh: "法务标记" }, value: { en: "'Litigation Hold'", zh: "“诉讼保留”" }, status: "alarming" },
      { key: { en: "Person Status", zh: "本人状态" }, value: { en: "Working normally", zh: "正常工作" }, status: "normal" },
      { key: { en: "Manager", zh: "manager" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "fired_cause", label: { en: "Fired For Cause", zh: "被开除问责" } },
      { id: "legal_hold", label: { en: "Legal / Litigation Hold", zh: "法务 / 诉讼保留" } },
      { id: "hacked", label: { en: "Account Hacked", zh: "账号被黑" } },
      { id: "quit", label: { en: "Quit", zh: "离职了" } },
    ],
    answer: "legal_hold",
    explanation: {
      en: "A litigation hold preserves a mailbox as potential evidence; it blocks deletion but does not touch the person, who is still working normally. Often the holdee is just a witness, not a target. It is a retention rule, not a verdict.",
      zh: "诉讼保留是把邮箱当成潜在证据冻存，它只挡删除，不动人，本人还在正常上班，很多时候被保留的人只是个证人，不是被告，这是一条留存规则，不是判决书。",
    },
    resultFlavor: {
      correct: { en: "Correct. Their inbox is evidence, not a confession.", zh: "正确， TA 的收件箱是证据，不是认罪书。" },
      wrong: { en: "You convicted someone over a retention rule. Legal just wants the emails kept.", zh: "你凭一条留存规则就给人定了罪，法务只是想把邮件留着而已。" },
    },
  },
  {
    id: "case-050",
    difficulty: "medium",
    tags: ["security"],
    title: { en: "Locked Out Overnight", zh: "一夜被锁" },
    intro: {
      en: "A coworker's account was disabled and force-reset at 2 AM. They did not do it.",
      zh: "一位同事的账号在凌晨两点被停用并强制改密， TA 自己没动过。",
    },
    telemetry: [
      { key: { en: "Account", zh: "账号" }, value: { en: "Disabled then reset", zh: "停用后重置" }, status: "alarming" },
      { key: { en: "Trigger", zh: "触发原因" }, value: { en: "Credential leak alert", zh: "凭据泄露告警" }, status: "alarming" },
      { key: { en: "Person Status", zh: "本人状态" }, value: { en: "Employed, surprised", zh: "在职，懵了" }, status: "normal" },
      { key: { en: "Manager", zh: "manager" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "fired", label: { en: "Fired", zh: "被开了" } },
      { id: "cred_response", label: { en: "Credential Leak Response", zh: "凭据泄露响应" } },
      { id: "quit", label: { en: "Quit", zh: "离职了" } },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
    ],
    answer: "cred_response",
    explanation: {
      en: "The trigger says credential leak alert, the person is still employed and surprised, and the manager is unchanged. Security disabled and reset the account to lock out a leaked password. It is protection, not punishment.",
      zh: "触发原因写着凭据泄露告警，本人还在职、还一脸懵、manager 也没变，安全团队停用并重置账号，是为了把泄露的密码挡在门外，这是保护，不是惩罚。",
    },
    resultFlavor: {
      correct: { en: "Correct. Security slammed the door before the thief got in.", zh: "正确，安全团队在小偷进门前把门锁上了。" },
      wrong: { en: "You read an emergency lockout as a firing. They just need a new password.", zh: "你把一次紧急锁定读成了开除，人家只是得换个新密码。" },
    },
  },
  {
    id: "case-051",
    difficulty: "easy",
    tags: ["security"],
    title: { en: "The Red Compliance Badge", zh: "合规标记" },
    intro: {
      en: "A coworker's device compliance flag turned red and some access dropped.",
      zh: "一位同事的设备合规标记变红了，部分权限也跟着掉了。",
    },
    telemetry: [
      { key: { en: "Device Compliance", zh: "设备合规" }, value: { en: "Red", zh: "红色" }, status: "alarming" },
      { key: { en: "Reason", zh: "原因" }, value: { en: "OS patch missing", zh: "系统补丁" }, status: "warning" },
      { key: { en: "Person Status", zh: "本人状态" }, value: { en: "Working", zh: "在岗" }, status: "normal" },
      { key: { en: "Fix", zh: "修复" }, value: { en: "Run update", zh: "跑个更新" }, status: "normal" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "fired", label: { en: "Being Removed", zh: "要被清退" } },
      { id: "patch", label: { en: "Missing a Patch", zh: "少装了系统更新" } },
      { id: "hacked", label: { en: "Device Hacked", zh: "设备被黑" } },
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
    ],
    answer: "patch",
    explanation: {
      en: "The reason literally says OS patch missing and the fix is to run an update. Compliance gates access until the device catches up. The red badge is a nag, not a notice. One reboot later it goes green.",
      zh: "原因白纸黑字写着缺少关键的系统安全补丁，修复方法就是更新 Windows 系统，合规会先卡住权限，直到设备补上。那个红标记是在催你，重启一次它就绿了。",
    },
    resultFlavor: {
      correct: { en: "Correct. Click 'Update Now', not 'Goodbye'.", zh: "正确，点的是“立即更新”，不是“再见”。" },
      wrong: { en: "You read a missing patch as a pink slip. Reboot solves this one.", zh: "你把一个补丁读成了解雇信，这事真的是重启就能解决。" },
    },
  },
  {
    id: "case-052",
    difficulty: "easy",
    tags: ["security"],
    title: { en: "All MFA Devices Gone", zh: "MFA 设备全没了" },
    intro: {
      en: "A coworker's registered MFA devices all vanished at once. Alarms are blaring.",
      zh: "一位同事注册的 MFA 设备一下子全消失了，警报响成一片。",
    },
    telemetry: [
      { key: { en: "MFA Devices", zh: "MFA 设备" }, value: { en: "All unregistered", zh: "全部注销" }, status: "alarming" },
      { key: { en: "New Device", zh: "新设备" }, value: { en: "One registering", zh: "正在注册一台" }, status: "warning" },
      { key: { en: "Help Desk Ticket", zh: "客服工单" }, value: { en: "'New phone'", zh: "“换了手机”" }, status: "normal" },
      { key: { en: "Person Status", zh: "本人状态" }, value: { en: "At desk", zh: "在工位" }, status: "normal" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "hacked", label: { en: "Account Takeover", zh: "账号被接管" } },
      { id: "new_phone", label: { en: "Got a New Phone", zh: "换了新手机" } },
      { id: "fired", label: { en: "Being Offboarded", zh: "在走离职流程" } },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
    ],
    answer: "new_phone",
    explanation: {
      en: "An open help desk ticket says 'new phone', one new device is mid-registration, and the person is at their desk. Replacing a phone wipes the old MFA registrations and re-enrolls a new one. Scary-looking, completely routine.",
      zh: "一张客服工单写着“我换了手机”、一台新设备正在注册、人也好端端在工位上，换手机本来就会清掉旧的 MFA 注册再重新登记一台，看着吓人，其实再日常不过。",
    },
    resultFlavor: {
      correct: { en: "Correct. New phone, old panic.", zh: "正确，新手机，旧惊吓。" },
      wrong: { en: "You raised a takeover alert on a phone upgrade. The thief is the carrier store.", zh: "你为一次换机拉响了警报，那个“小偷”是营业厅。" },
    },
  },
  {
    id: "case-053",
    difficulty: "easy",
    tags: ["not-a-departure", "cross-cultural"],
    title: { en: "Gone for Two Weeks in February", zh: "二月消失两周" },
    intro: {
      en: "A big chunk of one office goes quiet for two weeks every February. Same weeks each year.",
      zh: "每年二月，某个办公室都会有一大批亚洲人安静整整两周，而且年年都是这几周。",
    },
    telemetry: [
      { key: { en: "Affected Office", zh: "受影响办公室" }, value: { en: "One region", zh: "某个地区" }, status: "normal" },
      { key: { en: "Pattern", zh: "规律" }, value: { en: "Every year, same weeks", zh: "年年同几周" }, status: "normal" },
      { key: { en: "Calendar Note", zh: "日历备注" }, value: { en: "Public holiday", zh: "法定假日" }, status: "normal" },
      { key: { en: "Org Chart", zh: "组织架构" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "layoff", label: { en: "Regional Layoff", zh: "区域裁员" } },
      { id: "lunar_new_year", label: { en: "Lunar New Year", zh: "农历新年" } },
      { id: "outage", label: { en: "Office Outage", zh: "办公室停摆" } },
      { id: "reorg", label: { en: "Reorg", zh: "重组" } },
    ],
    answer: "lunar_new_year",
    explanation: {
      en: "One region, the same two weeks every February, a public holiday note, and an unchanged org chart. This is Lunar New Year. Everyone is home eating dumplings and will be back. Calendars have culture in them.",
      zh: "只影响一个地区、年年都是二月这两周、日历备注是法定假日、组织架构也没变，这是农历新年，大家都回家吃饺子去了，过完就回来，日历里也是装着文化的。",
    },
    resultFlavor: {
      correct: { en: "Correct. They are home for the New Year. Send red packets, not condolences.", zh: "正确，人家回家过年了，该发的是红包，不是慰问。" },
      wrong: { en: "You read a national holiday as a layoff. They are setting off fireworks, not resumes.", zh: "你把一个全国性节日读成了裁员，人家在放烟花，不是在投简历。" },
    },
  },
  {
    id: "case-054",
    difficulty: "easy",
    tags: ["not-a-departure", "cross-cultural"],
    title: { en: "Europe Vanishes in August", zh: "八月的欧洲集体蒸发" },
    intro: {
      en: "Your European colleagues all went dark for most of August. Replies stopped cold.",
      zh: "你的欧洲同事在八月大半个月集体没影了，回复戛然而止。",
    },
    telemetry: [
      { key: { en: "Affected Group", zh: "受影响人群" }, value: { en: "EU offices", zh: "欧洲办公室" }, status: "normal" },
      { key: { en: "Month", zh: "月份" }, value: { en: "August", zh: "八月" }, status: "normal" },
      { key: { en: "OOF Replies", zh: "自动回复" }, value: { en: "'On holiday'", zh: "“休假中”" }, status: "normal" },
      { key: { en: "Org Chart", zh: "组织架构" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "layoff", label: { en: "European Layoffs", zh: "欧洲裁员" } },
      { id: "summer_holiday", label: { en: "August Summer Holiday", zh: "八月夏休" } },
      { id: "reorg", label: { en: "Reorg", zh: "重组" } },
      { id: "outage", label: { en: "Outage", zh: "故障" } },
    ],
    answer: "summer_holiday",
    explanation: {
      en: "EU offices, the month of August, and out-of-office replies that literally say 'on holiday'. Much of Europe takes weeks off in August. Nobody quit; the whole continent is at the beach.",
      zh: "受影响的是欧洲办公室、月份是八月、人家自动回复明明白白写着“休假中”，欧洲很多地方八月就是要连休好几周，没人离职，是整个大陆都去海边了。",
    },
    resultFlavor: {
      correct: { en: "Correct. They are at the beach, not the exit. See you in September.", zh: "正确，人家在海边，不在离职通道，九月见。" },
      wrong: { en: "You read August in Europe as a purge. It is just sunscreen season.", zh: "你把欧洲的八月读成了大清洗，那只是防晒的季节。" },
    },
  },
  {
    id: "case-055",
    difficulty: "medium",
    tags: ["it-was-the-backend", "cross-cultural"],
    title: { en: "Split Into Two People", zh: "被拆成了两个人" },
    intro: {
      en: "A coworker now appears as two separate entries: a first-name person and a surname person.",
      zh: "一位同事现在变成了两个独立条目：一个“名”的人，一个“姓”的人。",
    },
    telemetry: [
      { key: { en: "GAL Entries", zh: "地址簿条目" }, value: { en: "2, split name", zh: "2 个，姓名被拆" }, status: "alarming" },
      { key: { en: "Source", zh: "来源" }, value: { en: "Surname-first import", zh: "姓在前的导入" }, status: "warning" },
      { key: { en: "Employee ID", zh: "工号" }, value: { en: "Same on both", zh: "两个相同" }, status: "warning" },
      { key: { en: "Manager", zh: "manager" }, value: { en: "Same", zh: "相同" }, status: "normal" },
      { key: { en: "Person Count", zh: "实际人数" }, value: { en: "Actually one", zh: "其实是一个" }, status: "normal" },
    ],
    choices: [
      { id: "twin", label: { en: "Hidden Twin", zh: "隐藏双胞胎" } },
      { id: "name_order_bug", label: { en: "Name-Order Parsing Bug", zh: "姓名顺序解析 bug" } },
      { id: "new_hire", label: { en: "A New Hire", zh: "来了新人" } },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
    ],
    answer: "name_order_bug",
    explanation: {
      en: "Same employee ID on both entries, same manager, and a surname-first import. A system that assumed given-name-first split one person into two when the name order flipped. One human, two rows, zero new hires.",
      zh: "两个条目工号相同、manager 相同，这是一个默认 Surname 在前的系统，在遇到姓名顺序对调时，把一个人拆成了两个。我们没有新人入职。",
    },
    resultFlavor: {
      correct: { en: "Correct. Surname-first broke the parser, not reality.", zh: "正确，姓在前搞坏的是解析器，不是现实。" },
      wrong: { en: "You onboarded a twin who is just the same person's last name.", zh: "你给一个“双胞胎”办了入职，那其实只是同一个人的姓。" },
    },
  },
  {
    id: "case-056",
    difficulty: "medium",
    tags: ["not-a-departure", "cross-cultural"],
    title: { en: "Empty Lunch Slots", zh: "空出来的午饭时段" },
    intro: {
      en: "For a month, a group of coworkers blocks every lunch slot and skips the cafeteria.",
      zh: "有一个月，一群同事把每天的午饭时段都屏蔽了，也不去食堂。",
    },
    telemetry: [
      { key: { en: "Lunch Slots", zh: "午饭时段" }, value: { en: "Blocked, 1 month", zh: "屏蔽，持续一个月" }, status: "normal" },
      { key: { en: "Affected Group", zh: "受影响人群" }, value: { en: "A subset", zh: "一部分人" }, status: "normal" },
      { key: { en: "Evening Activity", zh: "傍晚活动" }, value: { en: "Picks up after sunset", zh: "日落后变活跃" }, status: "normal" },
      { key: { en: "Org Chart", zh: "组织架构" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "diet", label: { en: "Office Diet Challenge", zh: "办公室减肥比赛" } },
      { id: "ramadan", label: { en: "Ramadan Fasting", zh: "斋月斋戒" } },
      { id: "layoff", label: { en: "Quiet Layoff", zh: "悄悄裁员" } },
      { id: "outage", label: { en: "Cafeteria Closed", zh: "食堂关了" } },
    ],
    answer: "ramadan",
    explanation: {
      en: "A month long, a subset of people, lunch consistently skipped, and activity that picks up after sunset. This is Ramadan: fasting through the day, active again after sundown. The calendar gap is observance, not absence.",
      zh: "持续一个月、只涉及一部分人、午饭固定不吃、日落之后又活跃起来，这是斋月，白天斋戒，日落后再恢复活动，日历上的那段空白是斋戒，不是缺勤。",
    },
    resultFlavor: {
      correct: { en: "Correct. They are fasting, not fading. Iftar is after sunset.", zh: "正确，人家在斋戒，不是在消失，开饭得等日落。" },
      wrong: { en: "You read a religious observance as a layoff. Wish them Ramadan Mubarak instead.", zh: "你把一项宗教习俗读成了裁员，不如祝他们斋月安康。" },
    },
  },
  {
    id: "case-057",
    difficulty: "easy",
    tags: ["not-a-departure", "cross-cultural"],
    title: { en: "The India Office Goes Quiet", zh: "印度办公室安静了" },
    intro: {
      en: "Your India-based colleagues all take leave the same week in autumn, lights-festival season.",
      zh: "你在印度的同事们都在秋天同一周请假，正是灯火节的时候。",
    },
    telemetry: [
      { key: { en: "Affected Office", zh: "受影响办公室" }, value: { en: "India", zh: "印度" }, status: "normal" },
      { key: { en: "Timing", zh: "时间" }, value: { en: "Autumn, one week", zh: "秋天，一周" }, status: "normal" },
      { key: { en: "OOF Note", zh: "自动回复" }, value: { en: "'Festival holiday'", zh: "“节日假期”" }, status: "normal" },
      { key: { en: "Org Chart", zh: "组织架构" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "layoff", label: { en: "Site Closure", zh: "站点关闭" } },
      { id: "diwali", label: { en: "Diwali Holiday", zh: "排灯节假期" } },
      { id: "reorg", label: { en: "Reorg", zh: "重组" } },
      { id: "outage", label: { en: "Outage", zh: "故障" } },
    ],
    answer: "diwali",
    explanation: {
      en: "India office, one week in autumn, and out-of-office notes that say 'festival holiday'. This is Diwali, the festival of lights. The site is not closing; everyone is home lighting lamps. They will be back next week.",
      zh: "印度办公室、秋天的一周、自动回复写着“节日假期”，这是排灯节，灯火节，站点没有要关，大家都回家点灯去了，下周就回来。",
    },
    resultFlavor: {
      correct: { en: "Correct. They are lighting diyas, not packing boxes. Happy Diwali.", zh: "正确，人家在点油灯，不是在收拾箱子，排灯节快乐。" },
      wrong: { en: "You read a festival of lights as a site shutdown. Send sweets, not severance.", zh: "你把灯火节读成了站点关停，该送的是甜点，不是遣散费。" },
    },
  },
  {
    id: "case-058",
    difficulty: "hard",
    tags: ["security"],
    title: { en: "Badge Works, Login Doesn't", zh: "门禁能用，登录不行" },
    intro: {
      en: "A coworker can badge into the building but cannot log into anything since this morning.",
      zh: "一位同事今早开始能刷门禁进楼，却登录不了任何系统。",
    },
    telemetry: [
      { key: { en: "Badge Access", zh: "门禁" }, value: { en: "Works", zh: "正常" }, status: "normal" },
      { key: { en: "Login", zh: "登录" }, value: { en: "Fails everywhere", zh: "处处失败" }, status: "alarming" },
      { key: { en: "Cert Status", zh: "证书状态" }, value: { en: "Expired today", zh: "今天过期" }, status: "alarming" },
      { key: { en: "Person Status", zh: "本人状态" }, value: { en: "Employed", zh: "在职" }, status: "normal" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "fired", label: { en: "Being Locked Out / Fired", zh: "被锁定 / 开除" } },
      { id: "cert_expiry", label: { en: "Auth Certificate Expired", zh: "证书过期" } },
      { id: "hacked", label: { en: "Account Hacked", zh: "账号被黑" } },
      { id: "quit", label: { en: "Quit", zh: "离职了" } },
    ],
    answer: "cert_expiry",
    explanation: {
      en: "Physical badge works but every login fails, and the auth certificate expired today. Building access and digital auth run on different systems; only the cert lapsed. Renew it and they are back. Termination would kill the badge too.",
      zh: "实体门禁能用、但所有登录都失败、认证证书恰好今天过期，门禁和数字认证跑在不同系统上，过期的只是证书，续一下就回来了，真要是开除，连门禁也会一起停掉。",
    },
    resultFlavor: {
      correct: { en: "Correct. The cert lapsed, not the job. Renew and resume.", zh: "正确，过期的是证书，不是工作，续期就能继续。" },
      wrong: { en: "You read an expired cert as a firing. Their badge still opens the door, remember?", zh: "你把一张过期证书读成了开除，可 TA 的门卡还能开门，记得吗？" },
    },
  },
  {
    id: "case-059",
    difficulty: "hard",
    tags: ["insufficient-telemetry", "ghost"],
    title: { en: "They Didn't Know Either", zh: "连 TA 自己都不知道" },
    intro: {
      en: "The system says a coworker moved teams. The coworker says they have no idea what you mean.",
      zh: "系统说一位同事转组了，可这位同事说 TA 完全不知道你在讲什么。",
    },
    telemetry: [
      { key: { en: "System Says", zh: "系统显示" }, value: { en: "Moved teams", zh: "已转组" }, status: "warning" },
      { key: { en: "Person Says", zh: "本人说法" }, value: { en: "News to them", zh: "头一回听说" }, status: "alarming" },
      { key: { en: "Effective Date", zh: "生效日期" }, value: { en: "Future / unclear", zh: "未来 / 不明" }, status: "unknown" },
      { key: { en: "Manager Field", zh: "manager 字段" }, value: { en: "Two values disagree", zh: "两个值打架" }, status: "alarming" },
      { key: { en: "Profile", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "transfer", label: { en: "Definitely a Transfer", zh: "肯定是转组" } },
      { id: "data_bug", label: { en: "Definitely Just a Bug", zh: "肯定只是 bug" } },
      { id: "pending_reorg", label: { en: "An Unannounced Reorg", zh: "还没宣布的重组" } },
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
    ],
    answer: "none",
    actualCause: { en: "System vs Reality Disagree, Can't Tell", zh: "系统与现实打架，判不了" },
    explanation: {
      en: "The system says moved, the person says it is news to them, the effective date is unclear, and the manager field holds two values that disagree. When the record and the human contradict each other and nothing breaks the tie, you cannot resolve it from telemetry. Go ask a human.",
      zh: "系统说转了、本人说头一回听说、生效日期不明、manager 字段还存着两个互相打架的值，当记录和真人对不上、又没有任何东西能一锤定音时，你光靠数据是判不出来的，去问个活人吧。",
    },
    resultFlavor: {
      correct: { en: "Correct. When the record and the human disagree, telemetry is not the referee.", zh: "正确，当记录和真人各执一词时，数据当不了裁判。" },
      wrong: { en: "You trusted the record over the person it describes. The person was standing right there.", zh: "你信了记录，却没信记录描述的那个人，而那个人就站在你面前。" },
    },
  },
  {
    id: "case-060",
    difficulty: "hard",
    tags: ["joke", "bad-end", "it-was-the-backend"],
    title: { en: "The Detective Is Missing", zh: "侦探不见了" },
    intro: {
      en: "You open the directory to check yourself. Your own entry is gone. Manager: unknown.",
      zh: "你打开目录想查查自己，结果你自己的条目没了，manager：未知。",
    },
    telemetry: [
      { key: { en: "Your Photo", zh: "你的头像" }, value: { en: "Missing", zh: "消失" }, status: "warning" },
      { key: { en: "Your GAL", zh: "你的 GAL（地址簿）" }, value: { en: "Not found", zh: "查无此人" }, status: "alarming" },
      { key: { en: "Your Manager", zh: "你的 manager" }, value: { en: "Unknown", zh: "未知" }, status: "unknown" },
      { key: { en: "Your Last Login", zh: "你的上次登录" }, value: { en: "Right now", zh: "就是现在" }, status: "normal" },
      { key: { en: "Sync Job", zh: "同步任务" }, value: { en: "Running", zh: "运行中" }, status: "warning" },
    ],
    choices: [
      { id: "fired", label: { en: "You Got Fired", zh: "你被开了" } },
      { id: "sync_failure", label: { en: "It's Just Sync (Again)", zh: "又是同步（老样子）" } },
      { id: "ghost", label: { en: "You Are The Ghost Now", zh: "你成了那个幽灵" } },
      { id: "none", label: { en: "Cannot Investigate Yourself", zh: "查不了你自己" } },
    ],
    answer: "sync_failure",
    explanation: {
      en: "Your photo is gone and your GAL is not found, yet your last login is right now and a sync job is mid-run. You are demonstrably here, reading this. Everything you learned about case-001 applies to you too: it is just sync, again.",
      zh: "你的头像没了、地址簿里查无此人，可你的上次登录就是刚刚，同步任务也正在跑，你明明就在这儿读着这行字，case-001 教给你的一切同样适用于你自己：又是同步，老样子。",
    },
    resultFlavor: {
      correct: { en: "Correct. You disappeared from the directory, not from existence. Refresh in five minutes.", zh: "正确，你只是从目录里消失了，不是从世界上消失了，五分钟后刷新一下。" },
      wrong: { en: "BAD END: You concluded you were fired, then logged off forever. The sync job finished two minutes later.", zh: "BAD END：你认定自己被开了，然后你开始打包东西，两分钟后，那个同步任务跑完了。" },
    },
  },
  {
    id: "case-061",
    difficulty: "easy",
    tags: ["promo", "politics"],
    title: { en: "Promo Season Mirage", zh: "升职季的海市蜃楼" },
    intro: {
      en: "A peer suddenly shows up in every leadership meeting, but their title hasn't changed.",
      zh: "一位同事突然出现在每一场 leadership 会议里，但 title 一点没变。",
    },
    telemetry: [
      { key: { en: "Calendar", zh: "日历" }, value: { en: "Full of leadership syncs", zh: "塞满 leadership 同步" }, status: "warning" },
      { key: { en: "Title", zh: "Title" }, value: { en: "Unchanged", zh: "不变" }, status: "normal" },
      { key: { en: "Promo Packet", zh: "晋升材料" }, value: { en: "In progress", zh: "进行中" }, status: "warning" },
      { key: { en: "Comp", zh: "薪资" }, value: { en: "Unchanged", zh: "不变" }, status: "normal" },
      { key: { en: "Manager", zh: "manager" }, value: { en: "Same", zh: "不变" }, status: "normal" },
    ],
    choices: [
      { id: "already_promoted", label: { en: "Already Promoted", zh: "已经升了" } },
      { id: "promo_in_progress", label: { en: "Promo Packet In Calibration", zh: "晋升材料在 calibration" } },
      { id: "managed_out", label: { en: "Being Managed Out", zh: "在被劝退" } },
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
    ],
    answer: "promo_in_progress",
    explanation: {
      en: "Lots of leadership exposure, a packet in progress, but title and comp unchanged. They're being prepped for promo, not promoted. Hold the congratulations.",
      zh: "大量 leadership 露脸 + 材料进行中，但 title 和薪资都没变。是在为晋升铺路，还没成。先别急着道贺。",
    },
    resultFlavor: {
      correct: { en: "Correct. They're pre-promo, not promoted. Hold the LinkedIn post.", zh: "正确。是晋升前夜，不是已晋升，先别发朋友圈。" },
      wrong: { en: "You congratulated someone whose packet can still get dinged in calibration.", zh: "你恭喜了一个还可能在 calibration 被刷下来的人。" },
    },
  },
  {
    id: "case-062",
    difficulty: "easy",
    tags: ["reorg", "politics"],
    title: { en: "The Rebrand Reorg", zh: "换皮重组" },
    intro: {
      en: "A VP announced a 'new charter' for the team. Same people, same code, new mission statement.",
      zh: "一位 VP 给团队宣布了“新使命”。还是原班人马、原来的代码，只是换了句愿景。",
    },
    telemetry: [
      { key: { en: "Team Roster", zh: "团队名单" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "Mission Statement", zh: "使命愿景" }, value: { en: "Brand new", zh: "全新" }, status: "warning" },
      { key: { en: "Codebase", zh: "代码库" }, value: { en: "Same repo", zh: "同一个 repo" }, status: "normal" },
      { key: { en: "Manager", zh: "manager" }, value: { en: "Same", zh: "不变" }, status: "normal" },
      { key: { en: "Slogan", zh: "口号" }, value: { en: "'AI-first', now", zh: "现在叫“AI 优先”" }, status: "unknown" },
    ],
    choices: [
      { id: "real_reorg", label: { en: "A Real Reorg", zh: "真重组" } },
      { id: "rebrand", label: { en: "Just a Rebrand", zh: "只是改名" } },
      { id: "layoff", label: { en: "Layoff Incoming", zh: "裁员要来" } },
      { id: "budget_cut", label: { en: "Budget Cut", zh: "预算削减" } },
    ],
    answer: "rebrand",
    explanation: {
      en: "People, code, and manager are all unchanged; only the mission statement and slogan moved. This is a slide-deck reorg. Next quarter it gets renamed again.",
      zh: "人、代码、manager 都没变，变的只有愿景和口号。这是一次 PPT 重组，下季度还会再改个名。",
    },
    resultFlavor: {
      correct: { en: "Correct. The org chart didn't move; the font did.", zh: "正确。动的不是组织架构，是 PPT 的字体。" },
      wrong: { en: "You prepped for a reorg that lives entirely in a slide deck.", zh: "你为一次只活在 PPT 里的重组过度准备了一吨咖啡。" },
    },
  },
  {
    id: "case-063",
    difficulty: "easy",
    tags: ["rto", "politics"],
    title: { en: "The Badge Swipe Spike", zh: "门禁刷卡暴增" },
    intro: {
      en: "Office badge swipes for a whole floor tripled overnight.",
      zh: "整层楼的门禁刷卡量一夜之间翻了三倍。",
    },
    telemetry: [
      { key: { en: "Badge Swipes", zh: "门禁刷卡" }, value: { en: "3x overnight", zh: "一夜 3 倍" }, status: "warning" },
      { key: { en: "Date", zh: "日期" }, value: { en: "Matches RTO deadline", zh: "正好是 RTO 截止日" }, status: "normal" },
      { key: { en: "Productivity", zh: "产出" }, value: { en: "Flat", zh: "持平" }, status: "normal" },
      { key: { en: "Headcount", zh: "人数" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "Cafeteria Line", zh: "食堂排队" }, value: { en: "Brutal", zh: "惨烈" }, status: "alarming" },
    ],
    choices: [
      { id: "hiring_surge", label: { en: "Hiring Surge", zh: "大举招人" } },
      { id: "rto_mandate", label: { en: "Return-to-Office Mandate", zh: "回办公室政策" } },
      { id: "audit", label: { en: "Surprise Audit", zh: "突击审计" } },
      { id: "hackathon", label: { en: "Hackathon", zh: "Hackathon" } },
    ],
    answer: "rto_mandate",
    explanation: {
      en: "The swipe spike lands exactly on the RTO deadline, headcount is flat, and the only casualty is the cafeteria line. People aren't more dedicated; they're more monitored.",
      zh: "刷卡暴增的事情恰好踩在 RTO 截止日，人数没变，唯一的受害者是食堂和卫生间的工作人员。大家不是更敬业了，是更被盯着了。",
    },
    resultFlavor: {
      correct: { en: "Correct. Nobody got passionate; the badge reader did.", zh: "正确。没人突然热爱工作，是门禁系统热爱了。" },
      wrong: { en: "You read a mandate as a motivation renaissance.", zh: "你把一道行政命令读成了奋斗文艺复兴。" },
    },
  },
  {
    id: "case-064",
    difficulty: "easy",
    tags: ["meeting", "politics"],
    title: { en: "The Skip-Level 'Quick Chat'", zh: "隔级的“随便聊聊”" },
    intro: {
      en: "Your skip-level manager sent a surprise 1:1 invite titled 'quick chat'.",
      zh: "你的隔级老板突然发来一个 1:1 邀请，标题是“随便聊聊”。",
    },
    telemetry: [
      { key: { en: "Invite Title", zh: "邀请标题" }, value: { en: "'quick chat'", zh: "“随便聊聊”" }, status: "warning" },
      { key: { en: "Cadence", zh: "频率" }, value: { en: "First ever", zh: "史上第一次" }, status: "unknown" },
      { key: { en: "HR Attendee", zh: "HR 参会" }, value: { en: "None", zh: "没有" }, status: "normal" },
      { key: { en: "Your Perf", zh: "你的绩效" }, value: { en: "On track", zh: "正常" }, status: "normal" },
      { key: { en: "Other Invitees", zh: "其他被邀" }, value: { en: "Several peers too", zh: "好几个同事也收到" }, status: "normal" },
    ],
    choices: [
      { id: "getting_fired", label: { en: "Getting Fired", zh: "要被开了" } },
      { id: "routine_skip_level", label: { en: "Routine Skip-Level 1:1", zh: "例行隔级沟通" } },
      { id: "secret_promotion", label: { en: "Secret Promotion", zh: "秘密升职" } },
      { id: "pip", label: { en: "PIP Warning", zh: "要进 PIP" } },
    ],
    answer: "routine_skip_level",
    explanation: {
      en: "No HR in the room, your perf is on track, and several peers got the same invite. This is a skip-level box-checking exercise, not an ambush. Breathe.",
      zh: "房间里没有 HR、你绩效正常、好几个同事也收到了同样的邀请。这是隔级沟通的例行打卡，不是埋伏。深呼吸，放松一点。",
    },
    resultFlavor: {
      correct: { en: "Correct. No HR, no ambush. Just a calendar checkbox.", zh: "正确。没有 HR 就没有埋伏，只是日历上的一个打勾项。" },
      wrong: { en: "You drafted a resignation over a 'quick chat' with no HR in sight.", zh: "你为一场连 HR 都没有的“随便聊聊”写好了愤怒的辞职信。" },
    },
  },
  {
    id: "case-065",
    difficulty: "medium",
    tags: ["meeting", "politics"],
    title: { en: "Let's Take This Offline", zh: "我们线下聊" },
    intro: {
      en: "In a 30-person meeting, your manager said 'let's take this offline' and moved your topic to a DM.",
      zh: "在 30 人的大会上，你的老板说“我们线下聊”，把你的话题挪到了私聊。",
    },
    telemetry: [
      { key: { en: "Public Discussion", zh: "公开讨论" }, value: { en: "Stopped", zh: "被叫停" }, status: "warning" },
      { key: { en: "DM Thread", zh: "私聊" }, value: { en: "Opened, neutral", zh: "已开，语气中性" }, status: "normal" },
      { key: { en: "Audience", zh: "听众" }, value: { en: "Was 30 people", zh: "刚才有 30 人" }, status: "normal" },
      { key: { en: "Decision", zh: "决定" }, value: { en: "Deferred", zh: "推迟" }, status: "unknown" },
      { key: { en: "Tone", zh: "语气" }, value: { en: "Calm", zh: "平静" }, status: "normal" },
    ],
    choices: [
      { id: "being_silenced", label: { en: "Being Silenced", zh: "被消音" } },
      { id: "avoiding_audience", label: { en: "Just Avoiding a Big Audience", zh: "只是不想当众细聊" } },
      { id: "bad_news", label: { en: "Secret Bad News", zh: "藏着坏消息" } },
      { id: "project_cancelled", label: { en: "Project Cancelled", zh: "项目被砍" } },
    ],
    answer: "avoiding_audience",
    explanation: {
      en: "Neutral tone, a normal DM thread, decision merely deferred. 'Take this offline' usually means 'this is too detailed for 29 bored people', not 'you're in trouble'.",
      zh: "语气中性、私聊正常、决定只是推迟。“线下聊”通常是这事对另外 29 个无聊的人太细了，或者暴露了太多丑陋的技术问题，而不是“你摊上事了”。",
    },
    resultFlavor: {
      correct: { en: "Correct. It was bandwidth, not a burn notice.", zh: "正确。那是为了省时间，不是封杀令。" },
      wrong: { en: "You heard 'offline' and assumed 'off the team'.", zh: "你听到“线下”就脑补成了“下岗”。" },
    },
  },
  {
    id: "case-066",
    difficulty: "medium",
    tags: ["calendar", "politics"],
    title: { en: "Calendar Full of Holds", zh: "日历塞满了 HOLD" },
    intro: {
      en: "Your manager's calendar is suddenly wall-to-wall 'HOLD' blocks.",
      zh: "你老板的日历突然被一排“HOLD”占满了。",
    },
    telemetry: [
      { key: { en: "Hold Blocks", zh: "HOLD 时段" }, value: { en: "Many", zh: "一大堆" }, status: "warning" },
      { key: { en: "Titles", zh: "标题" }, value: { en: "Generic 'HOLD'", zh: "统一“HOLD”" }, status: "unknown" },
      { key: { en: "Recruiting Tool", zh: "招聘系统" }, value: { en: "Active", zh: "活跃" }, status: "normal" },
      { key: { en: "Season", zh: "时节" }, value: { en: "Hiring ramp", zh: "加招期" }, status: "normal" },
      { key: { en: "Your 1:1s", zh: "你的 1:1" }, value: { en: "Still happening", zh: "照常" }, status: "normal" },
    ],
    choices: [
      { id: "planning_layoffs", label: { en: "Planning Layoffs", zh: "在策划裁员" } },
      { id: "interview_slots", label: { en: "Holding Interview & Focus Slots", zh: "占住面试与专注时段" } },
      { id: "job_hunting", label: { en: "Manager Job-Hunting", zh: "老板在找工作" } },
      { id: "burnout_leave", label: { en: "Burnout Leave", zh: "过劳休假" } },
    ],
    answer: "interview_slots",
    explanation: {
      en: "The recruiting tool is active during a hiring ramp, and your 1:1s still happen. Those 'HOLD' blocks are interview loops and focus time, not a secret layoff war room.",
      zh: "招聘系统在加招期里很活跃，你的 1:1 也照常。那些“HOLD”是面试 loop 和专注时间，不是秘密裁员作战室。",
    },
    resultFlavor: {
      correct: { en: "Correct. The holds are for hiring, not firing.", zh: "正确。占的是招人的坑，不是裁人的坑。" },
      wrong: { en: "You read interview holds as a layoff calendar.", zh: "你把面试占位读成了裁员日历。" },
    },
  },
  {
    id: "case-067",
    difficulty: "hard",
    tags: ["insufficient-telemetry", "meta"],
    title: {
      en: "The Missing Models",
      zh: "消失的模型"
    },
    intro: {
      en: "You're working on your little game project when all your usual AI tools suddenly become unavailable. Only the smallest model remains.",
      zh: "你正在做你的小游戏，你常用的 AI 工具突然全没了。只剩个最小的模型还活着。"
    },
    telemetry: [
      {
        key: { en: "Claude Opus", zh: "Claude Opus" },
        value: { en: "Unavailable", zh: "无法使用" },
        status: "alarming"
      },
      {
        key: { en: "Claude Sonnet", zh: "Claude Sonnet" },
        value: { en: "Unavailable", zh: "无法使用" },
        status: "alarming"
      },
      {
        key: { en: "GPT-5", zh: "GPT-5" },
        value: { en: "Unavailable", zh: "无法使用" },
        status: "alarming"
      },
      {
        key: { en: "Claude Haiku", zh: "Claude Haiku" },
        value: { en: "Available", zh: "可用" },
        status: "normal"
      },
      {
        key: { en: "Recent Activity", zh: "近期活动" },
        value: { en: "Built Core Identity Detective", zh: "在开发小游戏" },
        status: "warning"
      },
    ],
    choices: [
      { id: "security", label: { en: "Security Investigation", zh: "安全调查" } },
      { id: "manager", label: { en: "Manager Escalation", zh: "manager 已经知道了" } },
      { id: "quota", label: { en: "Quota Exhausted", zh: "配额用尽" } },
      { id: "layoff", label: { en: "Layoff Signal", zh: "裁员信号" } },
    ],
    answer: "quota",
    explanation: {
      en: "The telemetry was accurate. The theory was not. You built a detective game about reading corporate signals and completely misread your own.",
      zh: "数据是准确的。理论不是。你做了个关于“读懂企业信号”的游戏，却完全误读了自己的。"
    },
    resultFlavor: {
      correct: {
        en: "Correct. Occam's Razor: the simplest explanation is usually right. Also the most expensive.",
        zh: "正确。奥卡姆剃刀：最简单的解释往往就是对的。也是最贵的。"
      },
      wrong: {
        en: "You believed the company was surveilling your side project. They were just billing you.",
        zh: "你以为公司在监视你的副业项目。其实人家只是在算账。"
      },
    },
  },
  {
    id: "case-068",
    difficulty: "easy",
    tags: ["reorg", "politics"],
    title: { en: "New VP Reply-All Storm", zh: "新 VP 的全员回复风暴" },
    intro: {
      en: "A new VP sent a warm reply-all intro, and 200 'welcome!' replies followed.",
      zh: "一位新 VP 发了热情洋溢的全员介绍信，紧接着是 200 封“欢迎！”回复。",
    },
    telemetry: [
      { key: { en: "Reply-All Count", zh: "全员回复数" }, value: { en: "200+", zh: "200+" }, status: "alarming" },
      { key: { en: "VP Status", zh: "VP 状态" }, value: { en: "New hire", zh: "新入职" }, status: "normal" },
      { key: { en: "Your Mailbox", zh: "你的收件箱" }, value: { en: "Melting", zh: "快烧了" }, status: "warning" },
      { key: { en: "Reorg Memo", zh: "重组备忘" }, value: { en: "None yet", zh: "暂无" }, status: "unknown" },
      { key: { en: "Pet Project", zh: "Pet Project" }, value: { en: "'Coming soon'", zh: "“敬请期待”" }, status: "unknown" },
    ],
    choices: [
      { id: "mass_chaos", label: { en: "Mass Chaos", zh: "全面混乱" } },
      { id: "vp_honeymoon", label: { en: "New VP Honeymoon", zh: "新 VP 蜜月期" } },
      { id: "email_breach", label: { en: "Email Breach", zh: "邮件被入侵" } },
      { id: "layoff", label: { en: "Layoff Announcement", zh: "裁员公告" } },
    ],
    answer: "vp_honeymoon",
    explanation: {
      en: "It's a brand-new VP, no reorg memo yet, and a 'coming soon' pet project. The only real damage is your inbox. Enjoy the honeymoon; the reorg comes next quarter.",
      zh: "一位全新的 VP、还没有重组计划、外加一个“敬请期待”的 pet project。唯一真正的损失是你的收件箱。好好享受蜜月期，重组下季度才来。",
    },
    resultFlavor: {
      correct: { en: "Correct. It's a honeymoon, not a meltdown. Mute the thread.", zh: "正确。这是蜜月期，赶紧把这个会话静音吧。" },
      wrong: { en: "You treated reply-all enthusiasm as a breach.", zh: "你把全员回复的热情当成了安全事故。" },
    },
  },
  {
    id: "case-069",
    difficulty: "medium",
    tags: ["budget", "politics"],
    title: { en: "Headcount Frozen", zh: "HC 冻结" },
    intro: {
      en: "An open role you were hiring for vanished from the system.",
      zh: "一个你正在招的空缺岗位从系统里消失了。",
    },
    telemetry: [
      { key: { en: "Req Status", zh: "招聘需求" }, value: { en: "Closed", zh: "已关闭" }, status: "warning" },
      { key: { en: "Reason", zh: "原因" }, value: { en: "'Headcount freeze'", zh: "“HC 冻结”" }, status: "warning" },
      { key: { en: "Existing Team", zh: "现有团队" }, value: { en: "Intact", zh: "完好" }, status: "normal" },
      { key: { en: "Layoff Memo", zh: "裁员备忘" }, value: { en: "None", zh: "无" }, status: "normal" },
      { key: { en: "Budget", zh: "预算" }, value: { en: "'Reassessing'", zh: "“重新评估中”" }, status: "unknown" },
    ],
    choices: [
      { id: "team_being_cut", label: { en: "Team Being Cut", zh: "团队要被砍" } },
      { id: "hiring_freeze", label: { en: "Hiring / Budget Freeze", zh: "招聘 / 预算冻结" } },
      { id: "role_was_fake", label: { en: "Role Was Never Real", zh: "岗位本就是假的" } },
      { id: "manager_quit", label: { en: "Manager Quit", zh: "manager 跑了" } },
    ],
    answer: "hiring_freeze",
    explanation: {
      en: "The req closed with a 'headcount freeze' reason, the existing team is intact, and there's no layoff memo. They're not cutting people; they just won't add them. The work, of course, stays.",
      zh: "req 以“HC 冻结”为由关闭、现有团队完好、也没有裁员备忘。他们不是要裁人，只是不再加人。当然，活还是那些活。",
    },
    resultFlavor: {
      correct: { en: "Correct. They froze the req, not the team.", zh: "正确。冻的是招聘需求，不是团队。" },
      wrong: { en: "You read a hiring freeze as a team funeral.", zh: "你把招聘冻结读成了团队葬礼。" },
    },
  },
  {
    id: "case-070",
    difficulty: "hard",
    tags: ["ambiguous", "politics"],
    title: { en: "Moved to Special Projects", zh: "调去“特别项目”" },
    intro: {
      en: "A senior leader was quietly moved to 'Special Projects, reporting to the CEO'.",
      zh: "一位资深领导被悄悄调去“特别项目，直接向 CEO 汇报”。",
    },
    telemetry: [
      { key: { en: "New Title", zh: "新头衔" }, value: { en: "'Special Projects'", zh: "“特别项目”" }, status: "warning" },
      { key: { en: "Reports To", zh: "汇报对象" }, value: { en: "CEO", zh: "CEO" }, status: "unknown" },
      { key: { en: "Team", zh: "团队" }, value: { en: "Removed", zh: "已剥离" }, status: "alarming" },
      { key: { en: "Comp", zh: "薪资" }, value: { en: "Unchanged", zh: "不变" }, status: "normal" },
      { key: { en: "Calendar", zh: "日历" }, value: { en: "Mostly empty", zh: "基本空了" }, status: "alarming" },
    ],
    choices: [
      { id: "promotion", label: { en: "Big Promotion", zh: "重磅升职" } },
      { id: "parachute", label: { en: "Golden Parachute", zh: "金色降落伞" } },
      { id: "strategic", label: { en: "Truly Strategic Role", zh: "真的战略要职" } },
      { id: "none", label: { en: "Impossible to Tell", zh: "根本判断不了" } },
    ],
    answer: "none",
    actualCause: { en: "Glory or the Departure Lounge — Unknowable", zh: "是重用还是离场休息室，无从得知" },
    explanation: {
      en: "'Special Projects reporting to the CEO' with no team and an empty calendar is the most ambiguous status in tech. It's either a kingmaker role or a dignified exit ramp. From here, nobody can tell.",
      zh: "“特别项目、直接向 CEO 汇报”、没有团队、日历空空，这是科技公司里最暧昧的状态。它要么是造王者的位置，要么是体面的离场坡道。光看这些，谁也说不准。",
    },
    resultFlavor: {
      correct: { en: "No one can call this. 'Special Projects' is Schrodinger's promotion.", zh: "这题没人能下结论。“特别项目”是薛定谔的升职。" },
      wrong: { en: "No one can call this. 'Special Projects' is Schrodinger's promotion.", zh: "这题没人能下结论。“特别项目”是薛定谔的升职。" },
    },
  },
  {
    id: "case-071",
    difficulty: "medium",
    tags: ["politics"],
    title: { en: "Mentor Went Quiet", zh: "Mentor 突然没声了" },
    intro: {
      en: "Your mentor stopped replying to your messages for two weeks.",
      zh: "你的 mentor 连续两周不回你消息了。",
    },
    telemetry: [
      { key: { en: "Replies", zh: "回复" }, value: { en: "None", zh: "没有" }, status: "warning" },
      { key: { en: "Their Calendar", zh: "他们的日历" }, value: { en: "Back-to-back planning", zh: "排满了 planning" }, status: "normal" },
      { key: { en: "Season", zh: "时节" }, value: { en: "Annual planning", zh: "年度规划季" }, status: "normal" },
      { key: { en: "Last Message", zh: "上一条消息" }, value: { en: "Friendly", zh: "很友好" }, status: "normal" },
      { key: { en: "Status", zh: "状态" }, value: { en: "'Heads down'", zh: "“专注中”" }, status: "normal" },
    ],
    choices: [
      { id: "avoiding_you", label: { en: "Avoiding You", zh: "在躲你" } },
      { id: "planning_busy", label: { en: "Buried in Planning Season", zh: "被 TODO List 埋了" } },
      { id: "about_to_quit", label: { en: "About to Quit", zh: "要离职了" } },
      { id: "you_messed_up", label: { en: "You Did Something Wrong", zh: "你做错了什么" } },
    ],
    answer: "planning_busy",
    explanation: {
      en: "Their calendar is wall-to-wall planning, last message was friendly, status says 'heads down'. It's not about you. During planning season, everyone above you disappears into spreadsheets.",
      zh: "他们的日历全是 planning、上一条消息还很友好、状态写着“专注中”。这跟你无关。一到规划季，你头上的人都消失进了表格里。",
    },
    resultFlavor: {
      correct: { en: "Correct. It's planning season, not personal.", zh: "正确。是规划季，不是针对你。" },
      wrong: { en: "You assumed silence meant judgment. It meant spreadsheets.", zh: "你以为沉默是评判，其实是表格。" },
    },
  },
  {
    id: "case-072",
    difficulty: "medium",
    tags: ["politics"],
    title: { en: "Skip Started 1:1ing Your Peer", zh: "隔级开始单独约你同事" },
    intro: {
      en: "Your skip-level started weekly 1:1s with your peer, but not you.",
      zh: "你的隔级老板开始每周跟你同事 1:1，却没找你。",
    },
    telemetry: [
      { key: { en: "Peer 1:1", zh: "同事的 1:1" }, value: { en: "New, weekly", zh: "新增，每周" }, status: "warning" },
      { key: { en: "Your 1:1", zh: "你的 1:1" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "Your Manager", zh: "你的 manager" }, value: { en: "On leave soon", zh: "即将休假" }, status: "normal" },
      { key: { en: "Peer Role", zh: "同事角色" }, value: { en: "Covering for manager", zh: "代管 manager 职责" }, status: "normal" },
      { key: { en: "Perf Gap", zh: "绩效差距" }, value: { en: "None", zh: "无" }, status: "normal" },
    ],
    choices: [
      { id: "peer_groomed", label: { en: "Peer Being Groomed", zh: "同事在被培养上位" } },
      { id: "interim_coverage", label: { en: "Interim Coverage During Leave", zh: "休假期间临时代管" } },
      { id: "youre_sidelined", label: { en: "You're Being Sidelined", zh: "你被边缘化了" } },
      { id: "peer_promoted", label: { en: "Peer Got Promoted", zh: "同事升职了" } },
    ],
    answer: "interim_coverage",
    explanation: {
      en: "Your manager is about to go on leave and your peer is covering. The new 1:1 is logistics, not favoritism. Your own 1:1 didn't change, and there's no perf gap. Gossip, defeated.",
      zh: "你的 manager 即将休假，你的同事在代管。那个新 1:1 是工作交接，不是偏心。你自己的 1:1 没变，绩效也没差距。八卦，败。",
    },
    resultFlavor: {
      correct: { en: "Correct. It's coverage logistics, not a coronation.", zh: "正确。那是代管安排，不是加冕。" },
      wrong: { en: "You read a leave-coverage 1:1 as your own sidelining.", zh: "你把一次休假代管的 1:1 读成了自己被边缘化。" },
    },
  },
  {
    id: "case-073",
    difficulty: "easy",
    tags: ["politics"],
    title: { en: "The Stretch Project", zh: "Stretch 项目" },
    intro: {
      en: "You were handed a high-visibility 'stretch project' — no extra pay, no title change.",
      zh: "你被塞了一个高曝光的“stretch 项目”，不加薪、不升职。",
    },
    telemetry: [
      { key: { en: "Visibility", zh: "曝光度" }, value: { en: "High", zh: "高" }, status: "warning" },
      { key: { en: "Comp", zh: "薪资" }, value: { en: "Unchanged", zh: "不变" }, status: "normal" },
      { key: { en: "Title", zh: "Title" }, value: { en: "Unchanged", zh: "不变" }, status: "normal" },
      { key: { en: "Owner", zh: "负责人" }, value: { en: "You", zh: "你" }, status: "normal" },
      { key: { en: "Promo Promise", zh: "晋升承诺" }, value: { en: "'We'll see'", zh: "“再看看”" }, status: "unknown" },
    ],
    choices: [
      { id: "promo_path", label: { en: "Secret Promotion Path", zh: "隐藏的升职路径" } },
      { id: "glory_no_pay", label: { en: "Glory Work With No Comp", zh: "只有光环没有报酬的活" } },
      { id: "set_up_to_fail", label: { en: "Being Set Up to Fail", zh: "被设局背锅" } },
      { id: "demotion", label: { en: "Demotion", zh: "降级" } },
    ],
    answer: "glory_no_pay",
    explanation: {
      en: "High visibility, unchanged comp and title, and a 'we'll see' on promo. This is classic stretch work: you do the labor now and maybe get credit later. Get the promo criteria in writing.",
      zh: "高曝光、薪资和 title 不变、晋升只给个“再看看”。这是经典的 stretch 活：你现在干活，credit 也许以后给。把晋升标准要成白纸黑字。",
    },
    resultFlavor: {
      correct: { en: "Correct. It's glory now, comp maybe never. Get it in writing.", zh: "正确。光环马上有，报酬也许永远没有。落到纸面上。" },
      wrong: { en: "You took 'stretch' as a guaranteed promo. It's a guaranteed workload.", zh: "你把“stretch”当成了稳的晋升，其实稳的只是工作量。" },
    },
  },
  {
    id: "case-074",
    difficulty: "medium",
    tags: ["perf", "politics"],
    title: { en: "'Meets Expectations' Panic", zh: "“达到预期”恐慌" },
    intro: {
      en: "Your review said 'Meets Expectations' and you spiraled.",
      zh: "你的绩效写着“达到预期”，然后你就开始内耗。",
    },
    telemetry: [
      { key: { en: "Rating", zh: "评级" }, value: { en: "'Meets Expectations'", zh: "“达到预期”" }, status: "warning" },
      { key: { en: "Bonus", zh: "奖金" }, value: { en: "Paid in full", zh: "全额发放" }, status: "normal" },
      { key: { en: "Manager Note", zh: "manager 评语" }, value: { en: "'Solid year'", zh: "“扎实的一年”" }, status: "normal" },
      { key: { en: "PIP", zh: "PIP" }, value: { en: "None", zh: "无" }, status: "normal" },
      { key: { en: "Calibration", zh: "校准" }, value: { en: "Company-wide deflation", zh: "全公司压分" }, status: "normal" },
    ],
    choices: [
      { id: "youre_failing", label: { en: "You're Failing", zh: "你不行了" } },
      { id: "rating_is_fine", label: { en: "'Meets' Is Actually Fine", zh: "“达标”其实没问题" } },
      { id: "managed_out", label: { en: "Being Managed Out", zh: "在被劝退" } },
      { id: "no_bonus", label: { en: "No Bonus", zh: "没奖金" } },
    ],
    answer: "rating_is_fine",
    explanation: {
      en: "Full bonus, 'solid year' note, no PIP, and company-wide rating deflation. 'Meets Expectations' means you did your job well. The system is stingy with words, not with your paycheck.",
      zh: "全额奖金、“扎实的一年”评语、没有 PIP、全公司还在压分。“达到预期”的意思就是你把活干好了。系统吝啬的是用词，不是你的工资。",
    },
    resultFlavor: {
      correct: { en: "Correct. 'Meets' means fine. The bonus agrees.", zh: "正确。“达标”就是没问题，奖金也同意这点。" },
      wrong: { en: "You spiraled over the word 'meets' while the money said 'great'.", zh: "你为“达标”两个字内耗，可钱已经说了“很棒”。" },
    },
  },
  {
    id: "case-075",
    difficulty: "easy",
    tags: ["not-a-departure", "politics"],
    title: { en: "OOF but Committing at Night", zh: "挂着休假却半夜在提交" },
    intro: {
      en: "A coworker's status says '🌴 OOF' but they keep pushing commits at midnight.",
      zh: "一位同事状态挂着“🌴休假中”，却老在半夜推 commit。",
    },
    telemetry: [
      { key: { en: "Status", zh: "状态" }, value: { en: "'OOF'", zh: "“休假中”" }, status: "normal" },
      { key: { en: "Commits", zh: "提交" }, value: { en: "Nightly", zh: "每晚都有" }, status: "warning" },
      { key: { en: "PTO", zh: "年假" }, value: { en: "Approved", zh: "已批" }, status: "normal" },
      { key: { en: "Manager Ask", zh: "manager 喊话" }, value: { en: "'Please rest'", zh: "“请好好休息”" }, status: "normal" },
      { key: { en: "Account", zh: "账号" }, value: { en: "Active", zh: "在职" }, status: "normal" },
    ],
    choices: [
      { id: "secretly_fired", label: { en: "Secretly Fired", zh: "被偷偷开了" } },
      { id: "vacation_guilt", label: { en: "Can't Stop Working on Vacation", zh: "度假也停不下来工作" } },
      { id: "account_hacked", label: { en: "Account Hacked", zh: "账号被黑" } },
      { id: "quitting", label: { en: "Quitting", zh: "要离职" } },
    ],
    answer: "vacation_guilt",
    explanation: {
      en: "Approved PTO, an active account, and a manager literally asking them to rest. This isn't a breach; it's someone who doesn't know how to be off. Tragic, common, not your incident.",
      zh: "已批的休假、在用的账号、一个明确请他们休息的 manager。这不是入侵，是一个不会“下线”的人。可悲、常见，但不是你要查的事故。",
    },
    resultFlavor: {
      correct: { en: "Correct. The threat is their inability to relax.", zh: "正确。威胁来自他们无法放松。" },
      wrong: { en: "You flagged a workaholic's vacation guilt as a breach.", zh: "你把一个工作狂的假期负罪感标成了入侵。" },
    },
  },
  {
    id: "case-076",
    difficulty: "medium",
    tags: ["meeting", "politics"],
    title: { en: "All-Hands Rescheduled Twice", zh: "全员会改期了两次" },
    intro: {
      en: "The monthly all-hands got abruptly rescheduled twice in one week.",
      zh: "月度全员会一周内被突然改期了两次。",
    },
    telemetry: [
      { key: { en: "Reschedules", zh: "改期次数" }, value: { en: "2", zh: "2" }, status: "warning" },
      { key: { en: "Reason Field", zh: "原因字段" }, value: { en: "Blank", zh: "空白" }, status: "unknown" },
      { key: { en: "Exec Travel", zh: "高管行程" }, value: { en: "Active", zh: "在出差" }, status: "normal" },
      { key: { en: "Agenda", zh: "议程" }, value: { en: "Same", zh: "不变" }, status: "normal" },
      { key: { en: "Blind Thread", zh: "Blind 帖子" }, value: { en: "'Something's up'", zh: "“肯定出事了”" }, status: "alarming" },
    ],
    choices: [
      { id: "bad_news", label: { en: "Bad News Incoming", zh: "坏消息要来" } },
      { id: "scheduling_chaos", label: { en: "Exec Travel Scheduling Chaos", zh: "高管行程导致排期混乱" } },
      { id: "event_cancelled", label: { en: "Event Cancelled", zh: "会议取消" } },
      { id: "merger", label: { en: "Secret Merger", zh: "秘密并购" } },
    ],
    answer: "scheduling_chaos",
    explanation: {
      en: "The agenda is unchanged and execs are traveling; the only alarming signal is a Blind thread inventing doom. All-hands move because calendars collide, not because the sky is falling.",
      zh: "议程没变、高管在出差，唯一拉响警报的是 Blind 上自编自演的末日帖。全员会改期是因为日历撞车，不是因为天要塌了。",
    },
    resultFlavor: {
      correct: { en: "Correct. Calendars collided; Blind panicked.", zh: "正确。是日历撞车，是 Blind 自己慌了。" },
      wrong: { en: "You trusted a Blind thread over an unchanged agenda.", zh: "你信了 Blind 上的帖子，没信那份没变的议程。" },
    },
  },
  {
    id: "case-077",
    difficulty: "medium",
    tags: ["politics"],
    title: { en: "Removed from leadership@ DL", zh: "被移出 leadership@ 邮件组" },
    intro: {
      en: "You noticed you were removed from a 'leadership@' distribution list.",
      zh: "你发现自己被从“leadership@”邮件组里移除了。",
    },
    telemetry: [
      { key: { en: "DL Membership", zh: "邮件组成员" }, value: { en: "Removed", zh: "已移除" }, status: "warning" },
      { key: { en: "Your Role", zh: "你的角色" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "DL Note", zh: "邮件组备注" }, value: { en: "'Cleanup: ICs removed'", zh: "“清理：移除 IC”" }, status: "normal" },
      { key: { en: "Other ICs", zh: "其他 IC" }, value: { en: "Also removed", zh: "也被移除" }, status: "normal" },
      { key: { en: "Manager", zh: "manager" }, value: { en: "Same", zh: "不变" }, status: "normal" },
    ],
    choices: [
      { id: "demotion", label: { en: "Demotion", zh: "降级" } },
      { id: "dl_cleanup", label: { en: "Distribution List Cleanup", zh: "邮件组清理" } },
      { id: "being_excluded", label: { en: "Being Excluded", zh: "被排挤" } },
      { id: "pushed_out", label: { en: "Being Pushed Out", zh: "被挤走" } },
    ],
    answer: "dl_cleanup",
    explanation: {
      en: "The DL note literally says 'Cleanup: ICs removed', other ICs got removed too, and your role is unchanged. Someone just tidied a mailing list. Your status didn't change; the list did.",
      zh: "邮件组备注白纸黑字写着“清理：移除 IC”，其他 IC 也被移了，你的角色没变。有人只是整理了一下邮件组。变的是列表，不是你的地位。",
    },
    resultFlavor: {
      correct: { en: "Correct. The list got tidied, not your career.", zh: "正确。被整理的是列表，不是你的职业生涯。" },
      wrong: { en: "You read a mailing-list cleanup as a public demotion.", zh: "你把一次邮件组清理读成了一场公开降级。" },
    },
  },
  {
    id: "case-078",
    difficulty: "easy",
    tags: ["reorg", "politics"],
    title: { en: "Your Manager Field Jumped Two Levels", zh: "你的 manager 字段跳了两级" },
    intro: {
      en: "Your manager field changed to someone two levels up, overnight.",
      zh: "你的 manager 字段一夜之间变成了一个高你两级的人。",
    },
    telemetry: [
      { key: { en: "Manager", zh: "manager" }, value: { en: "Now skip-level", zh: "现在是隔级" }, status: "warning" },
      { key: { en: "Duration Note", zh: "时长备注" }, value: { en: "'Interim'", zh: "“临时”" }, status: "normal" },
      { key: { en: "Old Manager", zh: "原 manager" }, value: { en: "On medical leave", zh: "在休病假" }, status: "normal" },
      { key: { en: "Your Role", zh: "你的角色" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "Reorg Memo", zh: "重组备忘" }, value: { en: "None", zh: "无" }, status: "normal" },
    ],
    choices: [
      { id: "manager_fired", label: { en: "Your Manager Got Fired", zh: "你的 manager 被开了" } },
      { id: "interim_leave", label: { en: "Interim Reporting During Leave", zh: "休假期间临时汇报" } },
      { id: "youre_promoted", label: { en: "You're Being Promoted", zh: "你要升职了" } },
      { id: "team_dissolved", label: { en: "Team Dissolved", zh: "团队解散" } },
    ],
    answer: "interim_leave",
    explanation: {
      en: "The change is flagged 'interim', your old manager is on medical leave, and there's no reorg memo. You're temporarily reporting up until they're back. Nothing about you changed.",
      zh: "变更标着“临时”、你原来的 manager 在休病假、也没有重组备忘。你只是临时往上汇报，等他们回来。关于你的一切都没变。",
    },
    resultFlavor: {
      correct: { en: "Correct. It's interim coverage, not a coup.", zh: "正确。这是临时代管，不是政变。" },
      wrong: { en: "You assumed your manager was gone. They're just on leave.", zh: "你以为你的 manager 没了，其实只是请假了。" },
    },
  },
  {
    id: "case-079",
    difficulty: "medium",
    tags: ["politics"],
    title: { en: "The Recruiter Ping Screenshot", zh: "猎头私信截图" },
    intro: {
      en: "Someone shared a screenshot of a recruiter ping in the team chat, and panic spread.",
      zh: "有人在团队群里晒了一张猎头私信截图，然后恐慌蔓延。",
    },
    telemetry: [
      { key: { en: "Recruiter Pings", zh: "猎头私信" }, value: { en: "Common lately", zh: "最近很常见" }, status: "warning" },
      { key: { en: "Attrition", zh: "流失率" }, value: { en: "Flat", zh: "持平" }, status: "normal" },
      { key: { en: "Team Morale", zh: "团队士气" }, value: { en: "Jittery", zh: "发慌" }, status: "warning" },
      { key: { en: "Real Resignations", zh: "实际离职" }, value: { en: "Zero", zh: "零" }, status: "normal" },
      { key: { en: "Market", zh: "市场" }, value: { en: "'Everyone's getting pinged'", zh: "“人人都被私信”" }, status: "normal" },
    ],
    choices: [
      { id: "mass_exodus", label: { en: "Mass Exodus", zh: "集体出逃" } },
      { id: "market_noise", label: { en: "Normal Recruiter Market Noise", zh: "正常的猎头市场噪音" } },
      { id: "team_poached", label: { en: "Team Being Poached", zh: "团队被挖角" } },
      { id: "layoff_rumor", label: { en: "Layoff Rumor", zh: "裁员传闻" } },
    ],
    answer: "market_noise",
    explanation: {
      en: "Pings are up everywhere, attrition is flat, and actual resignations are zero. One screenshot turned ambient recruiter spam into a panic. Everyone gets pinged; almost nobody leaves.",
      zh: "到处的猎头私信都在涨、流失率持平、真正的离职是零。一张截图把背景噪音般的猎头骚扰变成了恐慌。人人都被私信，几乎没人真走。",
    },
    resultFlavor: {
      correct: { en: "Correct. It's market spam, not an exodus.", zh: "正确。那是市场骚扰，不是出逃潮。" },
      wrong: { en: "You turned one recruiter DM into a team-wide attrition story.", zh: "你把一条猎头私信编成了全队离职大戏。" },
    },
  },
  {
    id: "case-080",
    difficulty: "hard",
    tags: ["ambiguous", "politics"],
    title: { en: "The Q4 'Focus' Email", zh: "Q4 的“聚焦”邮件" },
    intro: {
      en: "Leadership sent a Q4 email about 'sharpening focus' and 'doing more with less'.",
      zh: "领导层发了封 Q4 邮件，谈“聚焦重点”和“用更少做更多”。",
    },
    telemetry: [
      { key: { en: "Email Tone", zh: "邮件语气" }, value: { en: "Carefully vague", zh: "刻意含糊" }, status: "unknown" },
      { key: { en: "Projects", zh: "项目" }, value: { en: "Some 'deprioritized'", zh: "部分“降优先级”" }, status: "warning" },
      { key: { en: "Headcount", zh: "人数" }, value: { en: "Not mentioned", zh: "只字未提" }, status: "unknown" },
      { key: { en: "Hiring", zh: "招聘" }, value: { en: "Paused", zh: "暂停" }, status: "warning" },
      { key: { en: "Severance Chatter", zh: "遣散传闻" }, value: { en: "None yet", zh: "暂时没有" }, status: "unknown" },
    ],
    choices: [
      { id: "definitely_layoffs", label: { en: "Definitely Layoffs", zh: "肯定是裁员" } },
      { id: "project_cuts", label: { en: "Project Cuts Only", zh: "只砍项目" } },
      { id: "normal_planning", label: { en: "Just Normal Planning", zh: "只是正常规划" } },
      { id: "none", label: { en: "Too Vague to Decode", zh: "太含糊，解不了" } },
    ],
    answer: "none",
    actualCause: { en: "Project Cuts or People Cuts — Too Vague", zh: "可能砍项目，也可能砍人，太含糊" },
    explanation: {
      en: "'Do more with less' is the most load-bearing phrase in tech. Projects are deprioritized and hiring is paused, but headcount and severance are unmentioned. This email is engineered to be unfalsifiable. Wait for the next one.",
      zh: "“用更少做更多”是科技圈最能承重的一句话。项目在降优先级、招聘暂停，但 headcount 和遣散只字未提。这封邮件就是设计成无法证伪的。等下一封吧。",
    },
    resultFlavor: {
      correct: { en: "No one can decode this. Corporate vagueness is a feature, not a bug.", zh: "这题谁也解不了。企业级含糊是特性，不是 bug。" },
      wrong: { en: "No one can decode this. Corporate vagueness is a feature, not a bug.", zh: "这题谁也解不了。企业级含糊是特性，不是 bug。" },
    },
  },
  {
    id: "case-081",
    difficulty: "easy",
    tags: ["onboarding", "politics"],
    title: { en: "The Over-Invited New Hire", zh: "被疯狂拉会的新人" },
    intro: {
      en: "A first-week new hire is already invited to every team meeting.",
      zh: "一位入职第一周的新人已经被拉进了所有团队会议。",
    },
    telemetry: [
      { key: { en: "Tenure", zh: "入职时长" }, value: { en: "4 days", zh: "4 天" }, status: "warning" },
      { key: { en: "Meeting Load", zh: "会议量" }, value: { en: "Maxed out", zh: "拉满" }, status: "alarming" },
      { key: { en: "Onboarding Doc", zh: "Onboarding 文档" }, value: { en: "Does not exist", zh: "不存在" }, status: "alarming" },
      { key: { en: "Assigned Work", zh: "已分配工作" }, value: { en: "None yet", zh: "暂无" }, status: "normal" },
      { key: { en: "Manager Note", zh: "manager 备注" }, value: { en: "'Learn by osmosis'", zh: "“耳濡目染地学”" }, status: "unknown" },
    ],
    choices: [
      { id: "rising_star", label: { en: "A Rising Star", zh: "未来之星" } },
      { id: "no_onboarding", label: { en: "No Onboarding, So Just Invited to Everything", zh: "没有 onboarding，只能全拉进会" } },
      { id: "being_tested", label: { en: "Being Tested", zh: "在被考验" } },
      { id: "wrong_team", label: { en: "Wrong Team", zh: "进错组了" } },
    ],
    answer: "no_onboarding",
    explanation: {
      en: "No onboarding doc, no assigned work, and a manager hoping for 'osmosis'. Wall-to-wall meetings aren't a sign of importance; they're what happens when nobody wrote down how the team works.",
      zh: "没有 onboarding 文档、没有分配工作、manager 还指望“耳濡目染”。排满的会议不是受重视的信号，而是没人写下团队怎么运转时的默认结果。",
    },
    resultFlavor: {
      correct: { en: "Correct. It's a documentation gap, not a coronation.", zh: "正确。这是文档缺失，不是加冕。" },
      wrong: { en: "You read 'no onboarding' as 'fast track'.", zh: "你把“没有 onboarding”读成了“快速通道”。" },
    },
  },
  {
    id: "case-082",
    difficulty: "easy",
    tags: ["onboarding", "politics"],
    title: { en: "The Buddy Who Vanished", zh: "消失的 Buddy" },
    intro: {
      en: "Your onboarding buddy stopped responding to your questions.",
      zh: "你的 onboarding buddy 不再回你的问题了。",
    },
    telemetry: [
      { key: { en: "Buddy Replies", zh: "Buddy 回复" }, value: { en: "Dried up", zh: "断了" }, status: "warning" },
      { key: { en: "Their Sprint", zh: "他们的冲刺" }, value: { en: "Crunch week", zh: "封闭周" }, status: "alarming" },
      { key: { en: "Their Status", zh: "他们的状态" }, value: { en: "'Heads down, ship date'", zh: "“冲刺中，赶发布”" }, status: "normal" },
      { key: { en: "Your Access", zh: "你的权限" }, value: { en: "All granted", zh: "已全部开通" }, status: "normal" },
      { key: { en: "Other Helpers", zh: "其他可问的人" }, value: { en: "Available", zh: "在线" }, status: "normal" },
    ],
    choices: [
      { id: "you_annoyed_them", label: { en: "You Annoyed Them", zh: "你惹烦他们了" } },
      { id: "buddy_crunch", label: { en: "Buddy Buried in a Deadline Crunch", zh: "Buddy 被 deadline 淹了" } },
      { id: "buddy_quitting", label: { en: "Buddy Is Quitting", zh: "Buddy 要离职" } },
      { id: "ignored_on_purpose", label: { en: "Being Ignored on Purpose", zh: "被故意无视" } },
    ],
    answer: "buddy_crunch",
    explanation: {
      en: "Their status literally says 'heads down, ship date', your access is all set, and other helpers are free. The buddy didn't abandon you; a deadline ate them. Ask someone else.",
      zh: "他们状态明明写着“冲刺中，赶发布”、你的权限都开通了、还有别人能问。Buddy 不是抛弃了你，是被 deadline 吃了。换个人问吧。",
    },
    resultFlavor: {
      correct: { en: "Correct. A deadline ate your buddy, not malice.", zh: "正确。吃掉你 buddy 的是 deadline，不是恶意。" },
      wrong: { en: "You took a crunch week personally.", zh: "你把人家的封闭周当成了针对你。" },
    },
  },
  {
    id: "case-083",
    difficulty: "medium",
    tags: ["promo", "politics"],
    title: { en: "Same Work, Different Outcome", zh: "一样的活，不一样的结果" },
    intro: {
      en: "A peer with the same scope as you got promoted. You didn't.",
      zh: "一个和你 scope 一样的同事升职了，你没有。",
    },
    telemetry: [
      { key: { en: "Your Packet", zh: "你的材料" }, value: { en: "Strong", zh: "很强" }, status: "normal" },
      { key: { en: "Peer Packet", zh: "同事材料" }, value: { en: "Also strong", zh: "也很强" }, status: "normal" },
      { key: { en: "Promo Quota", zh: "晋升名额" }, value: { en: "Full this cycle", zh: "本轮已满" }, status: "alarming" },
      { key: { en: "Manager Feedback", zh: "manager 反馈" }, value: { en: "'Next cycle, very likely'", zh: "“下轮，很有希望”" }, status: "warning" },
      { key: { en: "Perf Rating", zh: "绩效" }, value: { en: "Exceeds", zh: "超出预期" }, status: "normal" },
    ],
    choices: [
      { id: "youre_worse", label: { en: "You're Just Worse", zh: "你就是不如人" } },
      { id: "quota_full", label: { en: "Promo Quota Was Full", zh: "晋升名额满了" } },
      { id: "manager_dislikes", label: { en: "Manager Dislikes You", zh: "manager 不喜欢你" } },
      { id: "being_managed_out", label: { en: "Being Managed Out", zh: "在被劝退" } },
    ],
    answer: "quota_full",
    explanation: {
      en: "Both packets are strong, your rating exceeds, and the quota is full. Calibration is a budget, not a meritocracy. Two strong cases, one slot. It wasn't you; it was math.",
      zh: "两份材料都很强、你绩效超出预期、名额满了。Calibration 是个预算，不是纯粹的择优。两个强 case，一个名额。不是你的问题，是算术。",
    },
    resultFlavor: {
      correct: { en: "Correct. It was a budget cap, not a verdict on you.", zh: "正确。那是预算上限，不是对你的判决。" },
      wrong: { en: "You took a quota cap as a referendum on your worth.", zh: "你把一个名额上限当成了对你价值的全民公投。" },
    },
  },
  {
    id: "case-084",
    difficulty: "hard",
    tags: ["promo", "ambiguous", "politics"],
    title: { en: "One More Cycle", zh: "再攒一个 cycle" },
    intro: {
      en: "For the third time, your manager said 'let's aim for next cycle'.",
      zh: "你的 manager 第三次说“我们瞄准下一轮 promo 吧”。",
    },
    telemetry: [
      { key: { en: "Times Deferred", zh: "被推迟次数" }, value: { en: "3", zh: "3" }, status: "alarming" },
      { key: { en: "Stated Reason", zh: "给的理由" }, value: { en: "Different each time", zh: "每次都不一样" }, status: "warning" },
      { key: { en: "Concrete Criteria", zh: "明确标准" }, value: { en: "Never written down", zh: "从未写下" }, status: "alarming" },
      { key: { en: "Your Output", zh: "你的产出" }, value: { en: "Strong", zh: "很强" }, status: "normal" },
      { key: { en: "Manager Sincerity", zh: "manager 诚意" }, value: { en: "Unreadable", zh: "看不透" }, status: "unknown" },
    ],
    choices: [
      { id: "genuine_soon", label: { en: "Genuinely Almost There", zh: "真的快了" } },
      { id: "soft_no", label: { en: "A Polite Forever-No", zh: "礼貌的永远拒绝" } },
      { id: "manager_powerless", label: { en: "Manager Has No Pull", zh: "manager 根本没话语权" } },
      { id: "none", label: { en: "Impossible to Tell", zh: "根本判断不了" } },
    ],
    answer: "none",
    actualCause: { en: "Sincere Plan or Soft No — Unknowable", zh: "是真心计划还是软性拒绝，无从得知" },
    explanation: {
      en: "Three deferrals, shifting reasons, and criteria that are never written down. 'Next cycle' could be a sincere plan, a manager with no political capital, or a polite forever-no. Without written criteria, the phrase is undecidable. Demand them.",
      zh: "三次推迟、理由每次都变、标准从来不落纸面。“下一轮”可能是真心计划、可能是 manager 根本没有政治资本、也可能是礼貌的永远拒绝。没有书面标准，这句话无法判定。把标准要出来。",
    },
    resultFlavor: {
      correct: { en: "No one can call this. 'Next cycle' is corporate Schrodinger.", zh: "这题没人能下结论。“下一轮”是企业版薛定谔。" },
      wrong: { en: "No one can call this. 'Next cycle' is corporate Schrodinger.", zh: "这题没人能下结论。“下一轮”是企业版薛定谔。" },
    },
  },
  {
    id: "case-085",
    difficulty: "medium",
    tags: ["cross-team", "politics"],
    title: { en: "The Boomerang Ticket", zh: "回旋镖" },
    intro: {
      en: "Your ticket got reassigned across five teams and landed back on you.",
      zh: "你的 ticket 在五个组之间转了一圈，又转回了你这里。",
    },
    telemetry: [
      { key: { en: "Reassignments", zh: "转派次数" }, value: { en: "5 teams", zh: "5 个组" }, status: "warning" },
      { key: { en: "Each Note", zh: "每次备注" }, value: { en: "'Not our scope'", zh: "“不在我们 scope”" }, status: "warning" },
      { key: { en: "Actual Owner", zh: "真正归属" }, value: { en: "Genuinely unclear", zh: "确实不明" }, status: "alarming" },
      { key: { en: "Malice Signals", zh: "恶意信号" }, value: { en: "None", zh: "无" }, status: "normal" },
      { key: { en: "Org Boundaries", zh: "组织边界" }, value: { en: "Overlapping", zh: "互相重叠" }, status: "warning" },
    ],
    choices: [
      { id: "people_hate_you", label: { en: "People Are Dodging You", zh: "大家在躲你" } },
      { id: "ownership_gap", label: { en: "Genuine Ownership Gap", zh: "真正的归属空白" } },
      { id: "sabotage", label: { en: "Deliberate Sabotage", zh: "故意使绊子" } },
      { id: "your_fault", label: { en: "You Filed It Wrong", zh: "你提错了" } },
    ],
    answer: "ownership_gap",
    explanation: {
      en: "Five 'not our scope' notes, overlapping org boundaries, and no malice signals. Nobody is dodging you; the work genuinely lives in a seam between teams. The boomerang is org design, not spite.",
      zh: "五条“不在我们 scope”、组织边界互相重叠、没有恶意信号。没人在躲你，这活真的卡在团队之间的缝里。回旋镖是组织设计的锅，不是有人记仇。",
    },
    resultFlavor: {
      correct: { en: "Correct. It fell in a seam, not into a vendetta.", zh: "正确。它掉进了缝里，不是掉进了恩怨里。" },
      wrong: { en: "You read an ownership gap as a personal snub.", zh: "你把一个归属空白读成了针对你的冷落。" },
    },
  },
  {
    id: "case-086",
    difficulty: "hard",
    tags: ["cross-team", "politics"],
    title: { en: "The Scope Land Grab", zh: "抢地盘" },
    intro: {
      en: "Another team's deck suddenly lists your project under their charter.",
      zh: "另一个组的 PPT 突然把你的项目列在了他们的 charter 下面。",
    },
    telemetry: [
      { key: { en: "Their Deck", zh: "他们的 PPT" }, value: { en: "Claims your project", zh: "把你的项目划走了" }, status: "alarming" },
      { key: { en: "Your Code", zh: "你的代码" }, value: { en: "Still yours", zh: "还是你的" }, status: "normal" },
      { key: { en: "Season", zh: "时节" }, value: { en: "Planning / charters", zh: "规划 / 定 charter" }, status: "normal" },
      { key: { en: "Their VP", zh: "他们的 VP" }, value: { en: "Expanding scope", zh: "在扩 scope" }, status: "warning" },
      { key: { en: "Decision Made", zh: "已定的事" }, value: { en: "None yet", zh: "暂无" }, status: "unknown" },
    ],
    choices: [
      { id: "youre_fired", label: { en: "Your Team Is Done", zh: "你们组要没了" } },
      { id: "land_grab", label: { en: "Planning-Season Scope Land Grab", zh: "规划季的抢地盘" } },
      { id: "already_lost", label: { en: "You Already Lost It", zh: "你已经丢了" } },
      { id: "harmless_typo", label: { en: "Harmless Slide Typo", zh: "无害的 PPT 笔误" } },
    ],
    answer: "land_grab",
    explanation: {
      en: "It's planning season, their VP is expanding scope, your code is still yours, and no decision is made. A slide is an opening bid, not a verdict. This is empire-building theater; counter it with your own deck.",
      zh: "正值规划季、他们 VP 在扩 scope、你的代码还是你的、也没有任何决定。一页 PPT 是开价，不是判决。这是扩张地盘的戏码，用你自己的 PPT 反击就行。",
    },
    resultFlavor: {
      correct: { en: "Correct. It's a bid, not a verdict. Make your own slide.", zh: "正确。那是开价，不是判决，赶紧做你自己的那页 PPT 去。" },
      wrong: { en: "You surrendered scope to a slide that decided nothing.", zh: "你向一页什么都没决定的 PPT 投降了。" },
    },
  },
  {
    id: "case-087",
    difficulty: "easy",
    tags: ["meeting", "politics"],
    title: { en: "Added to a 50-Person 'Working Group'", zh: "被加进 50 人“工作组”" },
    intro: {
      en: "You were added to a 50-person 'collaboration' channel for one decision.",
      zh: "为了一个决定，你被加进了一个 50 人的“协作”频道。",
    },
    telemetry: [
      { key: { en: "Channel Size", zh: "频道人数" }, value: { en: "50", zh: "50" }, status: "warning" },
      { key: { en: "Your Action Items", zh: "你的待办" }, value: { en: "Zero", zh: "零" }, status: "normal" },
      { key: { en: "Decision Makers", zh: "决策者" }, value: { en: "3 of the 50", zh: "50 里的 3 个" }, status: "normal" },
      { key: { en: "Your Role", zh: "你的角色" }, value: { en: "'FYI / awareness'", zh: "“知会 / 了解”" }, status: "normal" },
      { key: { en: "Mute Available", zh: "可静音" }, value: { en: "Yes", zh: "可以" }, status: "normal" },
    ],
    choices: [
      { id: "youre_key", label: { en: "You're a Key Stakeholder", zh: "你是关键干系人" } },
      { id: "diffusion", label: { en: "Responsibility Diffusion, FYI Only", zh: "责任稀释，只是知会" } },
      { id: "being_watched", label: { en: "Being Watched", zh: "被盯上了" } },
      { id: "promotion_signal", label: { en: "A Promotion Signal", zh: "升职信号" } },
    ],
    answer: "diffusion",
    explanation: {
      en: "Fifty people, three actual decision-makers, zero action items for you, role tagged 'FYI'. Big channels feel important but usually mean diffuse accountability. You were added so nobody can say you weren't told. Mute it.",
      zh: "50 个人、3 个真正的决策者、你 0 个待办、角色标着“知会”。大频道看着重要，实际多半意味着责任分散。你被加进来只是为了将来没人能说“没通知你”。静音吧。",
    },
    resultFlavor: {
      correct: { en: "Correct. Big channel, small role. Mute and move on.", zh: "正确。大频道，小角色，静音继续。" },
      wrong: { en: "You read a CYA add as a seat at the table.", zh: "你把一次“免责拉群”读成了核心席位。" },
    },
  },
  {
    id: "case-088",
    difficulty: "medium",
    tags: ["okr", "politics"],
    title: { en: "Your Project Vanished from the OKRs", zh: "你的项目从 OKR 里消失了" },
    intro: {
      en: "Your project is no longer listed in the new quarterly OKRs.",
      zh: "你的项目在新一季的 OKR 里不见了。",
    },
    telemetry: [
      { key: { en: "OKR Listing", zh: "OKR 列项" }, value: { en: "Not found", zh: "找不到" }, status: "alarming" },
      { key: { en: "Umbrella OKR", zh: "总 OKR" }, value: { en: "New, broad", zh: "新增，范围更大" }, status: "warning" },
      { key: { en: "Your Funding", zh: "你的资源" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "Your Headcount", zh: "你的人头" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "Roadmap", zh: "路线图" }, value: { en: "Still active", zh: "仍在推进" }, status: "normal" },
    ],
    choices: [
      { id: "project_killed", label: { en: "Project Killed", zh: "项目被砍" } },
      { id: "folded_into_umbrella", label: { en: "Folded Into a Bigger Umbrella OKR", zh: "被并进了更大的总 OKR" } },
      { id: "forgotten", label: { en: "Forgotten / Lost", zh: "被遗忘了" } },
      { id: "defunded", label: { en: "Quietly Defunded", zh: "悄悄撤资" } },
    ],
    answer: "folded_into_umbrella",
    explanation: {
      en: "Funding, headcount, and roadmap are all unchanged, and a new broad umbrella OKR appeared. Your project didn't die; it got absorbed into a bigger line item for the slide. Same work, less visibility.",
      zh: "资源、人头、路线图全没变，还冒出来一个范围更大的总 OKR。你的项目没死，是被吸进了一个更大的条目里好放进 PPT。活照旧，只是曝光少了。",
    },
    resultFlavor: {
      correct: { en: "Correct. Absorbed, not axed.", zh: "正确。是被吸收，不是被砍。" },
      wrong: { en: "You held a funeral for a project that's still funded.", zh: "你给一个还有预算的项目办了葬礼。" },
    },
  },
  {
    id: "case-089",
    difficulty: "easy",
    tags: ["okr", "politics"],
    title: { en: "Everything Must 'Align'", zh: "一切都要“对齐”" },
    intro: {
      en: "Leadership now requires every project to 'align to the top company priority'.",
      zh: "领导层现在要求每个项目都“对齐公司最高优先级”。",
    },
    telemetry: [
      { key: { en: "New Mandate", zh: "新要求" }, value: { en: "'Align to priority'", zh: "“对齐优先级”" }, status: "warning" },
      { key: { en: "Your Actual Work", zh: "你的实际工作" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "Slide Headers", zh: "PPT 标题" }, value: { en: "Reworded", zh: "改了措辞" }, status: "warning" },
      { key: { en: "Budget", zh: "预算" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "Deadlines", zh: "截止日期" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
    ],
    choices: [
      { id: "huge_strategy_shift", label: { en: "Huge Strategy Shift", zh: "重大战略转向" } },
      { id: "rewording_exercise", label: { en: "A Rewording Exercise", zh: "一次改措辞运动" } },
      { id: "work_cancelled", label: { en: "Your Work Is Cancelled", zh: "你的活被取消" } },
      { id: "layoff_prep", label: { en: "Layoff Prep", zh: "裁员前兆" } },
    ],
    answer: "rewording_exercise",
    explanation: {
      en: "Budgets, deadlines, and actual work are unchanged; only slide headers got reworded. 'Align to the priority' means 'retitle your deck to mention the buzzword'. Find-and-replace, not strategy.",
      zh: "预算、截止日期、实际工作都没变，变的只有 PPT 标题。“对齐优先级”的意思是“把你 PPT 标题改成提一下那个老板说过的词”。是查找替换，不是战略。",
    },
    resultFlavor: {
      correct: { en: "Correct. It's find-and-replace, not a pivot.", zh: "正确。这是查找替换，不是转向。" },
      wrong: { en: "You rebuilt your roadmap over a header change.", zh: "你为一次标题改动重建了整个路线图。" },
    },
  },
  {
    id: "case-090",
    difficulty: "hard",
    tags: ["okr", "ambiguous", "politics"],
    title: { en: "Stamped P2", zh: "被盖了 P2" },
    intro: {
      en: "Your project got labeled 'P2' in the planning doc.",
      zh: "你的项目在规划文档里被标成了“P2”。",
    },
    telemetry: [
      { key: { en: "Priority Tag", zh: "优先级标签" }, value: { en: "P2", zh: "P2" }, status: "warning" },
      { key: { en: "Funding", zh: "资源" }, value: { en: "Still there, for now", zh: "暂时还在" }, status: "unknown" },
      { key: { en: "Exec Mentions", zh: "高管提及" }, value: { en: "Rare", zh: "很少" }, status: "warning" },
      { key: { en: "Team Morale", zh: "团队士气" }, value: { en: "Reading tea leaves", zh: "在解读茶叶渣" }, status: "warning" },
      { key: { en: "Official Stance", zh: "官方说法" }, value: { en: "'Still important'", zh: "“依然重要”" }, status: "unknown" },
    ],
    choices: [
      { id: "just_sequencing", label: { en: "Just Resource Sequencing", zh: "只是资源排序" } },
      { id: "slow_death", label: { en: "The Start of a Slow Death", zh: "慢性死亡的开始" } },
      { id: "p2_is_fine", label: { en: "P2 Is Totally Fine", zh: "P2 完全没问题" } },
      { id: "none", label: { en: "Can't Tell Yet", zh: "暂时判断不了" } },
    ],
    answer: "none",
    actualCause: { en: "Healthy Sequencing or Slow Defunding — Too Early", zh: "是正常排序还是慢性撤资，太早判断" },
    explanation: {
      en: "P2 with funding 'for now', rare exec mentions, and an official 'still important'. P2 can mean honest sequencing or the first step of a quiet wind-down. Both look identical at this stage. Watch whether the funding survives next quarter.",
      zh: "P2、资源“暂时还在”、高管很少提、官方还说“依然重要”。P2 既可能是真实的排序，也可能是悄悄收尾的第一步。这个阶段两者长得一模一样。看看资源能不能熬过下一季再说。",
    },
    resultFlavor: {
      correct: { en: "No one can call this yet. P2 is a fork in the road, not a destination.", zh: "这题暂时没人能下结论。P2 是岔路口，不是终点。" },
      wrong: { en: "No one can call this yet. P2 is a fork in the road, not a destination.", zh: "这题暂时没人能下结论。P2 是岔路口，不是终点。" },
    },
  },
  {
    id: "case-091",
    difficulty: "easy",
    tags: ["tools", "politics"],
    title: { en: "Demoted to Viewer", zh: "被降成 Viewer" },
    intro: {
      en: "Your manager changed your doc access from editor to viewer.",
      zh: "你的 manager 把你对某文档的权限从 editor 降成了 viewer。",
    },
    telemetry: [
      { key: { en: "Doc Access", zh: "文档权限" }, value: { en: "Editor -> Viewer", zh: "Editor -> Viewer" }, status: "warning" },
      { key: { en: "Doc Status", zh: "文档状态" }, value: { en: "'Finalized / locked'", zh: "“已定稿 / 锁定”" }, status: "normal" },
      { key: { en: "Everyone Else", zh: "其他所有人" }, value: { en: "Also viewer now", zh: "现在也是 viewer" }, status: "normal" },
      { key: { en: "Your Role", zh: "你的角色" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "Other Docs", zh: "其他文档" }, value: { en: "Still editor", zh: "仍是 editor" }, status: "normal" },
    ],
    choices: [
      { id: "lost_trust", label: { en: "You Lost Their Trust", zh: "你失去了信任" } },
      { id: "doc_locked", label: { en: "Doc Was Finalized and Locked", zh: "文档定稿后被锁定" } },
      { id: "being_demoted", label: { en: "Being Demoted", zh: "在被降级" } },
      { id: "punishment", label: { en: "Punishment", zh: "惩罚" } },
    ],
    answer: "doc_locked",
    explanation: {
      en: "The doc is marked 'finalized', everyone else is now viewer too, and your access on other docs is unchanged. They locked the document, not your standing. Once a doc ships, edit rights get revoked by default.",
      zh: "文档标着“已定稿”、其他所有人现在也是 viewer、你在别的文档上还是 editor。被锁的是文档，不是你的地位。文档一旦定稿，编辑权默认会被收回。",
    },
    resultFlavor: {
      correct: { en: "Correct. They locked the doc, not your career.", zh: "正确。锁的是文档，不是你的职业生涯。" },
      wrong: { en: "You read a doc lock as a vote of no confidence.", zh: "你把一次文档锁定读成了陶片放逐。" },
    },
  },
  {
    id: "case-092",
    difficulty: "easy",
    tags: ["tools", "politics"],
    title: { en: "Removed from a Private Channel", zh: "被移出私密频道" },
    intro: {
      en: "You got removed from a private team channel without explanation.",
      zh: "你被无声无息地移出了一个私密团队频道。",
    },
    telemetry: [
      { key: { en: "Channel", zh: "频道" }, value: { en: "Now archived", zh: "已归档" }, status: "normal" },
      { key: { en: "Removal Scope", zh: "移除范围" }, value: { en: "Everyone removed", zh: "所有人都被移" }, status: "normal" },
      { key: { en: "Admin Note", zh: "管理员备注" }, value: { en: "'Channel cleanup'", zh: "“频道清理”" }, status: "normal" },
      { key: { en: "New Channel", zh: "新频道" }, value: { en: "You're in it", zh: "你在里面" }, status: "normal" },
      { key: { en: "Your Role", zh: "你的角色" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
    ],
    choices: [
      { id: "excluded", label: { en: "Being Excluded", zh: "被排挤" } },
      { id: "channel_archived", label: { en: "Channel Archived in a Cleanup", zh: "频道清理时被归档" } },
      { id: "secret_meeting", label: { en: "A Secret Channel Without You", zh: "有个不带你的秘密频道" } },
      { id: "demotion", label: { en: "Demotion", zh: "降级" } },
    ],
    answer: "channel_archived",
    explanation: {
      en: "The channel is archived, everyone was removed, the note says 'cleanup', and you're already in the new channel. Nobody exiled you; an old channel got tidied and a new one replaced it. You're in that one.",
      zh: "频道已归档、所有人都被踢了、备注写着“清理”、你已经在新频道里了。没人把你流放，是一个旧频道被整理掉、换了个新的。你就在新的里面。",
    },
    resultFlavor: {
      correct: { en: "Correct. Archived, not exiled.", zh: "正确。是归档，不是流放。" },
      wrong: { en: "You read a channel cleanup as a quiet shunning.", zh: "你把一次频道清理读成了无声的排挤。" },
    },
  },
  {
    id: "case-093",
    difficulty: "medium",
    tags: ["tools", "politics"],
    title: { en: "Dropped from the Wiki Owners", zh: "从 Wiki Owner 里被去掉" },
    intro: {
      en: "Your name disappeared from a wiki page's owner list.",
      zh: "你的名字突然从某个 wiki 页面的 owner 列表里消失了。",
    },
    telemetry: [
      { key: { en: "Owner List", zh: "Owner 列表" }, value: { en: "You removed", zh: "你被移除" }, status: "warning" },
      { key: { en: "Rotation Policy", zh: "轮换制度" }, value: { en: "Quarterly", zh: "每季轮换" }, status: "normal" },
      { key: { en: "New Owner", zh: "新 Owner" }, value: { en: "A teammate", zh: "一位同事" }, status: "normal" },
      { key: { en: "Your Access", zh: "你的访问" }, value: { en: "Still full", zh: "仍是完整" }, status: "normal" },
      { key: { en: "Blame Signals", zh: "甩锅信号" }, value: { en: "None", zh: "无" }, status: "normal" },
    ],
    choices: [
      { id: "blame_setup", label: { en: "Being Set Up to Take Blame", zh: "被安排背锅" } },
      { id: "owner_rotation", label: { en: "Routine Owner Rotation", zh: "例行 owner 轮换" } },
      { id: "pushed_out", label: { en: "Being Pushed Off the Project", zh: "被挤出项目" } },
      { id: "demotion", label: { en: "Demotion", zh: "降级" } },
    ],
    answer: "owner_rotation",
    explanation: {
      en: "There's a quarterly rotation policy, a teammate took the slot, your access is still full, and there are no blame signals. Owner rotation spreads maintenance load; it's not a setup. You just rotated off.",
      zh: "这只有每季轮换制度、同事接了班、你的访问权限仍完整、没有甩锅信号。Owner 轮换是为了分摊维护负担，降低老板的 bus factor 焦虑，不是设局，不是针对你。你只是轮到下场了。",
    },
    resultFlavor: {
      correct: { en: "Correct. You rotated off, you weren't pushed off.", zh: "正确。你是轮岗下场，不是被挤下场。" },
      wrong: { en: "You read a maintenance rotation as a blame trap.", zh: "你把一次维护轮换读成了背锅陷阱。" },
    },
  },
  {
    id: "case-094",
    difficulty: "hard",
    tags: ["comp", "ambiguous", "politics"],
    title: { en: "The Smaller Refresh", zh: "变少的 Refresh" },
    intro: {
      en: "Your annual RSU refresh grant looks smaller than last year's.",
      zh: "你今年的 RSU refresh 看起来比去年少。",
    },
    telemetry: [
      { key: { en: "Share Count", zh: "股数" }, value: { en: "Lower", zh: "更少" }, status: "warning" },
      { key: { en: "Stock Price", zh: "股价" }, value: { en: "Way up", zh: "涨了不少" }, status: "normal" },
      { key: { en: "Dollar Value", zh: "美元价值" }, value: { en: "Roughly flat", zh: "大致持平" }, status: "unknown" },
      { key: { en: "Band Position", zh: "薪资位置" }, value: { en: "Not disclosed", zh: "未披露" }, status: "unknown" },
      { key: { en: "Budget Memo", zh: "预算备忘" }, value: { en: "'Tighter this year'", zh: "“今年更紧”" }, status: "warning" },
    ],
    choices: [
      { id: "youre_devalued", label: { en: "You're Being Devalued", zh: "你在被贬值" } },
      { id: "price_offset", label: { en: "Fewer Shares, Same Dollars", zh: "股数少了，美元一样" } },
      { id: "real_cut", label: { en: "A Real Comp Cut", zh: "真的降薪" } },
      { id: "none", label: { en: "Can't Tell Without the Dollar Math", zh: "不算美元算不出来" } },
    ],
    answer: "none",
    actualCause: { en: "Price-Offset or Real Cut — Depends on Undisclosed Math", zh: "是股价对冲还是真降薪，取决于没披露的数字" },
    explanation: {
      en: "Share count dropped but stock is up and dollar value is 'roughly flat' — yet the budget memo says 'tighter' and your band position is hidden. Fewer shares can mean nothing (price offset) or a quiet cut. Without the full dollar and band math, it's undecidable.",
      zh: "股数少了，但股价涨了、美元价值“大致持平”，可预算备忘又说“更紧”。股数变少可能毫无意义（股价对冲），也可能是悄悄降薪。没有完整的美元和薪资带数字，判不了。",
    },
    resultFlavor: {
      correct: { en: "No one can call this from share count alone. Demand the dollar figure.", zh: "光看股数没人能下结论，把美元数字要到。" },
      wrong: { en: "No one can call this from share count alone. Demand the dollar figure.", zh: "光看股数没人能下结论，把美元数字要到。" },
    },
  },
  {
    id: "case-095",
    difficulty: "easy",
    tags: ["budget", "politics"],
    title: { en: "Team Offsite 'Postponed'", zh: "团建“暂缓”" },
    intro: {
      en: "Your team's offsite was abruptly 'postponed indefinitely'.",
      zh: "你们团队的团建突然被“无限期暂缓”。",
    },
    telemetry: [
      { key: { en: "Offsite", zh: "团建" }, value: { en: "Postponed", zh: "暂缓" }, status: "warning" },
      { key: { en: "Timing", zh: "时点" }, value: { en: "End of fiscal quarter", zh: "财季末" }, status: "normal" },
      { key: { en: "Travel Budget", zh: "差旅预算" }, value: { en: "Frozen till Q1", zh: "冻结到 Q1" }, status: "warning" },
      { key: { en: "Headcount", zh: "人数" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "Other Teams", zh: "其他团队" }, value: { en: "Also postponed", zh: "也暂缓了" }, status: "normal" },
    ],
    choices: [
      { id: "team_dying", label: { en: "The Team Is Dying", zh: "团队要黄了" } },
      { id: "quarter_end_savings", label: { en: "Quarter-End Cost Saving", zh: "财季末省钱" } },
      { id: "punishment", label: { en: "Punishment for the Team", zh: "对团队的惩罚" } },
      { id: "layoff_signal", label: { en: "Layoff Signal", zh: "裁员信号" } },
    ],
    answer: "quarter_end_savings",
    explanation: {
      en: "It's the end of the fiscal quarter, travel budget is frozen till Q1, headcount is unchanged, and other teams got postponed too. This is a finance-driven belt-tightening, not a verdict on your team. The offsite returns when the budget does.",
      zh: "正值财季末、差旅预算冻结到 Q1、人数没变、其他团队也被暂缓了。这是财务驱动的勒紧裤腰带，不是对你团队的判决。预算回来，团建就回来。",
    },
    resultFlavor: {
      correct: { en: "Correct. The budget got tight, not your team's future.", zh: "正确。吃紧的是预算，不是你的未来。" },
      wrong: { en: "You read a frozen travel budget as a death sentence.", zh: "你把冻结的差旅预算读成了死刑判决。" },
    },
  },
  {
    id: "case-096",
    difficulty: "medium",
    tags: ["ghost", "politics"],
    title: { en: "Open to Work", zh: "求职开放中" },
    intro: {
      en: "A senior colleague's LinkedIn quietly switched to 'open to work'.",
      zh: "一位资深同事的 LinkedIn 悄悄变成了“open to work”。",
    },
    telemetry: [
      { key: { en: "LinkedIn", zh: "领英" }, value: { en: "'Open to work'", zh: "“求职开放”" }, status: "warning" },
      { key: { en: "Setting", zh: "设置" }, value: { en: "Recruiters-only, default", zh: "仅猎头可见，默认项" }, status: "normal" },
      { key: { en: "Their Work", zh: "他们的工作" }, value: { en: "Fully engaged", zh: "投入如常" }, status: "normal" },
      { key: { en: "Resignation", zh: "离职" }, value: { en: "None filed", zh: "未提交" }, status: "normal" },
      { key: { en: "Profile Edits", zh: "资料改动" }, value: { en: "None else", zh: "其余无变化" }, status: "normal" },
    ],
    choices: [
      { id: "definitely_leaving", label: { en: "Definitely Leaving", zh: "肯定要走" } },
      { id: "default_or_noise", label: { en: "A Default Toggle / Hedging", zh: "默认开关 / 留后路" } },
      { id: "already_resigned", label: { en: "Already Resigned", zh: "已经辞职了" } },
      { id: "fired", label: { en: "Just Got Fired", zh: "刚被开" } },
    ],
    answer: "default_or_noise",
    explanation: {
      en: "It's the recruiters-only default setting, their work engagement is normal, no resignation is filed, and nothing else on the profile changed. 'Open to work' is often a low-effort hedge or a default, not a goodbye. Most people who toggle it never leave.",
      zh: "这是“仅猎头可见”的默认设置、他们工作投入如常、没提离职、资料其余部分也没动。“open to work”常常只是个低成本的后路或默认项，不是告别。大多数勾上它的人根本没走。",
    },
    resultFlavor: {
      correct: { en: "Correct. It's a toggle, not a two-weeks notice.", zh: "正确。那是个开关，不是离职信。" },
      wrong: { en: "You wrote their farewell over a LinkedIn default.", zh: "你为一个领英默认项写好了给同事的送别词。" },
    },
  },
  {
    id: "case-097",
    difficulty: "medium",
    tags: ["transition", "politics"],
    title: { en: "Scheduling Meetings Into Next Quarter", zh: "把会排到下个季度" },
    intro: {
      en: "Someone rumored to be leaving keeps scheduling meetings into next quarter.",
      zh: "一个传说要走的人，还在把会排到下个季度。",
    },
    telemetry: [
      { key: { en: "Rumor", zh: "传闻" }, value: { en: "'They're leaving'", zh: "“他们要走”" }, status: "warning" },
      { key: { en: "Their Calendar", zh: "他们的日历" }, value: { en: "Booked Q+1", zh: "排到了下季度" }, status: "normal" },
      { key: { en: "Meeting Type", zh: "会议类型" }, value: { en: "Handover / KT", zh: "交接 / 知识转移" }, status: "normal" },
      { key: { en: "Doc Activity", zh: "文档活动" }, value: { en: "Writing runbooks", zh: "在写 runbook" }, status: "normal" },
      { key: { en: "Backfill", zh: "补位" }, value: { en: "Being interviewed", zh: "正在面试" }, status: "warning" },
    ],
    choices: [
      { id: "rumor_false", label: { en: "Rumor Is False, They're Staying", zh: "传闻是假的，他们要留" } },
      { id: "planned_handover", label: { en: "A Planned, Known Handover", zh: "有计划、本人知情的交接" } },
      { id: "in_denial", label: { en: "They Don't Know They're Out", zh: "他们不知道自己要走" } },
      { id: "doing_nothing", label: { en: "Just Killing Time", zh: "在混日子" } },
    ],
    answer: "planned_handover",
    explanation: {
      en: "The meetings are handover/KT, they're writing runbooks, and a backfill is being interviewed. Booking into next quarter isn't denial; it's a person responsibly handing off. The rumor is true and so is the professionalism.",
      zh: "那些会是交接和知识转移、他们在写 runbook、补位的人也在面试。把会排到下季度不是不知情，而是一个人在负责任地交接。传闻是真的，专业也是真的。",
    },
    resultFlavor: {
      correct: { en: "Correct. That's a clean handover, not denial.", zh: "正确。那是体面的交接。" },
      wrong: { en: "You mistook a professional handover for cluelessness.", zh: "你把一次专业交接当成了状况外。" },
    },
  },
  {
    id: "case-098",
    difficulty: "easy",
    tags: ["not-a-departure", "politics"],
    title: { en: "The Whole Team OOF", zh: "全组同一天 OOF" },
    intro: {
      en: "Your entire team is out of office on the exact same day.",
      zh: "你整个团队在同一天集体 OOF。",
    },
    telemetry: [
      { key: { en: "OOF Scope", zh: "OOF 范围" }, value: { en: "Whole team", zh: "全团队" }, status: "alarming" },
      { key: { en: "Same Date", zh: "同一天" }, value: { en: "Yes", zh: "是" }, status: "warning" },
      { key: { en: "Company Calendar", zh: "公司日历" }, value: { en: "'Wellness Day'", zh: "“身心健康日”" }, status: "normal" },
      { key: { en: "Other Orgs", zh: "其他部门" }, value: { en: "Also out", zh: "也都休" }, status: "normal" },
      { key: { en: "Accounts", zh: "账号" }, value: { en: "All active", zh: "全部在职" }, status: "normal" },
    ],
    choices: [
      { id: "mass_resignation", label: { en: "Mass Resignation", zh: "集体辞职" } },
      { id: "company_wellness_day", label: { en: "Company-Wide Wellness Day", zh: "公司级身心健康日" } },
      { id: "secret_layoff", label: { en: "Secret Layoff Day", zh: "秘密裁员日" } },
      { id: "team_strike", label: { en: "Team Walkout", zh: "团队罢工" } },
    ],
    answer: "company_wellness_day",
    explanation: {
      en: "The company calendar literally says 'Wellness Day', other orgs are out too, and every account is active. The whole team is off because the whole company is off. Synchronized absence here means a holiday, not an exodus.",
      zh: "公司日历白纸黑字写着“身心健康日”、其他部门也都休、每个账号都在职。全团队休是因为全公司都在休。这里的同步缺席意味着放假，不是集体出逃。",
    },
    resultFlavor: {
      correct: { en: "Correct. It's a holiday, not a walkout.", zh: "正确。是放假，不是罢工。" },
      wrong: { en: "You read a wellness day as a mass resignation.", zh: "你把一个身心健康日读成了集体辞职。" },
    },
  },
  {
    id: "case-099",
    difficulty: "hard",
    tags: ["ambiguous", "politics"],
    title: { en: "Untitled, 15 Minutes, HR Invited", zh: "无标题，15 分钟，HR 在列" },
    intro: {
      en: "You got a same-day 15-minute invite with no title, no agenda, and HR on it.",
      zh: "你收到一个当天的 15 分钟邀请，没标题、没议程，HR 在受邀列表里。",
    },
    telemetry: [
      { key: { en: "Title", zh: "标题" }, value: { en: "Blank", zh: "空白" }, status: "warning" },
      { key: { en: "Agenda", zh: "议程" }, value: { en: "None", zh: "无" }, status: "warning" },
      { key: { en: "HR Present", zh: "HR 在列" }, value: { en: "Yes", zh: "是" }, status: "alarming" },
      { key: { en: "Length", zh: "时长" }, value: { en: "15 min", zh: "15 分钟" }, status: "warning" },
      { key: { en: "Context", zh: "背景信息" }, value: { en: "None given", zh: "没有任何" }, status: "unknown" },
    ],
    choices: [
      { id: "definitely_fired", label: { en: "Definitely Bad News", zh: "肯定是坏消息" } },
      { id: "could_be_routine", label: { en: "Could Be Routine HR Logistics", zh: "可能只是 HR 例行事务" } },
      { id: "definitely_fine", label: { en: "Definitely Nothing", zh: "肯定没事" } },
      { id: "none", label: { en: "Cannot Tell — Genuinely", zh: "真的判断不了" } },
    ],
    answer: "none",
    actualCause: { en: "An Ominous Format — But Outcome Unknowable", zh: "一个不祥的格式，但结果无从得知" },
    explanation: {
      en: "No title, no agenda, HR present, short and same-day — this is the format people dread, and it is genuinely a poor signal. But the same wrapper covers benefits paperwork, a transfer, a reorg notice, or hard news. The format raises the odds of something; it does not tell you what. You cannot resolve this from the invite alone.",
      zh: "没标题、没议程、HR 在列、又短、当天邀请，这正是大家最怕的格式，确实是个不太好的信号。但同样的包装也可能装着文书手续、一次国际调岗、一份重组通知，或者坏消息。这个格式提高了“有事”的概率，却没告诉你是什么事。光凭这个邀请，你解不出答案。",
    },
    resultFlavor: {
      correct: { en: "Honest call. The format is ominous, but the contents are unknowable. Breathe, then go find out.", zh: "诚实的判断。格式不祥，信息不足；按流程进会，现场取证。" },
      wrong: { en: "Honest call. The format is ominous, but the contents are unknowable. Breathe, then go find out.", zh: "诚实的判断。格式不祥，信息不足；按流程进会，现场取证。" },
    },
  },
  {
    id: "case-100",
    difficulty: "hard",
    tags: ["joke", "ambiguous", "politics", "finale"],
    title: { en: "We're a Family", zh: "我们是一家人" },
    intro: {
      en: "Leadership sent a heartfelt 'we're a family' all-hands email. Then went silent.",
      zh: "领导层发了一封情真意切的“我们是一家人”全员邮件，然后就没声了。",
    },
    telemetry: [
      { key: { en: "Email Sentiment", zh: "邮件情绪" }, value: { en: "Very warm", zh: "非常温暖" }, status: "warning" },
      { key: { en: "Specifics", zh: "具体内容" }, value: { en: "Zero", zh: "零" }, status: "alarming" },
      { key: { en: "Follow-up", zh: "后续" }, value: { en: "Silence", zh: "沉默" }, status: "alarming" },
      { key: { en: "Stock", zh: "股价" }, value: { en: "Down lately", zh: "最近在跌" }, status: "warning" },
      { key: { en: "Actual News", zh: "实际消息" }, value: { en: "None yet", zh: "暂无" }, status: "unknown" },
    ],
    choices: [
      { id: "genuine_warmth", label: { en: "Genuine Warmth", zh: "良心发现" } },
      { id: "layoffs_next_week", label: { en: "Layoffs Next Week", zh: "下周裁员" } },
      { id: "nothing_at_all", label: { en: "Means Nothing At All", zh: "什么都不意味着" } },
      { id: "none", label: { en: "Undecodable By Design", zh: "设计上就无法解码" } },
    ],
    answer: "none",
    actualCause: { en: "Maximum Corporate Ambiguity", zh: "企业含糊的最高形态" },
    explanation: {
      en: "'We're a family' with zero specifics, followed by silence, with the stock down — this is the most load-bearing non-statement in tech. It precedes warmth, layoffs, or absolutely nothing, with equal frequency. Like case-003 and case-100's whole lineage: when there's no signal, the honest verdict is that you cannot know. Follow the telemetry; there isn't any.",
      zh: "“我们是一家人”、零具体内容、紧接着沉默、股价还在跌，这是科技圈最能承重的一句废话。它前面可能是温情、可能是裁员、也可能什么都没有，概率不相上下。就像 case-003 那一脉：当没有信号时，诚实的结论就是你无法知道。跟着数据走吧，可这次根本没有数据。",
    },
    resultFlavor: {
      correct: { en: "Correct. 'We're a family' is Schrodinger's memo. Follow the telemetry — there is none.", zh: "正确。“我们是一家人”是薛定谔的备忘录。一封没有具体内容的温情邮件的解读，可能是什么都没有，也可能是一切。" },
      wrong: { en: "Correct verdict was 'unknowable'. A warm email with no specifics decodes to nothing — and possibly everything.", zh: "正确答案是“无从得知”。一封没有具体内容的温情邮件的解读，可能是什么都没有，也可能是一切。" },
    },
  }
];

