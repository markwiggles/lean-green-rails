Deface::Override.new(virtual_path: 'spree/shared/_nav_bar',
                     name: 'remove style from navbar',
                     remove_from_attributes: '#top-nav-bar',
                     attributes: {class: "col-md-8"})

Deface::Override.new(virtual_path: 'spree/shared/_nav_bar',
                     name: 'add styles to navbar',
                     set_attributes: '#top-nav-bar',
                     attributes: {class: "col-xs-12 col-sm-6 col-md-5 col-lg-5"})										 
