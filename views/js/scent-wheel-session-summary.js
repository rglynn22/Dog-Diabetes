function parseSession(session){
	if (session == 0) {
		alert("Error retrieving session from the database.")
	} else {
		var pos1 = 0;
		var pos2 = 0;
		var pos3 = 0;
		var pos4 = 0;

		var trials = session.split("/");
		for (t in trials) {
			var positions = t.split(" ");
			for (p in positions) {
				var elems = p.split(",");
				if (elems.length != 3) continue;
				else {
					var direction = elems[0];
					var position = elems[1];
					var result = elems[2];
				}
			}
		}
	}
}