//remove items from the shopping basket//

let removeSbItemButtons = document.getElementsByClassName("remove");
console.log(removeSbItemButtons);

for (let i = 0; i < removeSbItemButtons.length; i++) {
  let button = removeSbItemButtons[i];
  button.addEventListener("click", removeSbItem);
}
console.log("clicked");

function removeSbItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateSbTotal();
}
//Update Shopping Basket Total//

function updateSbTotal() {
  let shoppingBasket = document.getElementsByClassName("basket")[0];
  let sbRows = shoppingBasket.getElementsByClassName("sb-row");
  let total = 0;
  for (let i = 0; i < sbRows.length; i++) {
    let sbRow = sbRows[i];
    let priceElement = sbRow.getElementsByClassName("sb-price")[0];
    let qtyElement = sbRow.getElementsByClassName("sb-qty-input")[0];

    console.log(priceElement, qtyElement);

    let price = parseFloat(priceElement.innerText.replace("£", ""));

    console.log(price);

    let quantity = qtyElement.value;
    console.log(price * quantity);
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText =
    "£" + total.toFixed(2);
  document.getElementsByClassName("things")[0].innerText = (
    total.toFixed(0) / 6.99
  ).toFixed(0);
}
//Change the quantity of each item and update the shopping basket//

let quantityInputs = document.getElementsByClassName("sb-qty-input");
for (let i = 0; i < quantityInputs.length; i++) {
  let input = quantityInputs[i];
  input.addEventListener("change", quantityChanged);
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateSbTotal();
}

//Add items to the shopping basket and update the shopping basket//

let addToSbButtons = document.getElementsByClassName("add");
for (let i = 0; i < addToSbButtons.length; i++) {
  let button = addToSbButtons[i];
  button.addEventListener("click", addToSbClicked);
}
updateSbTotal();

//Buy the items,clear the basket and leave a "thank you" message//

document
  .getElementsByClassName("purchase")[0]
  .addEventListener("click", purchaseClicked);

function purchaseClicked() {
  alert("THANK YOU. COME BACK SOON!");
  let basket = document.getElementsByClassName("basket")[0];
  while (basket.hasChildNodes()) {
    basket.removeChild(basket.firstChild);
  }
  updateSbTotal();
}
//Add items to the shopping basket and update the total//

function addToSbClicked(event) {
  let button = event.target;
  let basket = button.parentElement.parentElement;
  let imgSrc = basket.getElementsByClassName("sb-image")[0].src;
  let item = basket.getElementsByClassName("sb-itemFT")[0].innerText;
  let price = basket.getElementsByClassName("sb-price")[0].innerText;
  console.log(imgSrc, item, price);

  addItemToSb(imgSrc, item, price);

  updateSbTotal();
}
/*creates items in the shopping basket and lets you know 
if an item is already there, and update the basket*/

function addItemToSb(imgSrc, item, price) {
  let sbRow = document.createElement("div");
  sbRow.classList.add("sb-row");
  let sbItems = document.getElementsByClassName("basket")[0];
  let sbItemNames = sbItems.getElementsByClassName("sb-itemFT");
  for (let i = 0; i < sbItemNames.length; i++) {
    if (sbItemNames[i].innerText == item) {
      alert("This item is already in your shopping basket");
      return;
    }
    updateSbTotal();
  }
  /*creates an item in the shopping basket which can be removed or have it's
  quantity changed*/

  let sbContents = `
    <div class="sb-itemFT sb-column">
      <img
        class="sb-image1"
        src="${imgSrc}"
        width="100"
        height="100"
      />
      <div class="sb-itemFT">${item}
  </div>
    </div>
    <span class="sb-price sb-column">${price}</span>
    <div class="sb-qty sb-column">
      <input class="sb-qty-input" type="number" value="1" />
      <button class="remove"> - </button>
    </div>
  </div>
    `;
  sbRow.innerHTML = sbContents;
  sbItems.append(sbRow);

  sbRow
    .getElementsByClassName("remove")[0]
    .addEventListener("click", removeSbItem);
  sbRow
    .getElementsByClassName("sb-qty-input")[0]
    .addEventListener("change", quantityChanged);
}
