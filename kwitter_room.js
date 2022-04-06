
//ADD YOUR FIREBASE LINKS HERE
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
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function add_room() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({ purpose: "adding room" });
      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";

}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;

                  console.log("Room Name-" + Room_names);
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirecttoroomname(this.id)' >#" + Room_names + "</div> <hr>";
                  document.getElementById("output").innerHTML += row;


                  //End code
            });
      });   
}
getData();

function redirecttoroomname(room_name) {
      console.log(room_name);
      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";

}
function logout() {
      localStorage.removeItem("user-name");
      localStorage.removeItem("room_name");
      window.location = "index.html";

}