export default class ItemModel {

  constructor(name = "", price = 0, onSale = false, id = Math.floor(Math.random() * 999999)) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.onSale = onSale;
  }
}