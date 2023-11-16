import {useMutation } from "react-query";

const useMutateHook = (properties) => {
    return useMutation(properties)
}

export default useMutateHook