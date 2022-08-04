const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongoose_delete = require("mongoose-delete");

const Schema = mongoose.Schema;

const Course = new Schema(
  {
    name: { type: String, maxLength: 255, required: true },
    description: { type: String, maxLength: 600 },
    images: { type: String, maxLength: 255 },
    slug: { type: String, maxLength: 255 },
    videoId: { type: String, maxLength: 255 },
    level: { type: String, maxLength: 255 },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
);
//ADD plugin
mongoose.plugin(slug);
Course.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: "all",
});
module.exports = mongoose.model("Course", Course);
