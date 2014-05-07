function parseSession(session){
  console.log(session);
	if (session == "") {
		alert("No trial data available for this session")
	} else {
		var pos1 = 0;
		var pos2 = 0;
		var pos4 = 0;

		var totalTrials = 0;
		var success = 0;
		var miss = 0;
		var falseAlert = 0;

		var lastDir = "";
		var parsedTrials = "";

		var trials = session.split("/");
		for (var t=0; t<trials.length; t++) {
			totalTrials = trials.length;
			var positions = trials[t].split(" ");
			parsedTrials += "Trial "+(t+1)+"<br>";
			for (var p=0; p<positions.length; p++) {
				var elems = positions[p].split(",");
				if (elems.length != 3) continue;
				else {
					var direction = elems[0];
					var position = elems[1];
					var result = elems[2];
					// Update overall tally
					switch (position) {
						case "1": pos1 += parseInt(result); falseAlert += parseInt(result); break;
						case "2": pos2 += parseInt(result); falseAlert += parseInt(result); break;
						case "4": pos4 += parseInt(result); falseAlert += parseInt(result); break;
						case "3": 
							if (result == "S") success ++;
							else miss ++;
					}
					// Update trial log
					if (lastDir != direction) { // switch direction
						if (direction == "c") { parsedTrials+="&rarr;&nbsp;&nbsp;" }
						else { parsedTrials += "&larr;&nbsp;&nbsp;"}
					}
					lastDir = direction;
					parsedTrials += "Arm "+position+":"+result+"&nbsp;&nbsp;";
				}
			}
			parsedTrials += "<br>";
		}

		// Produce HTML to represent results
		// Overall stats

		var html = "";
		html += "Trials: "+totalTrials+"<br>"+ 
				"Successes: "+success+"<br>"+
				"Misses: "+miss+"<br>"+
				"False Alerts: "+falseAlert+"<br>"+"<br>";
		html += "<strong>-- Stats By Arm --</strong>"+"<br>"+
				"Arm 1: "+pos1+" false alerts"+"<br>"+ 
				"Arm 2: "+pos2+" false alerts"+"<br>"+ 
				"Arm 3: "+success+" successes/"+miss+" misses"+"<br>"+ 
				"Arm 4: "+pos4+" false alerts"+"<br>"+"<br>";
		html += "<strong>-- Detailed Trials --</strong>"+"<br>"+
				parsedTrials;
		$("#stats").append(html);
	}
}