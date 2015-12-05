Spree::ProductsController.class_eval do
 def index
  @searcher = build_searcher(params.merge(include_images: true))
  @products = @searcher.retrieve_products.order(:name)
  @taxonomies = Spree::Taxonomy.includes(root: :children)
   end

 def find_product_type(product)
  name = product.name.downcase
  if name.include? 'busy'
   'busygreens'
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
