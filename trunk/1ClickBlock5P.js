// load the array list from the SVN trunk
// Block List
var OneClickBlock5PBlockArrayLoader = document.createElement('script');
OneClickBlock5PBlockArrayLoader.type = 'application/javascript';
OneClickBlock5PBlockArrayLoader.id = 'OneClickBlock5PBlockArrayLoaderScript';
OneClickBlock5PBlockArrayLoader.src = 'http://hkg-oneclickblock5p.googlecode.com/svn/trunk/array.js';
document.getElementsByTagName('head')[0].appendChild(OneClickBlock5PBlockArrayLoader);
// Unblock list
var OneClickBlock5PUnblockArrayLoader = document.createElement('script');
OneClickBlock5PUnblockArrayLoader.type = 'application/javascript';
OneClickBlock5PUnblockArrayLoader.id = 'OneClickBlock5PUnblockArrayLoaderScript';
OneClickBlock5PUnblockArrayLoader.src = 'http://hkg-oneclickblock5p.googlecode.com/svn/trunk/unblock_array.js';
document.getElementsByTagName('head')[0].appendChild(OneClickBlock5PUnblockArrayLoader);

// ...
var OneClickBlock5P_oTitle = document.title;
var OneClickBlock5P_runDate = new Date();
var OneClickBlock5P_logText = '<html><head></head><body>�@�� Block 5P �}��<hr width="100%"/>�s���� User-Agent�G' + navigator.userAgent + '<br/>�������ήɶ��G' + OneClickBlock5P_runDate.toLocaleDateString() + ' ' + OneClickBlock5P_runDate.toLocaleTimeString() + '</br>�H�U���Ҧ��b�}�������w�Τ᪺���G�G [userid, result]</br>';
var OneClickBlock5P_Working = false;
function OneClickBlock5P_Dispose()
{
	if(OneClickBlock5P_Working)
	{
		OneClickBlock5P_AwaitingToDisposeFlag = true;
		OneClickBlock5P_RefreshBlockStatusTitle(OneClickBlock5P_GetBlockStatusTitle().replace('���椤','���b�����A�еy��'));
		document.getElementById('OneClickBlock5P_Container').style.cursor="wait";
	}
	else
	{
		document.title = OneClickBlock5P_oTitle;
		document.getElementById('OneClickBlock5P_Container').style.cursor="default";
		document.getElementsByTagName('body')[0].removeChild(document.getElementById('OneClickBlock5PInterface'));
		var ScriptNodeToRemoveById = ['OneClickBlock5PLoaderScript', 'OneClickBlock5PBlockArrayLoaderScript', 'OneClickBlock5PUnblockArrayLoaderScript'];
		for (var i = 0; i < ScriptNodeToRemoveById.length; i++)
		{
			if(document.getElementById(ScriptNodeToRemoveById[i]) != null) document.getElementById(ScriptNodeToRemoveById[i]).parentNode.removeChild(document.getElementById(ScriptNodeToRemoveById[i]));
		}
	}
}
var OneClickBlock5PInterface = document.createElement('div');
OneClickBlock5PInterface.id = 'OneClickBlock5PInterface';
OneClickBlock5PInterface.innerHTML = '<div id="OneClickBlock5P_Background" style="width: 100%; height: 100%; position: fixed; left: 0; top: 0; background-color: #000000; opacity: 0.5; filter:alpha(opacity=0.5)"></div><div id="OneClickBlock5P_Container" style="position: fixed; left: 50%; top: 50%; margin: -55px 0 0 -150px; padding: 10px 10px 10px 10px; width: 300px; height: 110px; background-color: #999999; border: 1px solid #333333; color: #000000; ">Loading</div>';
document.getElementsByTagName('body')[0].appendChild(OneClickBlock5PInterface);
function OneClickBlock5P_cOut(text)
{
	document.getElementById('OneClickBlock5P_Container').innerHTML = text;
}
function OneClickBlock5P_forcelog()
{
	window.open('data:text/html;charset=utf-8,'+encodeURI(OneClickBlock5P_logText),'_blank');
	return false;
}
function OneClickBlock5P_InitialiseBlockUI()
{
	var OneClickBlock5P_BlockingHTML = '<div id="OneClickBlock5P_forcelog" style="position: relative; right: 0; top: 0; float: right; font-size: 5px;"><a role="button" onclick="OneClickBlock5P_forcelog();" onmiddleclick="OneClickBlock5P_forcelog();">log</a></div><div id="OneClickBlock5P_StatusTitle">�ǳƤ��K�K</div><br/><div id="OneClickBlock5P_StatusText">StatusText</div><br/><div style="width: 100%; height: 22px;"><div id="OneClickBlock5P_ProgressBarBackground" style="border: 1px solid; margin: 0 60px -22px 0; height: 100%;"><div id="OneClickBlock5P_ProgressBarForeground" style="background-color: #0000cc; width: 0; height: 100%;"></div></div>&nbsp;<button type="button" style="margin: -2px; float: right;" onclick="OneClickBlock5P_Dispose()">����</button></div>';
	OneClickBlock5P_cOut(OneClickBlock5P_BlockingHTML);
}
var OneClickBlock5P_ConfirmHTML = '�A�O�_�T�w�n�N�Ҧ� 5P ���̤@���L Block �M�H<br />�b���}����������A�i�H�H�ɲפ�ʧ@�C<br/><p style="text-align: center;"><button type="button" onclick="OneClickBlock5P_InitialiseBlockUI(); OneClickBlock5P_RefreshCountAndJumpToNext();">�T�w</button>&nbsp;<button onclick="OneClickBlock5P_Dispose()">����</button></p>';
OneClickBlock5P_cOut(OneClickBlock5P_ConfirmHTML);
function OneClickBlock5P_GetBlockStatusTitle()
{
	return document.getElementById('OneClickBlock5P_StatusTitle').innerHTML;
}
function OneClickBlock5P_RefreshBlockStatusTitle(text)
{
	document.getElementById('OneClickBlock5P_StatusTitle').innerHTML = text;
}
function OneClickBlock5P_RefreshWorkStatusText(text)
{
	document.getElementById('OneClickBlock5P_StatusText').innerHTML = text;
}
function OneClickBlock5P_RefreshBlockStatusPercentage(percentage)
{
	document.getElementById('OneClickBlock5P_ProgressBarForeground').style.width = Math.round(percentage * 100) + "%";
}
var OneClickBlock5P_AwaitingToDisposeFlag = false;
var OneClickBlock5P_ThisWorkStartTime = new Date();
var OneClickBlock5P_UnblockingIndex = -1;
var OneClickBlock5P_BlockingIndex = -1;
var OneClickBlock5P_WorkingIdAsText = '';
var OneClickBlock5P_SuccessBlockCount = 0;
var OneClickBlock5P_AlreadyBlockedCount = 0;
var OneClickBlock5P_ErrorBlockCount = 0;
var OneClickBlock5P_BlockResult = [];
var OneClickBlock5P_BlockErrorText = [];
function OneClickBlock5P_cOutCostTime()
{
	var lastMs = (OneClickBlock5P_ThisWorkStartTime.getMinutes() * 60 + OneClickBlock5P_ThisWorkStartTime.getSeconds() * 1000) + OneClickBlock5P_ThisWorkStartTime.getMilliseconds();
	var d = new Date();
	var thisMs = (d.getMinutes() * 60 + d.getSeconds() * 1000) + d.getMilliseconds();
	return thisMs - lastMs;
}

