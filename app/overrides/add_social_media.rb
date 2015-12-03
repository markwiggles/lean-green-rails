Deface::Override.new(virtual_path: 'spree/shared/_header',
                     name: 'add social media',
                     insert_after: "#logo",
                     text: "<%= render 'partials/social_media' %>")
