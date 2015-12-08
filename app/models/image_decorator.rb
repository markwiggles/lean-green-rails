Spree::Image.class_eval do
  attachment_definitions[:attachment][:styles] = {
    :mini => '60x60>', # thumbs under image
    :small => '120x120>', # images on category view
    :product => '575x575>', # full product image
    :large => '600x600>' # light box image
  }
end
