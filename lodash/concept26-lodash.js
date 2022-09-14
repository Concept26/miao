var concept26 = {

  
  chunk: function (arry, size = 1) { // 将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。
    let result = [], arr = []
    for (let i = 0; i < arry.length; i++) {
      arr.push(arry[i])
      if (arr.length == size) {
        result.push(arr)
        arr = []
      }
    }
    if (arr[0]) result.push(arr) //如有剩余的数组则拼接
    return result
  },

  
  compact: function (arry) { //创建一个新数组，包含原数组中所有的非假值元素。
    let result = []
    for (let i = 0; i < arry.length; i++) {
      if (arry[i]) result.push(arry[i]) // if判断中，false, null,0, "", undefined,NaN 都为 false
    }
    return result
  },

 
  difference: function (arry, ...values) {  //即创建一个新数组，这个数组中的值，为第一个数组（array 参数）排除了给定数组中的值
    let diff = [], map = {}, result = []
    diff.push(...values)
    diff = diff.flat()
    for (let i = 0; i < diff.length; i++) {
      if (!(diff[i] in map)) {
        map[diff[i]] = 1
      }
    }
    for (let i = 0; i < arry.length; i++) {
      if (!(map[arry[i]])) {
        result.push(arry[i])
      }
    }
    return result
  },

  // differenceBy: function (array, ...args) {
  //   let iteratee
  //   if (isArray(args[args.length - 1])) {
  //       iteratee = identity
  //   } else {
  //       iteratee = Iteratee(args.pop())
  //   }
  //   let values = flatten(args).map(iteratee)
  //   let result = []
  //   for (let i = 0; i < array.length; i++) {
  //       let val = iteratee(array[i])
  //       if (!includes(values, val)) {
  //           result.push(array[i])
  //       }
  //   }
  //   return result
// },
  
  
  fill: function (array, value, start = 0, end) { // 使用 value 值来填充（替换） array，从start位置开始, 到end位置结束（但不包含end位置）
    if (!end && !(end == 0)) end = array.length
    for (let i = start; i < end; i++) {
      array[i] = value
    }
    return array
  },

  
  drop: function (arry, n = 1){ // 创建一个切片数组，去除array前面的n个元素。（n默认值为1。）
    if (n > arry.length) {
      return []
    } else if (n == 0) {
      return arry
    }
    let result = [] 
    for (let i = n; i < arry.length; i++) {
      result.push(arry[i])
    }
    return result
  }

}
