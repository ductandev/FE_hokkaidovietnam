import * as React from "react"

import { cn } from "@/lib/utils"
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
} from "@/Components/ui/drawer"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"


interface IProps {
    isVisible: boolean;
    onHandleToogleVisible?: Function;
    label?: string;
    drawerTriggerEle?: any
}

export function DrawerDialog(props: IProps) {
    const { isVisible = false, onHandleToogleVisible, label = 'Open Drawer', drawerTriggerEle } = props;

    const [open, setOpen] = React.useState(isVisible);

    const isDesktop = useMediaQuery("(max-width: 768px)")

    const handleToogleVisible = (isOpen: boolean) => {
        onHandleToogleVisible && onHandleToogleVisible(isOpen);

        setOpen(isOpen);
    }

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={handleToogleVisible} >
                <DialogTrigger asChild>
                    {
                        drawerTriggerEle ?
                            drawerTriggerEle : <Button variant="outline">
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
                    <ProfileForm />
                </DialogContent>
            </Dialog>
        )
    }


    return (
        <Drawer open={open} onOpenChange={handleToogleVisible}>
            <DrawerTrigger asChild>
                {
                    drawerTriggerEle ?
                        drawerTriggerEle : <Button variant="outline">
                            {label}
                        </Button>
                }
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Edit profile</DrawerTitle>
                    <DrawerDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DrawerDescription>
                </DrawerHeader>

                <ProfileForm className="px-4" />

                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
    return (
        <form className={cn("grid items-start gap-4", className)}>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" defaultValue="shadcn@example.com" />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@shadcn" />
            </div>

            <Button type="submit">Save changes</Button>
        </form>
    )
}
