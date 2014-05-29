/*
All instances of this face are placeholders.
A modified version of the face on tylerpackard.com
This one has teeth, though.
and things that I can't decide whether are pupils or light-reflections
*/


function drawFace() {
	var canvas = document.getElementById('TestCanvas');
	var ctx = canvas.getContext('2d');	
	
	//Mouth
	ctx.fillStyle = "rgba(0, 0, 0, 0.31)";
	ctx.beginPath();
	ctx.moveTo(200, 100);
	ctx.arc(100, 100, 100, 0, Math.PI, false);
	ctx.closePath();
	ctx.fill();		
	
	ctx.save();
	
	//upper Teeth
	ctx.beginPath();
	ctx.moveTo(30, 100);
	ctx.lineTo(60, 100);
	ctx.lineTo(45, 100+(35));
	ctx.clip();
	ctx.clearRect(0, 0, 200, 200);
	
	ctx.restore();
	ctx.save();
	
	ctx.beginPath();
	ctx.moveTo(170, 100);
	ctx.lineTo(140, 100);
	ctx.lineTo(155, 100+(35));
	ctx.clip();
	ctx.clearRect(0, 0, 200, 200);
	
	ctx.restore();
	ctx.save();
	
	//lower teeth
	ctx.beginPath();
	ctx.moveTo(130, 215);
    ctx.lineTo(160, 215);
	ctx.lineTo(140, 100+(80));
	ctx.clip();
	ctx.clearRect(0, 0, 200, 200);
	
	ctx.restore();
	ctx.save();
	
	ctx.beginPath();
	ctx.moveTo(40, 215);
	ctx.lineTo(70, 215);
	ctx.lineTo(60, 100+(80));
	ctx.clip();
	ctx.clearRect(0, 0, 200, 200);
	
	ctx.restore();
	ctx.save();
	
	//Eyes
	ctx.beginPath();
	ctx.fillStyle = "rgba(0, 0, 0, 0.31)";
	ctx.arc(25, 25, 25, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
				
	ctx.beginPath();
	ctx.fillStyle = "rgba(0, 0, 0, 0.31)";
	ctx.arc(175, 25, 25, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
	
	ctx.save();
	
	//Pupils
	ctx.beginPath();
	ctx.arc(10, 15, 5, 0, Math.PI*2, true);
	ctx.clip();
	ctx.clearRect(0, 0, 200, 200);
	
	ctx.restore();
	ctx.save();
	
	ctx.beginPath();
	ctx.fillStyle = "rgba(1, 1, 1, 0)";
	ctx.arc(160, 15, 5, 0, Math.PI*2, true);
	ctx.clip();
	ctx.clearRect(0, 0, 200, 200);
}
