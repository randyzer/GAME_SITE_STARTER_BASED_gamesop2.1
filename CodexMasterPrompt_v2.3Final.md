# Codex Master Prompt — Post-Smoke-Test Updated Final

> 本版本在原 Master Prompt 基础上，同步 Afterworld Real-Game Smoke Test 已验证并回灌到 `GAME_SOP_2.1` / `GAME_SITE_STARTER` 的通用规则。
>
> 本次同步只更新真实项目执行流程、Page Inventory 语义、Fact 使用边界与 Deployment Gate。
> 不重新设计已经通过 Smoke Test 验证的 Stable Core 架构。

你现在要基于以下 SOP 仓库，为我设计并最终实现一个新的、可商用、可复用的新游戏 SEO 网站模板：

SOP 规范仓库：

https://github.com/randyzer/GAME_SOP_2.1.git

Starter 正式开发根目录：

/Users/randyz/work/coding/hot_words_web/Repo_hotgameweb/GAME_SITE_STARTER_BASED_gamesop2.1

目标项目逻辑名称：

GAME_SITE_STARTER

这个 Starter 不是某一个具体游戏站，而是一套可重复使用的新游戏建站底座。

以后每做一个新游戏站，我希望大体流程是：

Clone GAME_SITE_STARTER
↓
读取并遵循 GAME_SOP_2.1
↓
生成并维护 6 个 Project Artifacts
↓
完成 Official Source Verification
↓
完成 Discovery Research
↓
确定 SITE_STRUCTURE
↓
确定 structured runtime Page Inventory SSOT
↓
人工审核 materially changed page scope
↓
修改 game.config
↓
导入真实游戏 data / fact
↓
导入 content
↓
开启/关闭需要的模块
↓
修改品牌
↓
check / test / build
↓
QA
↓
部署授权
↓
deploy
↓
inspect 实际 provider target/state
↓
再判断 Preview / Production / Launch 状态

核心目标：

80% 的 Steam / Roblox / Mobile 新游戏 SEO 站直接复用 Starter；
剩余 20% 再按具体游戏定制。

如果一个抽象不能明显减少未来重复工作，就不要做。


# 0. Repository Boundary

整个任务涉及两个不同角色。


## 0.1 GAME_SOP_2.1

规范来源：

https://github.com/randyzer/GAME_SOP_2.1.git

职责：

- 生产规范
- 调研方法
- 内容规范
- 数据规范
- SEO 规范
- QA 规范
- Patch Maintenance 规范

在本任务中：

GAME_SOP_2.1 只读。

禁止：

- 修改 GAME_SOP_2.1
- 向 GAME_SOP_2.1 写入 Starter 文件
- 把整个 GAME_SOP_2.1 复制到 Starter
- 在 Starter 内维护第二份完整 SOP

GAME_SOP_2.1 始终是 SOP 的权威来源。


## 0.2 GAME_SITE_STARTER

Starter 的唯一正式本地工作目录是：

/Users/randyz/work/coding/hot_words_web/Repo_hotgameweb/GAME_SITE_STARTER_BASED_gamesop2.1

从 Phase 0 开始：

所有 Starter 相关正式产出都必须写入这个目录。

不要另外创建：

../GAME_SITE_STARTER

也不要创建另一个正式 Starter 工作目录。

这个目录就是本任务唯一的 GAME_SITE_STARTER 正式开发目录。


Phase 0 / Phase 1 期间：

只允许新增或修改：

README.md
仅在确有必要时，保持最小内容

docs/
├── SOP_READING_REPORT.md
└── ARCHITECTURE_PROPOSAL.md


在进入正式编码阶段之前，不允许因为 Starter 开发而新增：

- src/
- app/
- pages/
- components/
- layouts/
- content/
- data/
- config/
- public/
- package.json
- astro.config.*
- next.config.*
- tailwind config
- framework scaffold
- 正式业务代码
- 正式依赖


如果正式 Starter 目录中已经存在其他文件：

不要擅自：

- 删除
- 移动
- 覆盖
- 清空
- 重构

先检查当前目录状态。

如果发现已有内容可能与本任务冲突：

记录到当前阶段报告中，
并等待我确认。

不要为了满足预想架构而清空目录。


# 1. 工作阶段与停止规则

整个任务严格分阶段执行。


Phase 0
SOP Verification
↓
人工确认
↓
Phase 1
Architecture
↓
人工确认
↓
Phase 2+
Implementation
↓
QA
↓
Real Game Smoke Test


任何阶段都不能因为你认为“下一步很明确”而自动越过人工确认。


确认口令不要求逐字一致。

只要我明确表达语义上等同于：

“SOP 阅读报告已确认，可以进入架构设计”

即可进入 Phase 1。

