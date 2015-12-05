Deface::Override.new(virtual_path: "spree/shared/_head",
name: "add html safe to head",
replace: "erb[loud]:contains('title')",
text: "<%= remove_html(title) %>"
)
