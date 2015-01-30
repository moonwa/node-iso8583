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
        var readBytesCount = Math.ceil(length / 2) * 2;
        return chunk.read(readBytesCount).substr(0, length);
    },
    write: function(chunk, data, config){
        var result = data;

        var charCount = config.length;
        if(result.length > charCount){
            result = result.substr(0, charCount);
        }

        if(config.varlength){
            var varlenstr = ('00000000' + data.length).slice(-(Math.ceil(config.varlength / 2) * 2));
            chunk.write (varlenstr);
            chunk.write(result);
            if(data.length % 2 == 1){
                chunk.write("0");
            }
        }else{
            var bytesLength = Math.ceil(charCount / 2) * 2;
            for(var i = result.length; i < bytesLength ; i++){
                result += '0';
            }
            chunk.write(result);
        }
    }
}