class window.Obfuscator

  constructor: (key = "1rPQ3ltmoqUzgYdxRHvaG5K6iB2SOZbcAW8DkI7efFXT9yL4JhjwVuMsp0NCEn") ->
    @key = key
    
  encode: (value) ->
    this.scramble(value, -value.length)
    
  decode: (value) ->
    this.scramble(value, value.length)
    
  scramble: (value, shift) ->
    result = ""
    for char in value.split ''
      index = @key.indexOf(char)
      if index == -1
        result += char
      else
        ltr = (index - shift + @key.length) % @key.length
        result += @key.charAt(ltr)
    return result
    
# jquery plugin definition
$.fn.obfuscate = (options) ->
  defaults =
    key: "1rPQ3ltmoqUzgYdxRHvaG5K6iB2SOZbcAW8DkI7efFXT9yL4JhjwVuMsp0NCEn"
    decode_tag: "decode"
    encode_tag: "encode"    
  options = $.extend(defaults, options)
  ob = new Obfuscator(options['key'])
  this.each () ->
    $el = $(this)
    if field = $el.attr(options['encode_tag'])
      if field == "text" then $el.text(ob.encode($el.text())) else $el.attr(field, ob.encode($el.attr(field)))
    if field = $el.attr(options['decode_tag'])
      if field == "text" then $el.text(ob.decode($el.text())) else $el.attr(field, ob.decode($el.attr(field)))      
  this