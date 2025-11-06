import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <>
      <section className="flex justify-center py-16">
        <div className="flex flex-col text-center">
          <h1 className="text-8xl">404</h1>
          <h2 className="text-5xl mt-5">Pagina non trovata</h2>
          <div className="mt-16">
            <Link to={"/"} className="text-xl border border-black p-2 hover:bg-black hover:text-white hover:duration-600 hover:rounded-lg">
              Torna alla home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
