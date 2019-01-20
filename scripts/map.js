var GU_bool = 0
var cons,cons2
var class_colors= ["#d8f2ed","#b6d6d1","#97bdb7","#79a39e","#5e8c86","#467872","#2e635e","#154f4a"] //from lightest to darkest or from smallest value to highest value
class_colors=['#d8f2ed','#b6d5d0','#96b8b3','#769d97','#57827d','#386863','#154f4a']
//class_colors = ['#f7fcfd','#d5e1e1','#b5c8c6','#95aeac','#769692','#577d79','#376661','#154f4a']
//class_colors= ['#f7fcfd','#e5f5f9','#ccece6','#99d8c9','#66c2a4',"#467872","#2e635e","#154f4a"] 
//class_colors = ['#f7fcfd','#e5f5f9','#ccece6','#99d8c9','#66c2a4','#41ae76','#238b45','#005824'] // bright green
//class_colors = ['#ffffff','#f0f0f0','#d9d9d9','#bdbdbd','#969696','#737373','#525252','#252525'] // grey scale
//class_colors = ['#fff5f0','#fee0d2','#fcbba1','#fc9272','#fb6a4a','#ef3b2c','#cb181d','#99000d']// brownish red
//class_colors = ['#f7fbff','#deebf7','#c6dbef','#9ecae1','#6baed6','#4292c6','#2171b5','#084594'] // blue
var playTimer
var legendCricleScale = [0.5,0.5]
function circleResize(e,i){
	x=e
	var elm = e.target
	while(elm.style.height != "100%")
		elm = elm.parentElement
	x=elm
	legendCricleScale[i] *= (e.wheelDelta>0)?1.05:0.95
	legendCricleScale[i] = (legendCricleScale[i]>1)?1:legendCricleScale[i];
	legendCricleScale[i] = (legendCricleScale[i]<0.1)?0.1:legendCricleScale[i];
	
	GULegendUpdate()
	
	legendSizeNumberUpdate()
	//elm.style.transform
}



function GUchange(e){
document.getElementById("play_year").innerHTML = document.getElementById("year_slider").value
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
	
	var scale1=document.body.clientWidth/650*.7
	if(scale1>document.body.clientHeight/500) scale1 = document.body.clientHeight/500
	
	
	// 1mm3 = 238.5 Voilent Crime
	// 1px3 =
	var f = Math.pow(1039/50*3/4/Math.PI,1/3)*594/21000*cons
	r=Math.pow(Tvoilent/1039,1/3)*f*100*25.4/getDPI()
	console.log(state[i]+"  1mm3  ->"+Tvoilent/(Math.pow(r,3)*Math.PI*2/3))
	
	

	// 1mm3 = 47713 people
	// 1px3 = 
	var f2 = Math.pow(579315/10000*3/4/Math.PI,1/3)*594/21000*cons2
	r= Math.pow(sum/579315,1/3)*f2*100 *25.4/getDPI()
	
	
	if(Tvoilent==0) continue;
	if(GU_bool==0){
		//console.log(f2);
		mySvg +=  generateSVG(state[i]+'_GU',leftAngles,rightAngles,Math.pow(Tvoilent/1039,1/3)*f,Math.pow(sum/579315,1/3)*f2,pos);
	}
	else
	if(GU_bool==1)
		mySvg += generateSVG_simple(state[i]+'_GU',leftAngles,Math.pow(Tvoilent/1039,1/3)*f,pos)
	mySvg += '\n'
}
//generateSVG(leftAngles,rightAngles,graph,1./3/7.86,pos);
mySvg += '</svg>'
//graphlegend+= '</svg>'

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

for(var i=0;i<state.length;i++){
	document.getElementById(state[i]).onmousemove = function(event){ popupOpen(event)}
	document.getElementById(state[i]).onmouseout = function(event){ popupClose(event)}
}

legendSizeNumberUpdate()

}


