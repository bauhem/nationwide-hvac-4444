module ProductHelpers
  def brand(unit)
    unit['Brand']
  end

  def brand_name_to_logo(brand_val)
    return "" if brand_val.nil?

    "#{to_slug(brand_val)}-logo.png"
  end

  def brand_logo(unit)
    brand_val = brand(unit)
    return config.no_image if brand_val.blank?
    brand_name_to_logo(brand_val)
  end

  def item_id(unit)
    unit['AHRI'].downcase
  end

  def model(unit)
    unit['Brand Series']
  end

  def tons(unit)
    unit["Tons"]
  end

  def seer(unit)
    unit['SEER']
  end

  def price(unit)
    unit['Shop Online Price']
  end

  def installation_price(unit, zone)
    unit["Installed Price Zone #{zone}"] - price(unit)
  end

  def brochure_url(unit)
    unit["Product Brochure url"]
  end

  def system_type_bc(unit)
    url = "/ac-units/#{system_type_key_to_slug(unit['System Type'])}"

    system_type = system_type_key_to_name(unit['System Type']) || "All Types"

    return link_to system_type, url, class: "breadcrumb-link"
  end

  def product_url(unit)
    "#{config.url_root}#{product_uri(unit)}"
  end

  def product_uri(unit)
    "/ac-units/#{to_slug(unit['Brand'])}/#{to_slug(unit['Brand Series'])}/#{to_slug(unit['AHRI'])}.html"
  end

  def to_slug(str)
    return '' unless str
    str.downcase.lstrip.rstrip.gsub(/ /, '-')
  end


  def product_image(unit)
    attachments = unit['Attachments']
    return config.no_image if attachments.nil? || attachments.empty?

    url = attachments[0]['url']
    url = config.no_image if url.blank?
    url
  end

  def product_has_image?(unit)
    unit['Attachments'].present?
  end

  def cart_description(unit)
    "#{system_type_key_to_name(unit['System Type'])} #{model(unit)} by #{unit['Brand']}"
  end

  def display_price(unit)
    Money.locale_backend = :i18n
    Money.from_amount(unit['Shop Online Price'].to_f).format
  end

  def related_units(unit)
    seer_min, seer_max = seer_range(seer(unit))
    related_units      = data.products.select do |p|
      p['AHRI'] != unit['AHRI'] &&
        p['System Type'] == unit['System Type'] &&
        p['Tons'] == unit['Tons'] &&
        p['SEER'] >= seer_min &&
        p['SEER'] < seer_max
    end

    related_units.sample(4)
  end

  def seer_range(unit_seer)
    return [0, 0] if unit_seer.nil?

    unit_seer = unit_seer.to_f
    seer_ranges.each do |min, max|
      return [min, max] if min <= unit_seer && unit_seer < max
    end

    [-1, 999999]
  end

  def tonnage_filter_class(unit)
    tons = tons(unit)
    return '' if tons.nil? || tons == ''

    tonnage_filter_data(tons)
  end

  def seer_filter_class(unit)
    seer_min, _ = seer_range(seer(unit))

    seer_filter_data(seer_min)
  end

  def brand_filter_class(unit)
    brand_data_filter(brand(unit))
  end

  def mixit_class(unit)
    "#{brand_filter_class(unit)} #{system_type_key_to_slug(unit['System Type'])} #{tonnage_filter_class(unit)} #{seer_filter_class(unit)}"
  end

  def brands_list
    data.products.map { |p| p['Brand'] }.reject { |st| st.nil? }.uniq
  end

  def system_types
    data.products.map {|p| p['System Type']}.reject {|st| st.nil?}.uniq
  end

  def system_type_key_to_name(type)
    case type.rstrip
      when "SS SC"
        "Split System A/C"
      when "SS HP"
        "Split System Heat Pump"
      when "P SC"
        "Packaged System A/C"
      when "P HP"
        "Packaged System Heat Pump"
      when "WSHP"
        "Water Sourced Heat Pump"
      when "P HP OU"
        "Over-Under Packaged System"
    end
  end

  def system_type_key_to_slug(type)
    return '' if type.nil? || type == ''
    to_slug(type)
  end

  def system_type_slug_to_key(slug)
    slug.gsub(/-/, ' ').upcase
  end

  def seer_ranges
    [
      [14, 15],
      [15, 16],
      [16, 17],
      [17, 18],
      [18, 19],
      [19, 999999]
    ]
  end

  def tonnages
    [1.5, 2, 2.5, 3, 3.5, 4, 5]
  end

  def landing_page_units(brand: "", system_type: "")
    return [] if (brand.nil? || brand.empty?) && (system_type.nil? || system_type.empty?)

    units = data.products

    unless brand.nil? || brand.blank?
      units = units.select {|p| p['Brand'] == brand}
    end

    unless system_type.nil? || system_type.blank?
      units = units.select {|p| p['System Type'] == system_type}
    end

    return units.take(4)
  end
end
