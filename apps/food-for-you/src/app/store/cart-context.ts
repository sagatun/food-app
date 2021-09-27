import React from "react";

interface Item {
  id: string;
  name: string;
  amount: number;
  price: number;
}

export interface CartContextInterface {
  items: Item[];
  totalAmount: number;
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
}

const CartContext = React.createContext<CartContextInterface>({
  items: [],
  totalAmount: 0,
  addItem: (item) => {
    //do something
  },
  removeItem: (id) => {
    //do somtething
  },
});

export default CartContext;
