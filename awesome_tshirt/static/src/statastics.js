/**@odoo-module**/
import { registry } from "@web/core/registry";
import { memoize } from "@web/core/utils/functions";

export const loadStatistics = {
	dependencies: ["rpc"],
	start(env, { rpc }) {
		return {
			result: memoize(function () {
				// console.log("called");
				// debugger;
				return rpc("/awesome_tshirt/statistics");
			}),
		};
	},
};

registry.category("services").add("loadStatistics", loadStatistics);
