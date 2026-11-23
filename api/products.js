const products = [
  { id: 1, name: "Apple iPhone 17", price: 720000, stock: 15, image: "/products/01-iphone17.png" },
  { id: 2, name: "Apple iPhone 17 Pro Max", price: 980000, stock: 8, image: "/products/02-iphone17-pro-max.png" },
  { id: 3, name: "Apple iPhone 18 Pro", price: 1200000, stock: 10, image: "/products/03-iphone18-pro.png" },
  { id: 4, name: "Apple iPhone 18 Pro Max", price: 1450000, stock: 7, image: "/products/04-iphone18-pro-max.png" },
  { id: 5, name: "Apple iPhone 18 Pro Max 1 To", price: 3600000, stock: 5, image: "/products/05-iphone18-pro-ng.png" },
  { id: 6, name: "Shopverse Pack numérique", price: 720000, stock: 20, image: "/products/06-shopverse.png" },
  { id: 7, name: "Ordinateur portable Shopverse", price: 650000, stock: 12, image: "/products/07-ordinateur-portable.png" },
  { id: 8, name: "HP Laptop 17 pouces", price: 647000, stock: 9, image: "/products/08-pc-hp.png" },
  { id: 9, name: "Poste informatique Lenovo", price: 850000, stock: 8, image: "/products/09-poste-informatique.png" },
  { id: 10, name: "Ordinateur bureau HP + écran", price: 160000, stock: 11, image: "/products/10-pc-bureau-hp.png" },
  { id: 11, name: "Setup bureau gaming", price: 1200000, stock: 6, image: "/products/11-bureau-gaming.png" },
  { id: 12, name: "PC Gaming RTX", price: 950000, stock: 7, image: "/products/12-pc-gaming.png" },
  { id: 13, name: "Enceinte Bluetooth portable", price: 65000, stock: 25, image: "/products/13-enceinte-portable.png" },
  { id: 14, name: "Enceinte XBOOM Bluetooth", price: 180000, stock: 14, image: "/products/14-enceinte-xboom.png" },
  { id: 15, name: "Enceinte AlphaTheta", price: 350000, stock: 10, image: "/products/15-enveloppe-sonore.png" },
  { id: 16, name: "Enceintes Fenton double bass", price: 280000, stock: 12, image: "/products/16-enceintes-fenton.png" },
];

export default function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  response.setHeader("Cache-Control", "public, max-age=300");
  return response.status(200).json(products);
}