// unblock
function OneClickBlock5P_DoUnblockNextUserId()
{
	if(OneClickBlock5P_AwaitingToDisposeFlag)
	{
		OneClickBlock5P_Dispose();
	}
	else
	{
		OneClickBlock5P_Working = true;
		OneClickBlock5P_UnblockingIndex++;
		OneClickBlock5P_WorkingIdAsText = OneClickBlock5P_UnblockUserId[OneClickBlock5P_UnblockingIndex];
		OneClickBlock5P_logText +=  '-' + OneClickBlock5P_WorkingIdAsText + ': ';
		OneClickBlock5P_RefreshWorkStatusText('-' + OneClickBlock5P_WorkingIdAsText + ': ' + '�����Ԧ��A���^�����K�K');
		
		if(OneClickBlock5P_HelianthusAnnuus_Exist())
		{
			OneClickBlock5P_HelianthusAnnuus_SwitchBam(OneClickBlock5P_UserId[OneClickBlock5P_BlockingIndex], true);
		}
		MessageFunc.RemoveBlockUser(OneClickBlock5P_UnblockUserId[OneClickBlock5P_UnblockingIndex], OneClickBlock5P_UnblockGoodResult, OneClickBlock5P_UnblockBadResult);
		OneClickBlock5P_ThisWorkStartTime = new Date();
	}
}
function OneClickBlock5P_UnblockGoodResult(result)
{
	OneClickBlock5P_logText += '(' + OneClickBlock5P_cOutCostTime() + 'ms) '
	OneClickBlock5P_Working = false;
	// unblock does not give a length of >0 result if such user has already unblocked
	if (result.errMsg != '')
	{
		OneClickBlock5P_RefreshWorkStatusText(OneClickBlock5P_WorkingIdAsText + ': ���~�G�o�ͦ��A�����~�C���x @min�C');
		OneClickBlock5P_ErrorBlockCount++;
		OneClickBlock5P_logText += '���~�G"' + result.errMsg + '"</br>';
	}
	else
	{
		OneClickBlock5P_RefreshWorkStatusText(OneClickBlock5P_WorkingIdAsText + ': ' + '�w���\ unblock �� user�I');
		OneClickBlock5P_SuccessBlockCount++;
		OneClickBlock5P_logText += '���w�Ѱ�/���\<br/>';
	}
	OneClickBlock5P_RefreshCountAndJumpToNext();
}
function OneClickBlock5P_UnblockBadResult(result)
{
	OneClickBlock5P_RefreshWorkStatusText(OneClickBlock5P_WorkingIdAsText + ': ���~�G�o�ͦ��A�����~�C���x @min�C(' +  + ')');
	OneClickBlock5P_ErrorBlockCount++;
	OneClickBlock5P_logText += '���~�G"' + result.errMsg + '"</br>';
	OneClickBlock5P_RefreshCountAndJumpToNext();
}

