//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyAV0Uagz-RXhmwM8M6sOMVKyMRAuNpdjRw",
      authDomain: "kwitter-24d98.firebaseapp.com",
      databaseURL: "https://kwitter-24d98-default-rtdb.firebaseio.com",
      projectId: "kwitter-24d98",
      storageBucket: "kwitter-24d98.appspot.com",
      messagingSenderId: "903637239926",
      appId: "1:903637239926:web:a1cad3589803ad446f3757",
      measurementId: "G-JZ54YP9J4D"
      
      
};
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user-name");
room_name = localStorage.getItem("room_name");

function send() {
      message = document.getElementById("message").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: message,
            like: 0
      });
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name=message_data['name'];
                        message=message_data['message'];
                        like=message_data['like'];

                       name_with_tag="<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
                        msg_with_tag="<h4 class='message_h4'>"+message+"</h4>";
                        like_button="<button class='btn btn-warning' id= "+firebase_message_id+" value="+like+" onclick='update_like(this.id)'>";
                        span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>Like : "+like+"</span> </button> <hr>";
                        row=name_with_tag+msg_with_tag+like_button+span_with_tag;
                        document.getElementById("output").innerHTML+=row;
                        


                        //End code
                  }
            });
      });
}
getData();
function update_like(message_id){
      console.log("clicked on like button-"+message_id);
      button_id=message_id;
      like=document.getElementById(button_id).value;
      updated_likes=Number(like)+1;
      console.log(update_like);
      firebase.database().ref(room_name).child(message_id).update({
            like:updated_likes
      });
}

function logout(){
      localStorage.removeItem("user-name");
      localStorage.removeItem("user_name");
      window.location="index.html";
}
