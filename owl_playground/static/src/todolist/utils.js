/** @odoo-module **/

import { onMounted,useRef } from "@odoo/owl";

export function useAutoFocus(name){
    const ref = useRef(name);
    onMounted(() => {
        ref.el && ref.el.focus();
    })
}