/** @odoo-module **/

import { onMounted, useRef } from "@odoo/owl";

export function useautofocus(name) {
    const inputref = useRef(name);
    onMounted(() => inputref.el && inputref.el.focus());
}