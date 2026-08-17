import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import {
	getProducts,
	deleteProduct,
} from "../../api/productApi";
import AddProductModal from "../../components/admin/AddProductModal";
import toast from "react-hot-toast";

import chocolate from "../../assets/cupcakes/chocolate.png";
import strawberry from "../../assets/cupcakes/strawberry.png";
import vanilla from "../../assets/cupcakes/vanilla.png";
import redvelvet from "../../assets/cupcakes/redvelvet.png";
import blueberry from "../../assets/cupcakes/blueberry.png";
import caramel from "../../assets/cupcakes/caramel.png";

const imageMap = {
	"Classic Vanilla Cupcake": vanilla,
	"Chocolate Delight": chocolate,
	"Chocolate Biscoff": chocolate,
	"Red Velvet": redvelvet,
	"Strawberry Bliss": strawberry,
	"Blueberry Dream": blueberry,
	"Caramel Crunch": caramel,
};

function Products() {
	const [products, setProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	const [showForm, setShowForm] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
		const data = await getProducts();
		setProducts(data);
		} catch (error) {
		console.log(error);
		}
	};

	const handleDelete = async (id) => {
		if (!window.confirm("Are you sure you want to delete this cupcake?"))
		return;

		try {
		await deleteProduct(id);
		toast.success("Product deleted successfully!");
		fetchProducts();
		} catch (error) {
		console.log(error);
		toast.error("Failed to delete product");
		}
	};

	const filteredProducts = products.filter((product) =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="flex">
		<Sidebar />

		<div className="flex-1 min-h-screen bg-gray-100">
			<header className="bg-white shadow px-8 py-5">
			<h1 className="text-3xl font-bold">Products</h1>
			</header>

			<div className="p-8">
			<div className="bg-white rounded-xl shadow p-6">

				<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-semibold">
					All Cupcakes
				</h2>

				<div className="flex gap-3">
					<input
					type="text"
					placeholder="🔍 Search Cupcake..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-pink-500"
					/>

					<button
					onClick={() => {
						setSelectedProduct(null);
						setShowForm(true);
					}}
					className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-lg font-semibold"
					>
					+ Add Cupcake
					</button>
				</div>
				</div>

				<table className="w-full border-collapse">
				<thead>
					<tr className="bg-pink-500 text-white">
					<th className="p-3">Image</th>
					<th className="p-3">Name</th>
					<th className="p-3">Category</th>
					<th className="p-3">Price</th>
					<th className="p-3">Stock</th>
					<th className="p-3">Rating</th>
					<th className="p-3">Actions</th>
					</tr>
				</thead>

				<tbody>
					{filteredProducts.map((product) => (
					<tr
						key={product._id}
						className="border-b text-center hover:bg-gray-50"
					>
						<td className="p-3">
						<img
							src={imageMap[product.name]}
							alt={product.name}
							className="w-14 h-14 object-contain mx-auto"
						/>
						</td>

						<td className="font-semibold">
						{product.name}
						</td>

						<td>{product.category}</td>

						<td className="text-pink-600 font-bold">
						₹{product.price}
						</td>

						<td>
						{product.stock > 10 ? (
							<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
							In Stock
							</span>
						) : product.stock > 0 ? (
							<span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
							Low Stock
							</span>
						) : (
							<span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
							Out of Stock
							</span>
						)}
						</td>

						<td>⭐ {product.rating}</td>

						<td>
						<div className="flex justify-center gap-2">
							<button
							onClick={() => {
								setSelectedProduct(product);
								setShowForm(true);
							}}
							className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
							>
							Edit
							</button>

							<button
							onClick={() => handleDelete(product._id)}
							className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
							>
							Delete
							</button>
						</div>
						</td>
					</tr>
					))}
				</tbody>
				</table>

			</div>
			</div>

			{showForm && (
			<AddProductModal
				onClose={() => {
				setShowForm(false);
				setSelectedProduct(null);
				}}
				onProductAdded={fetchProducts}
				product={selectedProduct}
			/>
			)}
		</div>
		</div>
	);
}

export default Products;