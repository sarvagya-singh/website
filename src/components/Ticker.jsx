import { achievements } from '../data/profile'

export default function Ticker() {
  const items = [...achievements, ...achievements]

  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {items.map((item, i) => (
          <span key={i}>{item} · </span>
        ))}
      </div>
    </div>
  )
}
