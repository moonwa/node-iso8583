var assert = require("assert")
var Trunk = require ("../lib/trunk");

describe('trunk', function(){
    it('read', function(){
        var trunk = new Trunk("hello world");
        assert.equal("he", trunk.read(2));
        assert.equal("llo", trunk.read(3));
    });
    it('write', function(){
        var trunk = new Trunk( );
        trunk.write("hello")
        trunk.write(" world")
        assert.equal("hello world", trunk.getData());
    });
});