var cc=0;
var adult;
var student;
var kid;
function ColorChoice()
{
    var fruit=this.value
    alert('这是有关'+fruit+'的信息');
    console.log(this)
}

function totalCost()
{
    var FRS=document.getElementsByClassName("fares");
    var cost=0;
    for(var i=0;i<FRS.length;i++){
        cost=cost+parseFloat(FRS[i].textContent);
    }
    var totalcost=document.getElementById("cost");
    totalcost.innerHTML="总价："+cost+"元";
    console.log(cost);
    cost.onblur=true;
    return cost;
}

function subm()
{
    var cost=totalCost();
    var date=new Date();
    if(cost==0){
        alert("购票失败");
        return;
    }
    var last1=document.getElementById("test"+cc);
    if(last1.value==''){
        alert("请选择日期");
        return;
    }
    var last=document.getElementById("idnum_"+cc);
    if(last.value==''){
        alert("请填写证件号");
        return;
    }
    var user=localStorage.getItem('username');
    alert("共花费"+cost+"元");
    $.ajax({url:"order/total",
            type:"POST",
            data:scenic+'&username='+user+'&time='+date.toLocaleString()+'&cost='+cost,
            success:post_ticket,
            error:function(e){alert("错误: "+e.msg)}})

}

function clear()
{
   window.location.reload();
    
}

function choice_fare(){
    var fare=this.value;
    var this_id=this.id;
    var this_cc=this_id.slice(8);
    var fare_id="fare_"+this_cc;
    console.log(fare_id);
    var this_fare = document.getElementById(fare_id);
    if(fare=="Option 1"){
        this_fare.textContent=adult+"";
    }
        
    else if(fare=="Option 2")
        this_fare.textContent=kid+"";
    else
        this_fare.textContent=student+"";
    totalCost();

}

