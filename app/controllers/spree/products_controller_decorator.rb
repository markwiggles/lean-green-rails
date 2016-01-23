Spree::ProductsController.class_eval do

 def index
  @searcher = build_searcher(params.merge(include_images: true))
  @products = @searcher.retrieve_products.order(:name)
  @taxonomies = Spree::Taxonomy.includes(root: :children)

  # @pagehere = Comfy::Cms::Page.find_by_full_path("/#{find_product_type('/training')}")
  # logger.debug("PAGEHERE: #{@pagehere}")
  end

 # Method used to add the correct product information on the product page
 def find_product_type(product)
  name = product.name.downcase
  if name.include? 'busy'
   'busy-greens'
  elsif name.include? 'plantastic'
   'plantastic'
  elsif name.include? 'vegomega'
   'vegomega'
  else
   'performance_pack'
  end
 end

 helper_method :find_product_type
end
