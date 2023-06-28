/** @odoo-module **/

import { onMounted, useRef } from "@odoo/owl";
export function useAutofocus(name) {
    let ref = useRef(name);
    onMounted(
      (el) => el && el.focus(),
      () => [ref.el]
    );
  }
