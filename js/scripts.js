"use strict";

let products = [
  {
    id: 1,
    img: "../assets/img/niva.jpg",
    name: "LADA (VAZ) Niva",
    price: 18300,
    count: 1,
  },
  {
    id: 2,
    img: "../assets/img/cadillac.jpg",
    name: "Cadillac Escalade",
    price: 64430,
    count: 1,
  },
  {
    id: 3,
    img: "../assets/img/m21.jpg",
    name: "GAZ M-21",
    price: 23900,
    count: 1,
  },
  {
    id: 4,
    img: "../assets/img/modelY.jpg",
    name: "Tesla Model Y",
    price: 79730,
    count: 1,
  },
  {
    id: 5,
    img: "../assets/img/bmw7.jpg",
    name: "BMW 750",
    price: 32130,
    count: 1,
  },
  {
    id: 6,
    img: "../assets/img/bmw5.jpg",
    name: "BMW 520",
    price: 74630,
    count: 1,
  },
  {
    id: 7,
    img: "../assets/img/range.jpg",
    name: "Range Rover",
    price: 142630,
    count: 1,
  },
  {
    id: 8,
    img: "../assets/img/x7.jpg",
    name: "BMW X7",
    price: 140930,
    count: 1,
  },
];

let all = document.querySelector(".all");

let main = "";
products.forEach((item) => {
  main += `
    <div class="col mb-5 main">
    <div class="card h-100" id=${item.id}>
    <img class="card-img-top img" src=${item.img} alt="..." />
    <div class="card-body p-4">
    <div class="text-center">
    <h5 class="fw-bolder name">${item.name}</h5>
    <span class="price">${item.price} </span> <span>AZN</span>
    </div>
    </div>
    <!-- Product actions-->
    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
    <div class="text-center"><button class="btn btn-outline-dark mt-auto add">Add to Cart</button>
    </div>
    </div>
    </div>
    </div>
    `;
});

all.innerHTML = main;

let prodData = [];

document.addEventListener("DOMContentLoaded", GetLocal);
let add = document.querySelectorAll(".add");

let data;

add.forEach((btn) => {
  btn.addEventListener("click", () => {
    let img =
      btn.parentElement.parentElement.parentElement.firstElementChild.src;
    let name =
      btn.parentElement.parentElement.parentElement.firstElementChild
        .nextSibling.nextSibling.firstElementChild.firstElementChild.innerHTML;
    let price =
      btn.parentElement.parentElement.parentElement.firstElementChild
        .nextSibling.nextSibling.firstElementChild.firstElementChild.nextSibling
        .nextSibling.innerHTML;
    let id = btn.parentElement.parentElement.parentElement.id;

    data = {
        image: img,
        Name: name,
        price: price,
        Id: id,
        count : 1
    };
    
    let find = prodData.find((x) => x.Id === id);
    if (find === undefined) {
        prodData.push(data);
    } else {
        find.count += 1;
    }
    
    AddLocal();
    GetLocal();
    console.log(prodData);
  });
});

function AddLocal() {
  localStorage.setItem("basket", JSON.stringify(prodData));
}

function GetLocal() {
  if (JSON.parse(localStorage.getItem("basket")) !== null) {
    let count = document.querySelector(".count");
    let local = JSON.parse(localStorage.getItem("basket"));
    prodData = local;
    count.innerHTML = prodData.length;
  } else {
    prodData = [];
  }
}
