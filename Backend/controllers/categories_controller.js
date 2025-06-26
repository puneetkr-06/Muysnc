// const axios = require("axios");

// const getCategories = async (req, res) => {
//   try {
//     const token = await getSpotifyAccessToken(); // use your auth util
//     const response = await axios.get("https://api.spotify.com/v1/browse/categories", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const categories = response.data.categories.items.map((cat) => ({
//       id: cat.id,
//       name: cat.name,
//       image: cat.icons[0]?.url,
//     }));
//     console.log(categories);

//     res.status(200).json({ categories });
//   } catch (err) {
//     console.error("Spotify Categories Error:", err.message);
//     res.status(500).json({ error: "Failed to fetch categories" });
//   }
// };

// module.exports = { getCategories };
