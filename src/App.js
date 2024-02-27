
// import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import  {Products} from "./components/products/products";
import ProductDetails from "./components/products/ProductDetails";
import Checkout from "./components/products/CheckOut";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import { Reducer } from "./components/products/Redux/Reducer";

const store=legacy_createStore(Reducer)
function App() {
  return (
    <div className="App">
    <Provider store={store}>

      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Header/>}>
                <Route index element={<Products/>}/>
                <Route path="/MoreDetails/:id" element={<ProductDetails/>}/>
                <Route path="/Basket/" element={<Checkout/>}/>
            </Route>
        </Routes>
        
        
      </BrowserRouter>
    </Provider>

    </div>
  );
}

export default App;
