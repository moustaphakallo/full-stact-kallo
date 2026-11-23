import { useCart } from "../context/CartContext.jsx";

export default function Header({ onLogin }) {
  const { count } = useCart();

  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#produits" className="logo">
          PocketShop
        </a>
        <nav className="nav">
          <a href="#produits">Produits</a>
          <a href="#panier">Shopping Cart ({count})</a>
          <button className="nav-button" type="button" onClick={onLogin}>Login</button>
        </nav>
      </div>
    </header>
  );
}
