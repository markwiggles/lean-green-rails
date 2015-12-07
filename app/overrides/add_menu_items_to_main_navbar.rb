Deface::Override.new(virtual_path: 'spree/shared/_header',
                     name: ' add menu items to main navbar',
										 replace: "erb[loud]:contains('spree/shared/main_nav_bar')",
										 text: "<%= render :partial => 'partials/main_navbar' if store_menu? %>"
                    )
