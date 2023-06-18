"use strict";

let local = JSON.parse(localStorage.getItem("basket"));

if ((local === null) || (local.length === 0)) {
  document.querySelector(".page").classList.add("d-none");
  let alerts = "";
  alerts = `
    <div class="alert alert-danger text-center" role="alert">
    <i class="fa-solid fa-bag-shopping"></i> Basket Boşdur - <a href=${"../index.html"}>Alışverişə başla</a>
    </div>
    `;
  document.getElementById("alert").innerHTML = alerts;
} else {
  let data = "";
  let prod = document.querySelector(".product");
  function Display() {
    local.forEach((item) => {
      let count = item.count;
      data += `
            <div class="row align-items-center">
            <div class="col-md-3 m-3">
                <img class="img-fluid mx-auto d-block image" src="${
                  item.image
                }">
            </div>
            <div class="col-md-8">
                <div class="info">
                    <div class="row">
                        <div id=${
                          item.Id
                        } class="col-md-3 product-name d-flex align-items-center">
                            <div class="product-name">
                                <a href="#">${item.Name}</a>
                            </div>
                        </div>
                        <div class="col-md-3 quantity">
                            <input id="quantity" disabled type="number" value=${
                              item.count
                            }
                                class="form-control quantity-input">
                        </div>
                        <div class="col-md-3 price">
                            <span class='total-count'>${
                              item.price * count
                            } <span>AZN</span></span>
                        </div>
                        <div class="col-md-2">
                        <button class="btn btn-danger btn-sm remove" data-abc="true"> Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `;
    });
    prod.innerHTML = data;
  }
  Display();
}

let total = document.querySelector(".totals");
let price = document.querySelectorAll(".total-count");
let num;
let arr = [];
function Total() {
  price.forEach((item) => {
    arr.push(parseInt(item.innerHTML));
  });
}

Total();
let reduce = arr.reduce((a, b) => a + b);
total.innerHTML = reduce + " AZN";

let remove_all = document.querySelector(".rmv-all");
remove_all.addEventListener("click", () => {
  localStorage.removeItem("basket");
  location.reload();
});

function Remove() {
  let button = document.querySelectorAll(".remove");

  button.forEach((item) => {
    item.addEventListener("click", () => {
      let id = item.parentElement.parentElement.firstElementChild.id;
      let countCar = document.querySelector("#quantity");
      console.log(id);

      let filter = local.filter((i) => i.Id !== id);

      local.forEach((l) => {
        if (l.Id === id) {
          if (l.count > 1) {
            l.count--;
            window.location.reload();
            countCar.value = l.count;
            localStorage.setItem("basket", JSON.stringify(local));
          } else {
            localStorage.setItem("basket", JSON.stringify(filter));
            window.location.reload();
          }
        }
      });
    });
  });
}
Remove();
