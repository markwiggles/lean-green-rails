Spree::HomeController.class_eval do

	before_filter :https_redirect

	def index
    @searcher = build_searcher(params.merge(include_images: true))
    @products = @searcher.retrieve_products.order(:name)
    @taxonomies = Spree::Taxonomy.includes(root: :children)
  end

end
