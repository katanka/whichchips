$("#result-panel").hide();

$("#submit").click(function() {
	var denominations = [5, 10, 25, 50, 100];
	var num = [50, 50, 50, 50, 50];
	var colors = ["white", "red", "green", "black", "blue"];
	var min_chips = 3;

	var buyin = parseInt($("#buyin").val());
	var numplayers = parseInt($("#numplayers").val());

	var offset = 0;

	var constraints = [];

	var cost_constraint = denominations[0] + "x" + 1;
	for (var i = 1; i < denominations.length; i++) {
		cost_constraint += " + " + denominations[i] + "x" + (i+1);
		offset += denominations[i]*min_chips
	}
	cost_constraint += " = " + (buyin-offset);

	constraints.push(cost_constraint);

	for (var i = 0; i < denominations.length; i++) {
		constraints.push("x"+(i+1)+" <= 10 - " + min_chips);
	}

	// for (var i = 1; i < denominations.length; i++) {
	// 	constraints.push("1x"+i+" <= 1x"+(i+1));
	// }

	console.log(constraints);

	var input = {
	    type: "maximize",
	    objective: "x1 + x2 + x3 + x4 + x5",
	    constraints: constraints
	};

	var result = YASMIJ.solve( input ).result;

	var output = "";
	var total = 0;
	for (var i = 0; i < colors.length; i++) {
		var chips = Math.floor(result["x"+(i+1)] + min_chips)
		output += chips + " " + colors[i] + "<br />";
		total += chips * denominations[i]
	}
	output += total;

	$("#result").html(output);

	$("#result-panel").show();
});
