export default function Footer({ note, dark }) {
  if (dark) {
    return (
      <div className="footer-dark">
        {note || 'sarvagyasinghs.com · 2026'}
      </div>
    )
  }
  return (
    <footer>
      <div className="site-footer">
        <div>
          <div className="footer-brand">sarvagyasinghs.com</div>
          <p className="footer-note">{note || 'Research compiled from vendor documentation, G2 reviews, Sacra ARR data, Gartner reports, and verified press coverage. All data as of June 2026.'}</p>
        </div>
        <div className="footer-right">
          sarvagyasinghs.com<br />June 2026
        </div>
      </div>
    </footer>
  )
}
