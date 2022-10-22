import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const Cart = (props) => {
  const cartItems = useSelector(state => state.cart.items)
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 && <p className={classes.empty}>You have no item in your cart, kindly add and check again</p>}
      <ul>
        {cartItems.map((item) => {
          return (
            <CartItem
              key={item.id}
              item={{ title: item.title, quantity: item.quantity, total: item.totalPrice, price: item.price, id: item.id }}
            />
          )
        })
        }
      </ul>
    </Card>
  );
};

export default Cart;
