module.exports = {
    /*  */
    read: function(chunk, config){
        var length = config.length;
        if(config.varlength){
            length = parseInt(chunk.read(Math.ceil(config.varlength / 2) * 2), 10);
            if(length > config.length){
                length = config.length;
            }
        }

        var byteLength = Math.ceil(length/4)
        var data = chunk.read(byteLength);
        var text = "";
        for(var i = 0; i < byteLength; i++){
            text += ('0000' + parseInt(data[i], 16).toString(2)).slice(-4)
        }
        return text.slice(0, length);
    },
    write: function(chunk, data, config){
        var result = '';
        for (var i = 0; i < data.length; i += 4){
            // 右边补0
            var s = (data.substr(i, 4) + "0000").substr(0, 4);
            result += parseInt(s, 2).toString(16);
        }

        var charCount = Math.ceil(config.length / 4);
        if(result.length > charCount){
            result = result.substr(0, charCount);
        }

        if(config.varlength){
            var varlenstr = ('00000000' + data.length).slice(-(Math.ceil(config.varlength / 2) * 2));
            chunk.write (varlenstr);
            chunk.write(result);
            if(Math.ceil(data.length / 4) % 2 != 0){
                chunk.write("0");
            }
        }else{
            var bytesLength = Math.ceil(charCount);
            for(var i = result.length; i < bytesLength ; i++){
                result += '0';
            }
            chunk.write(result);
        }
    }
}