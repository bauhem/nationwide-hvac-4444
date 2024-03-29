module FilterHelpers
  def system_types_filter(current_st)
    filter_links = []
    system_types.each do |st|
      # class: "type-link"
      checked = (st === current_st)
      filter_links << filter_with_radio_link("/ac-units/#{system_type_key_to_slug(st)}", st, system_type_key_to_name(st), checked)
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
    div_content << content_tag(:div, class: "checkbox-label") do
      label
    end

    link_content = []
    link_content << content_tag(:div, class: "checkbox-field") do
      div_content.join
    end

    link_to '#', class: "filter_button w-inline-block", 'data-ix': 'close-filter', 'data-toggle': filter do
      link_content.join
    end
  end

  # <div class="checkbox-field w-radio">
  #   <img src="/images/checkbox-grey.png" alt="" class="checkbox-button-grey">
  #   <img src="/images/checkbox.png" alt="" class="checkbox-button-grey">
  #   <input type="radio" id="radio" name="radio" value="Radio" data-name="Radio" class="hide w-radio-input">
  #   <label for="radio" class="checkbox-label w-form-label">Split System A/C</label>
  # </div>

  def filter_with_radio_link(link, name, label, checked)
    div_content = []
    div_content << tag(:img, src: '/images/checkbox-grey.png', alt: "", class: "checkbox-button-grey", style: "z-index: #{checked ? 0 : 1}")
    div_content << tag(:img, src: '/images/checkbox.png', alt: "", class: "checkbox-button", style: "z-index: #{checked ? 1 : 0}")
    div_content << input_tag(:radio, id: name, name: name, alt: "", class: "hide w-radio-input", checked: checked)
    div_content << content_tag(:label, for: name, class: "checkbox-label w-form-label") do
      label
    end

    div = []
    div << content_tag(:div, class: "checkbox-field w-radio") do
      div_content.join
    end

    link_to '#', class: "radio-link filter_button w-inline-block", 'data-ix': 'close-filter', 'data-link': link do
      div.join
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
    seer_filters  = []
    ranges        = seer_ranges
    last_min_seer = ranges[-1][0]

    ranges.each do |min, max|
      label = "#{min}"
      label = "#{min}+" if min == last_min_seer
      seer_filters << filter_with_checkbox_link(".#{seer_filter_data(min)}", label)
    end

    seer_filters.join
  end

  def seer_filter_data(seer_min)
    "seer-#{seer_min}"
  end

end
