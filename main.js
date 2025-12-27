console.log("JS LOADED");
let products = [
  {
    id: 1,
    name: "Lakme Lipstick – Light Shade",
    price: 499,
    category: "makeup",
    image: "images/lipstick/lakme_light.png"
  },
  {
    id: 2,
    name: "Elle 18 Lipstick – Nude",
    price: 299,
    category: "makeup",
    image: "images/lipstick/elle.png"
  },
  {
    id: 3,
    name: "Sugar Lipstick – Dark",
    price: 499,
    category: "makeup",
    image: "images/lipstick/sugar_dark.png"
  },
  {
    id: 4,
    name: "Swiss Beauty Lipstick – Dark",
    price: 399,
    category: "makeup",
    image: "images/lipstick/swissbeauty_dark.png"
  },
  {
  id: 5,
  name: "Faces Canada Nude Lipstick",
  price: 449,
  category: "makeup",
  image: "images/lipstick/facescanada_nude.png"
},
{
  id: 6,
  name: "Mars Light Lipstick",
  price: 299,
  category: "makeup",
  image: "images/lipstick/mars_lipstick_light.png"
},
{
  id: 7,
  name: "Dot & Key Face Cream",
  price: 599,
  category: "skin",
  image: "images/skincare/dot_key.png"
},
{
    id: 8,
    name: "Garnier Face Wash",
    price: 349,
    category: "skin",
    image: "images/skincare/garnier.png"
},
{
    id: 9,
    name: "Lakme Moisturizer",
    price: 499,
    category: "skin",
    image: "images/skincare/lakme.png"
},
{
    id: 10,
    name: "Vilvah Skincare Cream",
    price: 699,
    category: "skin",
    image: "images/skincare/vilvah.png"
},
{
    id: 11,
    name: "Alps Hair Oil",
    price: 299,
    category: "hair",
    image: "images/haircare/alps.png"
},
{
    id: 12,
    name: "Ikonic Hair Straightener",
    price: 1899,
    category: "hair",
    image: "images/haircare/ikonic.png"
  },
  {
    id: 13,
    name: "Protouch Hair Dryer",
    price: 1499,
    category: "hair",
    image: "images/haircare/protouch.png"
  },
  {
    id: 14,
    name: "Tresemme Shampoo",
    price: 699,
    category: "hair",
    image: "images/haircare/tresemme.png"
  },
  {
    id: 15,
    name: "Women Green Shirt",
    price: 1299,
    category: "clothes",
    image: "images/clothes/womenshirt.png"
  },
  {
    id: 16,
    name: "Short Kurti",
    price: 999,
    category: "clothes",
    image: "images/clothes/shortkurti.png"
  },
  {
    id: 17,
    name: "Casual T-Shirt",
    price: 699,
    category: "clothes",
    image: "images/clothes/shirts.png"
  },
  {
  id: 18,
  name: "Printed Shirts",
  price: 899,
  category: "clothes",
  image: "images/clothes/printedshirts.png"
}
];
function renderCategory(title, category, containerId) {
  const container = document.getElementById(containerId);
  const items = products.filter(p => p.category === category);
  let html = `<h2 class="category-title">${title}</h2><div class="products">`;
  items.forEach(p => {
    html += `
      <div class="card slide-in">
        <img src="${p.image}" class="product-img">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <div class="btn-group">
          <button class="cart-btn" onclick="addToCart(${p.id})">
            Add to Cart
          </button>
          <button class="wish-btn" onclick="addToWishlist(${p.id})">
            ❤️ Wishlist
          </button>
        </div>
      </div>
    `;
  });
  html += `</div>`;
  container.innerHTML = html;
}
renderCategory("💄 Makeup Products", "makeup", "makeupSection");
renderCategory("🧴 Skincare Essentials", "skin", "skinSection");
renderCategory("💇 Haircare Products", "hair", "hairSection");
renderCategory("👗 Fashion & Clothes", "clothes", "clothesSection");
let cart = [];
let wishlist = [];
function displayProducts(list) {
  const productDiv = document.getElementById("products");
  productDiv.innerHTML = "";
  list.forEach(p => {
    productDiv.innerHTML += `
      <div class="card">
        <img src="${p.image}" alt="${p.name}" class="product-img">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <div class="btn-group">
          <button class="cart-btn" onclick="addToCart(${p.id})">
            Add to Cart
          </button>
          <button class="wish-btn" onclick="addToWishlist(${p.id})">
            ❤️ Wishlist
          </button>
        </div>
      </div>
    `;
  });
}
displayProducts()
function filterProducts(category) {
  if (category === "all") {
    displayProducts(products);
  } else {
    const filtered = products.filter(p => p.category === category);
    displayProducts(filtered);
  }
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}
function addToCart(id) {
  let item = cart.find(i => i.id === id);
  if (item) item.qty++;
  else cart.push({...products.find(p=>p.id===id), qty:1});
  updateCart();
}
function updateCart() {
  let cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(i => {
    total += i.price * i.qty;
    cartItems.innerHTML += `
      <p>${i.name} x ${i.qty}
      <button onclick="changeQty(${i.id},1)">+</button>
      <button onclick="changeQty(${i.id},-1)">-</button></p>`;
  });
  document.getElementById("totalPrice").innerText = total;
  document.getElementById("cartCount").innerText = cart.length;
}
function changeQty(id,val) {
  let item = cart.find(i=>i.id===id);
  item.qty += val;
  if (item.qty <= 0) cart = cart.filter(i=>i.id!==id);
  updateCart();
}

function openCart() {
  document.getElementById("cartModal").style.display="block";
}
function closeCart() {
  document.getElementById("cartModal").style.display="none";
}
function checkout() {
  document.getElementById("checkoutModal").style.display="block";
}
function placeOrder(e) {
  e.preventDefault();
  alert("Order Placed Successfully!");
  localStorage.setItem("orders", JSON.stringify(cart));
  cart=[];
  updateCart();
  document.getElementById("checkoutModal").style.display="none";
}
function addToWishlist(id) {
  const item = products.find(p => p.id === id);
  if (!wishlist.find(w => w.id === id)) {
    wishlist.push(item);
    alert("Added to Wishlist ❤️");
  } else {
    alert("Already in Wishlist");
  }
}
function openWishlist() {
  let w = document.getElementById("wishlistItems");
  w.innerHTML="";
  wishlist.forEach(i=> w.innerHTML += `<p>${i.name}</p>`);
  document.getElementById("wishlistModal").style.display="block";
}

function closeWishlist() {
  document.getElementById("wishlistModal").style.display="none";
}

function showLogin() {
  document.getElementById("loginModal").style.display="block";
}

function login() {
  alert("Login Successful");
  document.getElementById("loginModal").style.display="none";
}
let slides = document.querySelectorAll(".slide");
let index = 0;
setInterval(()=>{
  slides.forEach(s=>s.classList.remove("active"));
  slides[index].classList.add("active");
  index = (index+1)%slides.length;
},3000);
function searchProducts() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();

  if (keyword === "") {
    document.getElementById("products").innerHTML = "";
    return;
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(keyword)
  );

  displayProducts(filteredProducts);

  document.getElementById("products").scrollIntoView({
    behavior: "smooth"
  });
}


