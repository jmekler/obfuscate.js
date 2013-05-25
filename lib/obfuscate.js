
window.Obfuscator = (function() {

  function Obfuscator(key) {
    if (key == null) {
      key = "1rPQ3ltmoqUzgYdxRHvaG5K6iB2SOZbcAW8DkI7efFXT9yL4JhjwVuMsp0NCEn";
    }
    this.key = key;
  }

  Obfuscator.prototype.encode = function(value) {
    return this.scramble(value, -value.length);
  };

  Obfuscator.prototype.decode = function(value) {
    return this.scramble(value, value.length);
  };

  Obfuscator.prototype.scramble = function(value, shift) {
    var char, index, ltr, result, _i, _len, _ref;
    result = "";
    _ref = value.split('');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      char = _ref[_i];
      index = this.key.indexOf(char);
      if (index === -1) {
        result += char;
      } else {
        ltr = (index - shift + this.key.length) % this.key.length;
        result += this.key.charAt(ltr);
      }
    }
    return result;
  };

  return Obfuscator;

})();

$.fn.obfuscate = function(options) {
  var defaults, ob;
  defaults = {
    key: "1rPQ3ltmoqUzgYdxRHvaG5K6iB2SOZbcAW8DkI7efFXT9yL4JhjwVuMsp0NCEn",
    decode_tag: "decode",
    encode_tag: "encode"
  };
  options = $.extend(defaults, options);
  ob = new Obfuscator(options['key']);
  this.each(function() {
    var $el, field;
    $el = $(this);
    if (field = $el.attr(options['encode_tag'])) {
      if (field === "text") {
        $el.text(ob.encode($el.text()));
      } else {
        $el.attr(field, ob.encode($el.attr(field)));
      }
    }
    if (field = $el.attr(options['decode_tag'])) {
      if (field === "text") {
        return $el.text(ob.decode($el.text()));
      } else {
        return $el.attr(field, ob.decode($el.attr(field)));
      }
    }
  });
  return this;
};
