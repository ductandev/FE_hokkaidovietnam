/* eslint-disable no-useless-escape */
import { useCartStorage } from "@/Hooks/useCartStorage";
import { Product } from "@/Types/Product.type";
import { utils, writeFile } from 'xlsx';


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
            updatedCart[existingProductIndex].so_luong += newProduct.so_luong;
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
        return accumulator + (product.so_luong * product.gia_ban);
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

export const buildQueryString = (
    queries: any,
    whiteList: any = [],
    bridgeSign: string = "?",
) => {
    const queryString: any = [];
    const checkWhitelist: boolean = whiteList.length > 0 ? true : false;

    Object.keys(queries).forEach((prop) => {
        if (queries[prop] !== "" && queries[prop].toString().length) {
            if (checkWhitelist) {
                if (whiteList.includes(prop)) {
                    queryString.push(urlencode(prop) + "=" + urlencode(queries[prop]));
                }
            } else {
                queryString.push(urlencode(prop) + "=" + urlencode(queries[prop]));
            }
        }
    });

    return queryString.length > 0 ? `${bridgeSign}${queryString.join("&")}` : "";
};


export const urlencode = (str: any) => {
    str = (str + "").toString();

    // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
    // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
    return encodeURIComponent(str)
        .replace(/!/g, "%21")
        .replace(/'/g, "%27")
        .replace(/\(/g, "%28")
        .replace(/\)/g, "%29")
        .replace(/\*/g, "%2A")
        .replace(/%20/g, "+");
};


export const paymentTransform = (id: number) => {
    const transform: any = {
        1: "Chuyển khoản",
        2: 'COD'
    }

    return transform[id] || "unknown"
}


export const badgeTagStatusTransform = (value: number, name: string) => {
    const statusOrder: any = {
        1: "outline",
        2: 'info',
        3: 'warning',
        4: "success",
        5: 'error',
    };

    const statusContac: any = {
        1: "outline",
        2: 'success',
        3: 'error',
    };

    switch (name) {
        case 'trang_thai_don_hang_id':
            return statusOrder[value];
        case 'trang_thai_lien_he_id':
            return statusContac[value];
        default:
            return "unknown"
    }
}

export function getNestedError(name: string, errors: Record<string, any>) {
    const nameParts = name.split(/[\[\].]+/).filter(Boolean);

    let currentError = errors;

    for (let part of nameParts) {
        if (typeof currentError !== "object" || !currentError[part]) {
            return null;
        }
        currentError = currentError[part];
    }

    return currentError.message ?? "";
}

export const exportHandler = (aoo: any, opts?: any) => {
    const ws = utils.json_to_sheet(aoo, opts);

    const wb = utils.book_new();

    utils.book_append_sheet(wb, ws, "Data");

    let generatedName = `order-${Date.now()}`;

    writeFile(wb, `${generatedName}.xlsx`);
}