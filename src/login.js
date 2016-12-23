import eventHub from './eventHub';
const isWX = /MicroMessenger/i.test(navigator.userAgent)
export default function login(successCallback) {
	if (!isWX) {
		$.get('/app-sdk/oauth2/getVistorId', (res) => {
			if (res.code) {
				window.localStorage.noLogin=true;
	            window.localStorage.userId=res.data.uId;
	            window.localStorage.nickName=res.data.nickName;
	            window.localStorage.iconUrl=res.data.iconUrl;
			}
		})
		return;
	}
	if (!window.localStorage.wechatToken) {
		getToken()
	} else {
		getUserInfo(window.localStorage.wechatToken, successCallback);
	}
}

function getToken() {
	$.get('/app-sdk/oauth2/getUserInfo?redirectToUrl='
		+ encodeURIComponent(location.href), (res) => {
            if (res.code == 200) {
                window.localStorage.wechatToken = res.data.token;
                window.location.href = res.data.resultInfo;
            }
		});
}
function getUserInfo(wechatToken, cb) {
	$.get('/app-sdk/oauth2/getUserInfo?token=' + wechatToken, (res) => {
        if(res.code==200){
            if(res.data.userInfo){
                window.localStorage.uId=res.data.userInfo.uId;
                window.localStorage.nickName=res.data.userInfo.nickName;
                window.localStorage.iconUrl=res.data.userInfo.iconUrl;
                $.post('/app-server/app/saveUserInfo',
                    {
                        openId: res.data.userInfo.uId,
                        nickName: res.data.userInfo.nickName,
                        img: res.data.userInfo.iconUrl
                    }, function(res){
                        if(res.code === 200 && res.data) {
			                window.localStorage.userId=res.data.userId;
                        }
                    })
            }else{
                window.localStorage.wechatToken='';
                getToken()
            }
        }
	});
}