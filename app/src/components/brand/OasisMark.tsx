/** 品牌标记：金环（日/月）+ 底部一汪绿洲水 */
export default function OasisMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden focusable="false">
      <circle cx="50" cy="50" r="44" fill="none" stroke="var(--sand)" strokeWidth="9" />
      <ellipse cx="50" cy="63" rx="26" ry="11" fill="var(--oasis)" />
    </svg>
  )
}
