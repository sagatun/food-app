import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { MouseEventHandler, SyntheticEvent, useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import { Item } from "../../interfaces/Item";

interface CartProps {
  onClose: () => void;
}

const Cart: React.FC<CartProps> = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id: string) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item: Item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <li>
          {
            <CartItem
              key={item.id}
              price={item.price}
              name={item.name}
              amount={item.amount}
              onRemove={() => cartItemRemoveHandler(item.id)}
              onAdd={() => cartItemAddHandler(item)}
            />
          }
        </li>
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
