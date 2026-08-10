import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function DeleteConfirmation({

    open,
    onOpenChange,
    onConfirm,
    title = "Delete",
    description = "This action cannot be undone.",

}) {

    return (

        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <AlertDialogContent>

                <AlertDialogHeader>

                    <AlertDialogTitle>
                        {title}
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>

                </AlertDialogHeader>

                <AlertDialogFooter>

                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        Delete
                    </AlertDialogAction>

                </AlertDialogFooter>

            </AlertDialogContent>

        </AlertDialog>

    );

}

export default DeleteConfirmation;