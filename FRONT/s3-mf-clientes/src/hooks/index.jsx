import { useContext, useState } from "react";
import { ShoppingCartContext } from "../context";

export const useShoppingCart = () => useContext(ShoppingCartContext);
