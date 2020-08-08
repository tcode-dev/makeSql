<?php
	//ディレクトリ作成
	$archive = 'archive';
	$dirname = getRandomString();
	$zipname = $dirname . '.zip';
	$dirpath = $archive . '/' . $dirname;
	mkdir($dirpath);

	//ディレクトリ移動
	chdir($archive);

	//ファイル名取得
	$files = $_POST['file'];

	//テキスト取得
	$texts = $_POST['text'];

	//文字コード取得
	$encoding = $_POST['encoding'];

	//ファイル作成・書き込み・保存
	for($i=0; $i<count($files); $i++) {
		$file = fopen($dirname . "/" . $files[$i], "wb");
		fwrite($file, mb_convert_encoding($texts[$i], $encoding,"AUTO"));
		fclose($file);
	}
	
	//ファイル圧縮
	$zip = new ZipArchive();
	$res = $zip->open($zipname, ZipArchive::CREATE);
	for($i=0; $i<count($files); $i++) {
		$zip->addFile($dirname . "/" . $files[$i]);
	}
	$zip->close();

	//ファイル削除
	for($i=0; $i<count($files); $i++) {
		if (file_exists($dirname . "/" . $files[$i])){
			unlink($dirname . "/" . $files[$i]);
		}
	}

	//フォルダ削除
	rmdir($dirname);

	//ファイルダウンロード
	header('Content-Disposition: attachment; filename="' . $zipname . '"'); 
	header('Content-Length: ' . filesize($zipname));
	header('Content-Type: application/octet-stream');
	readfile($zipname);

	//圧縮ファイル削除
	if (file_exists($zipname)){
		unlink($zipname);
	}

	//ランダムな文字列を生成
	function getRandomString($nLengthRequired = 8){
		$sCharList = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";
		mt_srand();
		$sRes = "";
		for($i = 0; $i < $nLengthRequired; $i++) {
			$sRes .= $sCharList{mt_rand(0, strlen($sCharList) - 1)};
		}
		return $sRes;
	}
?>