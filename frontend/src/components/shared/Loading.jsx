import { Loader2 } from "lucide-react";

function Loading() {

    return (

        <div className="flex justify-center items-center min-h-[60vh]">

            <Loader2 className="w-10 h-10 animate-spin text-primary" />

        </div>

    );

}

export default Loading;