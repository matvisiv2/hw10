const ItemTypes = {
  sales: "sales",
  burgers: "burgers",
  chicken: "chicken",
  desserts: "desserts",
  drinks: "drinks",
  sauces: "sauces",
}

// items
const items = {
  big_taisty: {
    title: "Біг Тейсті",
    ingredients: ["Сендвіч", "великий рублений біфштекс"],
    price: 80,
    like: false,
    discount: true,
    type: ItemTypes.burgers,
    count: 1,
  },
  rolly: {
    title: "Ролли",
    ingredients: ["Свіжі ролли, 3 штуки", "закручені зі смаком"],
    price: 110,
    like: false,
    discount: true,
    type: ItemTypes.burgers,
    count: 1,
  },
  big_mak_menu: {
    title: "Біг Мак меню",
    ingredients: ["Біг мак", "середня картопля", "кола"],
    price: 120,
    like: false,
    discount: true,
    type: ItemTypes.burgers,
    count: 1,
  },
  chiken_junior: {
    title: "Чікен Джуніор",
    ingredients: ["Куряча котлета", "хрусткий огірк", "соус"],
    price: 70,
    like: false,
    discount: false,
    type: ItemTypes.chicken,
    count: 1,
  },
  mak_chiken: {
    title: "МакЧікен",
    ingredients: ["Куряча котлета", "хрусткий огірк", "соус"],
    price: 70,
    like: false,
    discount: false,
    type: ItemTypes.chicken,
    count: 1,
  },
  chiken_roll: {
    title: "Чікен Рол",
    ingredients: ["Куряча котлета", "хрусткий огірк", "соус"],
    price: 70,
    like: false,
    discount: false,
    type: ItemTypes.chicken,
    count: 1,
  },
  chiken_mak_nagets_4: {
    title: "МакНагетс® 4шт",
    ingredients: ["Куряча котлета", "хрусткий огірк", "соус"],
    price: 70,
    like: false,
    discount: false,
    type: ItemTypes.chicken,
    count: 1,
  },
  chiken_mak_nagets_9: {
    title: "МакНагетс 9шт",
    ingredients: ["Куряча котлета", "хрусткий огірк", "соус"],
    price: 70,
    like: false,
    discount: false,
    type: ItemTypes.chicken,
    count: 1,
  },
  chiken_mak_nagets_20: {
    title: "МакНагетс 20 шт",
    ingredients: ["Куряча котлета", "хрусткий огірк", "соус"],
    price: 70,
    like: false,
    discount: true,
    type: ItemTypes.chicken,
    count: 1,
  },

  morozyvo_rizhok: {
    title: "Морозиво ріжок",
    ingredients: ["Молоко", "вода", "печиво"],
    price: 50,
    like: false,
    discount: false,
    type: ItemTypes.desserts,
    count: 1,
  },
  fanta_mala: {
    title: "Фанта® мала",
    ingredients: ["Фанта®"],
    price: 60,
    like: false,
    discount: false,
    type: ItemTypes.drinks,
    count: 1,
  },
  sous_khabanero: {
    title: "Соус Хабанеро",
    ingredients: ["Майонез", "спеції"],
    price: 30,
    like: false,
    discount: true,
    type: ItemTypes.sauces,
    count: 1,
  },
}

const delivery = 50;

let cart = [];

function like(item) {
  items[item].like = !items[item].like;
  [...document.getElementsByClassName(`${item}__like`)].forEach((el) => el.setAttribute("src", `images/svg/heart${items[item].like ? '-fill' : ''}.svg`));
}

function calcSummary() {
  let res = delivery;
  cart.forEach(name => res += items[name].price * items[name].count);
  const summaryNode = document.getElementById("#summary");
  summaryNode.innerHTML = res.toString();
}

function changeCount(d, item) {
  items[item].count += d;
  if (items[item].count > 0) {
    document.getElementById(`#${item}__count`).innerHTML = ` ${items[item].count} `;
    document.getElementById(`#${item}__amount`).innerHTML = `${items[item].count * items[item].price} ₴`;
  } else {
    document.getElementById(`#${item}__cart__box__item`).remove();
    items[item].count = 1;
    cart.splice(cart.indexOf(item), 1);
  }
  calcSummary();
}

