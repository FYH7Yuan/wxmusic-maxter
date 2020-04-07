var Promise = require('es6-promise.min.js') //用es6-promise.min.js

function wxPromisify(fn) {
  return function(obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function(res) {
        resolve(res)
      }
      obj.fail = function(res) {
        reject(res)
      }
      fn(obj)
    })
  }
}

const get = (url, data) => {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    wx.request({
      url: url,
      data: data,
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success: function(res) { //服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else { //返回错误提示信息
          reject(res.data);
        }
      },
      error: function(e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}

const post = (url, data) => {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync('token')
      },
      success: function(res) { //服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else { //返回错误提示信息
          reject(res.data);
        }
      },
      error: function(e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}
// 格式化时间 传入毫秒，输出分秒
function formatTime(time) {
  time = new Date(time);

  function _formatNumber(number) {
    // 方法一：数值处理
    return number / 10 < 1 ? "0" + number : number;
    // 方法二：字符串处理
    // number = number.toString();
    // return number[1] ? number : '0' + number;
  }
  return `${_formatNumber(time.getMinutes())}:${_formatNumber(time.getSeconds())}`;
}

// 格式化时间 传入毫秒，输出年月日
function formatDate(time) {
  let date = new Date(time);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

// 格式化歌词 输入字符串，输出数组
function formatLyric(content) {
  let newArr = new Array();
  let rowArr = content.split('\n');
  for (var row of rowArr) {
    if (row.indexOf(']') == "-1" && row) {
      row && newArr.push({
        lrc: row
      });
    } else if (row.indexOf(']') != "-1") {
      let time = row.split(']').shift().substr(1, 8);
      if (row.split(']').pop()) {
        row && newArr.push({
          lrc: row.split(']').pop(),
          sec: parseInt(time.split(':')[0] * 60 + time.split(':')[1] * 1)
        });
      };
    };
  };
  return newArr;
}

// 格式化播放量 输入数字数组，输出带单位的数组
function formatPlayedCount(countArr) {
  let newCountArr = new Array();
  if (countArr instanceof Array) {
    countArr.forEach(count => {
      if (count >= 1000000000) {
        newCountArr.push(`${(count / 100000000).toFixed(0)}亿`);
      } else if (count >= 100000000) {
        newCountArr.push(`${(count / 100000000).toFixed(1)}亿`);
      } else if (count >= 100000) {
        newCountArr.push(`${(count / 10000).toFixed(0)}万`);
      } else {
        newCountArr.push(count);
      };
    });
    return newCountArr;

  } else {
    let count = countArr;
    if (count > 300000000) {
      count = `${(count / 100000000).toFixed(0)}亿`;
    } else if (count >= 100000000) {
      count = `${(count / 100000000).toFixed(1)}亿`;
    } else if (count >= 100000) {
      count = `${(count / 10000).toFixed(0)}万`;
    } else {
      count = count;
    };
    return count;
  };
}

function renderContent(value) {
  if (value != undefined && value != null) {
    // 转为百分比展示,如数据为0.16666666666666666这个数据转换成16.67%，以及如果是0.5这种转换成50.00%格式。
    const scale = ((Math.round((value * 10000))) / 100.00).toFixed(2) + '%';
    return scale;
  }
}

function getRandom(min, max) {
  return Math.round(Math.random()*(max-min)+min)
}
module.exports = {
  post,
  get,
  wxPromisify,
  formatTime,
  formatDate,
  formatLyric,
  formatPlayedCount,
  renderContent,
  getRandom
}