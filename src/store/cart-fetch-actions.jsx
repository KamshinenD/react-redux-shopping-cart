import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";



export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://first-react-project-movies-default-rtdb.firebaseio.com/cart.json')
            if (!response.ok) {
                throw new Error('Could not fetch cart data')
            }
            const data = await response.json();

            return data
        };

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart(cartData));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error...',
                message: 'Fetching cart data failed!',
            }));
        }
    }
}