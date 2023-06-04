var totalAmount = document.getElementById("total-amount");
var userAmount = document.getElementById("user-amount");
var checkAmountButton = document.getElementById("check-amount");
var totalAmountButton = document.getElementById("total-amount-button");
var productTitle = document.getElementById("product-title");
var errorMessage = document.getElementById("budget-error");
var productTitleError = document.getElementById("product-title-error");
var productCostError = document.getElementById("product-cost-error");
var amount = document.getElementById("amount");
var expenditureValue = document.getElementById("expenditure-value");
var balanceValue = document.getElementById("balance-amount");
var list = document.getElementById("list");
var tempAmount = 0;

totalAmountButton.addEventListener("click", () => {
  tempAmount = totalAmount.value;
  if (tempAmount === "" || tempAmount < 0) {
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");
    amount.innerHTML = tempAmount;
    balanceValue.innerText = tempAmount - expenditureValue.innerText;
    totalAmount.value = "";
  }
});
const disableButtons = (bool) => {
  var editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};
var modifyElement = (element, edit = false) => {
  var parentDiv = element.parentElement;
  var currentBalance = balanceValue.innerText;
  var currentExpense = expenditureValue.innerText;
  var parentAmount = parentDiv.querySelector(".amount").innerText;
  if (edit) {
    var parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    disableButtons(true);
  }
  balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  expenditureValue.innerText =
    parseInt(currentExpense) - parseInt(parentAmount);
  parentDiv.remove();
}
var listCreator = (expenseName, expenseValue) => {
  var sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  list.appendChild(sublistContent);
  sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
  var editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
  });
  var deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  document.getElementById("list").appendChild(sublistContent);
};
checkAmountButton.addEventListener("click", () => {
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return false;
  }
  disableButtons(false);
  var expenditure = parseInt(userAmount.value);
  var sum = parseInt(expenditureValue.innerText) + expenditure;
  expenditureValue.innerText = sum;
  var totalBalance = tempAmount - sum;
  balanceValue.innerText = totalBalance;
  listCreator(productTitle.value, userAmount.value);
  productTitle.value = "";
  userAmount.value = "";
});