function recolor(values){
	var classNum =7
	var data = new geostats(values)
	var naturalBreaks = data.getClassJenks(classNum)
	console.log(naturalBreaks)
	
	for(var i=0;i<state.length;i++){
		for(var j=1;j<naturalBreaks.length;j++)
			if(values[i]<=naturalBreaks[j])
				break;
		
		document.getElementById(state[i]).style.fill = class_colors[j-1]
	}
	
	if(GU_bool==2) document.getElementById("show_lines").style.display = "none"
	else document.getElementById("show_lines").style.display = "block"
	//var legend = document.getElementsByClassName("classes")
	if(naturalBreaks[1]==0) {
		document.getElementById("choropleth_legend").style.display = "none"
		
	}
	else{
		document.getElementById("choropleth_legend").style.display = "block"
		for(var j=0;j<classNum;j++){
			var a = parseInt(naturalBreaks[classNum-1-j])
			var b = parseInt(naturalBreaks[classNum-j])
			if(a==parseInt(a)) a= a+""
			if(b==parseInt(b)) b= b+""
			
			if(j>0)
				document.getElementById("classValue"+(j+1)).innerHTML = a+" - <"+b
			else
				document.getElementById("classValue"+(j+1)).innerHTML = a+" - "+b
		}
	}
}

var popupElement = document.getElementById("countryName_popup")

function popupOpen(event){
	var name =event.target.id.split("_")
	if(popupElement.style.display=="none")
		popupElement.style.display = "block"
	popupElement.style.top = event.pageY-20 + "px"
	popupElement.style.left = event.pageX+5 + "px"
	
	for(var i=0;i<name.length;i++)		name[i]= name[i][0]+name[i].toLowerCase().slice(1)
	
	popupElement.innerHTML = name.join(" ")
	//console.log("I am popup " + name)
}
function popupClose(event){
	ev=event;
	popupElement.style.display = "none"
}
function GULegendUpdate(){
	
var legend_box = document.getElementById("legend_GU_parts")
var leg_svg = "<svg class = 'legend_svg0' onwheel='circleResize(event,0)' style='cursor:zoom-in;transform:scale("+legendCricleScale[0]+");height:100%;' viewBox='0 0 220 200'>"
var leg_svg2 = "<svg class = 'legend_svg0' onwheel='circleResize(event,1)' style='cursor:zoom-in;transform:scale("+legendCricleScale[1]+");height:100%;' viewBox='0 0 220 200'>"

if(GU_bool==0){
	legend_box.style.display = "block"
	document.getElementById("legend_GU_second").style.display="block"
	document.getElementById("legend_GU_second_txt").style.display="block"

	var angles = [40,16,10,8]
	var rightAng = [40,16,10,8,4]
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
	
	
	document.getElementById("legend_GU_first").innerHTML=leg_svg + GU[0]+"</svg>" //<text id='legend1_value' x='20' y= '220' style='fill:white;font-size:15px;font-family:ArialMT'>anything</text>
	document.getElementById("legend_GU_second").innerHTML=leg_svg2 + GU[1]+"</svg>"
	
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
		
	leg_svg += generateSVG_simple("legend_svg1",angles,1,[100,100])+"</svg>"
	document.getElementById("legend_GU_first").innerHTML=leg_svg
	
}else if(GU_bool==2)
	legend_box.style.display = "none"

}
function getDPI() {
    var div = document.createElement( "div");
    div.style.height = "1in";
    div.style.width = "1in";
    div.style.top = "-100%";
    div.style.left = "-100%";
    div.style.position = "absolute";

    document.body.appendChild(div);

    var result =  div.offsetHeight;

    document.body.removeChild( div );

    return result;

}

function legendSizeNumberUpdate(){
		var leg = document.getElementsByClassName("size_txt")
		
		var DPI = getDPI()
		var scale1=document.body.clientWidth/650*.7
		if(scale1>document.body.clientHeight/500) scale1 = document.body.clientHeight/500
		scale1 = Math.pow(scale1,3)
		
		//document.getElementById('choropleth_legend').style.transform = (scale1/2.5>1)?'scale(1)':'scale('+scale1/2.5+')'
		
		var val=[238.5/Math.pow(cons,3)/scale1,47713/Math.pow(cons2,3)/scale1]
		
		for(var i=0;i<leg.length;i++){
			var a =Math.round(val[i])
			if(GU_bool==1) a = Math.round(a/2)
			var str = ""
			x=0;
			while(a>0){
				
				str=(a%10)+str
				a=parseInt(a/10);
				x++;
				if(x%3===0) str=" "+str
			}
			leg[i].innerHTML=str
		}
		
		var leg = document.getElementsByClassName("size_txt2")
		var scale_legend
		var r=40*200/220.*25.4/DPI
		for(var i=0;i<leg.length;i++){
			var a= Math.round(val[i]*Math.pow(r*legendCricleScale[i],3)*Math.PI*2/3)
			var str = ""
			x=0;
			while(a>0){
				
				str=(a%10)+str
				a=parseInt(a/10);
				x++;
				if(x%3===0) str=" "+str
			}
			leg[i].innerHTML=str
		}
		
}




