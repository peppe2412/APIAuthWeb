import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [succesMessages, setSuccessMessages] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessages(location.state.message);
      window.history.replaceState({}, document.title);

      const messageTimer = setTimeout(() => {
        setSuccessMessages("");
      }, 4000);

      return () => clearInterval(messageTimer);
    }
  }, [location]);

  return (
    <>
      <header className="flex justify-center py-10">
        <div className="w-[500px] text-center">
          <h1 className="text-8xl font-bold uppercase">Home</h1>
        </div>
      </header>

      {succesMessages && (
        <div className="flex justify-center">
          <div className="text-white p-2 text-xl bg-green-500">
            {succesMessages}
          </div>
        </div>
      )}
    </>
  );
}
