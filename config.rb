# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

require 'html_truncator'
require 'redcarpet'
require "sanitize"
require 'middleman-inliner'

activate :dato, live_reload: true, token: '92d113325496fb6d6c5b65623b9e21'


Middleman::Util::EnhancedHash.disable_warnings

activate :protect_emails

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

set :url_root, 'https://www.nationwide-hvac.com/'
set :js_dir, 'javascripts'
set :index_file, "index.html"
set :no_image, "product-photo-unavailable.png"

activate :directory_indexes
activate :search_engine_sitemap, exclude_attr: 'hidden'
activate :inliner
#activate :sprockets # NOTE: DO NOT ACTIVATE WHEN USING GULP
activate :i18n, langs: [:en], :mount_at_root => 'en'
activate :meta_tags

set :markdown_engine, :redcarpet
set :relative_links, true
set :fonts_dir, 'fonts'
set :cloudinary_name, 'nationwide-hvac'

set :lambda_base_url, 'http://localhost:9005/'

configure :build do
  set :lambda_base_url, 'https://www.nationwide-hvac.com/.netlify/functions/'
end

activate :sitemap_ping do |config|
  config.host         = 'https://www.nationwide-hvac.com' # (required)                       Host of your website
  config.sitemap_file = 'sitemap.xml' # (optional, default: sitemap.xml) Name of your sitemap file
  config.ping_google  = true # (optional, default: true)        Ping Google?
  config.ping_bing    = true # (optional, default: true)        Ping Bing?
  config.after_build  = true # (optional, default: true)        Run automatically after build?
end

activate :robots,
         :rules   => [
           { :user_agent => '*', :allow => %w(/) }
         ],
         :sitemap => "#{config.url_root}/sitemap.xml"

activate :google_analytics do |ga|
  ga.tracking_id = 'UA-68367207-1' # Replace with your property ID.
end

# Activate React using gulp
activate :external_pipeline,
         name:    :gulp,
         command: build? ? "NODE_ENV=production ./node_modules/gulp/bin/gulp.js production" : "NODE_ENV=development ./node_modules/gulp/bin/gulp.js default",
         source:  'dist'

# port
set(:port, 4444)

# enable livereload on development
configure :development do
  # activate :livereload
  activate :pry
end

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false
page "/templates/*", :layout => "layout"
page "/thank-you.html", :layout => "layout"


# Proxy pages
ignore '/templates/*'
ignore '/sync'

page "/index.html", :layout => "layout"

proxy "_redirects", "netlify-redirects", ignore: true
proxy "_headers", "netlify-headers", ignore: true

proxy "/ac-units/index.html", "/templates/listing.html", layout: "layout", locals: { system_type_query: '' }

dato.tap do |dato|
  # iterate over the "Blog post" records...
  dato.landing_pages.each do |landing|
    if landing.active
      # ...and create a section for each service starting from a template!
      proxy(
        "/#{landing.slug}/index.html",
        "/templates/landing_page.html",
        locals: { landing: landing },
      )
    end
  end
end

data.products.each do |prod|
  next if prod['AHRI'].nil?
  next if prod['System Type'].nil?
  next if prod['Brand Series'].nil?
  ahri         = prod['AHRI'].downcase.lstrip.rstrip.gsub(/ /, '-')
  brand_series = prod['Brand Series'].downcase.lstrip.rstrip.gsub(/ /, '-')
  brand        = prod['Brand'].downcase.lstrip.rstrip.gsub(/ /, '-')
  proxy "/ac-units/#{brand}/#{brand_series}/#{ahri}.html", "/templates/detail.html", layout: "layout", locals: { unit: prod }
end

data.accessories.each do |acc|
  proxy "/ac-units/accessories/#{acc['id']}.html", "/templates/accessory.html", layout: "layout", locals: { accessory: acc }
end

data.thermostats.each do |acc|
  proxy "/ac-units/accessories/#{acc['id']}.html", "/templates/accessory.html", layout: "layout", locals: { accessory: acc }
end

data.warranty.each do |acc|
  proxy "/ac-units/accessories/#{acc['id']}.html", "/templates/accessory.html", layout: "layout", locals: { accessory: acc }
end

proxy "/ac-units/accessories/index.html", "/templates/accessories.html", layout: "layout"

require 'helpers/product_helpers'
include ProductHelpers

system_types.each do |st|
  st = st.lstrip.rstrip
  proxy "/ac-units/#{system_type_key_to_slug(st)}/index.html", "/templates/listing.html", layout: "layout", locals: { system_type_query: st }
end

helpers do
  def markdown(text)
    renderer = Redcarpet::Render::HTML.new
    Redcarpet::Markdown.new(renderer).render(text)
  end

  def cloudinary_resize(url, width, height, crop = 'fit', fetch_format = 'auto')
    "https://res.cloudinary.com/#{config.cloudinary_name}/image/fetch/w_#{width},h_#{height},c_#{crop},f_#{fetch_format}/#{url}"
  end
end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

configure :build do
  activate :minify_css, inline: true
  activate :minify_javascript
  activate :minify_html
  activate :relative_assets
  activate :asset_hash, :ignore => [%r{#fonts/.*}, %r{#stylesheets/fonts/.*}]
  activate :automatic_image_sizes
  activate :automatic_alt_tags
end
