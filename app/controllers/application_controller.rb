class ApplicationController < ActionController::Base
 # Prevent CSRF attacks by raising an exception.
 # For APIs, you may want to use :null_session instead.
 protect_from_forgery with: :exception
 # before_filter :https_redirect

 def index
  @stuff = 'my stuff'
  @products = Spree::Product.find(2)
  logger.debug("PRODUCTS: #{@products.inspect}")
 end

  def remove_html(text)
   text.gsub('<br>', '')
  end



 def https_redirect
  # if ENV['ENABLE_HTTPS'] == 'yes'
   if request.ssl? && !use_https? || !request.ssl? && use_https?
    protocol = request.ssl? ? 'http' : 'https'
    flash.keep
    redirect_to protocol: "#{protocol}://", status: :moved_permanently
   end
  # end
end

 def use_https?
  true # Override in other controllers
 end

 helper_method :remove_html, :https_redirect
end
