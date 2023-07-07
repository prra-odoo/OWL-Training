/** @odoo-module **/

import { onMounted } from "@odoo/owl";

export function useAutofocus(element) {
    onMounted(() => {
        element.el && element.el.focus();
    });
}