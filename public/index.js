$(document).ready(()=>{
let img=document.getElementById('img');
let room=document.getElementById('room_id');
let camera=document.getElementById('camera_id');
let time=document.getElementById('time');
let ufm_activity=document.getElementById('activity');
let btn=document.getElementById('btn')
var div_=document.getElementById('div_');
// var firebase=require('firebase').initializeApp({
//     credential: '/test-c4d44.json',
//     databaseURL: "https://test-c4d44.firebaseio.com"
//   });
//   var ref=firebase.database().ref().child('students');
//   console.log(ref);



  $.get('/detects').then((response) => {
    var y=1;
    // var i="students"+y.toString();
    // console.log()
    // console.log(response.students1.Room_ID)
    console.log(Object.keys(response).length);
    // for(var i=0;i<Object.keys(response).length;i++)
    // {
    //     var s=i.toString();
    //     console.log(response.students+s.Room_ID)
    var len=Object.keys(response).length;
    for (var key in response) {
    // skip loop if the property is from prototype
    if (!response.hasOwnProperty(key)) continue;

    var obj = response[key];

    console.log(obj)
    console.log(key);

    var div_1=$(`<div class="col-lg-4"></div>`)
    var img12 = $(`<img id="dynamic" >`); //Equivalent: $(document.createElement('img'))
    img12.attr('src', obj.ScreenShot_URL);

    var div99=$((`<div id="myDiv"><p id="hid" >${key}</p><br><span>Camera id:${obj.Camera_ID}</span><br><span>Room_ID:${obj.Room_ID}</span><br><span>Time:${obj.Time}</span><br><span>Activity:${obj.ufm_activity}</span></div>`));
    //   $('#hid').hide();
    div99.append(($(`<button id="checked">Checked</button>`).click((ev)=>{
        var $this=$(ev.target.parentElement)
             console.log($this.find('img'))
             $this.hide();
        // console.log(ev.target.parentElement.find('div'))

    })));
    div99.append($(`<button id="del">Delete</button></div>`).click((ev)=>{
        
        var $this=$(ev.target.parentElement)
        console.log($this.find('p').text())
        var data=$this.find('p').text();
      var data1={id:data}
      JSON.stringify(data1)
        $.post("/delete",data1,
        function(data1,status){
          alert("Data: " + data1 + "\nStatus: " + status);
        });
        $this.hide();
    }));
    div99.append(img12)
  
 

div99.appendTo(div_1);
div_1.appendTo(div_);
           
    
    for (var prop in obj) {
        // skip loop if the property is from prototype
        if (!obj.hasOwnProperty(prop)) continue;

        // your code
        console.log(prop + " = " + obj[prop]);
    }
}

    if (!response.success) {
      window.alert(response.msg)
    } else {
     
     console.log(response.data)

    }
}).fail((err) => {
    console.log(err)
  });


})