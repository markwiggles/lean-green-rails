Deface::Override.new(virtual_path: "spree/shared/_order_details",
name: "add html safe to line items",
replace: "erb[loud]:contains('item.variant.product.name')",
text: "<%= item.variant.product.name.html_safe%>"
)
