module AccessoryHelpers
  def acc_has_image?(acc)
    acc['Image'].present?
  end

  def acc_image(acc)
    return config.no_image unless acc_has_image?(acc)

    acc['Image'][0]['thumbnails']['large']['url']
  end

  def acc_display_price(acc)
    Money.locale_backend = :i18n
    Money.from_amount(acc['Price $'].to_f).format
  end

  def acc_uri(acc)
    "/ac-units/accessories/#{acc['id']}.html"
  end

  def acc_url(acc)
    "#{config.url_root}#{acc_uri(acc)}"
  end
end