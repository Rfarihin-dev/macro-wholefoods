/* Sample data. In Phase 4 this comes from MySQL via PHP. SIZES/PRICES marked * are placeholders. */
const SHOP = {
  name: 'Macro Wholefoods',
  phone: '+60 6-231 1325', tel: '+6062311325',
  whatsapp: '60179438328',
  hours: '8:30am – 6:30pm',
  address: '659E & 659E-1, Jalan Delima, Taman Bukit Melaka, Bukit Beruang, 75450 Melaka',
  shopee: 'https://shopee.com.my/macrowholefoods',
  email: 'macroorganiclife33@gmail.com', // from the Facebook page: client must confirm it is monitored
  mapQuery: '659E Jalan Delima, Taman Bukit Melaka, Bukit Beruang, 75450 Melaka, Malaysia'
};
const DELIVERY_FEE = 5.00; // flat "Shopee standard" rate

const PRODUCTS = [
  {id:1, name:"Rainbows Sprouted Cookies The Original / Seed / Black Sesame (150g)", cat:"Plant-Based Protein", img:"assets/img/products/images/Rainbows Sprouted Cookies The Original  -  Seed  -  Black Sesame (150g).jpg", price:12, size:"150g"},
  {id:2, name:"Macro Wholefoods Qi Black Energy (600g)", cat:"Health & Beauty Drinks", img:"assets/img/products/images/Macro Wholefoods Qi Black Energy (600g).jpg", price:89, size:"600g"},
  {id:3, name:"Macro Wholefoods Australia Organic Rolled Oat (500g)", cat:"Grain & Seed Drinks", img:"assets/img/products/images/Macro Wholefoods Australia Organic Rolled Oat (500g).jpg", price:9.9, size:"500g"},
  {id:4, name:"Macro Wholefoods Premium Red Rice Powder (400g)", cat:"Grain & Seed Drinks", img:"assets/img/products/images/Macro Wholefoods Premium Red Rice Powder (400g).jpg", price:42.9, size:"400g"},
  {id:5, name:"Macro Wholefoods Organic Black Soy Milk (500g)", cat:"Grain & Seed Drinks", img:"assets/img/products/images/Macro Wholefoods Organic Black Soy Milk (500g).jpg", price:53.9, size:"500g"},
  {id:6, name:"Macro Wholefoods NutriMill Organic Millet Chocolate Drink Powder (650g)", cat:"Grain & Seed Drinks", img:"assets/img/products/images/Macro Wholefoods NutriMill Organic Millet Chocolate Drink Powder (650g).jpg", price:75, size:"650g"},
  {id:7, name:"Macro Wholefoods Organic Rice Bean (500g)", cat:"Plant-Based Protein", img:"assets/img/products/images/Macro Wholefoods Organic Rice Bean (500g).jpg", price:10.7, size:"500g"},
  {id:8, name:"Macro Wholefoods Organic Rye Flakes Instant (500g)", cat:"Grain & Seed Drinks", img:"assets/img/products/images/Macro Wholefoods Organic Rye Flakes Instant (500g).jpg", price:9.9, size:"500g"},
  {id:9, name:"Macro Wholefoods Organic Black Soy Bean (500g)", cat:"Plant-Based Protein", img:"assets/img/products/images/Macro Wholefoods Organic Black Soy Bean (500g).jpg", price:9.3, size:"500g"},
  {id:10, name:"Macro Wholefoods Organic Chia Seed (200g)", cat:"Plant-Based Protein", img:"assets/img/products/images/Macro Wholefoods Organic Chia Seed (200g).jpg", price:18.9, size:"200g"},
  {id:11, name:"Gullon Mini Fish Biscuit (350g)", cat:"Plant-Based Protein", img:"assets/img/products/images/Gullon Mini Fish Biscuit (350g).jpg", price:10.5, size:"350g"},
  {id:12, name:"Macro Wholefoods Organic Red Yeast Rice & Beetroot Full Grains Milk (650g)", cat:"Health & Beauty Drinks", img:"assets/img/products/images/Macro Wholefoods Organic Red Yeast Rice & Beetroot Full Grains Milk (650g).jpg", price:66, size:"650g"},
  {id:13, name:"Macro Wholefoods Organic Hulled Buckwheat (500g)", cat:"Grain & Seed Drinks", img:"assets/img/products/images/Macro Wholefoods Organic Hulled Buckwheat (500g).jpg", price:9.5, size:"500g"},
  {id:14, name:"GBT Quinoa Wheat Fiber Cracker (110g)", cat:"Plant-Based Protein", img:"assets/img/products/images/GBT Quinoa Wheat Fiber Cracker (110g).jpg", price:10.9, size:"110g"},
  {id:15, name:"Lino Sacha Inchi Oil Extra Virgin Cold Pressed (250ml)", cat:"Health & Beauty Drinks", img:"assets/img/products/images/Lino Sacha Inchi Oil Extra Virgin Cold Pressed (250ml).jpg", price:150, size:"250ml"},
  {id:16, name:"Macro Wholefoods Organic Black Sesame Seed (200g)", cat:"Plant-Based Protein", img:"assets/img/products/images/Macro Wholefoods Organic Black Sesame Seed (200g).jpg", price:9.5, size:"200g"},
  {id:17, name:"Macro Wholefoods 7 Days Super Berries Essence Blend Powder (600g)", cat:"Health & Beauty Drinks", img:"assets/img/products/images/Macro Wholefoods 7 Days Super Berries Essence Blend Powder (600g).jpg", price:139, size:"600g"},
  {id:18, name:"Macro Wholefoods Organic Hulled Millet (500g)", cat:"Grain & Seed Drinks", img:"assets/img/products/images/Macro Wholefoods Organic Hulled Millet (500g).jpg", price:8.9, size:"500g"},
  {id:19, name:"Macro Wholefoods Organic Super Oat 123 (450g)", cat:"Grain & Seed Drinks", img:"assets/img/products/images/Macro Wholefoods Organic Super Oat 123 (450g).jpg", price:54.9, size:"450g"},
  {id:20, name:"GBT Oat Germ Organic Almond & Coconut Cookies (180g)", cat:"Plant-Based Protein", img:"assets/img/products/images/GBT Oat Germ Organic Almond & Coconut Cookies (180g).jpg", price:9.9, size:"180g"},
  {id:21, name:"Macro Wholefoods Avocado Nutri Drink Powder (600g)", cat:"Health & Beauty Drinks", img:"assets/img/products/images/Macro Wholefoods Avocado Nutri Drink Powder (600g).jpg", price:99, size:"600g"},
  {id:22, name:"Olitalia Extra Virgin Olive Oil (250ml/1L)", cat:"Health & Beauty Drinks", img:"assets/img/products/images/Olitalia Extra Virgin Olive Oil (250ml - 1L).jpg", price:88, size:"250ml / 1L"},
  {id:23, name:"Clearspring Organic Avocado Oil (250ml)", cat:"Health & Beauty Drinks", img:"assets/img/products/images/Clearspring Organic Avocado Oil (250ml).jpg", price:61.9, size:"250ml"},
  {id:24, name:"Macro Wholefoods Australia Organic Instant Baby Oat (500g)", cat:"Grain & Seed Drinks", img:"assets/img/products/images/Macro Wholefoods Australia Organic Instant Baby Oat (500g).jpg", price:9.6, size:"500g"},
  {id:25, name:"Macro Wholefoods Ever 18 Natural Anti-aging Beauty Drink (650g)", cat:"Health & Beauty Drinks", img:"assets/img/products/images/Macro Wholefoods Ever 18 Natural Anti-aging Beauty Drink (650g).jpg", price:99, size:"650g"},
  {id:26, name:"Macro Wholefoods Organic Raw Pumpkin Seed (200g)", cat:"Plant-Based Protein", img:"assets/img/products/images/Macro Wholefoods Organic Raw Pumpkin Seed (200g).jpg", price:10.9, size:"200g"},
  {id:27, name:"Macro Wholefoods Organic Soy Milk (650g)", cat:"Grain & Seed Drinks", img:"assets/img/products/images/Macro Wholefoods Organic Soy Milk (650g).jpg", price:56, size:"650g"},
  {id:28, name:"Macro Wholefoods Plant Based Protein Powder (650g)", cat:"Plant-Based Protein", img:"assets/img/products/images/Macro Wholefoods Plant Based Protein Powder (650g).jpg", price:99, size:"650g"},
  {id:29, name:"Macro Wholefoods Organic Full Grain Milk (650g)", cat:"Grain & Seed Drinks", img:"assets/img/products/images/Macro Wholefoods Organic Full Grain Milk (650g).jpg", price:66, size:"650g"},
  {id:30, name:"Macro Wholefoods Organic Garbanzo Bean (500g)", cat:"Plant-Based Protein", img:"assets/img/products/images/Macro Wholefoods Organic Garbanzo Bean (500g).jpg", price:14.5, size:"500g"},
  {id:32, name:"Macro Wholefoods Organic Barley Flakes (500g)", cat:"Grain & Seed Drinks", img:"assets/img/products/images/Macro Wholefoods Organic Barley Flakes (500g).jpg", price:8.9, size:"500g"},
  {id:33, name:"Bragg Organic Apple Cider Vinegar (473ml/946ml)", cat:"Health & Beauty Drinks", img:"assets/img/products/images/Bragg Organic Apple Cider Vinegar (473ml - 946ml).jpg", price:22.9, size:"473ml / 946ml"}
].map(({price, size, ...product}) => ({
  ...product,
  desc: "Product details were not included in the supplied catalog.",
  sizes: [{label: size, price, stock: 99}]
}));
