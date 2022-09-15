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

  //创建一个新数组，包含原数组中所有的非假值元素。
  compact: function (arry) { 
    let result = []
    for (let i = 0; i < arry.length; i++) {
      if (arry[i]) result.push(arry[i]) // if判断中，false, null,0, "", undefined,NaN 都为 false
    }
    return result
  },

  //即创建一个新数组，这个数组中的值，为第一个数组（array 参数）排除了给定数组中的值
  difference: function (arry, ...values) {  
    let diff = [], map = {}, result = []
    diff.push(...values)
    diff = diff.flat()  // 展开数组中的数组
    for (let i = 0; i < diff.length; i++) { // 用 map 记录数组中出现过的数字
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
  
  // 使用 value 值来填充（替换） array，从start位置开始, 到end位置结束（但不包含end位置）
  fill: function (array, value, start = 0, end) { 
    if (!end && !(end == 0)) end = array.length  // 设置end默认值
    for (let i = start; i < end; i++) {
      array[i] = value
    }
    return array
  },

  // 创建一个切片数组，去除array前面的n个元素。（n默认值为1。）
  drop: function (arry, n = 1){ 
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
  },

  // 搜索数组下标
  findIndex: function (arry, predicate, formIndex = 0) {
    if (Array.isArray(predicate)) {
      for (let i = formIndex; i < arry.length; i++) {
        for (let j = 0; j < predicate.length; j++) {
          if (predicate[j] in arry[i]) {
            if (predicate[j + 1] == arry[i][predicate[j]]) return i
          }
          else break
        }
      }
    } else if (typeof predicate == 'string'){
      for (let i = formIndex; i < arry.length; i++) {
        if (predicate in arry[i]) {
          if (arry[i][predicate]) return i
        }
      }
    } else if (typeof predicate == 'object') {
      for (let i = formIndex; i < arry.length; i++) {
        let flag = true, each = arry[i]
        for (let key in predicate) {
          if (key in each && predicate[key] == each[key]) {}
          else flag = false
        }
        if (flag) return i
      }
    } else {
      for (let i = formIndex; i < arry.length; i++) {
        if (predicate(arry[i])) return i
      } 
    }
    
  return -1
  },

  // 反向搜索数组下标
  findLastIndex: function (arry, predicate, formIndex) {
    if (!formIndex && !(formIndex == 0)) formIndex = arry.length - 1 // 设置formIndex默认值
    if (Array.isArray(predicate)) {
      for (let i = formIndex; i >= 0; i--) {
        for (let j = 0; j < predicate.length; j++) {
          if (predicate[j] in arry[i]) {
            if (predicate[j + 1] == arry[i][predicate[j]]) return i
          }
          else break
        }
      }
    } else if (typeof predicate == 'string') {
      for (let i = formIndex; i >= 0; i--) {
        if (predicate in arry[i]) {
          if (arry[i][predicate]) return i
        }
      }
    } else if (typeof predicate == 'object') {
      for (let i = formIndex; i >= 0; i--) {
        let flag = true, each = arry[i]
        for (let key in predicate) {
          if (key in each && predicate[key] == each[key]) {}
          else flag = false
        }
        if (flag) return i
      }
    } else {
      for (let i = formIndex; i >= 0; i--) {
        if (predicate(arry[i])) return i
      } 
    }
  return -1
  },

  //减少一级array嵌套深度
  flatten: function (arry) {
    let result = []
    for (let i = 0; i < arry.length; i++) {
      if (Array.isArray(arry[i])) {
        for (let each of arry[i]) {
          result.push(each)
        }
      } else {
        result.push(arry[i])
      }
    }
    return result
  },

  // 将array递归为一维数组。
  flattenDeep: function (arry) {
    let result = []
    fDeep(arry)
    function fDeep(arry) {
      for (let i = 0; i < arry.length; i++) {
        if (Array.isArray(arry[i])) {
          fDeep(arry[i])
        } else {
          result.push(arry[i])
        }
      }
    }
    return result
  },

  //根据 depth 递归减少 array 的嵌套层级
  flattenDepth: function (arry, depth = 1) {
    let result = [], rec = 0 // rec 记录递归次数
    fDeep(arry, depth)
    function fDeep(arry, depth) {
      for (let i = 0; i < arry.length; i++) {
        if (Array.isArray(arry[i])) {
          rec++
          if (rec > depth) {
            result.push(arry[i])
            rec = 0   // 递归次数大于目标值时清零
          } else {
            fDeep(arry[i], depth)
          }
        } else {
          result.push(arry[i])
        }
      }
    }
    return result
  },

  //返回一个由键值对pairs构成的对象
  fromPairs: function (pairs) {
    let result = {}
    for (let i = 0; i < pairs.length; i++) {
      result[pairs[i][0]] = pairs[i][1]
    }
    return result
  },

  //返回数组 array 的第一个元素
  head: function (array) {
    return array[0]
  },

  //返回首次 value 在数组array中被找到的 索引值， 如果 fromIndex 为负值，将从数组array尾端索引进行匹配
  indexOf: function (array, value, fromIndex = 0) {
    if (fromIndex >= 0) {
      for (let i = fromIndex; i < array.length; i++) {
        if (array[i] == value) return i
      }
    } else {
      for (let i = array.length + fromIndex; i < array.length; i++) {
        if (array[i] == value) return i
      }
    }
    return -1
  },

  // 从右到左遍历array的元素
  lastIndexOf: function (array, value, fromIndex) {
    if (!fromIndex && !(fromIndex == 0)) fromIndex = array.length - 1
    for (let i = fromIndex; i >= 0; i--) {
      if (array[i] == value) return i
    }
    return -1
  },

  //获取数组array中除了最后一个元素之外的所有元素
  initial: function (array) {
    let result = []
    for (let i = 0; i < array.length - 1; i++) {
      result.push(array[i])
    }
    return result
  },

  //将 array 中的所有元素转换为由 separator 分隔的字符串
  join: function (array, separator = ',') {
    let result = '', has = false // 记录是否第一次循环
    for (let i = 0; i < array.length; i++) {
      if (has) result += separator //第一次循环不加分隔符
      result += array[i] 
      has = true
    }
    return result 
  },

  //获取array中的最后一个元素
  last: function (array) {
    return array[array.length - 1]
  },

  //移除数组array中所有和给定值相等的元素，这个方法会改变数组
  pull: function (array, ...values) {
    for (let i = 0; i < array.length; i++) {
      if (values.includes(array[i])) {
        array.splice(i, 1) // 从指定位置删除，修改原数组
        i--
      }
    }
    return array
  },

  //反转array，这个方法会改变原数组
  reverse: function (array) {
    for (let i = 0, j = array.length - 1; i < j; i++, j--) { // 双指针反转原数组
      let temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }
}
