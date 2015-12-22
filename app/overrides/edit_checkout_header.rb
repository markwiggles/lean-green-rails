Deface::Override.new(virtual_path: 'spree/orders/_line_item',
                     name: 'add html safe to checkout header',
                     replace: "erb[loud]:contains('line_item.name')",
                     text: "<%= link_to line_item.name.html_safe, product_path(variant.product) %>")

Deface::Override.new(virtual_path: 'spree/orders/_line_item',
                     name: 'add html safe to checkout description',
                     replace: "erb[loud]:contains('line_item_description_text(line_item.description)')",
                     text: "<%= line_item_description_text(line_item.description).html_safe %>")