// block
function OneClickBlock5P_DoBlockNextUserId()
{
	if(OneClickBlock5P_AwaitingToDisposeFlag)
	{
		OneClickBlock5P_Dispose();
	}
	else
	{
		OneClickBlock5P_Working = true;
		OneClickBlock5P_BlockingIndex++;
		OneClickBlock5P_WorkingIdAsText = OneClickBlock5P_UserId[OneClickBlock5P_BlockingIndex];
		OneClickBlock5P_logText += '+' + OneClickBlock5P_WorkingIdAsText + ': ';
		OneClickBlock5P_RefreshWorkStatusText('+' + OneClickBlock5P_WorkingIdAsText + ': ' + '�����Ԧ��A���^�����K�K');
		
		if(OneClickBlock5P_HelianthusAnnuus_Exist())
		{
			OneClickBlock5P_HelianthusAnnuus_SwitchBam(OneClickBlock5P_UserId[OneClickBlock5P_BlockingIndex], true);
		}
		MessageFunc.BlockUser(OneClickBlock5P_UserId[OneClickBlock5P_BlockingIndex], OneClickBlock5P_BlockGoodResult, OneClickBlock5P_BlockBadResult);
		OneClickBlock5P_ThisWorkStartTime = new Date();
	}
}
function OneClickBlock5P_BlockGoodResult(result)
{
	/*if (result.errMsg != "") {
		document.getElementById('bottomFunc').innerHTML = result.errMsg;
	} else {
		document.getElementById('bottomFunc').innerHTML = '';
	        blocked_list = result.list;
	        CheckBlockedUser();
	}*/
	OneClickBlock5P_logText += '(' + OneClickBlock5P_cOutCostTime() + 'ms) '
	OneClickBlock5P_Working = false;
	if (result.errMsg == 'The user is already blocked before.')
	{
		OneClickBlock5P_RefreshWorkStatusText(OneClickBlock5P_WorkingIdAsText + ': ' + '�ӥΤ᦭�w�b�դU����C���C');
		OneClickBlock5P_AlreadyBlockedCount++;
		OneClickBlock5P_logText += '�w�s�b��C��</br>';
	}
	else if (result.errMsg != '')
	{
		OneClickBlock5P_RefreshWorkStatusText(OneClickBlock5P_WorkingIdAsText + ': ���~�G�o�ͦ��A�����~�C���x @min�C');
		OneClickBlock5P_ErrorBlockCount++;
		OneClickBlock5P_logText += '���~�G"' + result.errMsg + '"</br>';
	}
	else
	{
		OneClickBlock5P_RefreshWorkStatusText(OneClickBlock5P_WorkingIdAsText + ': ' + '�w���\ block �� user�I');
		OneClickBlock5P_SuccessBlockCount++;
		OneClickBlock5P_logText += '���\<br/>';
	}
	OneClickBlock5P_RefreshCountAndJumpToNext();
}
function OneClickBlock5P_BlockBadResult(result)
{
	OneClickBlock5P_RefreshWorkStatusText(OneClickBlock5P_WorkingIdAsText + ': ���~�G�o�ͦ��A�����~�C���x @min�C(' +  + ')');
	OneClickBlock5P_ErrorBlockCount++;
	OneClickBlock5P_logText += '���~�G"' + result.errMsg + '"</br>';
	OneClickBlock5P_RefreshCountAndJumpToNext();
}

