$(function(){
	//ページ全体をタブパネル化
	var $nav = $("#page-nav").find("ul li");
	var $panel = $("#page-body").find(".area-panel");

	$nav.first().addClass("active");
	$panel.filter(".area-panel:not(:first-child)").hide();

	$(window).hashchange(function() {
		var hash = "";
		if (!location.hash) {
			hash = $nav.first().find("a").attr("href");
		} else {
			hash = location.hash;
		}
		$nav.removeClass("active");
		$nav.find("a[href=" + hash + "]").closest("li").addClass("active");
		$panel.hide();
		$panel.filter(hash + "-area").show();
	});
	$(window).hashchange();

	//ファイル選択
	var $files = $('#files');
	var $noticeFileCount = $("#noticeFileCount");

	$("#dummy").click(function() {
		$files.click();
	});
	$files.change(function(){
		if ($files[0].files.length) {
			$noticeFileCount.text($files[0].files.length + "つのファイルを選択しました。");
		} else {
			$noticeFileCount.text("");
		}
	});

	//downloadボタンクリック時にSQLが作成されていなければsubmitしない
	var $makefile = $("#makefile");
	var $output = $makefile.find("#output");

	$makefile.submit(function() {
		if (!$output.children().length) {
			return false;
		}
	});

	//ファイルから作成したSQLをアコーディオン化
	$output.delegate(".btn", "click", function(){
		$(this).next().slideToggle();
	});

	//ファイルをドラッグドロップして内容を表示
	var $characterCode = $("#characterCode");
	var $update = $("#updatetext");
	var $before = $("#beforetext");
	$update[0].ondrop = loadFile;
	$before[0].ondrop = loadFile;
	$update[0].ondragover = preventDefault;
	$before[0].ondragover = preventDefault;

	function loadFile(event) {
		var $this = $(this);
		var characterCode = $characterCode.val();
		var file = event.dataTransfer.files[0];
		var reader = new FileReader();
		reader.readAsText(file, characterCode);
		reader.onload = function(event) {
			$this.val(event.target.result);
		};
		return false;
	}
	function preventDefault(event) {
		event.preventDefault();
	}

	//連絡先出力
	$("#mail").html("&#109;&#97;&#107;es&#113;&#108;&#64;&#103;&#109;&#97;&#105;l&#46;c&#111;m");

	//ブラウザ確認
	if (navigator.userAgent.indexOf("Firefox") == -1 && navigator.userAgent.indexOf("Chrome") == -1) {
		$("#container").prepend('<div class="alert alert-error"><p>ご利用のブラウザは、本サイトの動作確認済みブラウザではありません。<br />Google ChromeかFirefoxをご利用ください。</p></div>');
	}
});