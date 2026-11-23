import { useEffect, useState } from "react";

export default function Login({ open, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) return;
    const saved = JSON.parse(localStorage.getItem("pocketshop-user") || "null");
    if (saved) {
      setName(saved.name || "");
      setEmail(saved.email || "");
    }
  }, [open]);

  if (!open) return null;

  function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim() || !email.trim()) {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }
    localStorage.setItem(
      "pocketshop-user",
      JSON.stringify({ name: name.trim(), email: email.trim() }),
    );
    setMessage(`Bienvenue ${name.trim()} !`);
  }

  function logout() {
    localStorage.removeItem("pocketshop-user");
    setName("");
    setEmail("");
    setMessage("Vous êtes déconnecté.");
  }

  return (
    <div className="login-overlay" role="presentation" onMouseDown={onClose}>
      <section
        className="login-modal"
        id="connexion"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose}>
          ×
        </button>
        <h2 id="login-title">Connexion PocketShop</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nom
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <button className="btn" type="submit">Se connecter</button>
          <button className="remove-btn" type="button" onClick={logout}>
            Se déconnecter
          </button>
        </form>
        {message && <p className="login-message">{message}</p>}
      </section>
    </div>
  );
}
