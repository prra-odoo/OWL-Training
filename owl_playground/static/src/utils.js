/** @odoo-module **/

import { onMounted, useRef ,onRendered,onWillRender} from "@odoo/owl";

export function useAutofocus(name) {
    const ref = useRef(name);
    onMounted(() => ref.el && ref.el.focus());
    // onRendered(() => {
    // console.log("dddd")
    //   });
    // onWillUpdateProps(() => {
    //     console.log("will Rednder")
    //   });
   
    
      
      
    
}