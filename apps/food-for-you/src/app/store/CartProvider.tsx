import { useReducer } from "react";
import CartContext, { CartContextInterface } from "./cart-context";
import { Item } from "../interfaces/Item";

type State = { items: Item[]; totalAmount: number };

enum ActionKind {
  Add = "ADD",
  Remove = "REMOVE",
}

type Action = {
  type: ActionKind;
  item?: Item;
  id?: string;
};

const defaultCartState: { items: Item[]; totalAmount: number } = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state: State, action: Action) => {
  const {
    type,
    item = { id: "", name: "", amount: -1, price: -1 },
    id,
  } = action;
  switch (type) {
    case ActionKind.Add: {
      const updatedItems = state.items.concat(item);
      const updatedTotalAmount = state.totalAmount + item.price * item.amount;
      return { items: updatedItems, totalAmount: updatedTotalAmount };
    }

    case ActionKind.Remove:
      console.log(id);
      break;
    default:
      return defaultCartState;
  }
  return defaultCartState;
};

const CartProvider: React.FC = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item: Item) => {
    dispatchCartAction({ type: ActionKind.Add, item: item });
  };

  const removeItemFromCartHandler = (id: string) => {
    dispatchCartAction({ type: ActionKind.Remove, id: id });
  };

  const cartContext: CartContextInterface = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
