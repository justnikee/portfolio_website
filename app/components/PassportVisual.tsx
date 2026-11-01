/** Editorial illustration, deliberately not presented as a shipped application UI. */
export default function PassportVisual() {
  return (
    <div className="passport-visual">
      <div className="passport-visual__top"><span>ANVIORA / PRODUCT IN DEVELOPMENT</span><span aria-hidden="true">↗</span></div>
      <div className="passport-visual__body">
        <div className="battery-object" aria-hidden="true">
          <div className="battery-object__cap" />
          <div className="battery-object__shell">
            <span className="battery-object__label">AV / 01</span>
            <span className="battery-object__symbol">+</span>
            <div className="battery-object__bands"><i /><i /><i /></div>
            <span className="battery-object__type">BATTERY<br />IDENTITY</span>
          </div>
        </div>
        <div className="passport-sheet">
          <span className="passport-sheet__eyebrow">DIGITAL PRODUCT PASSPORT</span>
          <span className="passport-sheet__title">A battery.<br />A clearer story.</span>
          <div className="passport-sheet__rule" />
          <div className="passport-sheet__field"><span>Product identity</span><span>01</span></div>
          <div className="passport-sheet__field"><span>Battery information</span><span>02</span></div>
          <div className="passport-sheet__field"><span>Supporting records</span><span>03</span></div>
          <span className="passport-sheet__foot">MANUFACTURE → DOCUMENT → SHARE</span>
        </div>
      </div>
      <div className="passport-visual__bottom"><span>Built for Indian manufacturers & exporters</span><span>Concept illustration</span></div>
    </div>
  );
}