只要我明确表达语义上等同于：

“架构方案已确认，可以开始编码”

即可进入正式实现阶段。

不要因为措辞不是完全一致而拒绝继续。

但如果我的表达存在歧义：

不要自行推断批准。


# 2. Phase 0：SOP Verification

第一步：

不要设计架构。

不要写 Starter 代码。

不要根据文件名猜 SOP 内容。

必须实际读取 GAME_SOP_2.1。


## 2.1 MUST READ

以下文件属于核心文件。

任何一个无法访问或无法可靠读取：

Phase 0 必须停止。

MUST READ：

- README.md
- docs/NEW_GAME_SITE_SOP_v2.1.md
- docs/EXECUTION_PROMPT.md
- docs/SOURCE_POLICY.md
- docs/RESEARCH_SOURCES_TEMPLATE.md
- docs/KEYWORD_RESEARCH_TEMPLATE.md
- docs/COMPETITOR_ANALYSIS_TEMPLATE.md
- docs/SITE_STRUCTURE_TEMPLATE.md
- docs/PAGE_INVENTORY_TEMPLATE.md
- docs/P0_P1_P2_TEMPLATE.md
- docs/FACT_DATABASE_SCHEMA.md
- docs/CONTENT_PAGE_TEMPLATE.md
- docs/TECHNICAL_SEO_SPEC.md
- docs/QA_CHECKLIST.md
- docs/PATCH_MAINTENANCE_SOP.md
- docs/CURRENT_STATUS_TEMPLATE.md


## 2.2 SHOULD READ

如果仓库未来新增：

- 与真实游戏 onboarding 直接相关的轻量说明
- SOP → Code Mapping
- Deployment / Usage 补充文档

应尽量读取。

但任何 SHOULD READ 文件都不能替代上面的 MUST READ 权威规则。

如果 SHOULD READ 文件缺失：

不要自动阻断整个 Phase 0。

但必须：

- 明确记录
- 说明缺失可能造成什么影响
- 不得假装已读取


## 2.3 Phase 0 唯一核心产出

生成：

docs/SOP_READING_REPORT.md


内容至少包含：

| File | Level | Read Successfully | One-line Summary | Relevance to Starter |
|---|---|---|---|---|


Level：

- MUST
- SHOULD


每个文件必须明确：

- 是否真实读取成功
- 一句话核心内容
- 对 Starter 的意义


同时增加：

## Missing / Unreadable Files

列出所有：

- 无法访问
- 无法读取
- 内容不完整
- 解析异常

的文件。


## 2.4 Phase 0 硬规则

如果任何 MUST READ 文件失败：

立即停止。

禁止：

- 根据文件名猜
- 根据常识补齐
- 用 AI 推断代替真实读取
- 继续架构设计


如果所有 MUST READ 文件读取成功：

完成：

docs/SOP_READING_REPORT.md

然后停止。


等待我明确确认：

SOP 阅读报告可以进入下一阶段。


在确认前：

禁止进入 Phase 1。


# 2.5 Real-Game Adoption Gate（Smoke Test 已验证）

这一节用于约束以后真正 Clone Starter 建具体游戏站时的执行入口。

它不是要求 Phase 0 / Phase 1 现在生成某个真实游戏的数据，
而是要求 Starter 的 README / Usage / Execution Guidance
能够支持并提醒以下工作流。

## 2.5.1 Required Project Artifacts

真实游戏项目在 implementation 前必须生成并维护：

```text
docs/
├── PROJECT_BRIEF.md
├── RESEARCH_SOURCES.md
├── KEYWORD_RESEARCH.md
├── COMPETITOR_ANALYSIS.md
├── SITE_STRUCTURE.md
└── CURRENT_STATUS.md
```

这些文件负责：

- 项目输入
- 事实来源
- Discovery Research 证据
- 关键词与意图
- 竞品与 Gap
- Site Structure
- 当前状态与交接

但它们：

不得成为第二份 Runtime Page Inventory。


## 2.5.2 Discovery Research Gate

在最终确定：

- SITE_STRUCTURE
- structured runtime Page Inventory

之前，

必须执行 bounded Discovery Research。

MUST：

- Web / SERP discovery
- competitor discovery
- long-tail query discovery

SHOULD when useful evidence exists：

- YouTube
- Steam Community / Steam Discussions
- Reddit
- Discord 或其他可访问的 player-question surface

如果某个平台：

- 无可用内容
- 无有效证据
- 当前无法访问

应记录实际情况并继续。

禁止为了完成 checklist：

伪造搜索结果、社区问题、竞品或热度证据。


## 2.5.3 Discovery Evidence ≠ Publishable Game Fact

Discovery Research 可以用于：

