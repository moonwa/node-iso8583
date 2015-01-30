var assert = require("assert")
var iso8583 = require ("../lib/iso8583");

describe('iso8583', function(){
    describe('create message', function(){
        it('create message', function(){
            var msg = iso8583.create("600003000060220000000008000020000000c200120004523830383739383838303836303537373830383739383838003200000000000000000000000000000000000000000000000000000000000000000011000021990010004320202030312020202020202020202020202020202020203333333320202020202020202020202020202020");
            assert.equal("60", msg.id);
            assert.equal("0003", msg.from);
            assert.equal("0000", msg.to);
            assert.equal("60", msg.type);
            assert.equal("22", msg.majorVersion);
            assert.equal("0", msg.terminalStatus);
            assert.equal("0", msg.action);
            assert.equal("000000", msg.minorVersion);
            assert.equal("0800", msg.messageType);
            assert.equal("0020000000c20012", msg.bitmap);
        });
    });
    describe('dialect', function(){
        it('dialect', function(){
            var config = iso8583.dialect({
                "2": "n3"
            });
            assert.equal(3, config["2"].length);
            assert.equal("n", config["2"].type);
            assert.equal(0, config["2"].varlength);

            config = iso8583.dialect({
                "2": "ans..13"
            });
            assert.equal(13, config["2"].length);
            assert.equal("ans", config["2"].type);
            assert.equal(2, config["2"].varlength);
        });
    });
    describe('package', function(){
        it('dialect', function(){
            var config = iso8583.dialect({
                "11": "n6",
                "12": "n6",
                "13": "n4",
                "14": "n4",
                "15": "n4",
                "32": "n..11",
                "37": "an12",
                "39": "an2",
                "41": "ans8",
                "42": "ans15",
                "47": "ans...62",
                "60": "n...17",
                "62": "b...84",
                "63": "ans...63",
            });
            var msg = iso8583.create("600003000060220000000008000020000000c200120004523830383739383838303836303537373830383739383838003200000000000000000000000000000000000000000000000000000000000000000011000021990010004320202030312020202020202020202020202020202020203333333320202020202020202020202020202020");

            var pack = msg.pack(config);

            assert.equal("000452", pack["11"]);
            assert.equal("80879888", pack["41"]);
            assert.equal("086057780879888", pack["42"]);
            assert.equal("00002199001", pack["60"]);
            assert.equal("   01                  3333                ", pack["63"]);
        });
    });
});