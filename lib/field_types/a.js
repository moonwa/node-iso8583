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
        var byteLength = Math.ceil(length * 2)
        var data = chunk.read(byteLength);
        var text = "";
        for(var i = 0; i < byteLength; i += 2){
            text += String.fromCharCode(parseInt(data.substr(i, 2), 16))
        }
        return text.slice(0, length);
    },
    write: function(chunk, data, config){
        var result = '';
        for (var i = 0; i < data.length; i ++){
            result += ("0" + data.charCodeAt(i).toString(16)).slice(-2);
        }

        var charCount = config.length * 2;
        if(result.length > charCount){
            result = result.substr(0, charCount);
        }

        if(config.varlength){
            var varlenstr = ('00000000' + data.length).slice(-(Math.ceil(config.varlength / 2) * 2));
            chunk.write (varlenstr);
        }else{
            var bytesLength = Math.ceil(charCount);
            for(var i = result.length; i < bytesLength ; i++){
                result += '0';
            }
        }
        chunk.write(result);
    }
}