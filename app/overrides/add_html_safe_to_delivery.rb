Deface::Override.new(virtual_path: 'spree/checkout/_delivery',
                     name: 'add html safe to checkout delivery',
                     replace: "erb[loud]:contains('item.variant.name')",
                     text: "<%= item.variant.name.html_safe %>")

# Deface::Override.new(virtual_path: 'spree/checkout/_delivery',
#                      name: 'add html safe to checkout delivery 2',
#                      replace: "erb[loud]:contains('variant.name')",
#                      text: "<%= variant.name.html_safe %>")
