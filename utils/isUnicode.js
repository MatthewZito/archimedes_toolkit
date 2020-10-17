function isUnicode(file) {
    const buffer = new Buffer.alloc(5, [0, 0, 0, 0, 0])
    const fd = fs.openSync(file, "r")
    fs.readBufferSync(fd, buff, 0, 5, 0)
    fs.closeSync(fd)
    if (buffer.isEncoding("utf8") || buffer.isEncoding("utf16be") || buffer.isEncoding("utf16le") || buffer.isEncoding("ascii")) {
      return true
    } else {
          return false
        }
  }

