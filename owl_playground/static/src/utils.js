/** @odoo-module **/

import { useEffect, useRef } from "@odoo/owl";

export function useAutofocus() {
    const ref = useRef("refAttr");

    useEffect(
        (el) => el && el.focus(),
        () => [ref.el]
    );
}

