import { useReducer } from "react";
import CartContext, { CartContextInterface } from "./cart-context";
import { Item } from "../interfaces/Item";

type State = { items: Item[]; totalAmount: number };

enum ActionKind {
  Add = "ADD",
  Remove = "REMOVE",
}

interface Action {
  type: ActionKind;
  item?: Item;
  id?: string;
}

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
      const updatedTotalAmount = state.totalAmount + item.price * item.amount;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === item?.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems: Item[] = [{ id: "", name: "", amount: -1, price: -1 }];

      if (existingCartItem && item) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else if (item) {
        updatedItems = state.items.concat(item);
      }

      return { items: updatedItems, totalAmount: updatedTotalAmount };
    }

    case ActionKind.Remove: {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === id
      );
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;

      if (existingItem.amount === 1 && item) {
        updatedItems = state.items.filter((item) => item.id !== id);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      return { items: updatedItems, totalAmount: updatedTotalAmount };
    }

    default:
      return defaultCartState;
  }
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
