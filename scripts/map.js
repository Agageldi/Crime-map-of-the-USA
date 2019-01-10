var GU_bool = 0
var cons,cons2
var class_colors= ["#d8f2ed","#b6d6d1","#97bdb7","#79a39e","#5e8c86","#467872","#2e635e","#154f4a"] //from lightest to darkest or from smallest value to highest value
var playTimer
function play(e){
	
	if(e.target.innerHTML == "►"){
		e.target.innerHTML = "❙❙"
		playTimer = setInterval(function(){
			var year = parseInt(document.getElementById("year_slider").value) + 1
			if(year == 2018) year =2013
			document.getElementById("year_slider").value = year
			GUchange(null)
		}, 3000)
		
	}else{
		e.target.innerHTML = "►"
		clearInterval(playTimer)
	}
}

function GUchange(e){

var yearStamp="_"+document.getElementById("year_slider").value
var mySvg = mySvg_map
var classificationValues = []
var classificationValues_def = []


for(var i=0;i<=2;i++)
	document.getElementById("button"+i).style.backgroundColor="#e6e6fa"

//increament
if(e != null){
	var id = e.target.id
	if(id=="button1") GU_bool=1
	if(id=="button2") GU_bool=2
	if(id=="button0") GU_bool=0
}
//highlighting button
document.getElementById("button"+GU_bool).style.backgroundColor="#F14E15"

// legend update
GULegendUpdate();


// reference state for GU size
var i=45
var str = 'data.'+state[i]+'.'

var rightAngles = [parseFloat(eval(str+'White'+yearStamp)),parseFloat(eval(str+'Black'+yearStamp)),parseFloat(eval(str+'Native'+yearStamp)),parseFloat(eval(str+'Asian'+yearStamp)),parseFloat(eval(str+'More'+yearStamp))]
	rightAngles = checkboxFilter(rightAngles,document.getElementsByClassName("race_layer"))
var sum = parseFloat(eval(str+'Total'))


var leftAngles = [parseFloat(eval(str+'Murder'+yearStamp)),parseFloat(eval(str+'Rape'+yearStamp)),parseFloat(eval(str+'Robbery'+yearStamp)),parseFloat(eval(str+'assault'+yearStamp))]
	leftAngles.reverse()
var Tvoilent0 = leftAngles[0]+ leftAngles[1]+ leftAngles[2]+ leftAngles[3]
	leftAngles = checkboxFilter(leftAngles,document.getElementsByClassName("crime_layer"))
	Tvoilent = leftAngles[0]+leftAngles[1]+leftAngles[2]+leftAngles[3]
	
	sum = rightAngles[0]+ rightAngles[1]+ rightAngles[2]+ rightAngles[3]+ rightAngles[4]
	
cons = 	Math.pow(Tvoilent0/Tvoilent,1/3)
cons2 = Math.pow(parseFloat(eval(str+'Total'+yearStamp))/sum,1/3)



// Looping throw states
for(var i=0;i<state.length;i++){
	switch(GU_bool){
		case 0:
			document.getElementById("crime_layers").style.height = "80px"
			document.getElementById("race_layers").style.height = "100px"
			break;
		case 1:
			document.getElementById("crime_layers").style.height = "80px"
			document.getElementById("race_layers").style.height = "0px"
			break;
		case 2:
			document.getElementById("crime_layers").style.height = "0px"
			document.getElementById("race_layers").style.height = "0px"
	}
	var str = 'data.'+state[i]+'.'
	
	var pos = [parseFloat(eval(str+'svgX')),parseFloat(eval(str+'svgY'))]
	//console.log(leftAngles)
	
	var sum = parseFloat(eval(str+'Total'+yearStamp))
	var rightAngles = [parseFloat(eval(str+'White'+yearStamp)),parseFloat(eval(str+'Black'+yearStamp)),parseFloat(eval(str+'Native'+yearStamp)),parseFloat(eval(str+'Asian'+yearStamp)),parseFloat(eval(str+'More'+yearStamp))]
	rightAngles = checkboxFilter(rightAngles,document.getElementsByClassName("race_layer"))
	
	
	var leftAngles = [parseFloat(eval(str+'Murder'+yearStamp)),parseFloat(eval(str+'Rape'+yearStamp)),parseFloat(eval(str+'Robbery'+yearStamp)),parseFloat(eval(str+'assault'+yearStamp))]
	leftAngles.reverse()
	classificationValues_def.push(leftAngles[0]+leftAngles[1]+leftAngles[2]+leftAngles[3])
	leftAngles = checkboxFilter(leftAngles,document.getElementsByClassName("crime_layer"))
	
	var Tvoilent = (leftAngles[0]+leftAngles[1]+leftAngles[2]+leftAngles[3])*sum/100000
	
	classificationValues.push(leftAngles[0]+leftAngles[1]+leftAngles[2]+leftAngles[3])
	
	sum = rightAngles[0]+ rightAngles[1]+ rightAngles[2]+ rightAngles[3]+ rightAngles[4]
	
	
	// 1mm3 = 100 Voilent Crime
	var f = Math.pow(1039/50*3/4/Math.PI,1/3)*594/21000*cons
	r=Math.pow(Tvoilent/1039,1/3)*f*100*210/594
	
	// 1mm3 = 20 000 people
	var f2 = Math.pow(579315/10000*3/4/Math.PI,1/3)*594/21000*cons2
	r= Math.pow(sum/579315,1/3)*f2*100*210/594
	
	if(Tvoilent==0) continue;
	if(GU_bool==0){
		console.log(f2);
		mySvg +=  generateSVG(state[i]+'_GU',leftAngles,rightAngles,Math.pow(Tvoilent/1039,1/3)*f,Math.pow(sum/579315,1/3)*f2,pos);
	}
	else
	if(GU_bool==1)
		mySvg += generateSVG_simple(state[i]+'_GU',leftAngles,Math.pow(Tvoilent/1039,1/3)*f,pos)
	mySvg += '\n'
}
//generateSVG(leftAngles,rightAngles,graph,1./3/7.86,pos);
mySvg += '</svg>'
graphlegend+= '</svg>'

var basemap = document.getElementById("mapid")
basemap.innerHTML = mySvg
var basemap_svg = document.getElementById("basemap_svg")
basemap_svg.style.width = "99%"
basemap_svg.style.height = "99%"
basemap_svg.style.margin = "0px" 
basemap_svg.style.padding = "0px" 

if(GU_bool<2)
	recolor(classificationValues);
else
	recolor(classificationValues_def);
}


