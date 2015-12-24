# Deface::Override.new(virtual_path: 'spree/shared/_header',
#                      name: 'remove style from logo',
#                      remove_from_attributes: '#logo',
#                      attributes: {class: "col-md-8"})

Deface::Override.new(virtual_path: 'spree/shared/_header',
                     name: 'add styles to logo',
                     set_attributes: '#logo',
                     attributes: {class: "col-lg-4 col-md-4 col-sm-5 col-xs-7"})
