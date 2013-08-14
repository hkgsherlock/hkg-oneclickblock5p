//load the array list from the SVN trunk
var OneClickBlock5PArrayLoader = document.createElement('script');
OneClickBlock5PArrayLoader.type = 'text/javascript';
OneClickBlock5PArrayLoader.src = 'http://hkg-oneclickblock5p.googlecode.com/svn/trunk/array.js';
document.getElementsByTagName('head')[0].appendChild(OneClickBlock5PArrayLoader);

var runDate = new Date();
var logText = '<html><head></head><body>�@�� Block 5P �}��<hr width="100%"/>�s���� User-Agent�G' + navigator.userAgent + '<br/>�������ήɶ��G' + runDate.toLocaleDateString() + ' ' + runDate.toLocaleTimeString() + '</br>�H�U���Ҧ��b�}�������w�Τ᪺���G�G [userid, result]</br>';
var OneClickBlock5P_BlockingWorking = false;
function OneClickBlock5P_Dispose()
{
	if(OneClickBlock5P_BlockingWorking)
	{
		OneClickBlock5P_AwaitingToDisposeFlag = true;
		OneClickBlock5P_RefreshBlockStatusTitle(OneClickBlock5P_GetBlockStatusTitle().replace('���椤','���b�����A�еy��'));
		document.getElementById('OneClickBlock5P_Container').style.cursor="wait";
	}
	else
	{
		document.getElementById('OneClickBlock5P_Container').style.cursor="default";
		document.getElementsByTagName('body')[0].removeChild(document.getElementById('OneClickBlock5PInterface'));
	}
}
var OneClickBlock5PInterface = document.createElement('div');
OneClickBlock5PInterface.id = 'OneClickBlock5PInterface';
OneClickBlock5PInterface.innerHTML = '<div id="OneClickBlock5P_Background" style="width: 100%; height: 100%; position: fixed; left: 0; top: 0; background-color: #000000; opacity: 0.5; filter:alpha(opacity=0.5)"></div><div id="OneClickBlock5P_Container" style="position: fixed; left: 50%; top: 50%; margin: -50px 0 0 -150px; padding: 10px 10px 10px 10px; width: 300px; height: 100px; background-color: #999999; border: 1px solid #333333; color: #000000; ">Loading</div>';
document.getElementsByTagName('body')[0].appendChild(OneClickBlock5PInterface);
function OneClickBlock5P_cOut(text)
{
	document.getElementById('OneClickBlock5P_Container').innerHTML = text;
}
function OneClickBlock5P_InitialiseBlockUI()
{
	var OneClickBlock5P_BlockingHTML = '<div id="OneClickBlock5P_StatusTitle">���椤�K�K(0%)</div><br/><div id="OneClickBlock5P_StatusText">StatusText</div><br/><div style="width: 100%; height: 22px;"><div id="OneClickBlock5P_ProgressBarBackground" style="border: 1px solid; margin: 0 60px -22px 0; height: 100%;"><div id="OneClickBlock5P_ProgressBarForeground" style="background-color: #0000cc; width: 0; height: 100%;"></div></div>&nbsp;<button type="button" style="width: 50px; height: 100%; float: right;" onclick="OneClickBlock5P_Dispose()">����</button></div>';
	OneClickBlock5P_cOut(OneClickBlock5P_BlockingHTML);
}
var OneClickBlock5P_ConfirmHTML = '�A�O�_�T�w�n�N�Ҧ� 5P ���̤@���L Block �M�H<br />�b���}����������A�i�H�H�ɲפ�ʧ@�C<br/><p style="text-align: center;"><button type="button" onclick="OneClickBlock5P_InitialiseBlockUI(); OneClickBlock5P_DoBlockNextUserId();">�T�w</button>&nbsp;<button onclick="OneClickBlock5P_Dispose()">����</button></p>';
OneClickBlock5P_cOut(OneClickBlock5P_ConfirmHTML);
function OneClickBlock5P_GetBlockStatusTitle()
{
	return document.getElementById('OneClickBlock5P_StatusTitle').innerHTML;
}
function OneClickBlock5P_RefreshBlockStatusTitle(text)
{
	document.getElementById('OneClickBlock5P_StatusTitle').innerHTML = text;
}
function OneClickBlock5P_RefreshBlockStatusText(text)
{
	document.getElementById('OneClickBlock5P_StatusText').innerHTML = text;
}
function OneClickBlock5P_RefreshBlockStatusPercentage(percentage)
{
	document.getElementById('OneClickBlock5P_ProgressBarForeground').style.width = Math.round(percentage * 100) + "%";
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
		OneClickBlock5P_RefreshBlockStatusText(OneClickBlock5P_BlockingIdAsText + ': ' + '�����Ԧ��A���^�����K�K');
		var goodResult = false;
		var resultObject = new Object();
		MessageFunc.BlockUser(OneClickBlock5P_UserId[OneClickBlock5P_BlockingIndex], OneClickBlock5P_GoodResult, OneClickBlock5P_BadResult);
		
	}
}
function OneClickBlock5P_GoodResult(result)
{
	/*if (result.errMsg != "") {
		document.getElementById('bottomFunc').innerHTML = result.errMsg;
	} else {
		document.getElementById('bottomFunc').innerHTML = '';
	        blocked_list = result.list;
	        CheckBlockedUser();
	}*/
	var msg = document.getElementById('bottomFunc').innerHTML;
	OneClickBlock5P_BlockingWorking = false;
	if (msg == 'The user is already blocked before.')
	{
		OneClickBlock5P_RefreshBlockStatusText(OneClickBlock5P_BlockingIdAsText + ': ' + '�ӥΤ᦭�w�b�դU����C���C');
		OneClickBlock5P_AlreadyBlockedCount++;
		logText += '�w�s�b��C��</br>';
	}
	else if (msg != '')
	{
		OneClickBlock5P_RefreshBlockStatusText(OneClickBlock5P_BlockingIdAsText + ': ���~�G�o�ͦ��A�����~�C���x @min�C');
		OneClickBlock5P_ErrorBlockCount++;
		logText += '���~�G"' + msg + '"</br>';
	}
	else
	{
		OneClickBlock5P_RefreshBlockStatusText(OneClickBlock5P_BlockingIdAsText + ': ' + '�w���\ block �� user�I');
		OneClickBlock5P_SuccessBlockCount++;
		logText += '���\<br/>';
	}
	OneClickBlock5P_RefreshCountAndJumpToNext();
}
function OneClickBlock5P_BadResult(result)
{
	OneClickBlock5P_RefreshBlockStatusText(OneClickBlock5P_BlockingIdAsText + ': ���~�G�o�ͦ��A�����~�C���x @min�C(' +  + ')');
	OneClickBlock5P_ErrorBlockCount++;
	logText += '���~�G"' + msg + '"</br>';
	OneClickBlock5P_RefreshCountAndJumpToNext();
}
function OneClickBlock5P_RefreshCountAndJumpToNext()
{
	OneClickBlock5P_RefreshBlockStatusPercentage(OneClickBlock5P_BlockingIndex / OneClickBlock5P_UserId.length);
	OneClickBlock5P_RefreshBlockStatusTitle('���椤�K�K(' + Math.round(OneClickBlock5P_BlockingIndex / OneClickBlock5P_UserId.length * 100) + '%)');
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
	logText += '<br/>��������ήɶ��G' + runDate.toLocaleDateString() + ' ' + runDate.toLocaleTimeString() + '<hr width="100%"/></body></html>';
	var OneClickBlock5P_FinishHTML = '�����I<br/><br/>�`�� ' + OneClickBlock5P_UserId.length + ' | ���\ ' + OneClickBlock5P_SuccessBlockCount + ' | ���~ ' + OneClickBlock5P_ErrorBlockCount + ' | �w�s�b ' + OneClickBlock5P_AlreadyBlockedCount + '<br /><a href="data:text/html;charset=utf-8,' + encodeURI(logText) + '" target="_blank" download="OneClickBlock5P_log.txt">�p�ݸԲӰO���Ы����}�s���d�ݩ��x�s�C</a><br /><div style="text-align: center;"><button type="button" onClick="OneClickBlock5P_Dispose()">����</button>';
	OneClickBlock5P_cOut(OneClickBlock5P_FinishHTML);
}