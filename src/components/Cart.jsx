import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const { items, removeFromCart, changeQuantity, clearCart } = useCart();
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0,
  );

  function orderCart() {
    if (!items.length) return;

    const lines = items.map(
      (item) =>
        `- ${item.product.name} x${item.qty} — ${(item.product.price * item.qty).toLocaleString("fr-FR")} F`,
    );
    const message = [
      "Bonjour PocketShop, je souhaite commander:",
      ...lines,
      `Total: ${total.toLocaleString("fr-FR")} F`,
    ].join("\n");

    window.open(
      `https://wa.me/224661615859?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <section className="cart-panel" id="panier">
      <h2 className="section-title">Shopping Cart</h2>
      {!items.length ? (
        <p className="cart-empty">Votre panier est vide.</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <article className="cart-item" key={item.product.id}>
                <img src={item.product.image} alt={item.product.name} />
                <div className="cart-item-info">
                  <h3>{item.product.name}</h3>
                  <p>{item.product.price.toLocaleString("fr-FR")} F</p>
                  <div className="quantity">
                    <button
                      type="button"
                      onClick={() =>
                        changeQuantity(item.product.id, item.qty - 1)
                      }
                      aria-label="Réduire la quantité"
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      type="button"
                      onClick={() =>
                        changeQuantity(item.product.id, item.qty + 1)
                      }
                      aria-label="Augmenter la quantité"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="remove-btn"
                  type="button"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  Supprimer
                </button>
              </article>
            ))}
          </div>
          <div className="cart-summary">
            <strong>Total: {total.toLocaleString("fr-FR")} F</strong>
            <button className="btn" type="button" onClick={orderCart}>
              Commander le panier
            </button>
            <button className="remove-btn" type="button" onClick={clearCart}>
              Vider le panier
            </button>
          </div>
        </>
      )}
    </section>
  );
}
