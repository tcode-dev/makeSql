var MakeSql = function() {};

MakeSql.prototype.makeSqlTextInterface = (function(){
	var $aftertext = $("#aftertext");

	return function() {
		this.getConfig();
		this.getTextAreaData();
		if (this.tableName != "" && this.text.split("\n").length >= 2) {
			this.makeSql();
			if (this.sqlText != "") {
				$aftertext.val(this.sqlText);
			}
		}
	};
})();

MakeSql.prototype.makeSqlFileInterface = (function(){
	var $output = $("#output");

	return function() {
		this.getConfig();
		this.getFileAreaData();
		if (this.files.length != 0) {
			$output.empty();
			this.makeSqlFile(0, $output);
		}
	};
})();

MakeSql.prototype.makeSqlFile = function(fileCount, $output) {
	var _this = this;
	var reader = new FileReader();
	reader.readAsText(_this.files[fileCount], _this.characterCode);
	reader.onload = function(event) {
		var text = event.target.result.replace(/[\n\r][\n\r]?/g, "\n");
		_this.text = _this.removeQuotation(text);
		if (_this.text.replace("\n").length >= 2) {
			_this.filename = _this.files[fileCount].name;
			_this.tableName = _this.filename.split(".")[0];
			_this.makeSql();
			if (_this.sqlText != "") {
				_this.writeHtml($output);
			}
		}
		fileCount += 1;
		if (fileCount < _this.files.length) {
			_this.makeSqlFile(fileCount, $output);
		} else {
			$output.append('<div><p><input type="hidden" name="encoding" value="' + _this.characterCode + '" /></p></div>');
		}
	};
};

MakeSql.prototype.getConfig = (function() {
	var $delimiter = $("#delimiter");
	var $characterCode = $("#characterCode");
	var $strSelect = $("#strSelect");
	var $strInsert = $("#strInsert");
	var $strDelete = $("#strDelete");
	var $strUpdate = $("#strUpdate");
	var $strFrom = $("#strFrom");
	var $strWhere = $("#strWhere");
	var $strAnd = $("#strAnd");
	var $strOr = $("#strOr");
	var $strInto = $("#strInto");
	var $strValues = $("#strValues");
	var $strSet = $("#strSet");
	var $aftertext = $("#aftertext");
	var delimiter = {
		"1":",",
		"2":/\t/,
		"3":/\s/
	};

	return function() {
		this.delimiter = delimiter[$delimiter.val()];
		this.characterCode = $characterCode.val();
		this.strSelect = $strSelect.val();
		this.strInsert = $strInsert.val();
		this.strDelete = $strDelete.val();
		this.strUpdate = $strUpdate.val();
		this.strFrom = $strFrom.val();
		this.strWhere = $strWhere.val();
		this.strAnd = $strAnd.val();
		this.strOr = $strOr.val();
		this.strInto = $strInto.val();
		this.strValues = $strValues.val();
		this.strSet = $strSet.val();
	};
})();

MakeSql.prototype.getTextAreaData = (function() {
	var $tableName = $("#tableName");
	var $beforetext = $("#beforetext");
	var $updatetext = $("#updatetext");

	return function() {
		var text;
		var updatetext;

		this.tableName = $tableName.val();
		text = $beforetext.val().replace(/[\n\r][\n\r]?/g, "\n");
		this.text = this.removeQuotation(text);
		updateText = $updatetext.val().replace(/[\n\r][\n\r]?/g, "\n");
		this.updateText = this.removeQuotation(updateText);
	};
})();

MakeSql.prototype.getFileAreaData = (function() {
	var $files = $("#files");

	return function() {
		this.files = $files[0].files;
	};
})();

MakeSql.prototype.makeWhereText = function() {
	var text = this.text.split("\n");
	var fieldName = text[0].split(this.delimiter);
	var lineText;
	var row = [];
	var col = [];

	for (var i = 1, tlen = text.length; i < tlen; i++) {
		if (text[i] != undefined && text[i] != "") {
			lineText = text[i].split(this.delimiter);
			col = [];
			for (var j = 0, flen = fieldName.length; j < flen; j++) {
				if (lineText[j] != undefined && lineText[j] != "") {
					col.push(fieldName[j] + " = '" + lineText[j] + "'");
				}
			}
			row.push("(" + col.join(" " + this.strAnd + " ") + ")");
		}
	}
	this.whereText = row.join("\n" + this.strOr + " ");
};

MakeSql.prototype.makeUpdate = function() {
	this.makeSetText();
	this.makeWhereText();
	this.sqlText = this.strUpdate + " " + this.tableName + "\n";
	this.sqlText += this.strSet + " " + this.setText + "\n";
	this.sqlText += this.strWhere + "\n";
	this.sqlText += this.whereText + "\n\;";
//	this.convertNumber();
};

