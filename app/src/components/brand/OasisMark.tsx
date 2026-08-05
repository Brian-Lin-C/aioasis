/** 品牌标记：金环（日/月）+ 半圆绿洲水 + 微缩棕榈小岛——水平面与字母 A 横杠顶部齐平 */
import { PALM_D, PALM_CONTENT_BOTTOM, PALM_CONTENT_CX } from '../canvas/palmPath'

export default function OasisMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden focusable="false">
      <circle cx="50" cy="50" r="44" fill="none" stroke="var(--sand)" strokeWidth="9" />
      <path d="M24,55 A26,20 0 0 0 76,55 Z" fill="var(--oasis)" />
      {/* 微缩棕榈：源 1024 viewBox 缩至高约 38，岛基没入水面（y≈58），昼间剪影色 */}
      <path
        d={PALM_D}
        transform={`translate(50 58) scale(${38 / (PALM_CONTENT_BOTTOM - 10)}) translate(${-PALM_CONTENT_CX} ${-PALM_CONTENT_BOTTOM})`}
        fill="#5c5236"
      />
    </svg>
  )
}