function recolor(values){
	var classNum =8
	var data = new geostats(values)
	var naturalBreaks = data.getClassJenks(classNum)
	console.log(naturalBreaks)
	
	for(var i=0;i<state.length;i++){
		for(var j=1;j<naturalBreaks.length;j++)
			if(values[i]<=naturalBreaks[j])
				break;
		
		document.getElementById(state[i]).style.fill = class_colors[j-1]
	}
	
	
	var legend = document.getElementsByClassName("classes")
	if(naturalBreaks[1]==0) document.getElementById("choropleth_legend").style.display = "none"
	else{
		document.getElementById("choropleth_legend").style.display = "block"
		for(var j=0;j<legend.length;j++){
			var a = parseInt(naturalBreaks[classNum-1-j]*10)/10
			var b = parseInt(naturalBreaks[classNum-j]*10)/10
			if(a==parseInt(a)) a= a+".0"
			if(b==parseInt(b)) b= b+".0"
			
			legend[j].innerHTML = a+" - "+b
		}
	}
}

var popupElement = document.getElementById("countryName_popup")

function popupOpen(event){
	var name =event.target.id.split("_").join(" ");
	if(popupElement.style.display=="none")
		popupElement.style.display = "block"
	popupElement.style.top = event.pageY-20 + "px"
	popupElement.style.left = event.pageX+5 + "px"
	
	
	popupElement.innerHTML = name
	//console.log("I am popup " + name)
}
function popupClose(event){
	ev=event;
	popupElement.style.display = "none"
}
function GULegendUpdate(){
	
var legend_box = document.getElementById("legend_GU_parts")

if(GU_bool==0){
	legend_box.style.display = "block"
	document.getElementById("legend_GU_second").style.display="block"
	document.getElementById("legend_GU_second_txt").style.display="block"

	var angles = [20,16,10,8]
	var rightAng = [20,16,10,8,4]
	angles = checkboxFilter(angles,document.getElementsByClassName("crime_layer"))
	rightAng = checkboxFilter(rightAng,document.getElementsByClassName("race_layer"))
	
	var GU=generateSVG("legend_svg1",angles,rightAng,1,1,[100,100]).split('\n\n\n')
	
	var txt=document.getElementsByClassName("crime_sphere")
	for(var i=0;i<angles.length;i++)
	{
		txt[i].style.backgroundColor=leftColors[i]
		if(angles[i]==0)
			txt[i].style.display = "none"
		else
			txt[i].style.display = "block"
	}
	txt = document.getElementsByClassName("race_sphere")
	for(var i=0;i<rightAng.length;i++)
	{
		txt[i].style.backgroundColor=rightColors[i]
		if(rightAng[i]==0)
			txt[i].style.display = "none"
		else
			txt[i].style.display = "block"
	}
	
	var leg_svg = "<svg id = 'legend_svg0' style='height:100%;' viewBox='0 0 220 220'>"

	document.getElementById("legend_GU_first").innerHTML=leg_svg + GU[0]+"</svg>"
	document.getElementById("legend_GU_second").innerHTML=leg_svg + GU[1]+"</svg>"
	
}else if(GU_bool==1){
	document.getElementById("legend_GU_second").style.display="none"
	document.getElementById("legend_GU_second_txt").style.display="none"
	
	legend_box.style.display = "block"
	var angles = [20,16,10,8]
	angles = checkboxFilter(angles,document.getElementsByClassName("crime_layer"))
	
	txt=document.getElementsByClassName("crime_sphere")
	for(var i=0;i<angles.length;i++)
		if(angles[i]==0)
			txt[i].style.display = "none"
		else
			txt[i].style.display = "block"
		
	var leg_svg = "<svg id = 'legend_svg0' style='height:100%;' viewBox='0 0 200 200'>"
	leg_svg += generateSVG_simple("legend_svg1",angles,1,[100,100])+"</svg>"
	document.getElementById("legend_GU_first").innerHTML=leg_svg
	
}else if(GU_bool==2)
	legend_box.style.display = "none"


}

GUchange(null)

for(var i=0;i<state.length;i++){
	document.getElementById(state[i]).onmousemove = function(event){ popupOpen(event)}
	document.getElementById(state[i]).onmouseout = function(event){ popupClose(event)}
}

