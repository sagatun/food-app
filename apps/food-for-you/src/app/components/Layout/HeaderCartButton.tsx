import { useContext } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import { Item } from "../../interfaces/Item";

interface HeaderCartButtonProps {
  onClick: () => void;
}

const HeaderCartButton: React.FC<HeaderCartButtonProps> = ({ onClick }) => {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce(
    (curNumber: number, item: Item) => {
      return curNumber + item.amount;
    },
    0
  );

  return (
    <button className={classes.button} onClick={onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
