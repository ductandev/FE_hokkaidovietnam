import * as React from "react"

import useMediaQuery from "@/Hooks/useMediaQuery";

import { Button } from "@/Components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/Components/ui/drawer";

import FormProduct from "./Components/FormProduct"
import FormContact from "./Components/FormContact"
import FormOrderFilter from "./Components/FormOrderFilter";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormOrderDetail from "./Components/FormOrderDetail";

interface IProps {
    isVisible: boolean;
    onHandleToogleVisible?: Function;
    label?: string;
    drawerTriggerEle?: any;
    context: string;
    onHandleSubmit?: any;
    defaultValues?: any;
    validateSchema?: any;
    isShowButton?: boolean;
}

export function DrawerDialog(props: IProps) {
    const {
        isVisible = false,
        onHandleToogleVisible,
        label = 'Open Drawer',
        drawerTriggerEle,
        onHandleSubmit,
        context,
        defaultValues,
        validateSchema,
        isShowButton = true
    }: any = props;

    const [open, setOpen] = React.useState(isVisible);

    React.useEffect(() => {
        setOpen(isVisible)
    }, [isVisible])


    const isMobile = useMediaQuery("(max-width: 768px)");

    const {
        handleSubmit,
        formState: { errors },
        ...formProps
    } = useForm<any>({
        mode: "onChange",
        defaultValues,
        ...(validateSchema && { resolver: yupResolver(validateSchema), })
    });

    const errorsMgs: any = errors;

    const renderForm: any = {
        'product': <FormProduct {...formProps} errorsMgs={errorsMgs} />,
        'contact': <FormContact />,
        'orderFilter': <FormOrderFilter {...formProps} />,
        "orderDetail": <FormOrderDetail id={defaultValues} />
    }

    const handleToogleVisible = (isOpen: boolean) => {
        onHandleToogleVisible && onHandleToogleVisible(isOpen);

        setOpen(isOpen);
    }

    if (isMobile) {
        return (
            <Dialog open={open} onOpenChange={handleToogleVisible} >
                <DialogTrigger asChild>
                    {
                        drawerTriggerEle ?
                            drawerTriggerEle : <Button>
                                {label}
                            </Button>
                    }
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>

                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        )
    };


    const handleOnSubmitForm = async (values: any) => {
        let dataBuild = { ...values };

        if (context === 'product') {
            dataBuild['gia_ban'] = parseInt(dataBuild.gia_ban);
            dataBuild['gia_giam'] = parseInt(dataBuild.gia_giam);
        }

        onHandleSubmit && onHandleSubmit(dataBuild)

        setOpen(false);
    };

    return (
        <Drawer open={open} onOpenChange={handleToogleVisible} direction="right" >
            {isShowButton && <DrawerTrigger asChild>
                {
                    drawerTriggerEle ?
                        drawerTriggerEle : <Button>
                            {label}
                        </Button>
                }
            </DrawerTrigger>}


            <DrawerContent className="h-[100vh] w-[30vw]" >
                <DrawerHeader className="max-w-[300px] text-left">
                    <DrawerTitle>{label}</DrawerTitle>

                    <DrawerDescription>
                        Bạn đang {label} mới
                    </DrawerDescription>
                </DrawerHeader>

                <form onSubmit={handleSubmit((values) => handleOnSubmitForm(values))}>
                    {renderForm[context]}
                </form>

                <DrawerFooter className="pt-2 w-full">
                    <DrawerClose asChild>
                        <Button variant="outline">Đóng</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}