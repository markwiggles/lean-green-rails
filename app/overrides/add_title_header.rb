Deface::Override.new(virtual_path: 'spree/shared/_products',
                     name: 'add-header',
                     insert_before: '#products',
                     text: "<h2 class='text-primary'>Lean & Green Products</h3><hr>")