MakeSql.prototype.makeSetText = function() {
	var text = this.updateText.split("\n");
	var fieldName = text[0].split(this.delimiter);
	var lineText = text[1].split(this.delimiter);
	var col = [];

	for (var i = 0, len = fieldName.length; i < len; i++) {
		if (lineText[i] != undefined && lineText[i] != "") {
			col.push(fieldName[i] + " = '" + lineText[i] + "'");
		}
	}
	this.setText = col.join(", ");
};

MakeSql.prototype.convertNumber = function() {
	this.sqlText = this.sqlText.replace(/'([\d]*)'/g, "$1");
};
MakeSql.prototype.removeQuotation = function(text) {
	return text.replace(/"(.*?)"/g, "$1");
};

MakeSql.prototype.writeHtml = function($output) {
	var html = '<div>';
	html += '<h3 class="btn">' + this.filename + '</h3>';
	html += '<p><textarea cols="45" rows="5" name="text[]" readonly>' + this.sqlText + '</textarea></p>';
	html += '<p><input type="hidden" name="file[]" value="' + this.filename +'"  /></p>';
	html += '</div>';

	$output.append(html);
};

var MakeSelect = function() {};
MakeSelect.prototype = new MakeSql();
MakeSelect.prototype.makeSql = function() {
	this.makeWhereText();
	this.sqlText = this.strSelect  + " * " + this.strFrom + " " + this.tableName + "\n";
	this.sqlText += this.strWhere + "\n";
	this.sqlText += this.whereText + "\n\;";
//	this.convertNumber();
};

var MakeInsert = function() {};
MakeInsert.prototype = new MakeSql();
MakeInsert.prototype.makeSql = function() {
	var text = this.text.split("\n");
	var fieldName = text[0].split(this.delimiter);
	var headerText = this.strInsert + " " + this.strInto + " " + this.tableName + " (" + fieldName.join(", ") + ") " + this.strValues + " ('";
	var lineText;
	var inserTtext = [];
	var col = [];

	for (var i = 1, tlen = text.length; i < tlen; i++) {
		if (text[i] != undefined && text[i] != "") {
			lineText = text[i].split(this.delimiter);
			col = [];	
			for (var j = 0, flen = fieldName.length; j < flen; j++) {
				col.push(lineText[j]);
			}
			inserTtext.push(headerText + col.join("', '") + "');\n");
		}
	}
	this.sqlText = inserTtext.join("");
//	this.convertNumber();
};

var MakeDelete = function() {};
MakeDelete.prototype = new MakeSql();
MakeDelete.prototype.makeSql = function() {
	this.makeWhereText();
	this.sqlText = this.strDelete + " " + this.strFrom + " " + this.tableName + "\n";
	this.sqlText += this.strWhere + "\n";
	this.sqlText += this.whereText + "\n\;";
//	this.convertNumber();
};

var MakeUpdateText = function() {};
MakeUpdateText.prototype = new MakeSql();
MakeUpdateText.prototype.makeSql = function() {
	if (this.updateText.split("\n").length >= 2) {
		this.makeUpdate();
	}
};

var MakeUpdateFile = function() {};
MakeUpdateFile.prototype = new MakeSql();
MakeUpdateFile.prototype.makeSql = function() {
	if (this.text.split("\n").length >= 3) {
		var text = this.text.split("\n");

		this.updateText = text[0] + "\n" + text.splice(1, 1);
		this.text = text.join("\n");
		this.makeUpdate();
	}
};

// テキストからSQL作成
// select
$("#select1").click(function(){
	var sql = new MakeSelect();
	sql.makeSqlTextInterface();
});
// Insert
$("#insert1").click(function(){
	var sql = new MakeInsert();
	sql.makeSqlTextInterface();
});
// Delete
$("#delete1").click(function(){
	var sql = new MakeDelete();
	sql.makeSqlTextInterface();
});
// Update
$("#update1").click(function(){
	var sql = new MakeUpdateText();
	sql.makeSqlTextInterface();
});

// ファイルからSQL作成
// select
$("#select2").click(function(){
	var sql = new MakeSelect();
	sql.makeSqlFileInterface();
});
// Insert
$("#insert2").click(function(){
	var sql = new MakeInsert();
	sql.makeSqlFileInterface();
});
// Delete
$("#delete2").click(function(){
	var sql = new MakeDelete();
	sql.makeSqlFileInterface();
});
// Update
$("#update2").click(function(){
	var sql = new MakeUpdateFile();
	sql.makeSqlFileInterface();
});