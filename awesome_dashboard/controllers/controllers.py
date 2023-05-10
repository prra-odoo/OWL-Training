# -*- coding: utf-8 -*-

import logging
import random

from odoo import http
from odoo.http import request

logger = logging.getLogger(__name__)

class AwesomeDashboard(http.Controller):
    @http.route('/awesome_tshirt/statistics', type='json', auth='user')
    def get_statistics(self):
        """
        Returns a dict of statistics about the orders:
            'average_quantity': the average number of t-shirts by order
            'average_time': the average time (in hours) elapsed between the
                moment an order is created, and the moment is it sent
            'nb_cancelled_orders': the number of cancelled orders, this month
            'nb_new_orders': the number of new orders, this month
            'total_amount': the total amount of orders, this month
        """

        return {
            'average_quantity': (random.random() * 123) + 4,
            'average_time': (random.random() * 44) + 4,  # simulate a delay between 4 and 48 hours
            'nb_cancelled_orders': random.random() * 10,
            'nb_new_orders': random.random() * 100,
            'orders_by_size': {
                'm': random.random() * 10,
                's': random.random() * 10,
                'xl': random.random() * 10,
            },
            'total_amount': random.random() * 1000,
        }
