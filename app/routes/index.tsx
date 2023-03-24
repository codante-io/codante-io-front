import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="bg-gray-800 min-h-screen text-white flex items-center justify-center">
      <h1 className="bg-red-300">Codante</h1>
      <ul>
        <li>
          <Link to="/courses">Cursos</Link>
        </li>
      </ul>
    </div>
  );
}
