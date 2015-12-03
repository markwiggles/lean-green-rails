Deface::Override.new(virtual_path: 'spree/products/show',
                     name: 'add shop buttton before cart-form',
                     insert_before: '#cart-form',
                     text: "<%= button_to 'Keep Shopping', products_path, method: :get, class:'button btn-lg shop-btn btn-success pull-right' %>")
