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
];
