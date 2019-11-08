import React, { Component } from 'react';
import ItemModel from '../item/item.model';
import Item from '../item/item';
import api from '../api'

class Cart extends Component {
  state = {
      items: []
  }

  getAllItems() {
    api.getItems().then((response) => {
        this.setState({items: response});
    });
  }

  componentDidMount() {
    this.getAllItems();
  }

  getSpecificItem(id) {
      let item = this.state.items.reduce( (item, index) => {
        if(item.id==id) return item;
      });

      return item;
  }

  addSpecificItem(item) {
      api.addItem(item).then((response) => {
          if(response == "200 OK") this.getAllItems();
      });
  }

  deleteSpecificItem = (id) => {
      api.deleteItemById(id).then((response) => {
        if(response == "200 OK") this.getAllItems();
      });
  }

  render() {
    return (
      <div className="App-item">
          <form onSubmit={ (event) => {
              event.preventDefault()
              let name = document.getElementById("itemName").value;
              let price = document.getElementById("itemPrice").value;
              console.log(name, price)
              this.addSpecificItem(new ItemModel(name, price))}
          }>
              Item Name:<br/>
              <input id="itemName" type="text" name="itemname"/> <br/>
              Item Price:<br/>
              <input id="itemPrice" type="text" name="itemprice"/> <br/>
              <br/>
              <input type="submit" name="submitbutton" />
          </form>
          {this.state.items.map((item) => <Item key={item.id} item={item} onDelete={this.deleteSpecificItem}/>)}
      </div>
    )
  }
}

export default Cart;