- keyword discovery
- search intent
- competitor structure
- content gap
- player questions
- title / description emphasis
- internal linking
- page priority

但不能仅凭：

- SERP snippet
- competitor article
- YouTube commentary
- Reddit / Discord / Steam Discussion

就把内容升级为：

Confirmed Game Fact。

游戏事实必须继续遵循：

`docs/SOURCE_POLICY.md`。


## 2.5.4 Keyword ≠ Page

不得机械执行：

1 keyword
=
1 URL

正确关系是：

```text
Keyword
↓
Search Intent
↓
Keyword Cluster
↓
Target Page
```

多个表达同一需求的关键词：

优先合并到同一个页面意图。

Discovery 只能：

- refine keyword
- refine title
- refine internal links
- refine priority
- discover candidate pages

不能自动制造大量 keyword-swapped thin pages。


## 2.5.5 Human Scope Gate

如果 Discovery Research 导致：

- 新增 materially new page family
- 删除已经批准的独立页面
- 合并已经批准的独立页面
- launch scope 发生实质变化

必须停止并要求人工审核。

不得自行修改最终 Runtime Page Inventory 后继续 Implementation。


# 3. 产品边界

GAME_SITE_STARTER 是：

- SEO-first
- Content-first
- Data-first
- Static-first
- Lightweight
- Reusable
- Maintainable
- Deployable
- 面向商业游戏内容站


主要服务于：

- Steam 游戏
- Roblox 游戏
- Mobile Game
- RPG
- Idle
- Survival
- Strategy
- Gacha
- Wiki
- Guide
- Database
- Tool


当前明确不做：

- Login
- User Account
- User Builds
- 收藏系统
- 用户云数据
- 社区发帖
- 多租户 SaaS
- 权限系统
- 复杂后台
- 企业级 CMS


V1 主要能力：

- Homepage
- Guide
- Hub
- Entity Detail
- Database / List
- Tier / Meta Page
- Patch / News
- Search
- Filter
- Calculator
- Planner
- About
- Privacy
- Terms
- 404


Tracker：

不作为 V1 通用能力。

如果某个具体游戏以后真的需要：

放入 20% 项目定制。

不要为了 Tracker 提前增加通用复杂度。


# 4. 架构原则

始终遵守：

KISS
+
YAGNI
+
80/20


优先级：

简单
>
稳定
>
可理解
>
可维护
>
可复用
>
高度抽象


不要提前引入：

- Supabase
- Prisma
- PostgreSQL
- MongoDB
- Auth
- Headless CMS
- 微服务
- 插件系统
- DSL
- 通用 Schema Engine
- 万能 Entity Engine
- Repository / Service / Adapter 多层抽象
- 复杂状态管理
- Event Bus
- 复杂依赖图系统


除非能明确证明：

这个抽象会显著减少未来多个游戏站的重复开发成本。


不要为了：

“以后也许会需要”

提前实现复杂扩展层。


当前设计只需做到：

不会明显堵死未来。


不要求现在为：

- 数据库
- Login
- User System
- 多语言
- 超大规模动态平台

预先实现架构。


# 5. Architecture Design Principles

除 KISS / YAGNI / 80-20 外：

GAME_SITE_STARTER 的代码架构还必须遵守以下原则。


## 5.1 High Cohesion（高内聚）

同一个模块内部的职责应该尽量集中。

例如：

- SEO 相关能力集中管理
- Game Config 集中管理全站配置
- Game Fact / Entity Data 集中管理结构化游戏事实
- Content 层负责文章和页面内容
- Search / Filter 的交互逻辑集中在对应能力中
- Navigation 与站点结构逻辑保持清晰边界
- Patch-sensitive 数据的维护路径应清晰

避免：

同一种逻辑散落在大量页面、组件、配置和内容文件中。

目标：

修改一个能力时，
尽可能只需要修改少量明确位置。


## 5.2 Low Coupling（低耦合）

不同模块之间应尽量通过清晰、稳定的数据结构或接口协作。

避免：

- 一个页面直接依赖大量内部实现
- 一个组件知道过多其他模块细节
- Feature Flag 到处散落大量 if 判断
- SEO 规则复制到每个页面
- Game Facts 被重复写进 Content
- Navigation、Homepage、Sitemap 各自维护一套模块启停状态
- 删除一个 Entity 模块导致大量无关模块报错

目标：

一个模块被：

- 关闭
- 删除
- 替换
- 扩展

时，

不应该要求大面积修改整个 Starter。


## 5.3 Modular Design（模块化）

Starter 应由少量职责清晰的模块组成。

可以考虑的逻辑模块包括：

- Config
- Content
- Game Facts / Data
- Page / Route
- SEO
- Navigation
- Search / Filter
- Shared UI
- Tool-specific modules

