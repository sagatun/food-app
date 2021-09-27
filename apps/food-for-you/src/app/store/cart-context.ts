import React from "react";
import { Item } from "../interfaces/Item";

export interface CartContextInterface {
  items: Item[];
  totalAmount: number;
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
}

const CartContext = React.createContext<CartContextInterface>(
  {} as CartContextInterface
);

export default CartContext;
