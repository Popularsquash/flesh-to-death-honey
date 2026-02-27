import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { products } from "../drizzle/schema.js";

const db = drizzle(process.env.DATABASE_URL);

// Updated descriptions for existing products — rewritten to match the Flesh to Death brand voice
const descriptionUpdates = [
  {
    name: "THE SIGNATURE",
    description: "The one that started the plague. Heavyweight cotton tee with the original Flesh to Death crest — front and back. Wear it to funerals, first dates, or anywhere you need to establish dominance. If you only own one piece of the hive, this is it."
  },
  {
    name: "Beekeeper Tank",
    description: "Strip down to the essentials. This tank is built for the heat — whether you're pulling frames in July or moshing in a garage. Lightweight, breathable, and printed with enough attitude to get you kicked out of a farmer's market."
  },
  {
    name: "The Flag Bearer Tee",
    description: "Fly the colors. This tee carries the Flesh to Death banner like a war flag into polite society. Available in Cardinal and White because even death has a dress code. Premium cotton, pre-shrunk, and guaranteed to start conversations you didn't ask for."
  },
  {
    name: "Swarm Hoodie",
    description: "Cocoon yourself in the hive. This heavyweight hoodie is your armor against cold nights, judgmental stares, and the existential dread of modern beekeeping. Fleece-lined interior. Front pouch for snacks, phones, or stolen honey."
  },
  {
    name: "The Daily Rider Tee",
    description: "Your everyday uniform for riding, wrenching, and general mayhem. Soft enough to sleep in, tough enough to bleed on. The Daily Rider is the tee that shows up even when you don't."
  },
  {
    name: "Hive Mind Cap",
    description: "Crown yourself. This structured cap sits low and mean, embroidered with the Hive Mind mark. Adjustable strap for skulls of all sizes. Wear it forward, backward, or sideways — the bees don't judge."
  },
  {
    name: "The Swarm Rag",
    description: "Multipurpose cloth for the unhinged beekeeper. Tie it around your face, your dog, or your handlebars. All-over print bandana that doubles as a sweat rag, a dust mask, or a white flag when the bees win."
  },
  {
    name: "Buzz Stompers",
    description: "Socks that hit different. Crew-length with all-over Flesh to Death print so your ankles can finally participate in the cult. Cushioned sole for stomping through apiaries, dive bars, and existential crises."
  }
];

async function updateDescriptions() {
  console.log("Updating product descriptions to match brand voice...");
  
  for (const update of descriptionUpdates) {
    try {
      const result = await db
        .update(products)
        .set({ description: update.description })
        .where(eq(products.name, update.name));
      
      console.log(`  Updated: ${update.name}`);
    } catch (error) {
      console.error(`  Failed to update ${update.name}:`, error.message);
    }
  }
  
  console.log("Description updates complete!");
  process.exit(0);
}

updateDescriptions().catch((err) => {
  console.error("Update failed:", err);
  process.exit(1);
});
