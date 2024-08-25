const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

// GET
app.get("/bfhl", (req, res) => {
	res.status(200).json({
		operation_code: 1,
	});
});

// POST
app.post("/bfhl", (req, res) => {
	const { data } = req.body;

	if (!Array.isArray(data)) {
		return res.status(400).json({
			is_success: false,
			message: "Invalid input format. 'data' should be an array.",
		});
	}

	const numbers = data.filter((item) => !isNaN(item));
	const alphabets = data.filter(
		(item) => isNaN(item) && typeof item === "string"
	);

	const lowercaseAlphabets = alphabets.filter(
		(item) => item >= "a" && item <= "z"
	);
	const highestLowercaseAlphabet =
		lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

	const response = {
		is_success: true,
		user_id: "john_doe_17091999",
		email: "john@xyz.com",
		roll_number: "ABCD123",
		numbers: numbers,
		alphabets: alphabets,
		highest_lowercase_alphabet: highestLowercaseAlphabet,
	};

	res.status(200).json(response);
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
