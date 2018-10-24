// requiring Mongoose
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Create schema object
var PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    }, 
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;