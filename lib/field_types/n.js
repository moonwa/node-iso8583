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
        var length = data.length;
        if (length > config.length) {
            length = config.length;
        }

        if(config.varlength){
            chunk.write (('00000000' + data.length).slice(-config.varlength));
        }
        chunk.write(data.substr(0, length));
    }
}