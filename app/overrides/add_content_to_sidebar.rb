# Deface::Override.new(virtual_path: 'spree/shared/_sidebar',
#                      name: "add content to sidebar",
# 										 insert_after: "erb[loud]:contains(':sidebar')",
# 										 text: "<h3 class='sidebar-promo'>FREE SHIPPING<br>on orders<br>over $150</h3>")
Deface::Override.new(virtual_path: 'spree/shared/_sidebar',
                     name: 'remove sidebar',
                     remove: '#sidebar'
                   )
classes= "<%= !content_for?(:sidebar) ? 'col-sm-12' : 'col-lg-12' %>"

content = "<div id='content' class=#{classes} data-hook>
          <%= flash_messages %>
          <%= yield %>
        	</div>"


Deface::Override.new(virtual_path: 'spree/layouts/spree_application',
                     name: 'change column width of content',
                     replace: '#content',
										 text: content
                    )
