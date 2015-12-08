class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

   def remove_html(text)
     text.gsub('<br>','')
   end

   def index

     @stuff = 'my stuff'

   end

   helper_method :remove_html
end
