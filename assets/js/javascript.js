var nums = ['0', '1', '2', '3', '4'],
nNav = '0',
lastclass = "",
fitObjects = [[]];
function disableNav(n) {
	$('#nav' + nNav).prop("disabled", false);
	nNav = n;
	$('#nav' + nNav).prop("disabled", true);
}
function newFrame(n) {
	$('#myFrame').load('page' + n + ".html");
};
function fitButtons() {
	let y = Math.floor($(document).width() / 150) - 1;
	let x = 4;
	for (; x > y; x--) {
		$("#dropdown-content").prepend($("#nav" + nums[x]));
	}
	for (; x >= 0; x--) {
		$("#navbar").prepend($("#nav" + nums[x]));
	}
}
$(document).ready(function () {
	$('#nav' + nNav).prop("disabled", true);
	newFrame(nNav);
	fitButtons();

	for (let n = 0; n < 5; n++) {
		$('#nav' + n).click(function () {
			var value = $(this).attr('page');
			newFrame(value);
			disableNav(value);
		}).attr('page', '' + n).children('.navhold').on('transitionend', function () {
			var value = $(this).parent().attr('page');
			if ($('#nav' + value).is(':active')) {
				newFrame(value);
			}
		});
	}
	$(window).resize(function () {
		fitButtons();
	});
	for (let x = 0, y = 0, o = $('.navbutton'), i = $(o).length; x < i; x++) {
		if ((lastclass !== "") && (lastclass !== $(o[x]).attr("class"))) {
			y++;
			fitObjects.push([]);
			fitObjects[y].push(o[x]);
		} else {
			fitObjects[y].push(o[x]);
		}
		lastclass = $(o).attr("class");
	}
	console.log(fitObjects);
	$.get("calculator.js", function (data) {
		$("body").append(data);
		loadObject();
	});
});
