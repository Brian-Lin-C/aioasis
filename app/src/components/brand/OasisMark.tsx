/** 品牌标记：金环（日/月）+ 半圆绿洲水——水平面与字母 A 横杠顶部齐平 */
export default function OasisMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden focusable="false">
      <circle cx="50" cy="50" r="44" fill="none" stroke="var(--sand)" strokeWidth="9" />
      <path d="M24,55 A26,14 0 0 0 76,55 Z" fill="var(--oasis)" />
    </svg>
  )
}
