const path = require('path');
const http = require('http');
const express = require('express');
var app=express();
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

var firebase=require('firebase').initializeApp({
  credential: '/test-c4d44.json',
  databaseURL: "https://test-c4d44.firebaseio.com"
});
const publicPath = path.join(__dirname, './public');

app.set('view engine', 'html');
app.set('views', publicPath);
app.use(express.static(publicPath));

var data=[{"Room_ID":"2331","ScreenShot_URL":"https://s.abcnews.com/images/GMA/abc_gma_schriffen_130609_wg.jpg","ufm_activity":"Cheating","Camera_ID":"6201","Time":"9.00 am"},
{"Room_ID":"2331","ScreenShot_URL":"https://s.abcnews.com/images/GMA/abc_gma_schriffen_130609_wg.jpg","ufm_activity":"Cheating","Camera_ID":"6201","Time":"9.00 am"},
{"Room_ID":"2331","ScreenShot_URL":"https://s.abcnews.com/images/GMA/abc_gma_schriffen_130609_wg.jpg","ufm_activity":"Cheating","Camera_ID":"6201","Time":"9.00 am"},
{"Room_ID":"2331","ScreenShot_URL":"https://s.abcnews.com/images/GMA/abc_gma_schriffen_130609_wg.jpg","ufm_activity":"Cheating","Camera_ID":"6201","Time":"9.00 am"},
{"Room_ID":"2331","ScreenShot_URL":"https://s.abcnews.com/images/GMA/abc_gma_schriffen_130609_wg.jpg","ufm_activity":"Cheating","Camera_ID":"6201","Time":"9.00 am"},
{"Room_ID":"2331","ScreenShot_URL":"https://s.abcnews.com/images/GMA/abc_gma_schriffen_130609_wg.jpg","ufm_activity":"Cheating","Camera_ID":"6201","Time":"9.00 am"}]

var ref1=firebase.database().ref();
for(var i=0;i<data.length;i++)
{
    var ref=firebase.database().ref().child('students'+i.toString());
    ref.child("Room_ID").set(data[i].Room_ID)
    ref.child("ScreenShot_URL").set(data[i].ScreenShot_URL)
    ref.child("ufm_activity").set(data[i].ufm_activity)
    ref.child("Camera_ID").set(data[i].Camera_ID)
    ref.child("Time").set(data[i].Time)


}
// ref1.child('students3').remove();
app.get('/detects', (req, res) =>{
    if (!req.body) {
        return res.status(400).json({
          status: 'error',
          error: 'req body cannot be empty',
        });
      }

    
var ref1 = firebase.database().ref();

ref1.on("value", function(snapshot) {
   console.log(snapshot.val());
   res.status(200).json(snapshot.val())
 
}, function (error) {
   console.log("Error: " + error.code);
});

})
app.post("/delete", (req,res) => {
   
        if (!req.body) {
          return res.status(400).json({
            status: 'error',
            error: 'req body cannot be empty',
          });
        }
  console.log(req.body.id);
  ref1.child(req.body.id).remove();
  });
  
  app.post('/api/activity/',(req,res)=>{
    const newActivity = {
      Room_ID:req.body.Room_ID,
      ScreenShot_URL:req.body.ScreenShot_URL,
      ufm_activity:req.body.ufm_activity,
      Camera_ID:req.body.Camera_ID,
      Time:req.body.Time
    }
    var d=Math.random();
    var ref=firebase.database().ref().child('students'+d.toString());
    ref.child("Room_ID").set(newActivity.Room_ID)
    ref.child("ScreenShot_URL").set(newActivity.ScreenShot_URL)
    ref.child("ufm_activity").set(newActivity.ufm_activity)
    ref.child("Camera_ID").set(newActivity.Camera_ID)
    ref.child("Time").set(newActivity.Time)
});
// var leadsRef = database.ref('leads');
// leadsRef.on('value', function(snapshot) {
//     snapshot.forEach(function(childSnapshot) {
//       var childData = childSnapshot.val();
//     });
// });



// var message={text:"hey guys",timestamp:new Date().toString()};
// var ref=firebase.database().ref().child('students');
// var camera=ref.child('camera_id').set("65");
// var url=ref.child('url').set("https://www.google.com/")

// var messagesRef=ref.child('message');
// var messageRef=messagesRef.push(message);
// logsRef.child(messageRef.key).set(message);
// ref.orderByKey().limitToLast(1).on('child_added',(snap)=>{
//   console.log('added',snap.val());
// });
app.get('/', (req, res) => {
    res.render('index')
})
const PORT = process.env.PORT || 5000;

app.listen( PORT,() =>
{
    console.log("server runnin at port 5000")
})
