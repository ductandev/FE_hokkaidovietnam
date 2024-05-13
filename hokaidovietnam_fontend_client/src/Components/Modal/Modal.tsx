import React, { ReactNode } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog"

interface IProps {
    visible: boolean
    onChangeVisible: Function
    renderHeader: ReactNode | string | any | null
    renderBody: ReactNode | string | any
}

export default function Modal(props: IProps) {
    const {
        visible,
        onChangeVisible,
        renderHeader,
        renderBody
    } = props;

    return (
        <Dialog
            onOpenChange={(isVisible) => {
                onChangeVisible && onChangeVisible(isVisible)
            }}
            open={visible}
        >
            <DialogContent >
                <DialogHeader>
                    {renderHeader && <DialogTitle>
                        {renderHeader}
                    </DialogTitle>}


                    <DialogDescription>
                        {renderBody}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}