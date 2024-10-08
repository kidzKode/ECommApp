import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./redux/CartReducer";

export default configureStore({
    reducer:{
        cart:CartReducer
    }
})



//have to wrap main app.js in provider