test("obfuscate.encode", function() {
  var ob = new Obfuscator();
  equal(ob.encode("obfuscate.js"), "GXVQlTcvw.1l");
});

test("obfuscate.decode", function() {
  var ob = new Obfuscator();
  equal(ob.decode("GXVQlTcvw.1l"), "obfuscate.js");  
});

test("obfuscate.jquery.decode-href", function() {
    var $el = $('#decode-href');
    var encoded = $el.attr('href');
    $el.obfuscate();
    var decoded = $el.attr('href');
    var ob = new Obfuscator();
    equal( decoded, ob.decode(encoded));
});

test("obfuscate.jquery.decode-text", function() {
    var $el = $('#decode-text');
    var encoded = $el.text();
    $el.obfuscate();
    var decoded = $el.text();
    var ob = new Obfuscator();
    equal( decoded, ob.decode(encoded));
});

test("obfuscate.jquery.decode-custom", function() {
    var $el = $('#decode-custom');
    var encoded = $el.attr('custom');
    $el.obfuscate();
    var decoded = $el.attr('custom');
    var ob = new Obfuscator();
    equal( decoded, ob.decode(encoded));
});