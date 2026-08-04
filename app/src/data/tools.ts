import type { Tool } from '../types/content'
export { CATEGORIES } from '../types/content'

export const tools: Tool[] = [
  // 对话
  { id: 'chatgpt', name: 'ChatGPT', description: 'OpenAI 的旗舰对话模型，生态最成熟的通用 AI 助手', url: 'https://chatgpt.com', category: '对话', featured: true },
  { id: 'claude', name: 'Claude', description: 'Anthropic 出品，长文本与写作质感著称', url: 'https://claude.ai', category: '对话', featured: true },
  { id: 'kimi', name: 'Kimi', description: '月之暗面出品，长上下文与中文体验出色', url: 'https://www.kimi.com', category: '对话', featured: true },
  { id: 'gemini', name: 'Gemini', description: 'Google 的多模态模型，与安卓/搜索深度整合', url: 'https://gemini.google.com', category: '对话', featured: false },
  { id: 'deepseek', name: 'DeepSeek', description: '国产开源模型之光，推理能力强且免费可用', url: 'https://chat.deepseek.com', category: '对话', featured: false },
  { id: 'doubao', name: '豆包', description: '字节跳动的 AI 助手，语音与多端体验完整', url: 'https://www.doubao.com', category: '对话', featured: false },
  { id: 'qwen', name: '通义千问', description: '阿里通义大模型，开源与商用双线并进', url: 'https://www.tongyi.com', category: '对话', featured: false },
  // 绘画
  { id: 'midjourney', name: 'Midjourney', description: '艺术感天花板的 AI 绘画工具，风格化能力极强', url: 'https://www.midjourney.com', category: '绘画', featured: true },
  { id: 'jimeng', name: '即梦', description: '字节跳动的一站式 AI 创作平台，中文提示词友好', url: 'https://jimeng.jianying.com', category: '绘画', featured: true },
  { id: 'sd', name: 'Stable Diffusion', description: '开源绘画模型生态，可本地部署、无限定制', url: 'https://stability.ai', category: '绘画', featured: false },
  { id: 'flux', name: 'FLUX', description: 'Black Forest Labs 的新一代文生图模型，细节惊人', url: 'https://blackforestlabs.ai', category: '绘画', featured: false },
  { id: 'ideogram', name: 'Ideogram', description: '以"图中文字渲染准确"出圈的绘画工具', url: 'https://ideogram.ai', category: '绘画', featured: false },
  { id: 'recraft', name: 'Recraft', description: '面向设计师的 AI 矢量与栅格图像生成', url: 'https://www.recraft.ai', category: '绘画', featured: false },
  // 视频
  { id: 'sora', name: 'Sora', description: 'OpenAI 的文生视频模型，物理一致性标杆', url: 'https://openai.com/sora', category: '视频', featured: false },
  { id: 'runway', name: 'Runway', description: 'AI 视频编辑与生成老牌强者，Gen 系列模型', url: 'https://runwayml.com', category: '视频', featured: false },
  { id: 'kling', name: '可灵', description: '快手出品的视频生成模型，长镜头表现优秀', url: 'https://klingai.com', category: '视频', featured: false },
  { id: 'pika', name: 'Pika', description: '玩法多样的 AI 视频工具，特效模板丰富', url: 'https://pika.art', category: '视频', featured: false },
  { id: 'veo', name: 'Veo', description: 'Google DeepMind 的视频生成模型', url: 'https://deepmind.google/technologies/veo', category: '视频', featured: false },
  // 音频
  { id: 'suno', name: 'Suno', description: '一句话生成完整歌曲，AI 音乐的现象级产品', url: 'https://suno.com', category: '音频', featured: false },
  { id: 'elevenlabs', name: 'ElevenLabs', description: '最自然的 AI 配音与声音克隆平台', url: 'https://elevenlabs.io', category: '音频', featured: false },
  { id: 'udio', name: 'Udio', description: 'Suno 的主要竞品，音乐细节见长', url: 'https://www.udio.com', category: '音频', featured: false },
  // 编程
  { id: 'cursor', name: 'Cursor', description: 'AI 原生代码编辑器，程序员的效率倍增器', url: 'https://www.cursor.com', category: '编程', featured: true },
  { id: 'copilot', name: 'GitHub Copilot', description: 'GitHub 官方的 AI 结对编程助手', url: 'https://github.com/features/copilot', category: '编程', featured: false },
  { id: 'trae', name: 'Trae', description: '字节跳动的 AI IDE，中文开发者友好', url: 'https://www.trae.ai', category: '编程', featured: false },
  { id: 'v0', name: 'v0', description: 'Vercel 出品的 UI 生成工具，一句话出界面', url: 'https://v0.dev', category: '编程', featured: false },
  // 办公效率
  { id: 'notion', name: 'Notion AI', description: '笔记 + AI 的一体化知识工作台', url: 'https://www.notion.com', category: '办公效率', featured: false },
  { id: 'gamma', name: 'Gamma', description: 'AI 一键生成 PPT/文档/网页，颜值在线', url: 'https://gamma.app', category: '办公效率', featured: false },
  { id: 'napkin', name: 'Napkin AI', description: '把文字一键变成信息图与示意图', url: 'https://www.napkin.ai', category: '办公效率', featured: false },
  // 搜索研究
  { id: 'perplexity', name: 'Perplexity', description: 'AI 答案引擎，带引用的实时联网搜索', url: 'https://www.perplexity.ai', category: '搜索研究', featured: true },
  { id: 'notebooklm', name: 'NotebookLM', description: 'Google 的文档研究助手，还能生成播客', url: 'https://notebooklm.google.com', category: '搜索研究', featured: false },
  // 开源模型
  { id: 'huggingface', name: 'Hugging Face', description: '开源模型与数据集的中心枢纽', url: 'https://huggingface.co', category: '开源模型', featured: true },
  { id: 'ollama', name: 'Ollama', description: '一条命令在本地跑开源大模型', url: 'https://ollama.com', category: '开源模型', featured: false },
]
