import * as React from "react"

import useMediaQuery from "@/Hooks/useMediaQuery"
import { Button } from "@/Components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
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
import FormOrder from "./Components/FormOrder"

import { useForm } from "react-hook-form";

interface IProps {
    isVisible: boolean;
    onHandleToogleVisible?: Function;
    label?: string;
    drawerTriggerEle?: any;
    context: string
}

export function DrawerDialog(props: IProps) {
    const {
        isVisible = false,
        onHandleToogleVisible,
        label = 'Open Drawer',
        drawerTriggerEle,
        context } = props;

    const [open, setOpen] = React.useState(isVisible);

    const isMobile = useMediaQuery("(max-width: 768px)");

    const {
        handleSubmit,
        formState: { errors, isDirty },
        ...formProps
    } = useForm<any>({
        mode: "onChange",
        defaultValues: {
            name: ''
        },
    });

    const errorsMgs: any = errors;

    const renderForm: any = {
        'product': <FormProduct {...formProps} errorsMgs={errorsMgs} />,
        'contact': <FormContact />,
        'order': <FormOrder {...formProps} errorsMgs={errorsMgs} />,
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
        const dataBuild = { ...values };
    };

    return (
        <Drawer open={open} onOpenChange={handleToogleVisible} direction="right" >
            <DrawerTrigger asChild>
                {
                    drawerTriggerEle ?
                        drawerTriggerEle : <Button>
                            {label}
                        </Button>
                }
            </DrawerTrigger>

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
                        <Button variant="outline">Huỷ bỏ</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}