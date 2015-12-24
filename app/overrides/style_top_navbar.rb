Deface::Override.new(virtual_path: 'spree/shared/_nav_bar',
                     name: 'remove style from navbar',
                     remove_from_attributes: '#top-nav-bar',
                     attributes: {class: "col-md-8"})

Deface::Override.new(virtual_path: 'spree/shared/_nav_bar',
                     name: 'add styles to navbar',
                     set_attributes: '#top-nav-bar',
                     attributes: {class: "col-lg-5 col-md-5 col-sm-3 col-xs-5"})										 
