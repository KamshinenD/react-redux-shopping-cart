import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Notification from './components/Notification/Notification';
import Products from './components/Shop/Products';
import { fetchCartData } from './store/cart-fetch-actions';
import { uiActions } from './store/ui-slice';

let isInitial = true;

function App() {
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state=> state.cart)
  const dispatch = useDispatch();
  const notification = useSelector((state)=> state.ui.notification);


  useEffect(()=>{
    dispatch(fetchCartData())
  }, [dispatch])

  useEffect(()=>{
    if (cart.changed) {

      const sendCartData= async ()=> {
        dispatch(uiActions.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data',
        }));
  
      const response = await fetch('https://first-react-project-movies-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart),
      });
  
      if (!response.ok){
        throw new Error('Sending cart data failed')
      }
      // const responseData = await response.json();
      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Success...',
        message: 'Sent cart data succesfully',
      }));
    }
  
    if(isInitial) {
     isInitial = false;
     return 
    }
  
    sendCartData().catch(error =>{
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error...',
        message: 'Sending cart data failed!',
      }));
    })
    }
  }, [cart, dispatch]);
  

  return (
    <Fragment>
      {notification && (<Notification status={notification.status} message={notification.message} title={notification.title}/>)}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>


    </Fragment>
  );
}

export default App;
