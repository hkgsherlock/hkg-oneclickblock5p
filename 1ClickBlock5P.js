//load the array list from the SVN trunk
var OneClickBlock5PArrayLoader = document.createElement('script');
OneClickBlock5PArrayLoader.type = 'text/javascript';
OneClickBlock5PArrayLoader.src = 'http://hkg-oneclickblock5p.googlecode.com/svn/trunk/array.js';
document.getElementsByTagName('head')[0].appendChild(OneClickBlock5PArrayLoader);

var runDate = new Date();
var logText = '<html><head></head><body>一鍵 Block 5P 腳本<hr width="100%"/>執行日期及時間：' + runDate.toLocaleDateString() + ' ' + runDate.toLocaleTimeString() + '</br>以下為所有在腳本中指定用戶的結果： [userid, result]</br>';
var OneClickBlock5P_BlockingWorking = false;
function OneClickBlock5P_Dispose()
{
	/*if(OneClickBlock5P_BlockingWorking)
	{
		OneClickBlock5P_AwaitingToDisposeFlag = true;
	}
	else
	{
		document.getElementById('topFunc').innerHTML = '';
	}*/
	document.getElementById('topFunc').innerHTML = '';
}
document.getElementById('topFunc').innerHTML = '<div id="OneClickBlock5P_Background" style="width: 100%; height: 100%; position: fixed; left: 0; top: 0; background-color: #000000; opacity: 0.5;"></div><div id="OneClickBlock5P_Container" style="position: fixed; left: 50%; top: 50%; margin: -50px 0 0 -150px; padding: 10px 10px 10px 10px; width: 300px; height: 100px; background-color: #999999; border: 1px solid #333333; color: #000000; ">Loading</div>';
function OneClickBlock5P_cOut(text)
{
	document.getElementById('OneClickBlock5P_Container').innerHTML = text;
}
function OneClickBlock5P_InitialiseBlockUI()
{
	var OneClickBlock5P_BlockingHTML = '執行中……<br/><br/><div id="OneClickBlock5P_StatusText">StatusText</div><br/><div style="width: 100%; height: 22px;"><div id="OneClickBlock5P_ProgressBarBackground" style="border: 1px solid; margin: 0 60px -22px 0; height: 100%;"><div id="OneClickBlock5P_ProgressBarForeground" style="background-color: #0000cc; width: 0; height: 100%;"></div></div>&nbsp;<button type="button" style="width: 50px; height: 100%; float: right;" onclick="OneClickBlock5P_Dispose()">取消</button></div>';
	OneClickBlock5P_cOut(OneClickBlock5P_BlockingHTML);
}
var OneClickBlock5P_ConfirmHTML = '你是否確定要將所有 5P 契弟一次過 Block 清？<br />在本腳本執行期間你可以隨時終止動作。<br/><p style="text-align: center;"><button type="button" onclick="OneClickBlock5P_InitialiseBlockUI(); OneClickBlock5P_DoBlockNextUserId();">確定</button>&nbsp;<button onclick="OneClickBlock5P_Dispose()">取消</button></p>';
OneClickBlock5P_cOut(OneClickBlock5P_ConfirmHTML);
function OneClickBlock5P_RefreshBlockStatusText(text)
{
	document.getElementById('OneClickBlock5P_StatusText').innerHTML = text;
}
function OneClickBlock5P_RefreshBlockStatusPercentage(percentage)
{
	document.getElementById('OneClickBlock5P_ProgressBarForeground').width = percentage * 100 + "%";
}
var OneClickBlock5P_AwaitingToDisposeFlag = false;
var OneClickBlock5P_BlockingIndex = -1;
var OneClickBlock5P_BlockingIdAsText = '';
var OneClickBlock5P_SuccessBlockCount = 0;
var OneClickBlock5P_AlreadyBlockedCount = 0;
var OneClickBlock5P_ErrorBlockCount = 0;
var OneClickBlock5P_BlockResult = [];
var OneClickBlock5P_BlockErrorText = [];
function OneClickBlock5P_DoBlockNextUserId()
{
	if(OneClickBlock5P_AwaitingToDisposeFlag)
	{
		OneClickBlock5P_Dispose();
	}
	else
	{
		OneClickBlock5P_BlockingWorking = true;
		OneClickBlock5P_BlockingIndex++;
		OneClickBlock5P_BlockingIdAsText = OneClickBlock5P_UserId[OneClickBlock5P_BlockingIndex];
		logText += OneClickBlock5P_BlockingIdAsText + ': ';
		OneClickBlock5P_RefreshBlockStatusText(OneClickBlock5P_BlockingIdAsText + ': ' + '正等候伺服器回應中……');
		var goodResult = false;
		var resultObject = new Object();
		MessageFunc.BlockUser(OneClickBlock5P_UserId[OneClickBlock5P_BlockingIndex], OneClickBlock5P_GoodResult, OneClickBlock5P_BadResult);
		OneClickBlock5P_OnBlockUserSucceeded();
	}
}
function OneClickBlock5P_GoodResult(result)
{
	if (result.errMsg != "") {
		document.getElementById('bottomFunc').innerHTML = result.errMsg;
	} else {
		document.getElementById('bottomFunc').innerHTML = '';
	        blocked_list = result.list;
	        CheckBlockedUser();
	}
}
function OneClickBlock5P_BadResult(result)
{
	document.getElementById('bottomFunc').innerHTML = '發生伺服器錯誤。請屌 @min。';
}
function OneClickBlock5P_OnBlockUserSucceeded()
{
	var msg = document.getElementById('bottomFunc').innerHTML;
	OneClickBlock5P_BlockingWorking = false;
	if (msg == 'The user is already blocked before.')
	{
		OneClickBlock5P_RefreshBlockStatusText(OneClickBlock5P_BlockingIdAsText + ': ' + '該用戶早已在閣下封鎖列表中。');
		OneClickBlock5P_AlreadyBlockedCount++;
		logText += '已存在於列表</br>';
	}
	else if (msg != '')
	{
		OneClickBlock5P_RefreshBlockStatusText(OneClickBlock5P_BlockingIdAsText + ': 錯誤：' + msg);
		OneClickBlock5P_ErrorBlockCount++;
		logText += '錯誤："' + msg + '"</br>';
	}
	else
	{
		OneClickBlock5P_RefreshBlockStatusText(OneClickBlock5P_BlockingIdAsText + ': ' + '已成功 block 此 user！');
		OneClickBlock5P_SuccessBlockCount++;
		logText += '成功<br/>';
	}
	OneClickBlock5P_RefreshBlockStatusPercentage(OneClickBlock5P_BlockingIndex / OneClickBlock5P_UserId.length);
	if (OneClickBlock5P_BlockingIndex + 1 < OneClickBlock5P_UserId.length)
	{
		OneClickBlock5P_DoBlockNextUserId();
	}
	else
	{
		OneClickBlock5P_BlockingIndex = -1;
		OneClickBlock5P_BlockFinished();
	}
}
function OneClickBlock5P_BlockFinished()
{
	logText += '<br/><hr width="100%"/></body></html>';
	var OneClickBlock5P_FinishHTML = '完成！<br/><br/>總數 ' + OneClickBlock5P_UserId.length + ' | 成功 ' + OneClickBlock5P_SuccessBlockCount + ' | 錯誤 ' + OneClickBlock5P_ErrorBlockCount + ' | 已存在 ' + OneClickBlock5P_AlreadyBlockedCount + '<br /><a href="data:text/html;charset=utf-8,' + encodeURI(logText) + '" target="_blank" download="OneClickBlock5P_log.txt">如需詳細記錄請按此開新頁查看或儲存。</a><br /><div style="text-align: center;"><button type="button" onClick="OneClickBlock5P_Dispose()">關閉</button>';
	OneClickBlock5P_cOut(OneClickBlock5P_FinishHTML);
}