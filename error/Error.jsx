import { enqueueSnackbar } from "notistack";
import toast from "react-hot-toast";

export const MessageSuccess=(message)=>{
    // enqueueSnackbar(message,{variant:"success"})
    toast.success(message)
}

export const MessageError=(message)=>{
    // enqueueSnackbar(message,{variant:"error"})
    toast.error(message)
}

// export const MessageWarning=(message)=>{
//     enqueueSnackbar(message,{variant:"warning"})
// }

// export const MessageInfo=(message)=>{
//     enqueueSnackbar(message,{variant:"info"})
// }