## 链接WiFi

```javascript
async function connectWifi() {
  let ssid = '201',
    pass = '123456789'
  let sysInfo = wx.getSystemInfoSync()
  let platform = sysInfo.platform
  // devtools/android/ios 
  // ios:iOS 10.0.1
  console.log("platform", platform, sysInfo.system);

  // 只有ios 11以上，及andoird 6以上，才有这样的wifi连接功能
  if (platform == "android") {
    let sysVersion = parseInt(sysInfo.system.substr(8))
    if (sysVersion < 6) {
      return "android版本低"
    }
    let res0 = await wx.wxp.getSetting({
      withSubscriptions: false,
    }).catch(err => {
      console.log("err", err);
      return `运行错误：${err}`
    })

    if (res0 && !res0.authSetting["scope.userLocation"]) {
      // 如果没有这个权限，先授权
      let authRes = await wx.wxp.authorize({
        scope: 'scope.userLocation'
      }).catch(err => {
        console.log("err", err);
        return `运行错误：${err}`
      })

      if (authRes && authRes.errMsg != "authorize:ok") {
        console.log('地理授权失败', authRes.errMsg);
        return 'android地理授权失败'
      }
    }
  } else if (platform == "ios") {
    let sysVersion = parseInt(sysInfo.system.substr(4))
    if (sysVersion < 11) {
      return "ios版本低"
    }
    await wx.wxp.showModal({
      title: '请切到系统设置->wifi列表，等待wifi连接成功',
      showCancel: false
    }).catch(err => {
      console.log("err", err);
      return `运行错误：${err}`
    })
  } else {
    return "平台不支持"
  }

  await wx.wxp.startWifi().catch(err => {
    console.log("err", err);
    return `运行错误：${err}`
  })
  await wx.wxp.getWifiList().catch(err => {
    console.log("err", err);
    return `运行错误：${err}`
  })
  let res = await new Promise((resolve, reject) => {
    wx.onGetWifiList(res => {
      resolve(res)
    })
  })
  if (!res.wifiList.length) return "wifi列表为空"
  console.log("res.wifiList", res.wifiList);

  // var signalStrength = 0;
  var bssid = '';

  for (var i = 0; i < res.wifiList.length; i++) {
    let wifi = res.wifiList[i]
    if (wifi.SSID == ssid) {
      bssid = wifi.BSSID
      break
    }
  }
  if (!bssid) return '未查询到目标wifi'
  let res1 = await wx.wxp.connectWifi({
    SSID: ssid,
    BSSID: bssid,
    password: pass
  }).catch(err => {
    console.log("err", err);
    return `运行错误：${err}`
  })
  if (res1) {
    console.log("wifi连接成功");
    return "connectWifi:ok"
  }
  return "未知错误"
}

export default connectWifilet sysInfo = wx.getSystemInfoSync();
let platform = sysInfo.platform
if(platform)
```

