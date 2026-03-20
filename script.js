// INIT
function init(){
showPage("home");
loadProducts();
showCart();
}

// NAVIGATION
function showPage(id){
document.querySelectorAll(".page").forEach(p=>p.style.display="none");
document.getElementById(id).style.display="block";
}

// PRODUCTS (Clothing Only)
const products=[
{id:1,name:"Classic White Shirt",price:1500,img:"images/Shirt.png"},
{id:2,name:"Denim Jacket",price:2500,img:"images/jacket.png"},
{id:3,name:"Hoodie",price:1800,img:"images/Hoodie.png"},
{id:4,name:"Floral Dress",price:2200,img:"images/Floral.png"},
{id:5,name:"Jeans",price:2000,img:"images/jeans.png"},
{id:6,name:"Ethnic Dress",price:1500,img:"images/Ethnic.png"}
];

// LOAD PRODUCTS
function loadProducts(){
let box=document.getElementById("productBox");
box.innerHTML="";

products.forEach(p=>{
box.innerHTML+=`
<div class="card">
<img src="${p.img}" onclick="openDetails(${p.id})">
<h3>${p.name}</h3>
<p>₹${p.price}</p>
</div>`;
});
}

// OPEN DETAILS
function openDetails(id){
localStorage.setItem("pid",id);
loadDetails();
showPage("details");
}

// LOAD DETAILS
function loadDetails(){
let id=localStorage.getItem("pid");
let p=products.find(x=>x.id==id);

document.getElementById("detailBox").innerHTML=`
<div class="card">
<img src="${p.img}" 
onmouseover="showPreview(this.src)" 
onmouseout="hidePreview()">
<h2>${p.name}</h2>
<h3>₹${p.price}</h3>
</div>`;
}

// IMAGE PREVIEW
function showPreview(src){
document.getElementById("previewImg").src=src;
document.getElementById("preview").classList.add("show");
}

function hidePreview(){
document.getElementById("preview").classList.remove("show");
}

// ADD TO CART
function addCart(){
let id=localStorage.getItem("pid");
let p=products.find(x=>x.id==id);
let qty=document.getElementById("qty").value;
let size=document.getElementById("size").value;

let cart=JSON.parse(localStorage.getItem("cart"))||[];

cart.push({
name:p.name,
price:p.price,
qty:Number(qty),
size:size
});

localStorage.setItem("cart",JSON.stringify(cart));
showCart();

alert("Added to Cart 🛒");
}

// BUY NOW
function buyNow(){
showPage("thanks");
}

// SHOW CART
function showCart(){
let data=JSON.parse(localStorage.getItem("cart"))||[];
let box=document.getElementById("cartItems");

if(!box) return;

box.innerHTML="";
let total=0;

data.forEach((item,i)=>{
total+=item.price*item.qty;

box.innerHTML+=`
<div class="card">
<h3>${item.name}</h3>
<p>Size: ${item.size}</p>
<p>Qty: ${item.qty}</p>
<p>₹${item.price*item.qty}</p>
<button onclick="removeItem(${i})">Remove</button>
</div>`;
});

document.getElementById("total").innerText="Total ₹"+total;
}

// REMOVE ITEM
function removeItem(i){
let cart=JSON.parse(localStorage.getItem("cart"));
cart.splice(i,1);
localStorage.setItem("cart",JSON.stringify(cart));
showCart();
}

// SEARCH
function searchProduct(){
let val=document.getElementById("search").value.toLowerCase();
let cards=document.querySelectorAll(".card");

cards.forEach(c=>{
c.style.display=c.innerText.toLowerCase().includes(val)
?"block":"none";
});
}