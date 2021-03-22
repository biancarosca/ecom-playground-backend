import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const [products, setProducts] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [newProducts, setNewProducts] = useState([]);

	useEffect(() => {
		let eventSource = new EventSource("https://ecom-playground-api.herokuapp.com/api/new");
		eventSource.addEventListener("message", (event) => {
			const data = JSON.parse(event.data.slice(6));
			setNewProducts((prev) => [...prev, data.fullDocument]);
			console.log(data);
		});
		const fetchProducts = async () => {
			try {
				const res = await axios.get(
					"https://ecom-playground-api.herokuapp.com/api/products"
				);
				setProducts(res.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchProducts();
	}, []);

	const addProduct = async () => {
		try {
			const res = await axios.post("https://ecom-playground-api.herokuapp.com/api/products", {
				title,
				description,
				price,
			});
			setProducts((prev) => [...prev, res.data.product]);
			setTitle("");
			setDescription("");
			setPrice("");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="App">
			<h1>Menu</h1>
			<input
				type="text"
				placeholder="Title"
				value={title}
				onChange={(event) => setTitle(event.target.value)}
			/>
			<br />
			<textarea
				placeholder="Description"
				value={description}
				onChange={(event) => setDescription(event.target.value)}
			/>
			<br />
			<input
				type="text"
				placeholder="Price"
				value={price}
				onChange={(event) => setPrice(event.target.value)}
			/>
			<br />
			<button onClick={addProduct}>Add</button>
			<ul>
				{products.map((product, idx) => (
					<li key={idx}>
						{product.title}, {product.description}, {product.price}
					</li>
				))}
			</ul>
			<h1>New products</h1>
			<ul>
				{newProducts.map((product, idx) => (
					<li key={idx}>
						{product.title}, {product.description}, {product.price}
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