function createHTMLItemInCartElement(item) {
  const cart__box__item = document.createElement("div");
  cart__box__item.setAttribute("class", "cart__box__item");
  cart__box__item.setAttribute("id", `#${item}__cart__box__item`);

  // div1
  const div1 = document.createElement("div");
  const cart__box__item__title = document.createElement("div");
  cart__box__item__title.setAttribute("class", "cart__box__item__title");
  cart__box__item__title.append(items[item].title);
  const cart__box__item__ingredients = document.createElement("ul");
  cart__box__item__ingredients.setAttribute("class", "cart__box__item__ingredients");
  items[item].ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.append(ingredient);
    cart__box__item__ingredients.append(li);
  })
  div1.append(cart__box__item__title, cart__box__item__ingredients);

  // div2
  const div2 = document.createElement("div");
  const plus__btn = document.createElement("button");
  plus__btn.append("+");
  plus__btn.setAttribute("class", "plus__btn");
  plus__btn.setAttribute("onclick", `changeCount(1,"${item}")`);
  const count = document.createElement("span");
  count.append(` ${items[item].count} `);
  count.setAttribute("class", "count");
  count.setAttribute("id", `#${item}__count`);
  const minus__btn = document.createElement("button");
  minus__btn.append("-");
  minus__btn.setAttribute("class", "minus__btn");
  minus__btn.setAttribute("onclick", `changeCount(-1,"${item}")`);

  div2.append(plus__btn, count, minus__btn);

  // amount
  const amount = document.createElement("div");
  amount.setAttribute("class", "amount");
  amount.setAttribute("id", `#${item}__amount`);
  amount.append(`${items[item].count * items[item].price} ₴`);

  // finish adding
  cart__box__item.append(div1, div2, amount);

  return cart__box__item;
}

function toCart(item) {
  if (cart.indexOf(item) < 0) {
    document.getElementById("#cart__box").append(createHTMLItemInCartElement(item));
    cart.push(item);
    calcSummary();
  }
}

function createHTMLItemElement(item) {
  const sales__box = document.createElement("div");
  sales__box.setAttribute("class", "sales__box");

  // image
  const sales__img = document.createElement("div");
  sales__img.setAttribute("class", "sales__img");
  const img = document.createElement("img");
  img.setAttribute("src", `images/${item}.png`);
  sales__img.append(img);

  // description
  const sales__description = document.createElement("div");
  sales__description.setAttribute("class", "sales__description");
  const sales__description__title = document.createElement("div");
  sales__description__title.setAttribute("class", "sales__description__title");
  sales__description__title.append(items[item].title);

  const sales__description__ingredients = document.createElement("div");
  sales__description__ingredients.setAttribute("class", "sales__description__ingredients");
  sales__description__ingredients.append(items[item].ingredients);

  const sales__description__footer = document.createElement("div");
  sales__description__footer.setAttribute("class", "sales__description__footer");

  const sales__description__price = document.createElement("div");
  sales__description__price.setAttribute("class", "sales__description__price");

  const sales__description__p = document.createElement("p");
  sales__description__p.setAttribute("class", "sales__description__p");
  sales__description__p.append(`${items[item].price} грн`);

  const sales__description__btn = document.createElement("button");
  sales__description__btn.setAttribute("class", "sales__description__btn");
  sales__description__btn.setAttribute("onclick", `toCart("${item}")`);
  sales__description__btn.append("В кошик");

  sales__description__price.append(sales__description__p, sales__description__btn);

  const sales__description__heart = document.createElement("div");
  sales__description__heart.setAttribute("class", "sales__description__heart");
  const heart = document.createElement("img");
  heart.setAttribute("src", `images/svg/heart${items[item].like ? '-fill' : ''}.svg`);
  heart.setAttribute("class", `${item}__like`);
  heart.setAttribute("id", `#${item}__like`);
  heart.setAttribute("onclick", `like("${item}");`);
  sales__description__heart.append(heart);

  sales__description__footer.append(sales__description__price, sales__description__heart);

  sales__description.append(sales__description__title, sales__description__ingredients, sales__description__footer);

  // finish adding
  sales__box.append(sales__img, sales__description);

  return sales__box;
}

function loadItems() {
  const sales__subcontainer = document.getElementById("#sales__subcontainer");
  const burgers__subcontainer = document.getElementById("#burgers__subcontainer");
  const chicken__subcontainer = document.getElementById("#chicken__subcontainer");
  const desserts__subcontainer = document.getElementById("#desserts__subcontainer");
  const drinks__subcontainer = document.getElementById("#drinks__subcontainer");
  const sauces__subcontainer = document.getElementById("#sauces__subcontainer");
  for (let item in items) {
    if (items[item].discount) sales__subcontainer.append(createHTMLItemElement(item));
    if (items[item].type === ItemTypes.burgers) burgers__subcontainer.append(createHTMLItemElement(item));
    if (items[item].type === ItemTypes.chicken) chicken__subcontainer.append(createHTMLItemElement(item));
    if (items[item].type === ItemTypes.desserts) desserts__subcontainer.append(createHTMLItemElement(item));
    if (items[item].type === ItemTypes.drinks) drinks__subcontainer.append(createHTMLItemElement(item));
    if (items[item].type === ItemTypes.sauces) sauces__subcontainer.append(createHTMLItemElement(item));
  }
}

function showOnly(className) {
  for (section in ItemTypes) {
    if (section === className || !className) {
      document.getElementById(`#${section}`).style.setProperty("display", "block");
    } else {
      document.getElementById(`#${section}`).style.setProperty("display", "none");
    }
  }
}