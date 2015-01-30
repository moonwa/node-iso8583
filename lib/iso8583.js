var Trunk = require("./trunk")
var Package = function(msg){
    for(var k in msg){
        this[k] = msg[k];
    }
}
Package.prototype.pack = function(config){
    var data = {};
    var bitmap = module.exports.fieldTypes["b"].read(new Trunk(this.bitmap), {
        length: 64,
        varlength: 0
    });
    var t = new Trunk(this.data);
    for(var i = 0; i < bitmap.length; i++){
        if(bitmap[i] == "1"){
            var bitmap_index = (i + 1).toString();
            var item_config = config[bitmap_index];
            if(!item_config){
                throw new Error("there is no configuration for bit " + (i+1))
            }
            var fieldType = module.exports.fieldTypes[item_config.type];
            if(!fieldType){
                throw new Error("there is no fieldType for bit " + (i+1) + ", type is " + item_config.type)
            }
            var value = fieldType.read(t, item_config);
            data[bitmap_index] = value;
        }
    }
    return data;
}
module.exports = {
    fieldTypes : {
        'a': require("./field_types/a.js"),
        'an': require("./field_types/a.js"),
        'ans': require("./field_types/a.js"),
        'as': require("./field_types/a.js"),
        'n': require("./field_types/n.js"),
        'b': require("./field_types/b.js")
    },
    dialect: function(config){
        var result = {};
        for(var k in config){
            var v = config[k];
            var item = {
                length: 0,
                varlength : 0
            };
            var length = v.match(/\d+/);
            length && (item.length = parseInt(length))

            var varlength = v.match(/\./g);
            varlength && (item.varlength = varlength.length);
            var type = v.match(/[a-zA-Z]+/g);
            if(!type){
                throw new Error("type is required for " + v);
            }
            item.type = type[0];
            result[k] = item;
        }
        return result;
    },
    create: function(data){
        return new Package ({
            id: data.substr(0, 2),
            from: data.substr(2, 4),
            to: data.substr(6, 4),
            type: data.substr(10, 2),
            majorVersion: data.substr(12, 2),
            terminalStatus: data.substr(14, 1),
            action: data.substr(15, 1),
            minorVersion: data.substr(16, 6),
            messageType: data.substr(22, 4),
            bitmap: data.substr(26, 16),
            data: data.slice(42),
        });
    }
}