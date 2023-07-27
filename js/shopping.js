const items = {
  big_taisty: 80,
  rolly: 110,
  big_mak_menu: 120,
}
const delivery = 50;
let cart = ['big_mak_menu'];

function plusOne(name) {
  const countNode = document.getElementById("#count");
  const amountNode = document.getElementById("#amount");
  const count = parseInt(countNode.innerHTML) + 1;
  const amount = count * items[name];
  cart.push(name);
  countNode.innerHTML = count.toString();
  amountNode.innerHTML = amount.toString();
  calcSummary();
}

function minusOne(name) {
  const countNode = document.getElementById("#count");
  const count = parseInt(countNode.innerHTML) - 1;
  if (count > 0) {
    const index = cart.findIndex(i => i == name);
    cart.splice(index, 1);
    const amountNode = document.getElementById("#amount");
    const amount = count * items[name];
    countNode.innerHTML = count.toString();
    amountNode.innerHTML = amount.toString();
    calcSummary();
  }
}

function calcSummary() {
  let res = delivery;
  cart.forEach(name => res += items[name]);
  const summaryNode = document.getElementById("#summary");
  summaryNode.innerHTML = res.toString();
}