const WEIGHTS = {
  rating: 2,
  stock: 5,
  budget: 30,
  brand: 20,
  battery: 15,
  camera: 15,
  gaming: 15,
  performance: 10,
  display: 10,
  storage: 10,
};

const rankProducts = (products, intent) => {
  return products
    .map((product) => {
      let score = 0;
      const reasons = [];

      const tags = (product.tags || []).map((tag) =>
        tag.toLowerCase()
      );

      // ⭐ Rating
      score += (product.rating || 0) * WEIGHTS.rating;
      reasons.push(`⭐ Rating: ${product.rating || 0}`);

      // 📦 Stock
      if (product.stock > 0) {
        score += WEIGHTS.stock;
        reasons.push("✅ In Stock");
      }

      // 💰 Budget Match
      if (
        intent.maxPrice &&
        product.price <= intent.maxPrice
      ) {
        score += WEIGHTS.budget;
        reasons.push("💰 Within Budget");
      }

      // 🏷️ Brand Match
      if (
        intent.brands?.length > 0 &&
        intent.brands.some(
          (brand) =>
            brand.toLowerCase() ===
            product.brand.toLowerCase()
        )
      ) {
        score += WEIGHTS.brand;
        reasons.push(`🏷️ Preferred Brand: ${product.brand}`);
      }

      // 🔋 Battery Preference
      if (
        intent.preferences?.battery &&
        tags.some((tag) => tag.includes("battery"))
      ) {
        score += WEIGHTS.battery;
        reasons.push("🔋 Good Battery");
      }

      // 📷 Camera Preference
      if (
        intent.preferences?.camera &&
        tags.some((tag) => tag.includes("camera"))
      ) {
        score += WEIGHTS.camera;
        reasons.push("📷 Good Camera");
      }

      // 🎮 Gaming Preference
      if (
        intent.preferences?.gaming &&
        tags.some((tag) => tag.includes("gaming"))
      ) {
        score += WEIGHTS.gaming;
        reasons.push("🎮 Gaming Friendly");
      }

      // ⚡ Performance Preference
      if (
        intent.preferences?.performance &&
        tags.some((tag) => tag.includes("performance"))
      ) {
        score += WEIGHTS.performance;
        reasons.push("⚡ High Performance");
      }

      // 🖥️ Display Preference
      if (
        intent.preferences?.display &&
        tags.some((tag) => tag.includes("display"))
      ) {
        score += WEIGHTS.display;
        reasons.push("🖥️ Great Display");
      }

      // 💾 Storage Preference
      if (
        intent.preferences?.storage &&
        tags.some((tag) => tag.includes("storage"))
      ) {
        score += WEIGHTS.storage;
        reasons.push("💾 Large Storage");
      }

      return {
        ...product.toObject(),
        score,
        reasons,
      };
    })
    .sort((a, b) => b.score - a.score);
};

module.exports = {
  rankProducts,
};