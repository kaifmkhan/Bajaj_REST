import { useState } from "react";
import axios from "axios";

const App = () => {
	const [jsonInput, setJsonInput] = useState("");
	const [error, setError] = useState("");
	const [response, setResponse] = useState(null);
	const [selectedOptions, setSelectedOptions] = useState([]);
	const [dropdownVisible, setDropdownVisible] = useState(false);

	const handleJsonInputChange = (e) => {
		setJsonInput(e.target.value);
		setError("");
	};

	const handleSubmit = async () => {
		try {
			const parsedJson = JSON.parse(jsonInput);
			if (!parsedJson.data || !Array.isArray(parsedJson.data)) {
				throw new Error("Invalid JSON format.");
			}

			const res = await axios.post("https://bajaj-backend-5yp8.onrender.com", parsedJson);
			setResponse(res.data);
			setDropdownVisible(true);
		} catch (err) {
			console.log(err);
			setError(
				"Invalid JSON format. Please ensure your input is a valid JSON array."
			);
		}
	};

	const handleDropdownChange = (e) => {
		const value = Array.from(
			e.target.selectedOptions,
			(option) => option.value
		);
		setSelectedOptions(value);
	};

	const renderResponse = () => {
		if (!response) return null;

		return (
			<div className='mt-4'>
				{selectedOptions.includes("Alphabets") && (
					<div>
						<strong>Alphabets:</strong> {JSON.stringify(response.alphabets)}
					</div>
				)}
				{selectedOptions.includes("Numbers") && (
					<div>
						<strong>Numbers:</strong> {JSON.stringify(response.numbers)}
					</div>
				)}
				{selectedOptions.includes("Highest lowercase alphabet") && (
					<div>
						<strong>Highest lowercase alphabet:</strong>{" "}
						{JSON.stringify(response.highest_lowercase_alphabet)}
					</div>
				)}
			</div>
		);
	};

	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
			<h1 className='text-2xl font-bold mb-4'>JSON Input Form</h1>
			<textarea
				value={jsonInput}
				onChange={handleJsonInputChange}
				placeholder='Enter JSON here...'
				className='w-full max-w-lg h-32 p-2 border border-gray-300 rounded'
			/>
			<button
				onClick={handleSubmit}
				className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'>
				Submit
			</button>

			{error && <p className='mt-4 text-red-500'>{error}</p>}

			{dropdownVisible && (
				<div className='mt-4'>
					<label className='block text-gray-700 mb-2'>Select options:</label>
					<select
						multiple
						className='w-full max-w-lg p-2 border border-gray-300 rounded'
						onChange={handleDropdownChange}>
						<option value='Alphabets'>Alphabets</option>
						<option value='Numbers'>Numbers</option>
						<option value='Highest lowercase alphabet'>
							Highest lowercase alphabet
						</option>
					</select>
				</div>
			)}

			{renderResponse()}
		</div>
	);
};

export default App;
