const NodeMediaServer  = require('node-media-server');

//获取配置
var appConfig=require('./module/config.js');

var md5 = require('md5');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30
  },
  http: {
    port: 8000,
    allow_origin: '*'
  },
  auth: {
    play: true,
    publish: true,
    secret: appConfig.secret
  }
};

var nms = new NodeMediaServer(config)
nms.run();




//生成推流地址 -演示

var streamName="JYQlive";
var expireDate=parseInt((Date.now()+1000000)/1000);

var HashValue=md5(`/live/${streamName}-${expireDate}-${appConfig.secret}`);

var sign=`${expireDate}-${HashValue}`;

var rtmpUrl=`rtmp://172.18.23.49/live/${streamName}?sign=${sign}`;

console.log(rtmpUrl);


