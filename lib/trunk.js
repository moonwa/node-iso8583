var Trunk = function(data){
    this.index = 0;
    if (data) {
        this.data = data;
    }else{
        this.data = "";
    }
};
Trunk.prototype.read = function(len){
    this.index += len;
    return this.data.substr(this.index - len, len)
}
Trunk.prototype.write = function(data){
    this.data += data;
}
Trunk.prototype.getData = function(){
    return this.data;
}

module.exports = Trunk;