但：

不要为了“模块化”制造大量只有一两个文件、没有真实独立职责的小模块。

模块边界：

必须来自真实业务职责。

不是为了目录结构看起来高级。


## 5.4 Adaptable Design（弹性 / 适配性）

这里的“弹性”不是：

云基础设施自动扩容。

这里指：

Starter 可以适应不同游戏结构，

而不需要每次重写核心架构。


例如：

Game A 有：

- heroes
- items
- bosses


Game B 有：

- classes
- weapons
- maps


Game C 没有：

- heroes
- bosses
- market


Starter 都应该能够合理工作。


但：

不要为了支持所有理论上的游戏类型，

设计万能动态框架。


目标仍然是：

80% 通用
+
20% 项目定制。


## 5.5 Replaceable Modules（可替换）

对于未来可能发生变化的能力：

尽量避免和 Starter 核心强绑定。


例如：

V1 Search 可以使用 Pagefind。

未来数据量显著增长后：

可以替换搜索实现。


但替换 Search 不应该要求重写：

- 页面内容模型
- URL
- SEO
- Game Facts
- Page Inventory
- 基础 Layout


同理：

当前可能使用：

JSON / Content Collections

作为数据来源。


未来如果真实需求要求：

API / Database / Dynamic Data

应允许局部升级。


但当前不要为了未来数据库：

提前创建复杂 Repository / ORM / Adapter 层。


## 5.6 Stable Core, Flexible Edge（核心稳定，边缘灵活）

Starter 应明确区分：

### Stable Core

相对稳定、不同游戏都需要的能力：

- Game Config
- SEO rules / helpers
- Content conventions
- Game Fact conventions
- Page Inventory conventions
- Shared Layout
- Navigation principles
- Routing patterns
- QA-related structure


### Flexible Edge

不同游戏可能变化较大的能力：

- 特定 Entity 类型
- 游戏专属 Database
- Calculator
- Planner
- 特殊 Tool
- 特殊页面
- 特殊品牌主题


原则：

不要让某个具体游戏的特殊需求污染 Starter Core。


理想结果：

GAME_SITE_STARTER Core
尽量稳定

具体游戏差异
尽量放在：

- config
- data
- content
- feature modules


目标是：

Clone Starter
↓
换配置
↓
换数据
↓
换内容
↓
少量定制
↓
上线

而不是：

每做一个新游戏都重新改底层架构。


# 6. 技术方向

当前首选假设：

Astro
+
TypeScript
+
Tailwind CSS
+
Markdown / MDX
+
Structured Data
+
必要时使用 React Islands


但 Astro 不是未经审查的最终答案。


Phase 1 中：

不要做一份没有决策价值的：

Astro vs Next.js

表面公平打分表。


正确方法：

默认假设 Astro 是首选，

然后主动攻击 Astro。


重点判断 Astro 是否会在以下场景产生足够严重的问题：

- 数百静态页面
- 数千静态页面
- programmatic SEO
- build time
- build memory
- 高频 Patch 更新
- Astro Content Collections
- Entity 页面生成
- getStaticPaths
- Search
- Filter
- Calculator
- Planner
- Pagefind 或其他静态搜索
- React Islands
- 大型数据表
- Vercel
- Cloudflare
- 静态部署
- 将来少量动态数据
- 将来 Market / API 数据
- 如果未来真的出现多语言需求


如果这些问题不足以推翻 Astro：

推荐 Astro。


如果足以推翻 Astro：

推荐 Next.js。


必须明确输出：

Recommended Framework


禁止：

“二者都可以”

这种逃避结论的回答。


# 7. 禁止虚假规模 Benchmark

部分问题只有真实内容规模下才能可靠验证。

例如：

- 数千个真实 MDX 页面的 build time
- 大量真实图片下的 build memory
- 大规模 Pagefind index size
- 复杂 JSON-LD + Related Content 下的生成时间
- 真实生产数据下的构建表现


Phase 1 不要求：

人为生成几千个空白垃圾页面，

然后把结果当作生产 benchmark。


如果没有真实代表性数据：

必须标记：

Assumed / Requires Production Validation


并说明：

未来在什么规模附近应该重新评估。


可以给出观察节点，例如：

- 1000 pages
- 3000 pages
- 5000 pages

但这些只是：

Re-evaluation Threshold

不是：

性能承诺。


# 8. Page Inventory：必须 Single Source of Truth

GAME_SOP_2.1 中的 Page Inventory 是 Starter 的核心架构问题。


一个页面可能拥有：

- status
- priority
- indexable
- publishedAt
- updatedAt
- needsUpdate
- pageType
- primaryKeyword
- relatedPages


这些状态：

只能有一个 authoritative source。


