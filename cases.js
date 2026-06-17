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
 *               cases that have no knowable cause).
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
        key: { en: "Manager", zh: "Manager" },
        value: { en: "Present", zh: "存在" },
        status: "normal",
      },
      {
        key: { en: "Groups", zh: "Groups" },
        value: { en: "12", zh: "12" },
        status: "normal",
      },
      {
        key: { en: "GAL", zh: "个人页面" },
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
    actualCause: { en: "Identity Sync Failure", zh: "身份同步炸了" },
    explanation: {
      en: "Only the photo is missing. The manager, GAL visibility, and groups are still normal. This is more likely a sync issue than an actual disappearance.",
      zh: "只有头像消失了，Manager、个人页面可见性和 Groups 都还正常。比起真的人没了，这更像是同步服务炸了。",
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
      zh: "一位同事的记录变了，但没人发任何公告。",
    },
    telemetry: [
      {
        key: { en: "Photo", zh: "头像" },
        value: { en: "Visible", zh: "可见" },
        status: "normal",
      },
      {
        key: { en: "Manager", zh: "Manager" },
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
        key: { en: "GAL", zh: "个人页面" },
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
    actualCause: { en: "Internal Transfer", zh: "内部转组" },
    explanation: {
      en: "Manager and cost center changed while the title stayed the same and GAL is still visible. That is the signature of a lateral move, not a departure.",
      zh: "Manager 和 Cost Center 变了，但 Title 没变、个人页面还可见。这是平级转组的特征，不是离职。",
    },
    resultFlavor: {
      correct: {
        en: "Calmly read as a transfer. No drama generated.",
        zh: "冷静判断为转组，没有制造戏剧。",
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
      zh: "一个账号存在，但所有信号都指向虚无。",
    },
    telemetry: [
      {
        key: { en: "Photo", zh: "头像" },
        value: { en: "NULL", zh: "NULL" },
        status: "unknown",
      },
      {
        key: { en: "Manager", zh: "Manager" },
        value: { en: "NULL", zh: "NULL" },
        status: "unknown",
      },
      {
        key: { en: "Groups", zh: "Groups" },
        value: { en: "0", zh: "0" },
        status: "alarming",
      },
      {
        key: { en: "GAL", zh: "个人页面" },
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
      zh: "一半字段是 NULL，Groups 是 0，但个人页面还可见。证据确实不足。诚实的答案是：没人知道。",
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
      zh: "上报链上两级 Manager 在同一天变了。",
    },
    telemetry: [
      {
        key: { en: "Manager", zh: "Manager" },
        value: { en: "Changed", zh: "已变更" },
        status: "warning",
      },
      {
        key: { en: "Skip Manager", zh: "Skip Manager" },
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
        key: { en: "GAL", zh: "个人页面" },
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
    actualCause: { en: "Reorg", zh: "组织架构调整" },
    explanation: {
      en: "Both the manager and skip-level changed at once while title, groups, and GAL stayed put. When the chain shifts above you but your own record is intact, that is reorg weather.",
      zh: "Manager 和 Skip Manager 同时变了，而 Title、Groups、个人页面都没动。当你头顶的汇报链变了、但你自己完好无损，这就是幸福。",
    },
    resultFlavor: {
      correct: {
        en: "You read the weather, not the panic. The org moved; the person did not.",
        zh: "你读的是天气，不是恐慌。动的是组织，不是人。",
      },
      wrong: {
        en: "You filed an incident for the climate.",
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
      zh: "某位同事连续三个工作日没有出现在日常活动中。",
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
        key: { en: "GAL", zh: "个人页面" },
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
    actualCause: {
      en: "DEI Training",
      zh: "参加 DEI 培训",
    },
    explanation: {
      en: "The employee was attending a three-day DEI training program. The telemetry was accurate. The theory was not.",
      zh: "该员工连续三天参加 DEI 培训。数据没有说谎，但你的理论过于丰富。",
    },
    resultFlavor: {
      correct: {
        en: "Correct. Sometimes a disappearing coworker is simply learning something.",
        zh: "正确。有时候消失的同事真的只是在上课。",
      },
      wrong: {
        en: "BAD END: Built a complete departure theory around a training course.",
        zh: "BAD END：围绕一次培训，你为他编造了一整套离职故事。",
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
      zh: "一位同事最近频繁预约“看牙”。他的牙从没这么好过。",
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
        key: { en: "GAL", zh: "个人页面" },
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
    actualCause: { en: "Interviewing Elsewhere", zh: "在外面面试" },
    explanation: {
      en: "Camera always on, suddenly formal, secret 'Open to Work', and a dentist with implausible availability. Nobody has this many dental emergencies. They are interviewing.",
      zh: "摄像头全程开、突然穿正装、偷偷开了求职意向，还有一个空档多得离谱的牙医。没人会有这么多次牙科急诊。他在面试。",
    },
    resultFlavor: {
      correct: {
        en: "You read the formal-wear-on-a-Tuesday signal correctly. Wish them luck silently.",
        zh: "你正确读出了“周二穿正装”这个信号。你在心里默默祝他好运。",
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
        key: { en: "GAL", zh: "个人页面" },
        value: { en: "Visible", zh: "可见" },
        status: "normal",
      },
    ],
    choices: [
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
      { id: "vacation", label: { en: "Vacation", zh: "休假中" } },
      {
        id: "security_training",
        label: { en: "Phishing-Click Security Training", zh: "钓鱼邮件点击者安全培训" },
      },
      { id: "sabbatical", label: { en: "Sabbatical", zh: "停薪留职" } },
    ],
    answer: "security_training",
    actualCause: {
      en: "Phishing-Click Security Training",
      zh: "钓鱼邮件点击者安全培训",
    },
    explanation: {
      en: "Mailbox last action was 'clicked a link', the account got a Security Hold, and the calendar reads 'Mandatory Training' for exactly five days. They clicked the test phish. They are in re-education for a week.",
      zh: "邮箱最后操作是“点了个链接”，账号被安全冻结，日历上正好五天“强制培训”。他点了那封钓鱼测试邮件，被送去再教育一周。",
    },
    resultFlavor: {
      correct: {
        en: "Correct. The disappearance was a punishment, not a departure. They will be back, humbled.",
        zh: "正确。这次消失是惩罚，不是离职。他会回来的，而且变成了网络安全专家。",
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
        key: { en: "Manager", zh: "Manager" },
        value: { en: "Present", zh: "存在" },
        status: "normal",
      },
      {
        key: { en: "2-Week Notice", zh: "离职通知" },
        value: { en: "Submitted", zh: "已提交" },
        status: "alarming",
      },
      {
        key: { en: "GAL", zh: "个人页面" },
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
    actualCause: { en: "Leaving for a Startup", zh: "跳槽去创业公司" },
    explanation: {
      en: "Rocket emoji status, a 400% spike in equity talk, and an actual two-week notice on file. This one is not a theory. They are boarding the rocket ship.",
      zh: "火箭 emoji 状态、聊工资和股权的频率涨了 400%、还有一封实打实的离职通知。这次不是猜测，他真的要乘上那艘火箭了！",
    },
    resultFlavor: {
      correct: {
        en: "Correct. Ask for the referral bonus terms before they leave.",
        zh: "正确。趁他还没走，你赶紧问他能不能带你走。",
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
        key: { en: "Manager", zh: "Manager" },
        value: { en: "Founder", zh: "创始人本人" },
        status: "alarming",
      },
      {
        key: { en: "GAL", zh: "个人页面" },
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
    actualCause: { en: "Joined an AI Lab as MTS", zh: "去 AI lab 当 Member of Technical Staff 了" },
    explanation: {
      en: "'Member of Technical Staff' with a NULL level, a brand-new tiny lab cost center, and the founder as direct manager. The flat-title-plus-no-level combo is the signature of an AI lab, not a promotion.",
      zh: "Title 是“Member of Technical Staff”、职级字段是 NULL、Cost Center 是个新成立的小 lab、直属 Manager 是创始人。扁平 Title 加没有职级，这是 AI lab 的特征，不是升职。",
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
      zh: "世界杯期间，一位同事想找你友好地寒暄。事情没有按计划发展。",
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
    actualCause: { en: "Chinese Men's Football", zh: "中国男足" },
    explanation: {
      en: "There was no safe answer. The real root cause, as always, traces back to Chinese men's football. The telemetry merely recorded the fallout.",
      zh: "这题没有安全答案。真正的 root cause，一如既往，最后都能追溯到中国男足身上。数据只是记录了余波。",
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
        key: { en: "GAL", zh: "个人页面" },
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
    actualCause: { en: "Legal Name Change", zh: "改了法定姓名" },
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
        zh: "你这个冷漠无情的人，居然把一位同事认成了陌生人。他坐在你斜对面，还记得你的生日。",
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
        key: { en: "GAL", zh: "个人页面" },
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
    actualCause: { en: "Photo Service Outage", zh: "头像服务挂了" },
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
      zh: "一位同事设了一条长达数月的 OOF 自动回复，然后没了声音。工位还是他的。",
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
        key: { en: "Manager", zh: "Manager" },
        value: { en: "Same", zh: "不变" },
        status: "normal",
      },
      {
        key: { en: "Desk Assignment", zh: "工位分配" },
        value: { en: "Reserved", zh: "保留中" },
        status: "normal",
      },
      {
        key: { en: "GAL", zh: "个人页面" },
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
    actualCause: { en: "Extended Leave", zh: "长假 / 育儿假" },
    explanation: {
      en: "Cost center unchanged, manager unchanged, desk reserved, GAL visible, and a multi-month OOF. Everything points to someone who is coming back. This is leave, not a departure.",
      zh: "Cost center 没变、Manager 没变、工位保留、个人页面可见，还有一条数月的 OOF。所有信号都指向一个会回来的人。这是休长假，不是离职。",
    },
    resultFlavor: {
      correct: {
        en: "Correct. A reserved desk is a promise that someone is coming back.",
        zh: "正确。一个被保留的工位，是一句“他会回来”的承诺。",
      },
      wrong: {
        en: "You wrote them off. They are coming back in spring, well-rested and slightly offended.",
        zh: "你提前给他写了讣告。可是他春天就回来，精神饱满，而且有点被冒犯。",
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
        key: { en: "GAL", zh: "个人页面" },
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
    actualCause: { en: "Layoff", zh: "被裁了" },
    explanation: {
      en: "GAL removed, badge revoked, laptop returned, severance auto-reply, position closed. Every signal points the same direction. The hardest lesson in this job is that sometimes the obvious answer is the true one.",
      zh: "个人页面移除、门禁撤销、笔记本寄回、补偿自动回复、岗位关闭。每一个信号都指向同一个方向。这份工作最难的一课是：有时候那个显而易见的答案，就是真的。",
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
        key: { en: "Their Manager", zh: "他的 Manager" },
        value: { en: "Unchanged", zh: "不变" },
        status: "normal",
      },
      {
        key: { en: "Title", zh: "Title" },
        value: { en: "+ Manager", zh: "+ Manager" },
        status: "warning",
      },
      {
        key: { en: "Cost Center", zh: "Cost Center" },
        value: { en: "Same", zh: "不变" },
        status: "normal",
      },
      {
        key: { en: "GAL", zh: "个人页面" },
        value: { en: "Visible", zh: "可见" },
        status: "normal",
      },
    ],
    choices: [
      { id: "reorg", label: { en: "Reorg", zh: "组织架构调整" } },
      { id: "transfer", label: { en: "Transfer", zh: "转组" } },
      { id: "became_manager", label: { en: "Promoted to Manager", zh: "升职 Manager" } },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
    ],
    answer: "became_manager",
    actualCause: { en: "Promoted to Manager", zh: "升职 Manager" },
    explanation: {
      en: "Their own manager is unchanged, cost center is the same, but four reports appeared under them and the title gained 'Manager'. They did not move. People moved under them.",
      zh: "他自己的 Manager 没变、Cost Center 没变，但下面挂了四个人，Title 多了“Manager”。他没有动，是有人被挪到了他下面。",
    },
    resultFlavor: {
      correct: {
        en: "Correct. The expand arrow is the tell. They are someone's boss now.",
        zh: "正确。他现在是别人的老板了。",
      },
      wrong: {
        en: "You missed the four people who appeared under their name. They noticed.",
        zh: "你没注意到他名下突然多出来的四个人，但那四个人注意到了。",
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
      zh: "一个服务账号开始出现在真人的会议邀请里。它没有 Manager，也没有脸。",
    },
    telemetry: [
      {
        key: { en: "Account Type", zh: "账号类型" },
        value: { en: "Service (?)", zh: "服务账号（？）" },
        status: "unknown",
      },
      {
        key: { en: "Manager", zh: "Manager" },
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
        key: { en: "GAL", zh: "个人页面" },
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
      zh: "类型是个问号、Manager 是 NULL、密码从未设置、个人页面隐藏。每一个能识别它的字段都是空的。你无法断定它是什么。诚实的答案是：数据不足。",
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
      zh: "你同事的 Manager 变了。他 Manager 的 Manager 也变了。往上三层全变了。",
    },
    telemetry: [
      {
        key: { en: "Manager", zh: "Manager" },
        value: { en: "Changed", zh: "已变更" },
        status: "warning",
      },
      {
        key: { en: "Skip Manager", zh: "Skip Manager" },
        value: { en: "Changed", zh: "已变更" },
        status: "warning",
      },
      {
        key: { en: "Skip-Skip Manager", zh: "Skip-Skip Manager" },
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
    actualCause: { en: "Org Reorg", zh: "组织架构调整" },
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
      zh: "一位受人尊敬的资深工程师，他的 Title 现在在所有工具里都写着“undefined”。",
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
        key: { en: "GAL", zh: "个人页面" },
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
    actualCause: { en: "Title Field Data Bug", zh: "Title 字段数据 bug" },
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
      zh: "一位明显在面试的同事，突然不面了，然后涨薪了。还是说，他其实走了？",
    },
    telemetry: [
      {
        key: { en: "Interview Signals", zh: "面试信号" },
        value: { en: "Dropped to zero", zh: "归零" },
        status: "normal",
      },
      {
        key: { en: "Comp Ration", zh: "薪资比例" },
        value: { en: "Adjusted up", zh: "上调" },
        status: "warning",
      },
      {
        key: { en: "Manager", zh: "Manager" },
        value: { en: "Same", zh: "不变" },
        status: "normal",
      },
      {
        key: { en: "GAL", zh: "个人页面" },
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
    actualCause: { en: "Accepted a Counteroffer", zh: "接受了挽留 offer" },
    explanation: {
      en: "Interview signals dropped to zero, comp was adjusted up, manager unchanged, GAL visible, and HR literally noted 'counteroffer accepted'. They were leaving, then they weren't. The company paid to keep them.",
      zh: "面试信号归零、薪资上调、Manager 没变、个人页面可见，HR 备注白纸黑字写着“已接受挽留”。他本来要走，后来没走。公司花钱把他留下了。",
    },
    resultFlavor: {
      correct: {
        en: "Correct. The raise was a leash, and it worked. For now.",
        zh: "正确。那笔涨薪暂时奏效了。",
      },
      wrong: {
        en: "You buried someone who is still at their desk, now slightly richer and slightly bored.",
        zh: "你埋葬了一个还坐在工位上的人。他现在钱多了一点，也寂寞了一点。",
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
        key: { en: "GAL", zh: "个人页面" },
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
    actualCause: { en: "It Was DNS", zh: "是 DNS 的锅" },
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
      { key: { en: "GAL", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "promotion", label: { en: "Dual Role / Promotion", zh: "身兼两职 / 升职" } },
      { id: "merge_bug", label: { en: "Two Records Merged", zh: "两条记录被合并" } },
      { id: "impersonation", label: { en: "Account Takeover", zh: "账号被盗" } },
      { id: "transfer", label: { en: "Transfer", zh: "转组" } },
    ],
    answer: "merge_bug",
    actualCause: { en: "Two Records Merged", zh: "两条记录被合并" },
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
      zh: "一位同事的头像突然旋转了 90 度。照片里的他看起来毫不在意。",
    },
    telemetry: [
      { key: { en: "Photo", zh: "头像" }, value: { en: "Rotated 90°", zh: "旋转 90°" }, status: "warning" },
      { key: { en: "Upload Time", zh: "上传时间" }, value: { en: "This morning", zh: "今早" }, status: "normal" },
      { key: { en: "EXIF Orientation", zh: "EXIF 方向" }, value: { en: "Ignored", zh: "被忽略" }, status: "warning" },
      { key: { en: "Everything Else", zh: "其它一切" }, value: { en: "Normal", zh: "正常" }, status: "normal" },
      { key: { en: "GAL", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "layoff", label: { en: "Something's Wrong (Layoff?)", zh: "出事了（裁员？）" } },
      { id: "exif_bug", label: { en: "EXIF Orientation Bug", zh: "EXIF 方向 bug" } },
      { id: "prank", label: { en: "A Prank", zh: "有人恶搞" } },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
    ],
    answer: "exif_bug",
    actualCause: { en: "EXIF Orientation Bug", zh: "EXIF 方向 bug" },
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
      zh: "一位同事的入职日期现在显示 1970 年 1 月 1 日，可是他看起来没有 56 年工龄。",
    },
    telemetry: [
      { key: { en: "Hire Date", zh: "入职日期" }, value: { en: "1970-01-01", zh: "1970-01-01" }, status: "warning" },
      { key: { en: "Tenure Badge", zh: "工龄徽章" }, value: { en: "56 years", zh: "56 年" }, status: "alarming" },
      { key: { en: "Manager", zh: "Manager" }, value: { en: "Same", zh: "不变" }, status: "normal" },
      { key: { en: "Other Dates", zh: "其它日期" }, value: { en: "Also reset", zh: "也被重置" }, status: "warning" },
      { key: { en: "GAL", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "veteran", label: { en: "A True Veteran", zh: "真·元老" } },
      { id: "epoch_bug", label: { en: "Unix Epoch Null Date", zh: "Unix 纪元空日期" } },
      { id: "rehire", label: { en: "Rehired Employee", zh: "返聘员工" } },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
    ],
    answer: "epoch_bug",
    actualCause: { en: "Unix Epoch Null Date", zh: "Unix 纪元空日期" },
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
    title: { en: "The Manager Loop", zh: "Manager 闭环" },
    intro: {
      en: "A reports to B. B reports to A. The org chart has eaten its own tail.",
      zh: "A 向 B 汇报，B 向 A 汇报。组织架构图咬住了自己的尾巴。",
    },
    telemetry: [
      { key: { en: "A's Manager", zh: "A 的 Manager" }, value: { en: "B", zh: "B" }, status: "warning" },
      { key: { en: "B's Manager", zh: "B 的 Manager" }, value: { en: "A", zh: "A" }, status: "alarming" },
      { key: { en: "Org Tree Render", zh: "组织树渲染" }, value: { en: "Stack overflow", zh: "栈溢出" }, status: "alarming" },
      { key: { en: "Recent Import", zh: "近期导入" }, value: { en: "HR feed, last night", zh: "HR 数据，昨晚" }, status: "warning" },
      { key: { en: "GAL", zh: "个人页面" }, value: { en: "Both visible", zh: "两人都可见" }, status: "normal" },
    ],
    choices: [
      { id: "copilot_promo", label: { en: "Co-Leadership Setup", zh: "双负责人结构" } },
      { id: "cycle_bug", label: { en: "Import Created a Cycle", zh: "导入造成环引用" } },
      { id: "reorg", label: { en: "Reorg In Progress", zh: "重组进行中" } },
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
    ],
    answer: "cycle_bug",
    actualCause: { en: "Import Created a Cycle", zh: "导入造成环引用" },
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
      { key: { en: "Manager", zh: "Manager" }, value: { en: "Same", zh: "不变" }, status: "normal" },
      { key: { en: "Org Chart", zh: "组织架构" }, value: { en: "Single node", zh: "单个节点" }, status: "normal" },
    ],
    choices: [
      { id: "twin", label: { en: "Secret Twin", zh: "隐藏的双胞胎" } },
      { id: "dedup_bug", label: { en: "Failed Deduplication", zh: "去重失败" } },
      { id: "rehire", label: { en: "Rehired With New Account", zh: "返聘开了新账号" } },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
    ],
    answer: "dedup_bug",
    actualCause: { en: "Failed Deduplication", zh: "去重失败" },
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
      zh: "你的同事，以及他身边所有人，下周的日历都被整块占满了。",
    },
    telemetry: [
      { key: { en: "Calendar", zh: "日历" }, value: { en: "Blocked, whole team", zh: "整组屏蔽" }, status: "warning" },
      { key: { en: "Event Title", zh: "事件标题" }, value: { en: "'Team Offsite'", zh: "“团队 Offsite”" }, status: "normal" },
      { key: { en: "Location", zh: "地点" }, value: { en: "A hotel", zh: "某酒店" }, status: "normal" },
      { key: { en: "Org Chart", zh: "组织架构" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "GAL", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "mass_layoff", label: { en: "Team Layoff", zh: "整组裁员" } },
      { id: "offsite", label: { en: "Team Offsite", zh: "团队团建" } },
      { id: "reorg", label: { en: "Reorg", zh: "重组" } },
      { id: "training", label: { en: "Training", zh: "培训" } },
    ],
    answer: "offsite",
    actualCause: { en: "Team Offsite", zh: "团队团建" },
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
      { key: { en: "GAL", zh: "个人页面" }, value: { en: "Both visible", zh: "两人都可见" }, status: "normal" },
    ],
    choices: [
      { id: "replaced", label: { en: "Quietly Replaced", zh: "被悄悄换掉了" } },
      { id: "mat_cover", label: { en: "Someone Covering Leave", zh: "有人在顶替休假" } },
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
      { id: "transfer", label: { en: "Transfer", zh: "转组" } },
    ],
    answer: "mat_cover",
    actualCause: { en: "Someone Covering Leave", zh: "有人在顶替休假" },
    explanation: {
      en: "The new person's title literally says 'maternity cover', the original is still in the GAL with a reserved desk, and the cost center is unchanged. They were not replaced. Someone is keeping the seat warm.",
      zh: "新人的 Title 白纸黑字写着“产假顶岗”、原同事仍在地址簿且工位保留、cost center 没变。他没被换掉，只是有人在帮他暖座位。",
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
      { key: { en: "GAL", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "busy_leaving", label: { en: "Too Busy, About to Quit", zh: "忙到要离职" } },
      { id: "stuck_status", label: { en: "Stuck Presence Status", zh: "状态卡住了" } },
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
      { id: "leave", label: { en: "On Leave", zh: "休假中" } },
    ],
    answer: "stuck_status",
    actualCause: { en: "Stuck Presence Status", zh: "状态卡住了" },
    explanation: {
      en: "Nine days of 'Presenting' with no ongoing meetings, while they reply to messages normally. Nobody presents for nine days. The presence flag got stuck after a screen share never cleanly ended.",
      zh: "连续九天“正在演示”却没有任何在进行的会议，同时消息照常回复。没人能演示九天。是一次屏幕共享没干净结束，状态标记卡住了。",
    },
    resultFlavor: {
      correct: { en: "Correct. The status lied. The human is fine.", zh: "正确。状态在撒谎，他人好得很。" },
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
      { key: { en: "GAL", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "breakdown", label: { en: "Stress, About to Quit", zh: "压力崩溃要离职" } },
      { id: "oncall", label: { en: "On-Call Rotation", zh: "在 On-Call" } },
      { id: "hacked", label: { en: "Account Hacked", zh: "账号被黑" } },
      { id: "promotion", label: { en: "Promotion", zh: "升职了" } },
    ],
    answer: "oncall",
    actualCause: { en: "On-Call Rotation", zh: "在 On-Call" },
    explanation: {
      en: "Their calendar says 'On-Call' this week, replies are instant around the clock, and the org chart is unchanged. They are not breaking down. They are paging-duty awake at 3am, typing fast in the dark.",
      zh: "日历显示本周“On-Call”、回复全天候秒回、组织架构没变。他不是崩溃了，是被事故逼到凌晨三点还醒着，在黑暗里飞快打字。",
    },
    resultFlavor: {
      correct: { en: "Correct. That is not panic, that is a pager.", zh: "正确。那不是恐慌，那是个事故。" },
      wrong: { en: "You diagnosed burnout. It was a rotation. Bring them coffee.", zh: "你诊断成了倦怠。其实是 oncall。给他递杯咖啡吧。" },
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
      { key: { en: "GAL", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "quit", label: { en: "Quit", zh: "离职了" } },
      { id: "secondment", label: { en: "Secondment / Loan", zh: "借调 / 外派" } },
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
      { id: "transfer", label: { en: "Permanent Transfer", zh: "永久转组" } },
    ],
    answer: "secondment",
    actualCause: { en: "Secondment / Loan", zh: "借调 / 外派" },
    explanation: {
      en: "A six-month redirect, a temporary cost center move, and a set return date. They were lent to another team, not lost. The return date is the tell.",
      zh: "六个月的转接、临时的 cost center 调动、还有一个已设定的返回日期。他是被借调到另一个团队，不是走了。返回日期就是线索。",
    },
    resultFlavor: {
      correct: { en: "Correct. A return date means they are coming back.", zh: "正确。有返回日期，就说明他会回来。" },
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
      { key: { en: "GAL", zh: "个人页面" }, value: { en: "Visible (ends soon)", zh: "可见（即将结束）" }, status: "warning" },
    ],
    choices: [
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
      { id: "retirement", label: { en: "Retirement", zh: "退休" } },
      { id: "transfer", label: { en: "Transfer", zh: "转组" } },
      { id: "sabbatical", label: { en: "Sabbatical", zh: "停薪留职" } },
    ],
    answer: "retirement",
    actualCause: { en: "Retirement", zh: "退休" },
    explanation: {
      en: "Thirty years tenure, a farewell party with cake, nostalgic emails, and a scheduled account end date. This is a planned, celebrated exit. They are retiring, not being cut.",
      zh: "三十年工龄、带蛋糕的欢送会、怀旧的邮件、还有一个计划好的账号截止日。这是一次有计划、被庆祝的告别。他是退休，不是被裁。",
    },
    resultFlavor: {
      correct: { en: "Correct. Thirty years earns the cake. Wish them well.", zh: "正确。三十年换来这块蛋糕。祝他一切都好。" },
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
      zh: "一位同事的地址簿条目没了，而他在别处的公开主页加上了一圈绿环。",
    },
    telemetry: [
      { key: { en: "GAL", zh: "个人页面" }, value: { en: "Removed", zh: "已移除" }, status: "alarming" },
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
    actualCause: { en: "Resigned / Left", zh: "已离职" },
    explanation: {
      en: "GAL removed, badge revoked, a last-day email sent, the org node deleted, and a public 'Open To Work' banner. Every signal agrees. They resigned. Not every disappearance is a backend bug.",
      zh: "个人档案移除、门禁撤销、离职邮件已发、组织节点删除、公开主页挂上“求职中”。每个信号都一致。他离职了。不是每次消失都是后端 bug。",
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
    actualCause: { en: "Department Layoff", zh: "部门裁员" },
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
      { key: { en: "GAL", zh: "个人页面" }, value: { en: "Removed", zh: "已移除" }, status: "alarming" },
    ],
    choices: [
      { id: "sabbatical", label: { en: "Sabbatical", zh: "停薪留职" } },
      { id: "left_alumni", label: { en: "Left, Moved to Alumni", zh: "毕业愉快" } },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
      { id: "transfer", label: { en: "Transfer", zh: "转组" } },
    ],
    answer: "left_alumni",
    actualCause: { en: "Left, Moved to Alumni", zh: "毕业愉快" },
    explanation: {
      en: "The account type literally changed to 'Alumni', internal access was removed, and they were invited to the alumni portal. This is a formal, clean offboarding. They left on good terms.",
      zh: "账号类型白纸黑字变成了“校友”、内网权限移除、收到校友门户邀请。这是一次正式、体面的离职流程。他好聚好散地走了。",
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
      zh: "一位同事在项目中途突然消失了，他的“工作授权”字段上挂着一个标记。",
    },
    telemetry: [
      { key: { en: "Work Auth", zh: "工作授权" }, value: { en: "Under review", zh: "审核中" }, status: "warning" },
      { key: { en: "Status", zh: "状态" }, value: { en: "On leave (1-2 mo)", zh: "休假中（1-2 月）" }, status: "warning" },
      { key: { en: "Cost Center", zh: "Cost Center" }, value: { en: "Unchanged", zh: "无变化" }, status: "normal" },
      { key: { en: "Return Date", zh: "返回日期" }, value: { en: "Estimated", zh: "已预估" }, status: "normal" },
      { key: { en: "GAL", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "fired", label: { en: "Forced Out", zh: "被迫离开" } },
      { id: "visa_leave", label: { en: "Visa / Immigration Check", zh: "签证 / 移民审查" } },
      { id: "quit", label: { en: "Quietly Quit", zh: "悄悄离职" } },
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
    ],
    answer: "visa_leave",
    actualCause: { en: "Visa / Immigration Check", zh: "签证 / 移民审查" },
    explanation: {
      en: "Work authorization is 'under review', the leave is a month or two, the cost center is unchanged, and there is an estimated return date. This is an immigration processing pause, not a departure. The paperwork moves slowly; the job is still theirs.",
      zh: "工作授权显示“审核中”、休假一两个月、cost center 没变、还有一个预估返回日期，他的签证被安全调查了。手续走得慢，但岗位还是他的。",
    },
    resultFlavor: {
      correct: { en: "Correct. The border is slow, the seat is kept.", zh: "正确。大使馆很慢，座位给他留着。" },
      wrong: { en: "You wrote them off over a paperwork delay. They are stuck in a consulate queue, not gone.", zh: "你因为一次手续延迟就给他写了讣告，他只是卡在领事馆排队，不是走了。" },
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
      { key: { en: "GAL", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "promotion", label: { en: "Full Promotion", zh: "正式升职" } },
      { id: "acting", label: { en: "Acting / Interim Role", zh: "代理 / 临时岗" } },
      { id: "reorg", label: { en: "Reorg", zh: "重组" } },
      { id: "transfer", label: { en: "Transfer", zh: "转组" } },
    ],
    answer: "acting",
    actualCause: { en: "Acting / Interim Role", zh: "代理 / 临时岗" },
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
      { key: { en: "Their Manager", zh: "他的 Manager" }, value: { en: "Now a VP", zh: "变成了 VP" }, status: "warning" },
      { key: { en: "GAL", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "spam", label: { en: "Mailing List Spam Bug", zh: "邮件组错了" } },
      { id: "into_leadership", label: { en: "Moved Into Leadership", zh: "进入管理层" } },
      { id: "transfer", label: { en: "Transfer", zh: "转组" } },
      { id: "reorg", label: { en: "Reorg", zh: "重组" } },
    ],
    answer: "into_leadership",
    actualCause: { en: "Moved Into Leadership", zh: "进入管理层" },
    explanation: {
      en: "Twelve leadership lists, more direct reports, a '+ Director' title, and a manager who is now a VP. The list membership tracks the title and the reports. They moved up into leadership.",
      zh: "12 个管理层组、更多直属下属、Title 加了“Director”、Manager 变成了 VP。邮件组的变化和 Title、下属是一致的。他升职进了管理层。",
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
      { key: { en: "Manager", zh: "Manager" }, value: { en: "Same", zh: "不变" }, status: "normal" },
      { key: { en: "GAL", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "data_bug", label: { en: "Level Field Glitch", zh: "职级字段出错" } },
      { id: "inband_promo", label: { en: "In-Band (Silent) Promotion", zh: "静默升级" } },
      { id: "transfer", label: { en: "Transfer", zh: "转组" } },
      { id: "reorg", label: { en: "Reorg", zh: "重组" } },
    ],
    answer: "inband_promo",
    actualCause: { en: "In-Band (Silent) Promotion", zh: "静默升级" },
    explanation: {
      en: "Level went up by one, comp band adjusted up, manager unchanged, title text the same. Many ladders promote within the same title text. The comp change confirms it is real, not a glitch.",
      zh: "职级加一、Compa ratio 上调、Manager 没变、Title 文字不变。很多职级体系在同一个 Title 文字下也能升级。W-2 表是真的。",
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
      { key: { en: "GAL", zh: "个人页面" }, value: { en: "Visible", zh: "可见" }, status: "normal" },
    ],
    choices: [
      { id: "outage", label: { en: "Real Outage", zh: "真的故障" } },
      { id: "layoff", label: { en: "Layoff", zh: "被裁了" } },
      { id: "monday", label: { en: "It Is Just Monday", zh: "只是周一而已" } },
      { id: "sync_failure", label: { en: "Identity Sync Failure", zh: "身份同步炸了" } },
    ],
    answer: "monday",
    actualCause: { en: "It Is Just Monday", zh: "只是周一而已" },
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
    actualCause: { en: "Mercury Retrograde", zh: "水星逆行" },
    explanation: {
      en: "Flaky everything, no root cause found, and the only thing that correlates is a planet. When the postmortem has no answer, engineers reach for the stars. This is a joke case: the honest root cause is 'we never found it'.",
      zh: "什么都时好时坏、找不到根因，唯一能对上的是一颗行星。当复盘写不出结论时，工程师就开始仰望星空。“水逆”是个玩笑：诚实的根因是“我们一直没找到”。",
    },
    resultFlavor: {
      correct: { en: "Correct, astrologically. The real RCA is 'unknown'. Mercury took the blame.", zh: "正确，从占星学上说。真正的根因是“未知”。锅让水星背了。" },
      wrong: { en: "BAD END: You filed a real bug against a planet. It will not be fixed by next sprint.", zh: "BAD END：你给一颗行星提了个 bug，它才不会在下个 sprint 修好呢！" },
    },
  },
];
