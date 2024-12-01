import {atom} from "recoil"

 export const imagebuffer= atom<Blob>({
    key: 'buffer', // unique ID (with respect to other atoms/selectors)
    default: new Blob([]) , // default value (aka initial value)
  });