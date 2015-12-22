Deface::Override.new(virtual_path: 'spree/shared/_header',
                     name: ' add menu items to main navbar',
										 remove: "erb[loud]:contains('spree/shared/main_nav_bar')"
                    )

menu_bar = "<%= render :partial => 'partials/shop_navbar' if store_menu? %>"

Deface::Override.new(virtual_path: 'spree/shared/_header',
                     name: 'add shop navbar',
										 insert_after: "#spree-header",
                     text: menu_bar
                    )
