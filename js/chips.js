$("#result-panel").hide();

$("#submit").click(function() {
	var denominations = [5, 10, 25, 50, 100];
	var max_chips = [50, 50, 50, 50, 50];
	var colors = ["white", "red", "green", "black", "blue"];
	var min_chips = 3;

	var buyin = parseInt($("#buyin").val());
	var num_players = parseInt($("#numplayers").val());

	var num_per_player = max_chips.map(val => Math.floor(val/num_players));

	var result;
	var total;

	do {
		total = 0;
		result = [0, 0, 0, 0, 0];
		while (total < buyin) {
			var index = Math.floor(Math.random() * (denominations.length));
			if (result[index] < max_chips[index] && total + denominations[index] <= buyin) {
				result[index] += 1;
				total += denominations[index];
			}
		}
	} while(!is_increasing(result));
	

	var output = "";

	for (var i = 0; i < result.length; i++) {
		output += result[i] + " " + colors[i] + "<br />";
	}
	output += "Total: " + total;
	

	$("#result").html(output);

	$("#result-panel").show();
});

function is_increasing(arr) {
	for (var i = 1; i < arr.length; i++) {
		if(arr[i] > arr[i-1]) {
			return false;
		}
	}
	return true;
}
