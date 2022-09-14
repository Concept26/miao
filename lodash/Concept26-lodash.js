var maio = {
  chunk: function(array, size = 1) {
    var temp = new Array(Math.ceil(array.length / size))
    var a = 0
    for (var i = 0; i < array.length; i++) {
        temp[a] ? temp[a] : temp[a] = []
        temp[a].push(array[i])
        if (temp[a].length == size) {
            a++
        }
    }
    return temp
}

}
