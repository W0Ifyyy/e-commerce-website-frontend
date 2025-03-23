export default function ProductCard({ id, name, desc, price, imageUrl }: any) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3 className="text-lg font-semibold mt-2">{name}</h3>
      <p className="text-gray-500">{desc}</p>
      <p className="text-lg font-semibold mt-2">${price}</p>
      <button className="bg-orange-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-orange-600 transition-colors">
        Add to cart
      </button>
    </div>
  );
}
