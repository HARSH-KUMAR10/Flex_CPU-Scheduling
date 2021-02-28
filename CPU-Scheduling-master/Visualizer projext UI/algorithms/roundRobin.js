// JavaScript Document
var arrival_time_input = document.getElementById("arrival_time");
var burst_time_input = document.getElementById("burst_time");
var table = document.getElementById("table");
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

function Validate(a,b){
if(a.length!=b.length){
    return false;
}
for(i=0;i<a.length;i++){
if(isNaN(a[i]) || isNaN(b[i])){
    return false;
}
}
return true;
}

function calculate(){
    var arrival_time = arrival_time_input.value.split(',');
    var burst_time = burst_time_input.value.split(',');
    var waiting_time = [];
    var completion_time=[];
    var turn_around_time=[];
	var quantum=document.getElementById("quantum").value;
    var WT_total = 0;
    var TAT_total = 0;
    if(Validate(arrival_time,burst_time))
	{
        var index_array=[];
        for(i=0;i<arrival_time.length;i++)
		{
            index_array[i]=i;
        }
        var i=0;
		var rem_time=[];
 
       for(i = 0; i < arrival_time.length; i++)
       {
        rem_time[i] = Number(burst_time[index_array[i]]);
       }
  
       var t = 0;
       var arrival = 0;
 
      // Processing until the value 
      // of element of rem_time array 
      // is 0

  while(true)
  {
	console.log(quantum+"somil");
    var done = true;
    for(i = 0; i < arrival_time.length; i++)
    {
      if(rem_time[i] > 0)
      {
        done = false;
        if(rem_time[i] > Number(quantum) && 
           Number(arrival_time[index_array[i]]) <= Number(arrival))
        {
          t =t+ Number(quantum);
          rem_time[i] =rem_time[i]- Number(quantum);
          arrival++;
        }
        else
        {
          if(arrival_time[index_array[i]] <= Number(arrival))
          {
            arrival++;
			console.log(Number(t)+"ishi"+rem_time[i]);
            t += Number(rem_time[i]);
            rem_time[i] = 0;
            completion_time[index_array[i]] = Number(t); 
          }
        }
      }
    }
 
    if(done) 
	{
      break ;
	}
  }	
	
  
  for(i = 0; i < arrival_time.length; i++)
  {
    turn_around_time[index_array[i]] = Number(completion_time[index_array[i]]) - 
                  Number(arrival_time[index_array[i]]);
    waiting_time[index_array[i]] = Number(turn_around_time[index_array[i]]) - 
                 Number(burst_time[index_array[i]]);
  }	
  
		//total turn around and waiting time
		for (i = 0; i < arrival_time.length ; i++) 
        { 
         WT_total = WT_total + Number(waiting_time[index_array[i]]); 
         TAT_total = TAT_total + Number(turn_around_time[[index_array[i]]]); 
        } 
	
        var WT_average = WT_total/arrival_time.length;
        var TAT_average = TAT_total/arrival_time.length;
		
        var str = "<table border='1' cellspacing='0' cellpadding='5'><tr><th>Process ID</th><th>Arrival Time</th><th>Burst Time</th>"
        +"<th>Completion Time</th><th>Waiting Time</th><th>Turn Around Time</th></tr>";
        for(i=0;i<arrival_time.length;i++){
            str+="<tr><td>"+(index_array[i]+1)+"</td><td>"+arrival_time[index_array[i]]+"</td><td>"+burst_time[index_array[i]]+"</td><td>"+
            completion_time[index_array[i]]+"</td><td>"+waiting_time[index_array[i]]+"</td><td>"+turn_around_time[index_array[i]]+"</td></tr>";
        }
        str+="</table><br/><br/>Average Waiting Time : "+WT_average.toFixed(2)+"<br/><br/>Average Turn Around Time : "+TAT_average.toFixed(2);
        table.innerHTML=str;

        for(i=0;i<arrival_time.length;i++){
  
var checked = [];
for(j=0;j<arrival_time.length;j++){
checked[j]=false;
}
		}
for(i=0;i<arrival_time.length;i++){
	  var smallest_index = 10000;
    var smalest_completion_time=10000;
for(j=0;j<arrival_time.length;j++){
if(smalest_completion_time>completion_time[j] && !checked[j]){
smalest_completion_time=completion_time[j];
smallest_index=j;
}
}
index_array[smallest_index]=i;
checked[smallest_index]=true;
console.log(smallest_index)
console.log(index_array,checked)
}

        //Canvas Code
		console.log(index_array+"Ishita")
        var end=50;
        var start=50;
        var str2 = "";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, 1000, 1000);
        for(i=0;i<arrival_time.length;i++){
        end=completion_time[index_array[i]]*10;
       // console.log(start,end);
        ctx.fillStyle = "#00FF00";
        ctx.fillRect(start, 130, end, 40);
        if(i!=arrival_time.length-1){
        ctx.fillStyle = "#000000";
        ctx.fillRect(start+end, 130,5, 40);
        }
        str2+='P'+(index_array[i]+1);
        //console.log(str2);
        for(j=0;j<completion_time[index_array[i]];j++){
            str2+='   ';
        }
        start=start+end+5;
        }
        ctx.fillStyle = "#FFA500";
        ctx.font = "15px Arial";
        ctx.fillText(str2, 60, 120);
        //canvas COde:
    
    }
	else
	{
        alert("Input is not as expected");
    }
}
function Canvas(){
	
    for(i=0;i<arrival_time.length;i++){
    var smallest_index = 10000;
    var smalest_completion_time=10000;
var checked = [];
for(i=0;i<arrival_time.length;i++){
checked[i]=false;
}
for(i=0;i<arrival_time.length;i++){
for(j=0;j<arrival_time.length;j++){
if(smalest_completion_time>completion_time[j] && !checked[i]){
smalest_completion_time=completion_time[j];
smallest_index=j;
}
}
index_array[smallest_index]=i;
checked[smallest_index]=true;
}
}
console.log("abc")
console.log(index_array+"Ishita")
    var end=50;
    var start=50;
    var str2 = "";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 1000, 1000);
    for(i=0;i<arrival_time.length;i++){
    end=completion_time[index_array[i]]*10;
    //console.log(start,end);
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(start, 130, end, 40);
    if(i!=arrival_time.length-1){
    ctx.fillStyle = "#000000";
    ctx.fillRect(start+end, 130,5, 40);
    }
    str2+='P'+(index_array[i]+1);
    //console.log(str2);
    for(j=0;j<completion_time[index_array[i]];j++){
        str2+='   ';
    }
    start=start+end+5;
    }
    ctx.fillStyle = "#FFA500";
    ctx.font = "15px Arial";
    ctx.fillText(str2, 60, 120);
}
console.log("Ish")