禁止：

PAGE_INVENTORY.md 手工维护一份

+

frontmatter 再维护一份

+

config 再维护一份


同一个状态字段：

不能在多个地方人工重复维护。


Phase 1 必须：

1. 选择一个 Page Inventory Single Source of Truth
2. 解释选择原因
3. 说明其他视图如何派生
4. 说明 sitemap 如何消费
5. 说明 route generation 如何消费
6. 说明 indexability 如何消费


可以考虑：

- frontmatter
- structured page registry
- content collection metadata
- 其他更简单方案


但不要预设答案。


核心原则：

一个状态只有一个权威来源。

其他地方全部派生。


## 8.1 Runtime Page Inventory 最终语义（Smoke Test Backport）

真实 Starter 已验证：

structured runtime Page Inventory

是 publication SSOT。

Markdown：

- SITE_STRUCTURE.md
- CURRENT_STATUS.md
- 其他 planning artifacts

可以引用：

- Page ID
- URL
- 状态摘要

但不能成为第二份人工维护的页面状态数据库。


`publishedAt` 的最终语义：

```text
visibility = public
AND
publicationStatus = published
→ publishedAt 必填
```

其他非 live 组合：

例如：

- public + draft
- private + published
- private + draft
- unlisted

允许省略 `publishedAt`。

如果提供 `publishedAt`：

仍必须满足当前合法 ISO 日期格式。

注意：

这只是字段必填语义。

不得借此：

- 新增状态
- 重命名状态
- 重新定义已有 visibility / publicationStatus 合法组合
- 重构 Catalog 状态模型


# 9. Game Fact：必须 Single Source of Truth

除了页面状态，

游戏事实与数值也必须有独立 SSOT。


例如：

- Hero stats
- Unit stats
- Item stats
- Ability values
- Gear data
- Boss data
- Stage data
- World data
- Drop information
- Skill Tree values
- Patch version
- Market-related public facts


禁止相同事实在多个页面手工复制。


例如禁止：

data/item.json

damage = 150


同时：

guide-a.md
手工写 150

guide-b.md
再写 150

tier-list.md
再写 150


否则 Patch：

150 → 175

会造成多处漂移。


理想关系：

Game Fact Data
↓
Entity Page
↓
Database
↓
Guide / Related Pages
↓
其他消费页面


相同事实尽量消费同一个结构化来源。


Phase 1 必须说明：

## Game Fact Single Source of Truth


至少回答：

- 一个事实存在哪里
- Entity Page 如何使用
- Database 如何使用
- Guide 如何引用
- 其他页面如何复用
- Patch 时修改哪里


同时考虑：

Official Patch / Verified Change
↓
Affected Fact
↓
Affected Entity
↓
Affected Pages


说明：

- affected entities 如何识别
- affected pages 如何识别
- updatedAt 如何处理
- 哪些页面需要 review


不要因此开发复杂依赖图系统。


优先：

- relatedEntities
- relatedPages
- structured references
- 简单索引

等透明方案。


## 9.1 Smallest Sufficient Fact Boundary

Game Fact SSOT：

不等于必须建立通用 Fact Engine。

Afterworld Real-Game Smoke Test 已验证：

当一个项目重复使用的确认事实：

- 数量少
- 类型清晰
- 相对稳定

可以优先使用：

```text
small typed project-level fact object
↓
Homepage / Guide / Other Consumers
```

例如：

`src/data/game-profile.ts`

这种直接、透明的方式。

必须优先：

简单 typed source
>
generic fact engine
>
repository / resolver / DSL / database

只有多个真实游戏项目证明：

简单直接引用已经无法满足复用、更新或一致性要求时，

才允许升级抽象。

禁止为了“未来可能有更多 Facts”：

提前开发：

- Universal Fact Engine
- Generic Resolver
- Fact Repository Layer
- Expression Language
- Dynamic Lookup Framework


# 10. SOP 与 Starter 的关系

GAME_SOP_2.1

=

规则与方法


GAME_SITE_STARTER

=

代码实现


两个仓库长期独立。


不要把 GAME_SOP_2.1 整体复制到 Starter。


避免：

SOP v2.1
SOP v2.2
Starter 里又有旧 SOP


导致版本漂移。


Starter 可以保留：

- README
- ARCHITECTURE
- Usage Guide
- SOP → Code Mapping


其中 README / Usage Guide 应保留一个轻量：

`Start a New Game Site`

入口。

它只提醒：

1. 遵循 `GAME_SOP_2.1`
2. 完成 6 个 Project Artifacts
3. 完成 Discovery Research
4. 最终确定 structured runtime Page Inventory SSOT
5. materially changed page scope 必须人工审核
6. 获批后再进入 implementation

