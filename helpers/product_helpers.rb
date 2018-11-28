module ProductHelpers
  def brand_logo(unit)
    "#{config.images_dir}/#{unit['Brand'].downcase}-logo.png"
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

  def brochure_url(unit)
    unit["Product Brochure url"]
  end

  def system_type_bc(unit)
    url = "/ac-units/#{system_type_to_slug(unit['System Type'])}"

    system_type = system_type_key_to_name(unit['System Type']) || "All Types"

    return link_to system_type, url, class: "breadcrumb-link"
  end

  def product_url(unit)
    "#{config.url_root}/#{product_uri(unit)}"
  end

  def product_uri(unit)
    "/ac-units/#{unit['AHRI']}.html"
  end

  def product_image(unit)
    attachments = unit['Attachments']
    return '' if attachments.nil? || attachments.empty?

    # TODO - Optimize images
    attachments[0]['url']
  end

  def cart_description(unit)
    "#{system_type_key_to_name(unit['System Type'])} by #{unit['Brand']}"
  end

  def system_type_key_to_name(type)
    case type
      when "SS SC"
        "Split System A/C"
      when "SS HP"
        "Split System Heat Pump"
      when "P SC "
        "Packaged System A/C"
      when "P HP"
        "Packaged System Heat Pump"
      when "WSHP"
        "Water Sourced Heat Pump"
      when "Furnace"
        "Furnace"
      when "Case Coil"
        "Case Coil"
      when "P HP OU"
        "Over-Under Packaged System"
    end
  end

  def system_type_to_slug(type)
    type.downcase.gsub!(/ /, '-')
  end

  def system_type_slug_to_name(slug)
    slug.gsub!(/-/, ' ').upcase
  end

  def display_price(unit)
    Money.locale_backend = :i18n
    Money.from_amount(unit['Shop Online Price'].to_f).format
  end

  def related_units(unit)
    seer_min, seer_max = seer_range(seer(unit).to_f)
    related_units = data.products.select do |p|
      p['AHRI'] != unit['AHRI'] &&
      p['System Type'] == unit['System Type'] &&
      p['Tons'] == unit['Tons'] &&
      p['SEER'] >= seer_min &&
      p['SEER'] < seer_max 
    end

    related_units.sample(4)
  end

  def seer_range(unit_seer)
    return [14, 16] if 14 <= unit_seer && unit_seer < 16
    return [16, 18] if 16 <= unit_seer && unit_seer < 18
    return [18, 20] if 18 <= unit_seer && unit_seer < 20
    return [20, 999999] if 20 <= unit_seer

    [-1, 999999]
  end
end