// Helianthus-Annuus Support 
function OneClickBlock5P_HelianthusAnnuus_Exist()
{
	if(typeof AN !== 'undefined')
		if(AN.util.data('aBamList') != null) return true;
	
	return false;
}
function OneClickBlock5P_HelianthusAnnuus_SwitchBam(userid, toBam)
{
	var bamList = [];
	if (typeof AN.util.data('aBamList') !== 'undefined' && AN.util.data('aBamList') != null && AN.util.data('aBamList').length > 0)
	{
		bamList = AN.util.data('aBamList'); // JS can't access into jQ's function -- access the real object instead
	}
	var index = bamList.indexOf(userid); // ~= var index = $.inArray(userid, bamList); in jQuery ---- You know I won't play jQ trick this time
	if(index === -1)
	{
		if(toBam)
		{
			bamList.push(userid);
		}
	}
	else
	{
		if(!toBam)
		{
			bamList.splice(index, 1);
		}
	}
	
	AN.util.data('aBamList', bamList); // jQ core func
//	toggleReplies(null); // can't, jQ func
}

// jump to next userid
function OneClickBlock5P_RefreshCountAndJumpToNext()
{
	var ubI = OneClickBlock5P_UnblockingIndex;
	var bI = OneClickBlock5P_BlockingIndex;
	if(OneClickBlock5P_UnblockingIndex < 0)
	{
		ubI = 0;
	}
	if(OneClickBlock5P_BlockingIndex < 0)
	{
		bI = 0;
	}
	var percentage = (ubI + bI) / (OneClickBlock5P_UnblockUserId.length + OneClickBlock5P_UserId.length);
	document.title = 'Blocking 5P: ' + Math.round(percentage * 100) + '%';
	OneClickBlock5P_RefreshBlockStatusPercentage(percentage);
	OneClickBlock5P_RefreshBlockStatusTitle('���椤�K�K(' + Math.round(percentage * 100) + '%)');
	if (OneClickBlock5P_UnblockingIndex + 1 < OneClickBlock5P_UnblockUserId.length)
	{
		OneClickBlock5P_DoUnblockNextUserId();
	}
	else if (OneClickBlock5P_BlockingIndex + 1 < OneClickBlock5P_UserId.length)
	{
		OneClickBlock5P_DoBlockNextUserId();
	}
	else
	{
		OneClickBlock5P_UnblockingIndex = -1;
		OneClickBlock5P_BlockingIndex = -1;
		OneClickBlock5P_BlockFinished();
	}
}

// finishing
function OneClickBlock5P_BlockFinished()
{
	OneClickBlock5P_logText += '<br/>��������ήɶ��G' + OneClickBlock5P_runDate.toLocaleDateString() + ' ' + OneClickBlock5P_runDate.toLocaleTimeString() + '<hr width="100%"/></body></html>';
	var OneClickBlock5P_FinishHTML = '�����I<br/><br/>�`�� ' + (OneClickBlock5P_UnblockUserId.length + OneClickBlock5P_UserId.length) + ' | ���\ ' + OneClickBlock5P_SuccessBlockCount + ' | ���~ ' + OneClickBlock5P_ErrorBlockCount + ' | �w�s�b ' + OneClickBlock5P_AlreadyBlockedCount + '<br /><a href="data:text/html;charset=utf-8,' + encodeURI(OneClickBlock5P_logText) + '" target="_blank" download="OneClickBlock5P_log.htm">�p�ݸԲӰO���Ы����}�s���d�ݩ��x�s�C</a><br /><div style="text-align: center;"><button type="button" onClick="OneClickBlock5P_Dispose()">����</button>';
	OneClickBlock5P_cOut(OneClickBlock5P_FinishHTML);
}