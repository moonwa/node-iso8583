//var assert = require("assert")
//var Trunk = require ("../lib/trunk");
//
//describe('field types', function(){
//    describe('b', function(){
//        it('pack', function(){
//            assert.equal("0000000100101100", require("../lib/field_types/b").read(new Trunk("012c"), {length: 16}));
//            assert.equal("00000001001011", require("../lib/field_types/b").read(new Trunk("012c"), {length: 14}));
//
//            // 可变长度，左靠
//            assert.equal("00000001001011", require("../lib/field_types/b").read(new Trunk("0014012c"), {length: 100, varlength : 3}));
//        });
//    });
//    describe('a', function(){
//        it('pack', function(){
//            // 固定长度
//            assert.equal("1234", require("../lib/field_types/a").read(new Trunk("31323334"), {length: 4}));
//            // 可变长度
//            assert.equal("1234", require("../lib/field_types/a").read(new Trunk("000431323334"), {length: 100, varlength:3}));
//        });
//    });
//    describe('n', function(){
//        it('pack', function(){
//            assert.equal("3930", require("../lib/field_types/n").read(new Trunk("3930"), {length: 4}));
//            // 可变长度
//            assert.equal("3930", require("../lib/field_types/n").read(new Trunk("00043930"), {length: 100, varlength: 4}));
//        });
//    });
//});