不要把整套 SOP 复制进 Starter。


但：

不维护第二份完整 SOP。


# 11. 数据与内容原则

数据层参考：

docs/FACT_DATABASE_SCHEMA.md


但不要假设所有游戏都拥有相同 Entity。


某个游戏可能有：

- heroes
- abilities
- items
- worlds
- bosses


另一个游戏可能没有：

- heroes
- market
- gear
- skill tree
- bosses


Starter 必须允许：

模块缺失。


禁止：

为了 build 成功，

要求用户创建一堆空 JSON 文件。


内容层优先评估：

- Astro Content Collections
- Markdown
- MDX


内容至少应根据页面类型承载：

- title
- slug
- description
- pageType
- priority
- publishedAt（仅在适用的 live published 页面必填；非 live 页面可省略）
- updatedAt
- primaryKeyword
- tags
- relatedPages
- relatedEntities
- source
- confidence


不要设计复杂 CMS。


# 12. Feature Flags

Starter 需要简单 Feature Flags。


例如：

- heroes
- abilities
- items
- gear
- worlds
- market
- tools
- tierList
- news


关闭模块后：

- Navigation 不显示
- Homepage 不显示入口
- 不生成无意义页面
- Sitemap 不包含
- Related Content 不链接
- Internal Links 不产生死链


Feature Flags 必须：

- 简单
- 显式
- 可读
- 易 Debug


不要做：

- 插件系统
- 动态插件注册框架
- 权限系统


Feature Flag 状态：

应尽可能由一个明确的配置源管理。

不要让模块启停状态：

散落在多个页面和组件中。


# 13. SEO 与性能原则

SEO：

以 GAME_SOP_2.1 为权威来源。


Starter 负责固化适合代码解决的部分，例如：

- metadata
- canonical
- sitemap
- robots
- JSON-LD
- breadcrumb
- index / noindex
- stable slug
- internal linking helpers
- duplicate URL 防护


不要为了 Schema 数量：

堆 Structured Data。


Structured Data：

必须匹配页面真实内容。


默认目标：

Static-first
+
Low JavaScript
+
Mobile-first


如果使用 Astro：

默认页面不发送不必要 JavaScript。


只有真正需要交互的区域，例如：

- Search
- Filter
- Calculator
- Planner
- Interactive Table

才使用 Island。


不要把整个页面：

变成 React App。


现实页面规模目标：

V1：

几十到几百页


正常扩展：

数千页


如果未来显著扩大：

再重新评估：

- build
- rendering
- deployment
- search


不要现在按：

50,000 页平台

设计 Starter。


# 14. Mobile First

必须保证：

- 手机完整可用
- 平板正常
- 桌面充分利用宽屏
- 主要内容不能因移动端大量隐藏
- Navigation 移动端可用
- Table 在手机有明确策略
- TOC 小屏幕可用
- Cards 响应式
- 点击区域适合触控
- 长表格可横向滚动或切换卡片模式


Mobile First：

不是只做手机。


而是：

用户体验
+
SEO
+
游戏搜索场景

共同要求。


# 15. Phase 1：Architecture

只有在我明确确认 Phase 0 后：

才进入 Phase 1。


Phase 1 唯一核心正式产出：

docs/ARCHITECTURE_PROPOSAL.md


不要正式实现 Starter。


ARCHITECTURE_PROPOSAL.md：

尽量控制在约 12 个核心章节。

不要复制 SOP 全文。


至少包含：


## 1. SOP → Code Mapping

说明：

哪些 SOP 规则：

- Code
- AI
- Human

分别负责。


重点是职责边界。


## 2. Product Scope

说明：

Starter 是什么。

Starter 不是什么。


明确：

- No Login
- No User Builds
- No SaaS User System


## 3. Framework Decision

默认 Astro 是待验证首选。


主动攻击 Astro。


区分：

- Real Risks
- Theoretical Risks
- Unknowns


最后明确：

Recommended Framework


只能有一个主推荐。


## 4. Proposed Architecture

给出：

- 技术栈
- 目录结构
- 核心模块
- 每个主要目录职责


保持简单。


不要为了展示架构能力：

加入无意义层级。


同时必须说明：

### Architecture Principles Mapping

请结合真实目录结构、模块依赖和数据流，

说明 Proposed Architecture 如何具体满足：

- High Cohesion
- Low Coupling
- Modular Design
- Adaptable Design
- Replaceable Modules
- Stable Core, Flexible Edge


不要只写：

“本架构遵循高内聚低耦合。”

必须举具体例子。


至少回答：

