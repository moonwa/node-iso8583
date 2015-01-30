var assert = require("assert")
var Trunk = require ("../lib/trunk");

describe('field types', function(){
    describe('b', function(){
        it('read', function(){
            assert.equal("0000000100101100", require("../lib/field_types/b").read(new Trunk("012c"), {length: 16}));
            assert.equal("00000001001011", require("../lib/field_types/b").read(new Trunk("012c"), {length: 14}));

            // 可变长度，左靠
            assert.equal("00000001001011", require("../lib/field_types/b").read(new Trunk("0014012c"), {length: 100, varlength : 3}));
        });
        it('write', function(){
            /* 标准 */
            var trunk = new Trunk();
            require("../lib/field_types/b").write(trunk, "0000000100101100", {length: 16});
            assert.equal("012c", trunk.getData());

            /* 内容长度超长 */
            trunk = new Trunk();
            require("../lib/field_types/b").write(trunk, "00000001001011001111111111111111111111111", {length: 16});
            assert.equal(trunk.getData(), "012c");

            /* 内容长度超长，且非4的倍数, 尾数补0 */
            trunk = new Trunk();
            require("../lib/field_types/b").write(trunk, "000000010010110011111111111111111", {length: 15});
            assert.equal("012c", trunk.getData());

            /* 内容长度略固定长度，但未少于一个字节，需要后面补0 */
            trunk = new Trunk();
            require("../lib/field_types/b").write(trunk, "00000001001011", {length: 16});
            assert.equal("012c", trunk.getData());



            /* 长度短于1个字节 (4) */
            var trunk = new Trunk();
            require("../lib/field_types/b").write(trunk, "00000001001", {length: 16});
            assert.equal("0120", trunk.getData());

            /* 非 4 倍数的长度定义, 自动补为整字节长度 */
            var trunk = new Trunk();
            require("../lib/field_types/b").write(trunk, "", {length: 15});
            assert.equal("0000", trunk.getData());


            /* 变长: 标准 */
            var trunk = new Trunk();
            require("../lib/field_types/b").write(trunk, "0000000100101100", {length: 16, varlength: 3});
            assert.equal("0016012c", trunk.getData());

            /* 变长: 寄数长度 */
            var trunk = new Trunk();
            require("../lib/field_types/b").write(trunk, "1", {length: 16, varlength: 3});
            assert.equal("000180", trunk.getData());
        });
    });
    describe('a', function(){
        it('read', function(){
            // 固定长度
            assert.equal("1234", require("../lib/field_types/a").read(new Trunk("31323334"), {length: 4}));
            // 可变长度
            assert.equal("1234", require("../lib/field_types/a").read(new Trunk("000431323334"), {length: 100, varlength:3}));
        });


        it('write', function(){
            /* 标准 */
            var trunk = new Trunk();
            require("../lib/field_types/a").write(trunk, "1234", {length: 4});
            assert.equal("31323334", trunk.getData());


            /* 长度短于1个字节 */
            trunk = new Trunk();
            require("../lib/field_types/a").write(trunk, "123", {length: 4});
            assert.equal("31323300", trunk.getData());

            /* 长度截断 */
            trunk = new Trunk();
            require("../lib/field_types/a").write(trunk, "12345", {length: 4});
            assert.equal("31323334", trunk.getData());


            /* 变长 充数长度为 3 */
             trunk = new Trunk();
            require("../lib/field_types/a").write(trunk, "1234", {length: 4, varlength:3});
            assert.equal("000431323334", trunk.getData());

            /* 变长 充数长度为 2 */
            trunk = new Trunk();
            require("../lib/field_types/a").write(trunk, "1234", {length: 4, varlength:2});
            assert.equal("0431323334", trunk.getData());
        });
    });
    describe('n', function(){
        it('read', function(){
            assert.equal("3930", require("../lib/field_types/n").read(new Trunk("3930"), {length: 4}));
            // 可变长度
            assert.equal("3930", require("../lib/field_types/n").read(new Trunk("00043930"), {length: 100, varlength: 3}));
            var trunk = new Trunk("0011000021990010");
            assert.equal("00002199001", require("../lib/field_types/n").read(trunk, {length: 100, varlength: 3}));
            assert.equal(16, trunk.index);
        });


        it('write', function(){
            /* 标准 */
            var trunk = new Trunk();
            require("../lib/field_types/n").write(trunk, "1234", {length: 4});
            assert.equal("1234", trunk.getData());
            /* 奇数长度 */
            var trunk = new Trunk();
            require("../lib/field_types/n").write(trunk, "1234", {length: 3});
            assert.equal("1230", trunk.getData());

            /* 内容长度超长 */
            trunk = new Trunk();
            require("../lib/field_types/n").write(trunk, "12345678", {length: 4});
            assert.equal(trunk.getData(), "1234");

            /* 内容长度超长且len不为2的整数倍 */
            trunk = new Trunk();
            require("../lib/field_types/n").write(trunk, "11111", {length: 3});
            assert.equal("1110", trunk.getData());

            /* 内容长度略固定长度，但未少于一个字节，需要后面补0 */
            trunk = new Trunk();
            require("../lib/field_types/n").write(trunk, "123", {length: 4});
            assert.equal("1230", trunk.getData());


            /* 非 4 倍数的长度定义, 自动补为整字节长度 */
            var trunk = new Trunk();
            require("../lib/field_types/n").write(trunk, "", {length: 3});
            assert.equal("0000", trunk.getData());


            /* 变长: 标准 */
            var trunk = new Trunk();
            require("../lib/field_types/n").write(trunk, "1234", {length: 4, varlength: 3});
            assert.equal("00041234", trunk.getData());

            /* 变长: 奇数 */
            var trunk = new Trunk();
            require("../lib/field_types/n").write(trunk, "123", {length: 4, varlength: 3});
            assert.equal("00031230", trunk.getData());
        });
    });
});