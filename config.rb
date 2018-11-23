# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

require 'html_truncator'
require 'redcarpet'
require "sanitize"
require 'middleman-inliner'


activate :protect_emails
activate :blog

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

set :url_root, 'https://www..com'
set :js_dir, 'javascripts'
set :index_file, "index.html"

activate :directory_indexes
activate :search_engine_sitemap, exclude_attr: 'hidden'
activate :inliner
activate :sprockets
activate :i18n, langs: [:en], :mount_at_root => 'en'


set :markdown_engine, :redcarpet
set :relative_links, true
set :fonts_dir, 'fonts'



activate :robots,
  :rules => [
    {:user_agent => '*', :allow => %w(/)}
  ],
  :sitemap => "https://www..com/sitemap.xml"

activate :google_analytics do |ga|
    ga.tracking_id = '' # Replace with your property ID.
end

# port
set(:port, 4444)

# enable livereload on development
configure :development do
  activate :livereload
end

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false
page "/templates/*", :layout => "layout"
page "/thank-you.html", :layout => "no-contact-layout"


# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/
ignore '/templates/*'

activate :pagination




# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

proxy "_redirects", "netlify-redirects", ignore: true
proxy "_headers", "netlify-headers", ignore: true


# Créer la page contact


helpers do


  def strip_tags(html)
    Sanitize.clean(html.strip).strip
  end

  def markdown(text)
    renderer = Redcarpet::Render::HTML.new
    Redcarpet::Markdown.new(renderer).render(text)
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
  activate :gzip
  activate :automatic_image_sizes
  activate :automatic_alt_tags
end
