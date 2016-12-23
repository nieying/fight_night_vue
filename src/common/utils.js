var md5 = require('src/lib/md5.min.js');
module.exports = {
	validate: {
		isEmpty: function(value) {
			return !value || !value.length;
		},
		certidValidata: function(value) {
			if (!/(^\d{15}$)|(^\d{17}(\d|X)$)/.test(value)) {
				return false;
			} else {
				var strJiaoYan = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'),
					intQuan = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1),
					intTemp = 0,
					i;

				for (i = 0; i < value.length - 1; i++) {
					intTemp += value.substring(i, i + 1) * intQuan[i];
				}

				intTemp %= 11;
				return value.substring(value.length - 1) === strJiaoYan[intTemp];
			}
		},
		bankCard: function(value) {
			return /^[0-9]{10,19}$/.test(value);
		},
		phoneNumber: function(value) {
			return /^(13|15|18|17|14)[0-9]{9}$/.test(value);
		},
		checkPwd: function(value) {
			return /^(?![^a-zA-Z]+$)(?!\D+$).{6,20}$/.test(value);
		},
		checkLogpwd: function(value) {
			return /\S{6,20}$/.test(value);
		},
		verifyCode: function(value) {
			return /^\d{6}$/.test(value);
		},
		comparePwd: function(one, two) {
			return one === two;
		}
	},
	localItem: {
		get: function(key) {
			key = 'qykj_' + key;
			if (this.isLSsuport()) {
				try {
					return window.localStorage.getItem(key) || '';
				} catch (e) {
					return '';
				}
			}

			return this.getCookie(key);
		},
		set: function(key, value) {
			key = 'qykj_' + key;
			if (this.isLSsuport()) {
				try {
					window.localStorage.setItem(key, value);
				} catch (e) {
					return '';
				}
			} else {
				return this.setCookie(key, value);
			}
		},
		isLSsuport: function() {
			try {
				return 'localStorage' in window && window['localStorage'] !== null;
			} catch (e) {
				return false;
			}
		},
		setCookie: function(key, value) {
			var Days = 30;
			var exp = new Date();
			exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
			document.cookie = key + "=" + escape(value) + ";expires=" + exp.toGMTString();
		},
		getCookie: function(key) {
			var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");

			if (arr === document.cookie.match(reg)) {
				return unescape(arr[2]);
			} else {
				return null;
			}
		}
	},
	tool: {
		formatLimit: function(value) {
			if (value / 10000 < 1) {
				return value;
			} else {
				return value / 10000 + '万';
			}
		},
		evalParse: function(data) {
			if (typeof data == "object") {
				return data;
			}
			data = data.replace(/\ /g, '');
			var parseData = data.replace(/([^\[\{\,]*):([^\}\]\,]*)/g, function(e, t, o) {
				if (t[0] !== "\"" && t[0] !== "'") {
					t = "\"" + t + "\"";
				}
				if (o[0] !== "\"" && o[0] !== "'") {
					o = "\"" + o + "\"";
				}
				return (t + ":" + o).replace(/\'/g, "\"");
			});
			return JSON.parse(parseData);
		},
		makeMd5: function(data) {
			return md5(data);
		},
		setPageTitle: function(name) {
			document.title = name;
			if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
				var i = document.createElement('iframe');
				i.src = '/favicon.ico';
				i.style.display = 'none';
				i.onload = function() {
					setTimeout(function() {
						i.remove();
					}, 9)
				}
				document.body.appendChild(i);
			}

		},
		formatDecimals: function(value, max) {
			var _value = '' + value,
				length = _value.length,
				dotIndex = _value.indexOf('.');
			if (dotIndex !== -1 && dotIndex + 1 < length - max) {
				return parseFloat(_value, 10).toFixed(max);
			}
			return value;
		},
		checkPath: function(path, name) {
			var r = new RegExp("\\/(" + name + ")($|\\?\S*)");
			return r.test(path);
		},
		compress: function(img) {
			var initSize = img.src.length;
			var width = img.width;
			var height = img.height;

			//如果图片大于四百万像素，计算压缩比并将大小压至400万以下
			var ratio;
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');
			if ((ratio = width * height / 4000000) > 1) {
				ratio = Math.sqrt(ratio);
				width /= ratio;
				height /= ratio;
			} else {
				ratio = 1;
			}

			canvas.width = width;
			canvas.height = height;

			//        铺底色
			// ctx.fillStyle = "#fff";
			// ctx.fillRect(0, 0, canvas.width, canvas.height);

			var tCanvas = document.createElement('canvas');
			var tctx = tCanvas.getContext('2d');
			//如果图片像素大于100万则使用瓦片绘制
			var count;
			if ((count = width * height / 1000000) > 1) {
				count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片

				//            计算每块瓦片的宽和高
				var nw = ~~(width / count);
				var nh = ~~(height / count);
				tCanvas.width = nw;
				tCanvas.height = nh;

				for (var i = 0; i < count; i++) {
					for (var j = 0; j < count; j++) {
						tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);

						ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
					}
				}
			} else {
				ctx.drawImage(img, 0, 0, width, height);
			}

			//进行最小压缩
			var ndata = canvas.toDataURL('image/jpeg', 0.5);

			console.log('压缩前：' + initSize);
			console.log('压缩后：' + ndata.length);
			console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");

			return ndata;
		}
	}

};
