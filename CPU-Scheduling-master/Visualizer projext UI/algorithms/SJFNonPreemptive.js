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
    var WT_total = 0;
    var TAT_total = 0;
     var a = true;
		var st=0;
		var f=[];
		var i=0;
		var tot=0;

    if(Validate(arrival_time,burst_time))
	{
        var index_array=[];
        for(i=0;i<burst_time.length;i++)
		{
            index_array[i]=i;
        }
		
 for(i=0;i<burst_time.length;i++)
{

f[i] = 0;
}      
while(a)
{
	console.log("ishita");
var c=burst_time.length;
var min=999;
if (tot == burst_time.length) // total no of process = completed process loop will be terminated
{
 break ;
}
for (i=0; i<burst_time.length; i++)
{
/*
* If i'th process arrival time <= system time and its flag=0 and burst<min
* That process will be executed first
*/
if ((arrival_time[index_array[i]] <= st) && (f[index_array[i]] == 0) && (burst_time[index_array[i]]<min))
{
min=Number(burst_time[index_array[i]]);
c=Number(index_array[i]);
}
}
/* If c==n means c value can not updated because no process arrival time< system time so

we increase the system time */
if (c==(burst_time.length))
{
st++;
}
else
{
	console.log("somil");
	completion_time[index_array[c]]=st+Number(burst_time[index_array[c]]);
st=st + Number(burst_time[index_array[c]]);
turn_around_time[index_array[c]]=Number(completion_time[index_array[c]])-Number(arrival_time[index_array[c]]);
waiting_time[index_array[c]]=Number(turn_around_time[index_array[c]])-Number(burst_time[index_array[c]]);
f[index_array[c]]=1;
tot++;
}

}
        for (i = 0; i < arrival_time.length ; i++) 
        { 
         WT_total = WT_total + Number(waiting_time[index_array[i]]); 
         TAT_total = TAT_total + Number(turn_around_time[index_array[i]]); 
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

        //Canvas Code
        var end=50;
        var start=50;
        var str2 = "";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, 1000, 1000);
        for(i=0;i<arrival_time.length;i++){
        end=completion_time[index_array[i]]*10;
        console.log(start,end);
        ctx.fillStyle = "#00FF00";
        ctx.fillRect(start, 130, end, 40);
        if(i!=arrival_time.length-1){
        ctx.fillStyle = "#000000";
        ctx.fillRect(start+end, 130,5, 40);
        }
        str2+='P'+(index_array[i]+1);
        console.log(str2);
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
	else{
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