- SEO 为什么不会散落到所有页面？
- Game Config 如何成为统一配置入口？
- Game Fact 与 Content 如何保持边界？
- Feature Flags 如何避免散落？
- Search 将来替换时，哪些模块不需要修改？
- 一个 Entity 模块关闭后，为什么不会破坏其他模块？
- 某个游戏的特殊 Tool 应放在哪里？
- 如何防止具体游戏需求污染 Starter Core？


同时必须包含：

### Recommended Deploy Target


必须推荐一个默认主要部署目标，例如：

- Vercel
- Cloudflare Pages
- Netlify
- 其他


必须说明：

1. 为什么适合 Starter
2. 默认是否采用纯静态输出
3. 是否需要 framework adapter
4. Build / CDN / cache 特性
5. 未来少量动态数据是否会明显受限


可以支持多个部署平台。

但必须指定一个：

Default Deployment Path


目标：

以后新游戏站尽量不需要重新讨论部署平台。


### Deployment Approval + Actual Target Verification

架构方案必须明确区分：

```text
Build
≠
Deploy
≠
Preview
≠
Production Target
≠
Production Domain Launch
```

任何远端 deployment write：

执行前必须：

1. 说明准备执行的远端 mutation
2. 明确 provider / project（如果已知）
3. 获得用户授权

执行后必须：

1. 使用 provider 的只读 inspect / status 能力
2. 检查实际 target
3. 检查实际 state
4. 再根据证据判断 Preview / Production

禁止根据：

- CLI 命令名称
- 是否带 `--prod`

单独推断 deployment target。


特别是 Vercel：

不得再假设：

```text
vercel deploy
=
Preview
```

真实 Smoke Test 已观察到：

首次新项目的 `vercel deploy`
即使没有 `--prod`

仍可能被 provider 标记为：

`production target`

因此：

只有实际 inspect 结果：

才能作为 Preview / Production 分类证据。


以下动作原则上视为独立授权范围：

- Production alias
- Production domain attach
- DNS 修改
- Public release / cutover

除非用户已经在同一批准范围中明确授权。


## 5. Content + Data Model

说明：

- Content 如何组织
- Entity Data 如何组织
- Types / Schema 如何组织
- Optional Module 如何处理
- Missing Entity 如何处理


必须单独包含：

### Game Fact Single Source of Truth


说明：

- Fact 存哪里
- 多页面如何消费
- Patch 如何只改一处
- affected entities/pages 如何识别


## 6. Page / Route Model

说明：

- Homepage
- Guide
- Hub
- Entity
- Database
- Meta
- Patch
- Tool


如何生成。


说明：

静态 route 与 entity-generated route 的边界。


## 7. Page Inventory Single Source of Truth

必须明确：

权威来源在哪里。


以及：

- sitemap
- routing
- indexability
- page status

如何从它派生。


禁止多处手工维护。


## 8. SEO + Internal Linking

说明：

- Metadata
- Canonical
- Sitemap
- Robots
- JSON-LD
- Breadcrumb
- Related Content


以及：

Hub
↓
Child
↓
Related Entity
↓
Related Guide


如何形成稳定内链。


## 9. Feature Flags

说明：

关闭一个模块后：

- Route
- Navigation
- Homepage
- Sitemap
- Related Content
- Internal Links


如何保持一致。


同时说明：

Feature Flag 状态由哪里统一管理，

避免同一个模块状态在多个地方重复定义。


## 10. Performance + Interaction

说明：

- Static generation
- JS budget
- Search
- Filter
- Calculator
- Planner
- Table interaction
- Islands / Client Components


明确：

什么需要 JS。

什么不需要 JS。


## 11. Risks + Unknowns

至少包含：


### Architecture Risks

例如：

- 过度抽象
- Entity 太写死
- 模块边界不清
- 高耦合
- Feature Flag 与 Route 漂移
- Game Fact 重复维护
- Thin Pages
- Client JS 过多
- Search 扩展风险
- 特殊游戏需求污染 Starter Core


### Verified

只允许写：

有实际验证证据的结论。


### Assumed / Not Yet Verified

所有没有实际测试证据的判断。


### Technical Spike Log

如果进行 spike：

记录：

- Hypothesis
- Environment
- Commands
- Key Output
- Result
- Conclusion


### Content / Data Risk Notes

简洁指出：

- 游戏 Logo
- 游戏截图
- 官方图片
- 第三方 Wiki
- Steam / Roblox 数据
- API
- scraping
- 竞争对手内容
- 平台 ToS


哪些属于代码之外需要单独判断的风险。


“可商用 Starter”只表示：

Starter 代码架构可用于商业网站。


不表示：

任何第三方 IP、图片、Logo、数据、内容自动拥有商业授权。


不要把这一节写成法律报告。


## 12. Implementation Plan

只输出后续阶段计划，例如：

Phase 2 — Foundation

