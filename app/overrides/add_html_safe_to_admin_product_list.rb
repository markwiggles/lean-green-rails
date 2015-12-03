Deface::Override.new(virtual_path: 'spree/admin/products/index',
                     name: 'add html safe to admin product list',
                     replace: "erb[loud]:contains('product.try(:name)')",
                     text: "<%= link_to product.try(:name).html_safe, edit_admin_product_path(product) %>")

# <%= link_to product.try(:name), edit_admin_product_path(product) %>
