import React, { Component } from 'react';
import ItemModel from '../item/item.model';
import Item from '../item/item';
import api from '../api'

class Cart extends Component {
  constructor()  {
    super();
  }

  state = {
      items: []
  }

  // ...args is optional and
  getAllItems() {
    api.getItems().then((response) => {
        console.log(response)
        this.setState({items: response});
    });
  }

  componentDidMount() {
    this.getAllItems();
  }

  getSpecificItem(id) {
      console.log(this.state.items);
      let item = this.state.items.reduce( (item, index) => {
        if(item.id==id) return item;
      });

      return item;
  }

  deleteSpecificItem = (id) => {

    api.deleteItemById(id).then((response) => {
      if(response == "200 OK")
        this.getAllItems();
    });
  }

  render() {
    console.log(this.state.items);
    return (
      <div className="App-item">
          {this.state.items.map((item) => <Item key={item.id} item={item} onDelete={this.deleteSpecificItem}/>)}
      </div>
    )
  }
}

export default Cart;