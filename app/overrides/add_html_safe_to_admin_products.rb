Deface::Override.new(virtual_path: 'spree/admin/shared/_product_tabs',
                     name: 'add html safe to admin product edit',
                     replace: "erb[loud]:contains('@product.name')",
                     text: "<%= @product.name.html_safe %>")
