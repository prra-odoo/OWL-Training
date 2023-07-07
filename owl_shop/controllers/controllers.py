from odoo import http
from odoo.http import request, route

class OwlShop(http.Controller):
    @http.route(['/owl_shop/shop'], type='http', auth='public')
    def show_shop(self):
        """
        Renders the owl playground page
        """
        return request.render('owl_shop.shop')
