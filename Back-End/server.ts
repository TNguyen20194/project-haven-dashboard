import "dotenv/config";
import app from "./src/app.js";

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send({ msg: "Health Check" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});