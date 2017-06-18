import request from './utils/request'
import jp_cn from './parser/jp-cn'

let OPTIONS = {
  cos_proxy: ''
}

let VOID_CALLBACK = function () {}

export default {
  jp2cn(query, callback) {
    this.query({
      parser: jp_cn.parser,
      url: jp_cn.url,
      query,
      callback
    })
  },
  query(option) {
    option = Object.assign({}, OPTIONS, option)

    let url = option.url(option.query)
    url = encodeURI(url)
    if (option.cos_proxy) {
      if (typeof option.cos_proxy === 'function')
        url = option.cos_proxy(url)
      else
        url = option.cos_proxy + url
    }

    var html = request(url, (data, e) => {
      (option.callback || VOID_CALLBACK)({
        query: option.query,
        result: option.parser(data)
      })
    })
  }
}