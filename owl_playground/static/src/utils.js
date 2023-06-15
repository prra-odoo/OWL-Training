/** @odoo-module **/
import { useRef , onMounted} from "@odoo/owl";

export function useAutofocus(name) {
  const inputRef = useRef(name);
  
    onMounted(() => inputRef.el && inputRef.el.focus());
    if(inputRef.el){
        inputRef.el.focus();
        console.log("Input element focused");
    }
    else{
        console.log("Input elemenent not focused")
    }
}