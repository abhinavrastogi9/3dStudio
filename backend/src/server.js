import { app } from "./app.js";
import connectDB from "./Db/index.js";
const PORT = process.env.PORT || 8000;
const server = async () => {
  try {
    await connectDB();
    app.get("/api",(req,res) => {
      res.send("Server is running");
    });
    // Add your routes here
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log("http://localhost:" + PORT);
    });
  } catch (err) {
    console.error("Error starting the server:", err);
    process.exit(1);
  }
};

server();
