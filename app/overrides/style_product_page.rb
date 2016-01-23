script = "<script>
  console.log('run script');
    $('#main-image img').on('load', function() {
      console.log('loaded');
      $('#main-image img').on('click', function() {
        console.log('clicked');
        if($(this).hasClass('enlarged')) {
          $(this).removeClass('enlarged')
        } else {
          $(this).addClass('enlarged');
        }
    	});
    });


</script>"

product_info1 = '<%= cms_block_render(:information, Comfy::Cms::Page.find_by_full_path("/#{find_product_type(@product)}")) %>'
product_info2 = '<%= cms_block_render(:faq, Comfy::Cms::Page.find_by_full_path("/#{find_product_type(@product)}")) %>'

Deface::Override.new(virtual_path: 'spree/products/show',
                     name: 'allow html_safe',
                     replace: '.product-title',
                     text: "<h1 class='product-title' itemprop='name'><%= @product.name.html_safe %></h1>")

Deface::Override.new(virtual_path: 'spree/products/show',
                     name: 'add product info',
                     insert_after: "erb[silent]:contains('end')",
                     text: "<div class='product-info'>#{product_info1} #{product_info2}</div>")


Deface::Override.new(virtual_path: 'spree/products/_image',
                     name: 'add product enlarge',
                     insert_after: "erb[silent]:contains('end')",
                     text: script)

Deface::Override.new(virtual_path: 'spree/products/show',
                     name: 'add click to zoom',
                     insert_after: "erb[loud]:contains('image')",
                     text: "<p><span class='glyphicon glyphicon-zoom-in' aria-hidden='true'></span>&nbsp;click image to zoom</p>")
