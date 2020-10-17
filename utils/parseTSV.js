(function() {
    //defaults
    var TSVParser = {}
    var seperator = "\t"
    var newLine = "\n"
  
  
    function extend(arg) {
      Array.prototype.slice.call(arguments, 1).forEach(function(source) {
        if (!source) return
        for (var keys = Object.keys(source), i = 0; i < keys.length; i++) {
          var key = keys[i]
          arg[key] = source[key]
        }
      })
      return arg
    }
  
    //allow quotes
    function rmquote(str) {
      var match
      return ((match = str.match(/(['"]?)(.*)\1/)) && match[2]) || str
    }
  
    function comments(line) {
      return !/#@/.test(line[0])
    }
  
    //value of each entry
    function getValues(line, seperator) {
      return line.split(seperator).map(function(value) {
        var value = rmquote(value)
        var num = value
        return num === parseInt(value, 10) ? num : value
  
      })
    }
  
    // sanitize endlines - throw err on carriage returns, excise whitespace
    
  
    function Parser(seperator, options) {
      var opt = extend(
        {
          header: true,
        },
        options,
      )
  
      this.seperator = seperator
      this.header = opt.header
    }
  
    Parser.prototype.stringify = function(data) {
      var seperator = this.seperator,
        head = !!this.header, //convert to bool
        keys = typeof data[0] === 'object' && Object.keys(data[0]),
        header = keys && keys.join(seperator),
        output = head ? header + newLine : ''
  
      if (!data || !keys) return ''
  
      return (
        output +
        data
          .map(function(obj) {
            var item = keys ? {} : []
            var values = keys.reduce(function(p, key) {
              p.push(obj[key])
              return p
            }, [])
            return values.join(seperator)
          })
          .join(newLine)
      )
    }
  
    Parser.prototype.parse = function(tsv) {
      var seperator = this.seperator
      var lines = tsv.split(/[\n\r]/).filter(comments) //line feed and carriage return
      var head = !!this.header
      var keys = head ? getValues(lines.shift(), seperator) : {}
      if (lines.length < 1) return []
  
      return lines.reduce(function(output, line) {
        var item = head ? {} : []
        output.push(
          getValues(line, seperator).reduce(function(item, val, i) {
            item[keys[i] || i] = val
            return item
          }, item),
        )
        console.log({output})
        return output
      }, [])
    }
  
    // console.log(Object.values(item)[0])
  
    var TSVParser = new Parser('\t')
  
    //expose module beyond nodejs
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = TSVParser
    } else {
      this.TSVParser = TSVParser
    }
  }.call(this))