module FilterHelpers
  def system_types_filter
    filter_links = []
    system_types.each do |st|
      filter_links << link_to(system_type_key_to_name(st), "/ac-units/#{system_type_key_to_slug(st)}", class: "type-link")
    end

    filter_links.join
  end

  def brands_filter
    brand_filters = []
    # brand_filters << filter_with_checkbox_link('all', 'All Brands')

    brands_list.each do |brand|
      brand_filters << filter_with_checkbox_link(".#{brand_data_filter(brand)}", brand)
    end

    brand_filters.join
  end

  def brand_data_filter(brand)
    return '' if brand.nil? || brand == ''
    brand.downcase.gsub(/ /, '-')
  end

  def filter_with_checkbox_link(filter, label)
    # TODO - We can force a specific order using data-order
    div_content = []
    # NOTE: DO NOT UPDATE THE IMAGES ORDER WITHOUT MODIFYING handleMixClick in layout.erb
    div_content << tag(:img, src: '/images/checkbox-grey.png', alt: "", class: "checkbox-button-grey")
    div_content << tag(:img, src: '/images/checkbox.png', alt: "", class: "checkbox-button")
    div_content << content_tag(:div, class: "checkbox-label", "data-ix": "check-box") do
      label
    end

    link_content = []
    link_content << content_tag(:div, class: "checkbox-field") do
      div_content.join
    end

    link_to '#', class: "filter_button w-inline-block", 'data-toggle': filter do
      link_content.join
    end
  end

  def tonnages_filter
    tonnage_filters = []
    # tonnage_filters << filter_with_checkbox_link('', 'All Tonnage')

    tonnages.each do |tons|
      tonnage_filters << filter_with_checkbox_link(".#{tonnage_filter_data(tons)}", tons.to_s)
    end

    tonnage_filters.join
  end

  def tonnage_filter_data(tons)
    "ton-#{tons.to_s.gsub(/\./, '-')}"
  end

  def seers_filter
    seer_filters = []
    # seer_filters << filter_with_checkbox_link('', 'All SEER')

    seer_ranges.each do |min, max|
      label = "#{min}-#{max}"
      label = "#{min}+" if min == 20
      seer_filters << filter_with_checkbox_link(".#{seer_filter_data(min)}", label)
    end

    seer_filters.join
  end

  def seer_filter_data(seer_min)
    "seer-#{seer_min}"
  end

end
