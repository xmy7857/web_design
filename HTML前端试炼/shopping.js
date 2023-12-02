var active01=document.getElementById('active01'); 
var date=new Date("Wed Oct 04 2023 22:16:01 GMT 0800 (中国标准时间)");
date=date.toLocaleString();
console.log(date);
if(localStorage.getItem('is_log')=='true'){
  var name1=document.getElementById("name");
  name1.innerHTML=localStorage.getItem("nickname");
}
else {window.location.href="login.html";}
var order_length;
var arr=[];
var neirong_arr=[]
var user=localStorage.getItem('username');

function myticket(elist){
  //console.log("此单订票数为："+elist.length)
  var neirong=[];
  if(elist.length==0)
    return;
  for(let i=0;i<elist.length;i++){
    var nei={img:"img/mod01.jpg",neirong1:'uuu',neirong2:elist[i].ticket_type,neirong3:elist[i].identify,neirong4:elist[i].ticket_cost,Tid:elist[i].id, travel_date:elist[i].travel_date}
    neirong.push(nei);
  }
  neirong_arr.push(neirong);
  if(neirong_arr.length==order_length)
    show();
}

function myorder(data){
  //console.log("data："+data);
  order_length=data.length;
  if(data.length==0)
    return;
  for(let i=0;i<data.length;i++){
    console.log("单号"+data[i].order_id);
    var ei={time:data[i].date,numb:data[i].order_id,scenic:data[i].scenic};
    switch(ei.scenic){
      case "qinhuaihe":
        ei.scenic="秦淮河";
        break;
      case "zongtongfu":
        ei.scenic="总统府";
        break;
      case "fuzimiao":
        ei.scenic="夫子庙";
        break;
      case "zhongshanlin":
        ei.scenic="中山陵";
        break;
      case "xuanwuhu":
        ei.scenic="玄武湖";
        break;
      case "jinianguan":
        ei.scenic="南京大屠杀遇难同胞纪念馆";
        break;
    }
    arr.push(ei);
    $.ajax({url:"shopping/ticket",
        type:"POST",
        data:'order_id='+data[i].order_id,
        success:myticket,
        error:function(e){alert("错误1: "+e.msg)}})
    
  }
}


$.ajax({url:"shopping/order",
        type:"POST",
        data:'username='+user,
        success:myorder,
        error:function(e){alert("错误: "+e.msg)}})


function show(){
  for(var i=0;i<arr.length;i++){
    active01.innerHTML +=`
    <div id="shopping${i}" class="shopping">
    </div>
    
    `
  }
  var shopping=document.getElementsByClassName("shopping");
  for(var i=0;i<arr.length;i++){
  
    shopping[i].innerHTML += `
    
      <div class="row_two_1_b" id="row_two_1_b">
      <p style="margin: 0px">
        <span class="span2">${arr[i].scenic}</span>
        <span class="span2">${arr[i].time}</span>订单号:${arr[i].numb}
        <input type="reset" id="span${i}" onclick="order_clear(${arr[i].numb})" class="clear" value="取消订单"/>
      </p>
      </div> 
      
      `
    for(var j = 0;j<neirong_arr[i].length;j++){
      shopping[i].innerHTML += `
        <table>
          <tr class="ul1">
            <td class="li2">
                <p>${neirong_arr[i][j].travel_date}</div>
            </td>
            
            <td class="li2">
              <p class="p1">${neirong_arr[i][j].neirong2}</p>
            </td>
            
            <td class="li1">
              <p>${neirong_arr[i][j].neirong3}</p>
            </td> 
            
            <td class="li2">
              <p class="p1 p2">￥${neirong_arr[i][j].neirong4}</p>
            </td>
            
            <td class="li2">
            <input type="reset" id="Tspan${i}" onclick="ticket_clear(${neirong_arr[i][j].Tid})" class="Tclear" value="退订"/>
            </td>
          </tr>
        <table>
        `
    }
    
    }
}

function SUC_clear_order(e){
  if(e.ret==0){
    window.location.reload();
  }
  
}

function order_clear(numb){
  var result;
  result=confirm("确定取消该订单？")

  if(result){
    $.ajax({url:"clear/order",
      type:"POST",
      data:'order_id='+numb,
      success:SUC_clear_order,
      error:function(e){alert("取消订单错误: "+e.msg)}})
    
  
  }
}

function SUC_clear_ticket(e){
  if(e.ret==0){
    window.location.reload();
  }
  
}

function ticket_clear(Tnumb){
  var result;
  result=confirm("确定退订该门票？")

  if(result){
    $.ajax({url:"clear/ticket",
      type:"POST",
      data:'ticket_id='+Tnumb,
      success:SUC_clear_ticket,
      error:function(e){alert("退订错误: "+e.msg)}})
    
  
  }
}
  