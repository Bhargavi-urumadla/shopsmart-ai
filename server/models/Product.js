const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      
    },

    productType: {
      type: String,
      required: true,
      trim: true,
     
    },

    brand: {
      type: String,
      default: "",
      trim: true,
    
    },

    price: {
      type: Number,
      required: true,
      min: 0,
      
    },

    image: {
      type: String,
      default: "",
      trim: true,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
      
    },

    numReviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
     
    },

   isActive: {
  type: Boolean,
  default: true,
},
    battery: {
      type: String,
      default: "",
      trim: true,
    },

    camera: {
      type: String,
      default: "",
      trim: true,
    },

    display: {
      type: String,
      default: "",
      trim: true,
    },

    processor: {
      type: String,
      default: "",
      trim: true,
    },

    ram: {
      type: String,
      default: "",
      trim: true,
    },

    storage: {
      type: String,
      default: "",
      trim: true,
    },

    color: {
      type: String,
      default: "",
      trim: true,
    },

    weight: {
      type: String,
      default: "",
      trim: true,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);


// =========================
// Full Text Search Index
// =========================
productSchema.index({
  name: "text",
  description: "text",
  brand: "text",
  tags: "text",
});

// =========================
// Performance Indexes
// =========================
productSchema.index({ category: 1 });
productSchema.index({ productType: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Product", productSchema);