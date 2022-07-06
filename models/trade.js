const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const tradeSchema = new Schema(
  {
    position: {
      required: true,
      type: String,
      enum: ["Short", "Long"],
      default: "Long",
    },
    stat: {
      type: String,
      required: true,
      enum: ["Opened", "Closed"],
      default: "Opened",
    },
    pair: {
      type: String,
      required: true,
    },
    openDate: {
      required: true,
      type: Date,
      default: Date.now(),
    },
    openPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    closeDate: {
      type: Date,
      default: null,
    },
    closePrice: {
      type: Number,
      default: 0,
    },
    fees: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
    ind: [{ type: Schema.Types.ObjectId, ref: "Indicator" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trade", tradeSchema);
