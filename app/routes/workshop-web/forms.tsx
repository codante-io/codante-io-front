import "./style.css";
import { useColorMode } from "~/lib/contexts/color-mode-context";

const Formulario = () => {
  const { colorMode } = useColorMode();

  return (
    <div className="flex">
      <div
        className={`bg-white rounded-lg shadow-lg p-8 w-96 forms ${colorMode === "light" ? "forms-light" : "forms-dark"}`}
      >
        <h1 className="text-2xl font-bold text-center  mb-6">
          Quero aprender programação da forma correta!
        </h1>
        <form>
          <div className="mb-4">
            <label>Nome:t</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium ">Email:</label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition duration-300 bg-black"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
