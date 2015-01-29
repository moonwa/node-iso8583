var trunk = function(data){
    this.index = 0;
    this.data = data;
}
var Package = function(msg){
    for(var k in msg){
        this[k] = msg[k];
    }
}
Package.prototype.pack = function(config){
    var data = {};
    var bitmap = module.exports.fieldTypes["b"].read(new trunk(this.bitmap), {
        length: 64,
        varlength: 0
    });
    var t = new trunk(this.data);
    for(var i = 0; i < bitmap.length; i++){
        if(this.bitmap[i] == "1"){
            var item_config = config[(i + 1).toString()];
            data[(i + 1).toString()] = module.exports.fieldTypes[item_config.type](t,item_config);
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
            bitmap: data.substr(26, 8),
            data: data.slice(34),
        });
    },
    getMessageType: function(data){

    }
}