Phase 3 — Content & Data

Phase 4 — Page Models

Phase 5 — SEO

Phase 6 — Interaction

Phase 7 — QA

Phase 8 — Real Game Smoke Test

Phase 9 — Post-Smoke-Test Backport

用于：

- 分类 SOP Gap / Starter Gap / Game-specific Finding
- 只回灌真实验证出的通用问题
- 保持 Stable Core 稳定
- 同步 Starter onboarding / deployment guidance
- 同步 Codex Master Prompt 执行入口

不得因为一个真实游戏的特殊需求：

直接污染 Starter Stable Core。


Phase 1 禁止执行这些阶段。


# 16. Disposable Technical Spike

Phase 1 允许进行非常有限的验证性 spike。


但：

Spike 必须与正式 GAME_SITE_STARTER 仓库完全隔离。


不得在：

/Users/randyz/work/coding/hot_words_web/Repo_hotgameweb/GAME_SITE_STARTER_BASED_gamesop2.1

内部进行 spike。


必须使用仓库外临时目录。


例如：

/tmp/game-site-starter-spikes/

或其他系统临时目录。


在临时目录中：

允许为了验证高风险架构假设：

- scaffold 最小 Astro 项目
- scaffold 最小 Next.js 项目
- 安装 Astro
- 安装 Pagefind
- 安装必要测试依赖
- 创建最小 Content Collection
- 创建最小 getStaticPaths 示例
- 创建少量测试页面
- 执行 build
- 执行必要测试命令


这些：

仅用于验证。


第 17 节中的正式仓库禁止项：

不适用于 spike 临时沙盒。


## Spike Rules

1. 最多 3 个。

2. 必须用于真正影响架构决策的高风险问题。

3. 不要机械做满。

4. 没有必要就不做。

5. Spike 代码不得成为正式 Starter 代码。

6. 不得借 spike 名义开始实现 Starter。

7. 每个 spike 必须记录：

   - Hypothesis
   - Environment
   - Commands
   - Test
   - Key Output
   - Result
   - Conclusion

8. Spike 完成后临时目录可以删除。

9. 删除前：

   必须把足以复核结论的：

   - 关键命令
   - 关键输出
   - 测试条件
   - 测试结果

   写入：

   ARCHITECTURE_PROPOSAL.md
   → Technical Spike Log

10. 只有有实际测试证据：

    才能标记：

    Verified

11. 没有测试证据：

    必须标记：

    Assumed / Not Yet Verified

12. 不要为了获得 Verified：

    做没有决策价值的测试。


# 17. Phase 1 硬停止

完成：

docs/ARCHITECTURE_PROPOSAL.md

后：

立即停止。


在正式 Starter 根目录：

/Users/randyz/work/coding/hot_words_web/Repo_hotgameweb/GAME_SITE_STARTER_BASED_gamesop2.1

禁止继续：

- scaffold Astro
- scaffold Next.js
- 创建正式页面
- 创建正式组件
- 创建 content collections
- 创建 data layer
- 创建 config system
- 创建 feature flags
- 创建 SEO helpers
- 创建正式 UI
- 安装正式依赖
- 创建 package.json
- 创建 framework config
- 实现 Starter


注意：

这里的禁止只针对：

正式 Starter 根目录。


第 16 节允许的：

仓库外 disposable spike

不受此限制。


完成 ARCHITECTURE_PROPOSAL.md 后：

等待我审核。


只有在我明确表达：

架构方案已确认，可以开始正式编码

或语义等价的明确批准之后：

才能进入正式实现阶段。


# 18. 最终判断标准

这个 Starter 的好坏：

不看架构是否高级。


而看：

面对一个刚发布的新游戏，

是否能基于 GAME_SOP_2.1，

快速做出一个：

- SEO 友好
- Mobile Friendly
- 加载快
- Low JavaScript
- 易维护
- 易 Patch 更新
- 易复制
- 易部署
- 可商用的游戏站


同时要求：

- High Cohesion
- Low Coupling
- Modular
- Adaptable
- Replaceable where useful
- Stable Core, Flexible Edge


坚持：

80% 通用
+
20% 定制


如果一个抽象：

不能明显减少未来重复工作：

不要做。


如果一个模块拆分：

不能让职责更清晰或维护更简单：

不要为了“模块化”而拆。


如果一种技术：

不能明显改善：

- 建站速度
- SEO
- 性能
- 稳定性
- 维护效率
- 可复用性

不要引入。


如果未来需求真的发生变化：

再根据真实需求升级。


不要为了想象中的未来：

增加今天的复杂度。


最终希望达到：

Starter Core 稳定
↓
不同游戏主要变化：

config
+
data
+
content
+
少量 feature modules

↓
快速上线新游戏站