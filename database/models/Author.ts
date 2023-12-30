import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

export const authorSchema = new Schema({
  id: ObjectId,
  fullname: String,
  email: String,
  mobile: String,
  address: String,
  gender: {type: String, enum: ['male', 'female']},
  createdAt: { type: Date, default: Date.now },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
})

// a setter
// schema.path('name').set(function(v: string) {
//   console.log('vvvvvv', v, v.slice(0).toUpperCase() + v.slice(1));
//   // return v.slice(0).toUpperCase() + v.slice(1);
//   return v;
// });

// middleware
authorSchema.pre('save', function(next) {
  // notify(this.get('email'));
  next();
});

export const Author = mongoose.model('Author', authorSchema);