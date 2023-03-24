import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Codante</h1>
      <ul>
        <li>
          <Link to="/workshops">Workshops</Link>
        </li>
      </ul>
    </div>
  );
}
