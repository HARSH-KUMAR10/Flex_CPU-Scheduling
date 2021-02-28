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
    var burst_time_total = 0;
    var waiting_time = [];
    var completion_time=[];
    var turn_around_time=[];
    var WT_total = 0;
    var TAT_total = 0;
    var checked =[];
    var turn_around_time_total=0;
    var waiting_time_total=0;
    if(Validate(arrival_time,burst_time)){
        var index_array=[];
        for(i=0;i<arrival_time.length;i++){
            index_array[i]=i;
            burst_time_total+=Number(burst_time[i]);
            checked[i] = false;
        }
        for(i=0;i<arrival_time.length;i++){
            for(j=0;j<arrival_time.length-1;j++){
                if(arrival_time[index_array[j]]>arrival_time[index_array[j+1]]){
                    var temp = index_array[j];
                    index_array[j]=index_array[j+1];
                    index_array[j+1]=temp;
                }
            }
        }
        var sum=0;
        for(i=0;i<arrival_time.length;i++){
            if(i==0){
                completion_time[index_array[i]]=Number(arrival_time[index_array[i]])+Number(burst_time[index_array[i]]);
            }else{
                completion_time[index_array[i]]=Number(completion_time[index_array[i-1]])+Number(burst_time[index_array[i]]);
            }
        }
        var str = "<table border='1' cellspacing='0' cellpadding='5'><tr><th>Process ID</th><th>Arrival Time</th><th>Burst Time</th>"
        +"<th>Completion Time</th><th>Waiting Time</th><th>Turn Around Time</th><th>Response Ratio</th></tr>";
            for (t = Number(arrival_time[index_array[0]]); t < Number(burst_time_total);) {
                var hrr = -9999;
                var temp;
                var loc;  
                for (i = 0; i < arrival_time.length; i++) {
                    if (arrival_time[index_array[i]] <= t && checked[i]!= true) {
                        temp = (Number(burst_time[index_array[i]]) + (Number(t) - Number(arrival_time[index_array[i]]))) / Number(burst_time[index_array[i]]);
                        if (hrr < temp) {
                            hrr = Number(temp);
                            loc = Number(i);  
                        }  
                    }  
                } 
                console.log(loc);
                t += Number(burst_time[index_array[loc]]);
                waiting_time[index_array[loc]] = Number(t) - Number(arrival_time[index_array[loc]]) - Number(burst_time[index_array[loc]]);
                turn_around_time[index_array[loc]] = Number(t) - Number(arrival_time[index_array[loc]]);
                turn_around_time_total += Number(turn_around_time[index_array[loc]]);
                checked[loc] = true;
                waiting_time_total += Number(waiting_time[index_array[loc]]);
            
            str+="<tr><td>"+(index_array[loc]+1)+"</td><td>"+arrival_time[index_array[loc]]+"</td><td>"+burst_time[index_array[loc]]+"</td><td>"+
            completion_time[index_array[loc]]+"</td><td>"+waiting_time[index_array[loc]]+"</td><td>"+turn_around_time[index_array[loc]]+"</td><td>";
            str+=hrr.toFixed(2)+"</td></tr>";
            console.log(str);
            }
            str+="</table>"
            var WT_average = waiting_time_total/arrival_time.length;
            var TAT_average = turn_around_time_total/arrival_time.length;
            str+="<br/><br/>Average Waiting Time : "+WT_average.toFixed(2)+"<br/><br/>Average Turn Around Time : "+TAT_average.toFixed(2);
            table.innerHTML=str;
        //Canvas Code
        var end=50;
        var start=50;
        var str2 = "";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, 1000, 1000);
        for(i=0;i<arrival_time.length;i++){
        end=(completion_time[index_array[i]]*20)-start;
        
        ctx.fillStyle = "#00FF00";
        ctx.fillRect(start, 130, end, 40);
        if(i!=arrival_time.length-1){
        ctx.fillStyle = "#000000";
        ctx.fillRect(start+end, 130,5, 40);
        }
        str2+='P'+(index_array[i]+1);
        
        for(j=0;j<completion_time[index_array[i]]-sum;j++){
            str2+='   ';
        }
        sum=completion_time[index_array[i]];
        start=start+end+5;
        }
        ctx.fillStyle = "#FFA500";
        ctx.font = "15px Arial";
        ctx.fillText(str2, 55, 125);
        //canvas COde:
    
    }else{
        alert("Input is not as expected");
    }
}
alert('hrrn');