import { PALM_D } from '../canvas/palmPath'

/** 品牌标记：金环（日/月）内嵌双树小岛剪影——与首页水潭场景同构 */
export default function OasisMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden focusable="false">
      <circle cx="50" cy="50" r="44" fill="none" stroke="var(--sand)" strokeWidth="7" />
      {/* 1024 源路径 → 环内：缩放 0.0799，岛底贴环内下缘，树梢轻触环顶 */}
      <g transform="translate(13.45 14.61) scale(0.0799)">
        <path d={PALM_D} fill="var(--oasis)" />
      </g>
    </svg>
  )
}
