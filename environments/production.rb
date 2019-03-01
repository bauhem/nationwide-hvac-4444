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
