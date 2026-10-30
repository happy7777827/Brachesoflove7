import { content } from "../content";

export default function Partners() {
  const { partners } = content;

  return (
    <div className="partners fade-rise in-view" data-delay="600">
      <div className="partners-chip liquid-glass">{partners.chip}</div>
      <div className="partners-row">
        {partners.names.map((name) => (
          <span key={name}>{name}</span>
        ))}
      </div>
    </div>
  );
}
