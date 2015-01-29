module.exports = {
    /*  */
    read: function(chunk, config){
        var length = config.length;
        if(config.varlength){
            length = parseInt(chunk.read(config.varlength), 10);
            if(length > config.length){
                length = config.length;
            }
        }
        return chunk.read(length);
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