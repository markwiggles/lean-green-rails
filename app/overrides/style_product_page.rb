Deface::Override.new(virtual_path: 'spree/products/show',
                     name: 'allow html_safe',
                     replace: '.product-title',
                     text: "<h1 class='product-title' itemprop='name'><%= @product.name.html_safe %></h1>")

Deface::Override.new(virtual_path: 'spree/products/show',
                     name: 'add product info',
                     insert_after: "erb[silent]:contains('end')",
                     text: '<%= render "partials/#{find_product_type(@product)}"%>')
