import { useCartStorage } from "@/Hooks/useCartStorage";
import { Product } from "@/Types/Product.type";

export const formatCurrency = (number: number) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });

    return formatter.format(number)
}

export const HandleAddCart = (newProduct: Product | any) => {
    const { getCartStorage } = useCartStorage();

    const oldCart = getCartStorage();
    let updatedCart: any = [];

    if (oldCart && oldCart.length) {
        updatedCart = [...oldCart];

        const existingProductIndex = oldCart.findIndex((product: Product) => product.san_pham_id === newProduct.san_pham_id);

        if (existingProductIndex !== -1) {
            updatedCart[existingProductIndex].quantity += newProduct.quantity;
        } else {
            updatedCart.push({ ...newProduct });
        }
    } else {
        updatedCart.push({ ...newProduct });
    }

    return updatedCart;
}


export const summaryPriceInCart = (cart: Product[]) => {
    const totalPrice: number = cart.reduce((accumulator: number, product: Product | any) => {
        return accumulator + (product.quantity * product.gia_ban);
    }, 0);

    return formatCurrency(totalPrice)
}