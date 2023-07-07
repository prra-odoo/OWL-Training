/** @odoo-module **/

import { onMounted, useRef } from "@odoo/owl";

export function useAutofocus (input) {
    const aktrRef =  useRef(input);
    onMounted ( () => aktrRef.el.focus())
}
