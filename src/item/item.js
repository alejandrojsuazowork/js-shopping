import React, { Component } from 'react';

class Item extends Component {
  render() {
    const item = this.props.item;

    return (
      <tr>
        <td>{item.name}</td>
        <td>${item.price.toFixed(2)} {item.onSale ? '(SALE!)' : ''}</td>
        <td>
          <a href="#" className="deleteItem" onClick={() => {this.props.onDelete(item.id)} }>Delete</a>
        </td>
      </tr>
    )
  }
}

export default Item;