function add_table() {
    // 检查证件号是否填写
    if(cc>0){
        let last=document.getElementById("idnum_"+cc);
        console.log(last.value)
        if(last.value==''){
            alert("请填写证件号");
            return;
        }
        
    }
    cc=cc+1;
    console.log(cc);
    //创建表
    const table = document.createElement("table",);
    table.setAttribute("border","2px");
    table.className="mytable"
    // 创建表头行和数据行...
    // 创建表头行
    const headerRow = document.createElement("tr");
    const headerCell1 = document.createElement("th");
    headerCell1.textContent = "票种";
    const headerCell2 = document.createElement("th");
    headerCell2.textContent = "单价";
    const headerCell3 = document.createElement("th");
    headerCell3.textContent = "日期";
    const headerCell4 = document.createElement("th");
    headerCell4.textContent = "证件号";
    headerRow.appendChild(headerCell1);
    headerRow.appendChild(headerCell2);
    headerRow.appendChild(headerCell3);
    headerRow.appendChild(headerCell4);

    // 创建数据行
    const dataRow = document.createElement("tr");
    //const dataCell1 = document.createElement("td");
    //dataCell1.textContent = "红苹果";
    const dataCell1=document.createElement("td");
    ///创建选项
    var container=document.createElement("div");
    var option1 = document.createElement("input");
    option1.type = "radio";
    option1.id = "option1_"+cc;
    option1.name = "options_"+cc;
    option1.value = "Option 1";
    option1.checked=true;
    option1.onclick = choice_fare;

    var option2 = document.createElement("input");
    option2.type = "radio";
    option2.id = "option2_"+cc;
    option2.name = "options_"+cc;
    option2.value = "Option 2";
    option2.onclick = choice_fare;

    var option3 = document.createElement("input");
    option3.type = "radio";
    option3.id = "option3_"+cc;
    option3.name = "options_"+cc;
    option3.value = "Option 3";
    option3.onclick = choice_fare;
    
    var label1 = document.createElement("label");
    label1.for = "option1_"+cc;
    label1.textContent = "成人票";

    var label2 = document.createElement("label");
    label2.for = "option2_"+cc;
    label2.textContent = "儿童票";

    var label3 = document.createElement("label");
    label3.for = "option3_"+cc;
    label3.textContent = "学生票";

    container.appendChild(option1);
    container.appendChild(label1);

    container.appendChild(option2);
    container.appendChild(label2);

    container.appendChild(option3);
    container.appendChild(label3);
    container.id="radiogroup_"+cc;
    dataCell1.appendChild(container);
    ///
    //const dataCell3 = document.createElement("td");
    const dataCell2 = document.createElement("td");
    dataCell2.id="fare_"+cc;
    dataCell2.textContent = adult+"";
    dataCell2.className="fares";
    //日期
    var dataCell3 = document.createElement("td");
    var dateselect=document.createElement("input");
    dateselect.type="text";
    dateselect.className="jeinput";
    dateselect.style.backgroundColor="linen"
    dateselect.id="test"+cc;
    console.log(dateselect.id)
    dateselect.placeholder="游玩日期";
    dataCell3.appendChild(dateselect);
    //证件号
    var dataCell4 = document.createElement("td");
    var idnum = document.createElement("input");
    idnum.id="idnum_"+cc;
    idnum.style.backgroundColor="linen";
    dataCell4.appendChild(idnum);
    dataRow.appendChild(dataCell1);
    dataRow.appendChild(dataCell2);
    dataRow.appendChild(dataCell3);
    dataRow.appendChild(dataCell4);

    // 将表头行和数据行添加到表格中
    table.appendChild(headerRow);
    table.appendChild(dataRow);
    //创建日期选项
    var dateselect=document.createElement("input");
    dateselect.type="text";
    dateselect.className="jeinput";
    dateselect.id="test"+cc;
    console.log(dateselect.id)
    dateselect.placeholder="游玩日期";
    
    // 创建删除按钮
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "删除";
    
    
    deleteBtn.addEventListener("click", function() {
        var result = confirm("确定删除该记录？");
        if (result) {
        // 用户点击了确定按钮
        table.remove();// 删除对应的表格
        } 
        totalCost();
        cc=cc-1;
    });

    // 将删除按钮添加到表格后面
    table.appendChild(deleteBtn);

    // 将表格添加到容器元素中
    tableContainer.appendChild(table);
    totalCost();//计算总价
    jeDate("#test"+cc,{
        //onClose:false,
        theme:{ bgcolor: "rgb(250, 227, 203)",color:"#666666", pnColor:"rgb(201, 175, 148)"},
        format: "YYYY-MM-DD"
    });
    };
    

    function SUC(e){
        if(0===e.ret){
          adult=e.adult;
          student=e.student;
          kid=e.kid;
        }
        else{
          alert("错误");
        }
      }
    
    function post_ticket(e){
        var identify,ticket_type,ticket_cost,radioButtonGroup,selectedRadioButton,travel_date;
        for(let i=1;i<=cc;i++){
            identify=document.getElementById("idnum_"+i).value;
            radioButtonGroup = document.querySelector('#radiogroup_'+i);
            selectedRadioButton = radioButtonGroup.querySelector('input[type="radio"]:checked');
            travel_date=document.getElementById("test"+i).value;
            if (selectedRadioButton.value=='Option 1') {
                ticket_type='成人票';
                ticket_cost=adult;
            }
            else if(selectedRadioButton.value=='Option 2'){
                ticket_type='儿童票';
                ticket_cost=kid;
            }
            else if(selectedRadioButton.value=='Option 3'){
                ticket_type='学生票';
                ticket_cost=student;
            }
            console.log(identify,ticket_cost,ticket_type);
            $.ajax({url:"order/detail",
                    type:"POST",
                    data: "order_id="+e.id+"&ticket_type="+ticket_type+"&ticket_cost="+ticket_cost+"&identify="+identify+"&travel_date="+travel_date,
                    success:function(e){if(e.ret==0 && i==cc){alert("订单提交成功！");window.location.href="ticketbuypage.html?"+scenic;}else if(e.ret==1) alert(e.msg);},
                    error:function(e){alert("错误1: "+e.msg)}})
        }
        
    }
      