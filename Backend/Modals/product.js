

let images = [];
if (req.files && req.files.length > 0) {
  // Map each file to just its relative path instead of capturing req.protocol / localhost
  images = req.files.map(file => `/uploads/${file.filename}`);
}


const newProduct = new Product({
  name: req.body.name,
  price: req.body.price,
  discountPrice: req.body.discountPrice || null,
  stock: req.body.stock,
  category: req.body.category,
  description: req.body.description,
  images: images // Stores ['/uploads/filename.jpg'] relative path
});

await newProduct.save();