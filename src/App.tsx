import { useEffect, useState } from "react";
import MenuItem from "./components/MenuItem";
import OrderContents from "./components/OrderContents";
import OrderTotals from "./components/OrderTotals";
import TipPercentageForm from "./components/TipPercentageForm";
import Header from "./components/Header";
import { menuItems } from "./data/db";
import useOrder from "./hooks/useOrder";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Comprueba el tema almacenado en localStorage al cargar la aplicación
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Función para cambiar entre temas oscuro y claro
  function toggleDarkMode() {
    setDarkMode(!darkMode);
    if (!darkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }

  const { order, tip, setTip, addItem, removeItem, placeOrder } = useOrder();

  return (
    <>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} light={true} />
      <main className={`max-w-7xl mx-auto py-20 grid md:grid-cols-2 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className="p-5">
          <h2 className="font-black text-4xl">Menú</h2>
          <div className="mt-10 space-y-3">
            {menuItems.map((item) => (
              <MenuItem key={item.id} item={item} addItem={addItem} />
            ))}
          </div>
        </div>
        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
          {order.length ? (
            <>
              <OrderContents order={order} removeItem={removeItem} />
              <TipPercentageForm setTip={setTip} tip={tip} />
              <OrderTotals order={order} tip={tip} placeOrder={placeOrder} darkMode={darkMode} />
            </>
          ) : (
            <p className="text-center">La orden está vacía</p>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
