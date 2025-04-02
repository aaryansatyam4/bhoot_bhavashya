import express from "express";
import cors from "cors";
import { getDetails } from "./engine/kundli.mjs";
import { generatePastLifeStory } from "./engine/storyGenerator.mjs";
import { generateFutureLifeStory } from "./engine/generateFutureLifeStory.mjs"; // ✅ fixed empty import

const app = express();
app.use(cors());
app.use(express.json());

// -------------------- Past Life Route -------------------- //
app.post("/generate-past", async (req, res) => {
  const { name, dob, tob, lat, lng } = req.body;

  if (!name || !dob || !tob || !lat || !lng) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const kundli = await getDetails({ dob, tob, lat, lng });
    const story = generatePastLifeStory(kundli);

    return res.json({ name, kundli, story });
  } catch (err) {
    console.error("Engine Error:", err);
    res.status(500).json({ error: "Something went wrong in generating kundli." });
  }
});

// -------------------- Future Life Route -------------------- //
app.post('/generate-future', async (req, res) => {
  const { name, dob, tob, lat, lng } = req.body;

  if (!name || !dob || !tob || !lat || !lng) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const kundli = await getDetails({ dob, tob, lat, lng });
    const story = generateFutureLifeStory(kundli);

    return res.json({ name, kundli, story });
  } catch (err) {
    console.error("Engine Error:", err);
    res.status(500).json({ error: "Something went wrong in generating future story." });
  }
});

// -------------------- Simple Test Route -------------------- //
app.get("/return-true", (req, res) => {
  return res.json({ result: true });
});

// -------------------- Start Server -------------------- //
app.listen(5001, () => {
  console.log("🚀 AkashVerse Backend Running on https://bhoot-bhavashya.onrender.com");
});
