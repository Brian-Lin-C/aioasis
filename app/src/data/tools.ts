import type { Tool } from '../types/content'
export { CATEGORIES } from '../types/content'

export const tools: Tool[] = [
  // ── 对话 ──────────────────────────────
  { id: 'chatgpt', name: 'ChatGPT', description: 'OpenAI 的旗舰对话模型，生态最成熟的通用 AI 助手', url: 'https://chatgpt.com', category: '对话', featured: true, pricing: '部分免费', origin: '海外', direct: false, bestFor: '想要最全能、插件生态最丰富的通用助手' },
  { id: 'claude', name: 'Claude', description: 'Anthropic 出品，长文本与写作质感著称', url: 'https://claude.ai', category: '对话', featured: true, pricing: '部分免费', origin: '海外', direct: false, bestFor: '写长文、改文案、读长文档' },
  { id: 'kimi', name: 'Kimi', description: '月之暗面出品，长上下文与中文体验出色', url: 'https://www.kimi.com', category: '对话', featured: true, pricing: '免费', origin: '国产', direct: true, bestFor: '中文场景与超长文档总结' },
  { id: 'gemini', name: 'Gemini', description: 'Google 的多模态模型，与安卓/搜索深度整合', url: 'https://gemini.google.com', category: '对话', featured: false, pricing: '部分免费', origin: '海外', direct: false, bestFor: '多模态任务与 Google 全家桶用户' },
  { id: 'deepseek', name: 'DeepSeek', description: '国产开源模型之光，推理能力强且免费可用', url: 'https://chat.deepseek.com', category: '对话', featured: false, pricing: '免费', origin: '国产', direct: true, bestFor: '数学、推理、代码类硬问题' },
  { id: 'doubao', name: '豆包', description: '字节跳动的 AI 助手，语音与多端体验完整', url: 'https://www.doubao.com', category: '对话', featured: false, pricing: '免费', origin: '国产', direct: true, bestFor: '日常随手问与语音聊天' },
  { id: 'qwen', name: '通义千问', description: '阿里通义大模型，开源与商用双线并进', url: 'https://www.tongyi.com', category: '对话', featured: false, pricing: '免费', origin: '国产', direct: true, bestFor: '阿里生态用户与开源玩家' },
  { id: 'yuanbao', name: '腾讯元宝', description: '腾讯的 AI 助手，接微信生态内容回答有优势', url: 'https://yuanbao.tencent.com', category: '对话', featured: false, pricing: '免费', origin: '国产', direct: true, bestFor: '查公众号/微信生态内容' },
  { id: 'chatglm', name: '智谱清言', description: '智谱 GLM 的对话产品，长文档与智能体丰富', url: 'https://chatglm.cn', category: '对话', featured: false, pricing: '免费', origin: '国产', direct: true, bestFor: '国产模型里的均衡型选手' },
  { id: 'yiyan', name: '文小言', description: '百度文心大模型的对话产品，搜索联动紧密', url: 'https://yiyan.baidu.com', category: '对话', featured: false, pricing: '免费', origin: '国产', direct: true, bestFor: '百度生态用户' },
  { id: 'tiangong', name: '天工AI', description: '昆仑万维的 AI 助手，搜索与文档生成见长', url: 'https://www.tiangong.cn', category: '对话', featured: false, pricing: '免费', origin: '国产', direct: true, bestFor: 'AI 搜索 + 长文写作一体' },
  { id: 'grok', name: 'Grok', description: 'xAI 的模型，X 平台实时信息与幽默人设', url: 'https://grok.com', category: '对话', featured: false, pricing: '部分免费', origin: '海外', direct: false, bestFor: '追 X 上的一手热点' },
  { id: 'ms-copilot', name: 'Microsoft Copilot', description: '微软的 AI 助手，与 Windows/Office 深度集成', url: 'https://copilot.microsoft.com', category: '对话', featured: false, pricing: '部分免费', origin: '海外', direct: false, bestFor: 'Windows 与 Office 用户' },
  { id: 'poe', name: 'Poe', description: 'Quora 出品的模型聚合平台，一站切换各家模型', url: 'https://poe.com', category: '对话', featured: false, pricing: '部分免费', origin: '海外', direct: false, bestFor: '想在一个地方对比多家模型' },

  // ── 绘画 ──────────────────────────────
  { id: 'midjourney', name: 'Midjourney', description: '艺术感天花板的 AI 绘画工具，风格化能力极强', url: 'https://www.midjourney.com', category: '绘画', featured: true, pricing: '付费', origin: '海外', direct: false, bestFor: '追求画面质感的创作者' },
  { id: 'jimeng', name: '即梦', description: '字节跳动的一站式 AI 创作平台，中文提示词友好', url: 'https://jimeng.jianying.com', category: '绘画', featured: true, pricing: '部分免费', origin: '国产', direct: true, bestFor: '中文提示词出图与快速试创意' },
  { id: 'sd', name: 'Stable Diffusion', description: '开源绘画模型生态，可本地部署、无限定制', url: 'https://stability.ai', category: '绘画', featured: false, pricing: '免费', origin: '海外', direct: true, bestFor: '想折腾本地部署和 LoRA 的玩家' },
  { id: 'flux', name: 'FLUX', description: 'Black Forest Labs 的新一代文生图模型，细节惊人', url: 'https://blackforestlabs.ai', category: '绘画', featured: false, pricing: '部分免费', origin: '海外', direct: false, bestFor: '追求照片级真实感' },
  { id: 'ideogram', name: 'Ideogram', description: '以"图中文字渲染准确"出圈的绘画工具', url: 'https://ideogram.ai', category: '绘画', featured: false, pricing: '部分免费', origin: '海外', direct: false, bestFor: '海报、Logo 等需要文字的画面' },
  { id: 'recraft', name: 'Recraft', description: '面向设计师的 AI 矢量与栅格图像生成', url: 'https://www.recraft.ai', category: '绘画', featured: false, pricing: '部分免费', origin: '海外', direct: false, bestFor: '设计师出矢量图与品牌素材' },
  { id: 'liblib', name: '哩布哩布AI', description: '国内最大的 SD 模型分享社区，在线跑图免部署', url: 'https://www.liblib.art', category: '绘画', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '想用 SD 生态但不想本地部署' },
  { id: 'yige', name: '文心一格', description: '百度的 AI 绘画平台，中文语义理解强', url: 'https://yige.baidu.com', category: '绘画', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '中文提示词画国风与插画' },
  { id: 'bing-image', name: 'Bing Image Creator', description: '微软的免费绘画入口，DALL·E 系列模型驱动', url: 'https://www.bing.com/create', category: '绘画', featured: false, pricing: '免费', origin: '海外', direct: false, bestFor: '零成本快速出图' },

  // ── 视频 ──────────────────────────────
  { id: 'sora', name: 'Sora', description: 'OpenAI 的文生视频模型，物理一致性标杆', url: 'https://openai.com/sora', category: '视频', featured: false, pricing: '付费', origin: '海外', direct: false, bestFor: '想要电影感长镜头' },
  { id: 'runway', name: 'Runway', description: 'AI 视频编辑与生成老牌强者，Gen 系列模型', url: 'https://runwayml.com', category: '视频', featured: false, pricing: '部分免费', origin: '海外', direct: false, bestFor: '专业视频工作流与特效' },
  { id: 'kling', name: '可灵', description: '快手出品的视频生成模型，长镜头表现优秀', url: 'https://klingai.com', category: '视频', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '国内可用的稳定视频生成' },
  { id: 'pika', name: 'Pika', description: '玩法多样的 AI 视频工具，特效模板丰富', url: 'https://pika.art', category: '视频', featured: false, pricing: '部分免费', origin: '海外', direct: false, bestFor: '社交平台的创意特效短视频' },
  { id: 'veo', name: 'Veo', description: 'Google DeepMind 的视频生成模型', url: 'https://deepmind.google/technologies/veo', category: '视频', featured: false, pricing: '付费', origin: '海外', direct: false, bestFor: 'Google 生态内的视频生成' },
  { id: 'vidu', name: 'Vidu', description: '生数科技出品，生成速度快、动漫风格出色', url: 'https://www.vidu.com', category: '视频', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '动漫与二次元风格视频' },
  { id: 'hailuo', name: '海螺AI', description: 'MiniMax 的视频生成工具，人物表演自然', url: 'https://hailuoai.video', category: '视频', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '人物出镜类视频' },
  { id: 'pixverse', name: 'PixVerse', description: '爱诗科技的视频生成工具，模板化玩法丰富', url: 'https://pixverse.ai', category: '视频', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '社交平台爆款视频模板' },
  { id: 'luma', name: 'Luma Dream Machine', description: 'Luma 的视频生成模型，镜头运动自然', url: 'https://lumalabs.ai', category: '视频', featured: false, pricing: '部分免费', origin: '海外', direct: false, bestFor: '运镜感强的创意视频' },

  // ── 音频 ──────────────────────────────
  { id: 'suno', name: 'Suno', description: '一句话生成完整歌曲，AI 音乐的现象级产品', url: 'https://suno.com', category: '音频', featured: false, pricing: '部分免费', origin: '海外', direct: false, bestFor: '零门槛写歌玩音乐' },
  { id: 'elevenlabs', name: 'ElevenLabs', description: '最自然的 AI 配音与声音克隆平台', url: 'https://elevenlabs.io', category: '音频', featured: false, pricing: '部分免费', origin: '海外', direct: false, bestFor: '视频配音与有声内容' },
  { id: 'udio', name: 'Udio', description: 'Suno 的主要竞品，音乐细节见长', url: 'https://www.udio.com', category: '音频', featured: false, pricing: '部分免费', origin: '海外', direct: false, bestFor: '对编曲细节有要求的音乐生成' },
  { id: 'tianyin', name: '网易天音', description: '网易的 AI 音乐创作平台，中文歌曲友好', url: 'https://tianyin.music.163.com', category: '音频', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '中文歌曲与编曲辅助' },
  { id: 'moyin', name: '魔音工坊', description: '出门问问的中文 AI 配音工具，音色库丰富', url: 'https://www.moyin.com', category: '音频', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '中文短视频配音' },

  // ── 编程 ──────────────────────────────
  { id: 'cursor', name: 'Cursor', description: 'AI 原生代码编辑器，程序员的效率倍增器', url: 'https://www.cursor.com', category: '编程', featured: true, pricing: '部分免费', origin: '海外', direct: false, bestFor: '日常写码的主力 IDE' },
  { id: 'copilot', name: 'GitHub Copilot', description: 'GitHub 官方的 AI 结对编程助手', url: 'https://github.com/features/copilot', category: '编程', featured: false, pricing: '付费', origin: '海外', direct: false, bestFor: 'VS Code / JetBrains 用户' },
  { id: 'trae', name: 'Trae', description: '字节跳动的 AI IDE，中文开发者友好', url: 'https://www.trae.ai', category: '编程', featured: false, pricing: '免费', origin: '国产', direct: true, bestFor: '想免费体验 AI IDE 的中文开发者' },
  { id: 'v0', name: 'v0', description: 'Vercel 出品的 UI 生成工具，一句话出界面', url: 'https://v0.dev', category: '编程', featured: false, pricing: '部分免费', origin: '海外', direct: false, bestFor: '前端原型快速出稿' },
  { id: 'windsurf', name: 'Windsurf', description: 'Agent 式 AI IDE，Cascade 流程自动化见长', url: 'https://windsurf.com', category: '编程', featured: false, pricing: '部分免费', origin: '海外', direct: false, bestFor: '想让 AI 自动跑完整开发流程' },
  { id: 'lingma', name: '通义灵码', description: '阿里的 AI 编码助手，国内企业落地多', url: 'https://lingma.aliyun.com', category: '编程', featured: false, pricing: '免费', origin: '国产', direct: true, bestFor: '国内团队合规引入 AI 编码' },
  { id: 'bolt', name: 'Bolt', description: '浏览器内一句话生成全栈应用并直接部署', url: 'https://bolt.new', category: '编程', featured: false, pricing: '部分免费', origin: '海外', direct: false, bestFor: '不写代码也想做出完整小应用' },
  { id: 'claude-code', name: 'Claude Code', description: 'Anthropic 的终端原生编程 Agent，深度理解代码库', url: 'https://claude.com/product/claude-code', category: '编程', featured: false, pricing: '付费', origin: '海外', direct: false, bestFor: '深度代码理解与 Git 工作流自动化' },
  { id: 'codex', name: 'OpenAI Codex', description: 'OpenAI 的编程智能体，CLI 与云端双形态', url: 'https://openai.com/codex', category: '编程', featured: false, pricing: '部分免费', origin: '海外', direct: false, bestFor: '云端跑任务与 CLI 自动化' },
  { id: 'codebuddy', name: 'CodeBuddy', description: '腾讯云全流程 AI 编程助手，IDE/插件/CLI 三端', url: 'https://www.codebuddy.ai', category: '编程', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '设计稿转代码的一站式交付' },
  { id: 'qoder', name: 'Qoder', description: '阿里的 Agentic 编程平台，仓库级理解与自主任务', url: 'https://qoder.com', category: '编程', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '让 AI 自主完成复杂开发任务' },

  // ── 办公效率 ──────────────────────────
  { id: 'notion', name: 'Notion AI', description: '笔记 + AI 的一体化知识工作台', url: 'https://www.notion.com', category: '办公效率', featured: false, pricing: '部分免费', origin: '海外', direct: true, bestFor: '知识库与文档一体化管理' },
  { id: 'gamma', name: 'Gamma', description: 'AI 一键生成 PPT/文档/网页，颜值在线', url: 'https://gamma.app', category: '办公效率', featured: false, pricing: '部分免费', origin: '海外', direct: true, bestFor: '快速做出好看的演示稿' },
  { id: 'napkin', name: 'Napkin AI', description: '把文字一键变成信息图与示意图', url: 'https://www.napkin.ai', category: '办公效率', featured: false, pricing: '部分免费', origin: '海外', direct: true, bestFor: '给文章和 PPT 配图解' },
  { id: 'wpsai', name: 'WPS AI', description: '国产办公套件的 AI 能力，文档表格演示全覆盖', url: 'https://ai.wps.cn', category: '办公效率', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: 'WPS 重度用户' },
  { id: 'feishu', name: '飞书智能伙伴', description: '飞书内的 AI 助手，会议纪要/文档总结顺手', url: 'https://www.feishu.cn', category: '办公效率', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '飞书办公的团队' },
  { id: 'workbuddy', name: 'WorkBuddy', description: '腾讯的全场景 AI Agent 桌面平台，办公编程全能', url: 'https://www.workbuddy.cn', category: '办公效率', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '职场人连接国内生态的 AI 助手' },

  // ── 搜索研究 ──────────────────────────
  { id: 'perplexity', name: 'Perplexity', description: 'AI 答案引擎，带引用的实时联网搜索', url: 'https://www.perplexity.ai', category: '搜索研究', featured: true, pricing: '部分免费', origin: '海外', direct: false, bestFor: '查证型搜索与资料调研' },
  { id: 'notebooklm', name: 'NotebookLM', description: 'Google 的文档研究助手，还能生成播客', url: 'https://notebooklm.google.com', category: '搜索研究', featured: false, pricing: '免费', origin: '海外', direct: false, bestFor: '围绕一堆文档做问答和消化' },
  { id: 'metaso', name: '秘塔AI搜索', description: '国产 AI 搜索，无广告、结果带脑图和大纲', url: 'https://metaso.cn', category: '搜索研究', featured: false, pricing: '免费', origin: '国产', direct: true, bestFor: '国内直连的 AI 搜索' },
  { id: 'genspark', name: 'Genspark', description: 'AI 搜索起家的 Super Agent，自动生成专题页面', url: 'https://www.genspark.ai', category: '搜索研究', featured: false, pricing: '部分免费', origin: '海外', direct: false, bestFor: '一键生成调研专题页' },

  // ── 开源模型 ──────────────────────────
  { id: 'huggingface', name: 'Hugging Face', description: '开源模型与数据集的中心枢纽', url: 'https://huggingface.co', category: '开源模型', featured: true, pricing: '免费', origin: '海外', direct: false, bestFor: '找模型、找数据集、看 Demo' },
  { id: 'ollama', name: 'Ollama', description: '一条命令在本地跑开源大模型', url: 'https://ollama.com', category: '开源模型', featured: false, pricing: '免费', origin: '海外', direct: true, bestFor: '本地隐私跑模型的入门方式' },
  { id: 'modelscope', name: '魔搭 ModelScope', description: '阿里的开源模型社区，中文模型资源丰富', url: 'https://modelscope.cn', category: '开源模型', featured: false, pricing: '免费', origin: '国产', direct: true, bestFor: '国内下载模型不折腾' },
  { id: 'lmstudio', name: 'LM Studio', description: '图形化本地模型运行器，小白友好', url: 'https://lmstudio.ai', category: '开源模型', featured: false, pricing: '免费', origin: '海外', direct: true, bestFor: '不想碰命令行的本地跑模型' },
  { id: 'civitai', name: 'Civitai', description: '最大的 SD/绘画模型分享社区，模型与灵感双丰收', url: 'https://civitai.com', category: '开源模型', featured: false, pricing: '免费', origin: '海外', direct: false, bestFor: '找绘画模型与参考图' },

  // ── Agent工作流 ───────────────────────
  { id: 'coze', name: '扣子 Coze', description: '字节的 Agent 搭建平台，拖拉拽做 AI 应用', url: 'https://www.coze.cn', category: 'Agent工作流', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '不写代码做自己的 AI 机器人' },
  { id: 'dify', name: 'Dify', description: '开源的 LLM 应用开发平台，可自部署', url: 'https://dify.ai', category: 'Agent工作流', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '团队搭建可掌控的 AI 应用' },
  { id: 'n8n', name: 'n8n', description: '开源工作流自动化，AI 节点的最佳胶水', url: 'https://n8n.io', category: 'Agent工作流', featured: false, pricing: '部分免费', origin: '海外', direct: true, bestFor: '把 AI 接进自动化流程' },
  { id: 'manus', name: 'Manus', description: '通用 AI Agent，能自己规划并执行复杂任务', url: 'https://manus.im', category: 'Agent工作流', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '甩给它一个完整任务去跑' },
  { id: 'fastgpt', name: 'FastGPT', description: '开源知识库问答系统，RAG 上手快', url: 'https://fastgpt.in', category: 'Agent工作流', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '搭建企业知识库问答' },
  { id: 'yuanqi', name: '腾讯元器', description: '腾讯的 Agent 平台，可一键分发到微信生态', url: 'https://yuanqi.tencent.com', category: 'Agent工作流', featured: false, pricing: '免费', origin: '国产', direct: true, bestFor: '做微信里的 AI 分身/客服' },

  // ── 提示词社区 ────────────────────────
  { id: 'waytoagi', name: '通往AGI之路', description: '国内最大的免费 AI 知识库社区，体系化教程', url: 'https://www.waytoagi.com', category: '提示词社区', featured: false, pricing: '免费', origin: '国产', direct: true, bestFor: '系统入门 AI 的中文学习者' },
  { id: 'prompthero', name: 'PromptHero', description: '提示词搜索引擎，按图搜提示词', url: 'https://prompthero.com', category: '提示词社区', featured: false, pricing: '部分免费', origin: '海外', direct: false, bestFor: '看到好图想复刻提示词' },
  { id: 'flowgpt', name: 'FlowGPT', description: '提示词分享社区，各种玩法模板', url: 'https://flowgpt.com', category: '提示词社区', featured: false, pricing: '免费', origin: '海外', direct: false, bestFor: '找现成的提示词模板' },
  { id: 'linuxdo', name: 'LINUX DO', description: '中文技术社区，AI 讨论氛围浓、羊毛多', url: 'https://linux.do', category: '提示词社区', featured: false, pricing: '免费', origin: '国产', direct: true, bestFor: '泡社区获取 AI 圈一手信息' },

  // ── 模型API ───────────────────────────
  { id: 'openrouter', name: 'OpenRouter', description: '一个 API 调用全球主流模型，按量计费', url: 'https://openrouter.ai', category: '模型API', featured: false, pricing: '部分免费', origin: '海外', direct: false, bestFor: '一个 Key 玩遍所有模型' },
  { id: 'siliconflow', name: '硅基流动', description: '国产模型推理平台，开源模型 API 便宜稳定', url: 'https://siliconflow.cn', category: '模型API', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '国内调用开源模型 API' },
  { id: 'ark', name: '火山方舟', description: '字节跳动的模型服务平台，豆包模型 API', url: 'https://www.volcengine.com/product/ark', category: '模型API', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '企业级调用豆包系列模型' },
  { id: 'bigmodel', name: '智谱开放平台', description: '智谱 GLM 系列模型的官方 API 平台', url: 'https://bigmodel.cn', category: '模型API', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '调用 GLM 系列模型' },
  { id: 'deepseek-api', name: 'DeepSeek 开放平台', description: 'DeepSeek 官方 API，价格屠夫、推理模型便宜好用', url: 'https://platform.deepseek.com', category: '模型API', featured: false, pricing: '付费', origin: '国产', direct: true, bestFor: '低成本调用顶级推理模型' },
  { id: 'moonshot-api', name: 'Moonshot 开放平台', description: 'Kimi 的官方 API 平台，长上下文接口', url: 'https://platform.moonshot.cn', category: '模型API', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '在应用里接入 Kimi 长文本能力' },
  { id: 'bailian', name: '阿里云百炼', description: '阿里的模型服务平台，通义全系 API + 应用编排', url: 'https://bailian.console.aliyun.com', category: '模型API', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '阿里云生态调用通义系列' },
  { id: 'qianfan', name: '百度千帆', description: '百度的大模型平台，文心系列 API 与企业工具链', url: 'https://qianfan.cloud.baidu.com', category: '模型API', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '调用文心系列与百度生态集成' },
  { id: 'minimax-api', name: 'MiniMax 开放平台', description: 'MiniMax 官方 API，语音与音乐模型接口是特色', url: 'https://platform.minimaxi.com', category: '模型API', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '语音/音乐生成与对话模型接入' },
  { id: 'xinghuo-api', name: '讯飞星火', description: '科大讯飞的星火大模型 API，教育办公场景深', url: 'https://xinghuo.xfyun.cn', category: '模型API', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '教育、办公、语音场景接入' },
  { id: 'stepfun', name: '阶跃星辰开放平台', description: '阶跃星辰 Step 系列模型 API，多模态能力强', url: 'https://platform.stepfun.com', category: '模型API', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '多模态理解类应用' },
  { id: 'hunyuan-api', name: '腾讯混元', description: '腾讯混元大模型 API，与腾讯云产品联动', url: 'https://cloud.tencent.com/product/hunyuan', category: '模型API', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '腾讯云生态用户' },
  { id: 'sensenova', name: '商汤日日新', description: '商汤 SenseNova 大模型平台，视觉模型见长', url: 'https://platform.sensenova.cn', category: '模型API', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '视觉与多模态企业场景' },
  { id: 'ppio', name: 'PPIO 派欧云', description: '国产推理云平台，开源模型 API 按量低价', url: 'https://ppinfra.com', category: '模型API', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '低成本跑开源模型推理' },
  { id: 'infini', name: '无问芯穹', description: '多元算力模型平台，国产芯片适配是特色', url: 'https://www.infini-ai.com', category: '模型API', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '关注算力自主可控的团队' },
  { id: 'replicate', name: 'Replicate', description: '开源模型云端 API 平台，一行调用海量模型', url: 'https://replicate.com', category: '模型API', featured: false, pricing: '部分免费', origin: '海外', direct: false, bestFor: '快速试验各种开源模型 API' },

  // ── 设计3D ────────────────────────────
  { id: 'meshy', name: 'Meshy', description: '文生/图生 3D 模型，游戏与 3D 打印可用', url: 'https://www.meshy.ai', category: '设计3D', featured: false, pricing: '部分免费', origin: '海外', direct: true, bestFor: '快速出 3D 资产' },
  { id: 'tripo', name: 'Tripo AI', description: '国产 3D 生成模型，出模速度快', url: 'https://www.tripo3d.ai', category: '设计3D', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '国内做 3D 生成' },
  { id: 'spline', name: 'Spline', description: '浏览器里的 3D 设计工具，带 AI 生成功能', url: 'https://spline.design', category: '设计3D', featured: false, pricing: '部分免费', origin: '海外', direct: true, bestFor: '给网页做轻量 3D 交互' },
  { id: 'mastergo', name: 'MasterGo AI', description: '国产设计协作工具的 AI 能力，UI 设计提效', url: 'https://mastergo.com', category: '设计3D', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '国内 UI 设计团队' },
  { id: 'canva', name: '可画 Canva', description: '一站式设计平台的 AI 工具箱，海报社媒图最快', url: 'https://www.canva.cn', category: '设计3D', featured: false, pricing: '部分免费', origin: '国产', direct: true, bestFor: '非设计师快速出海报' },
]
