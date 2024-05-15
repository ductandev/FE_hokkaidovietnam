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

export function formatTime(utcTime: any, format: string) {
    const date = new Date(utcTime);
    const day = ("0" + date.getUTCDate()).slice(-2);
    const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
    const year: any = date.getUTCFullYear();
    const hours = ("0" + date.getUTCHours()).slice(-2);
    const minutes = ("0" + date.getUTCMinutes()).slice(-2);

    // Replace placeholders in the format string with corresponding values
    format = format.replace("dd", day);
    format = format.replace("mm", month);
    format = format.replace("yyyy", year);
    format = format.replace("hh", hours);
    format = format.replace("mm", minutes);
    return format;
}

export function isNumberKey(e: any) {
    var evt = e || window.event;

    if (evt) {
        var charCode = evt.keyCode || evt.which;
    } else {
        return true;
    }

    if ((charCode > 47 && charCode < 58) || charCode === 9 || charCode === 8 || charCode === 46 || charCode === 37 || charCode === 39) {
        return true;
    }

    return false;
}

export function isNumberMobile(e: any) {
    e.target.value = e.target.value.replace(/[^\d]/g, '');
    return false;
}

export const isEmpty = (obj: Record<string, any>) => {
    for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            return false;
        }
    }

    return JSON.stringify(obj) === JSON.stringify({});
};
