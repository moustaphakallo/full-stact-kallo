import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const outOfStock = product.stock <= 0;

  function handleOrder() {
    if (outOfStock) return;

    const message = [
      "Bonjour PocketShop, je souhaite commander:",
      `${product.name}`,
      `Prix: ${product.price.toLocaleString("fr-FR")} F`,
      `Produit disponible: ${product.stock}`,
    ].join("\n");

    window.open(
      `https://wa.me/224661615859?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  const emailSubject = `Commande PocketShop - ${product.name}`;
  const emailBody = `Bonjour PocketShop,\n\nJe souhaite commander:\n${product.name}\nPrix: ${product.price.toLocaleString("fr-FR")} F\n\nMerci de me contacter pour finaliser la commande.`;
  const mailto = `mailto:moustaphakallo547@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <article className="card">
      <img src={product.image} alt={product.name} />

      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="price">{product.price.toLocaleString("fr-FR")} F</p>
        <p className="stock">{product.stock} en stock</p>

        <button
          className="btn"
          disabled={outOfStock}
          onClick={() => addToCart(product)}
        >
          {outOfStock ? "Rupture de stock" : "Ajouter au panier"}
        </button>
        <button className="btn whatsapp-btn" disabled={outOfStock} onClick={handleOrder}>
          Commander sur WhatsApp
        </button>
        <a className="email-link" href={mailto}>Commander par e-mail</a>
      </div>
    </article>
  );
}
