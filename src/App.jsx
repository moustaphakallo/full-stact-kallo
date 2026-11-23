import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ProductCard from "./components/ProductCard.jsx";
import Cart from "./components/Cart.jsx";
import Login from "./components/Login.jsx";
import { getProducts } from "./api.js";

export default function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header onLogin={() => setLoginOpen(true)} />

      <main className="container main">
        <section className="hero">
          <h1>Bienvenue sur PocketShop</h1>
          <p>Achetez vos produits et payez avec votre portefeuille.</p>
        </section>

        <h2 className="section-title" id="produits">Produits</h2>

        {loading && <p>Chargement...</p>}
        {error && <div className="error">{error}</div>}

        <div className="grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Cart />
      </main>
      <Login open={loginOpen} onClose={() => setLoginOpen(false)} />

      <Footer />
    </>
  );
}
