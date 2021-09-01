//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyA0eda2aLvLVUmNaZuDCKtUMsPlEYnH9ws",
      authDomain: "kwitter-99fe7.firebaseapp.com",
      databaseURL: "https://kwitter-99fe7-default-rtdb.firebaseio.com",
      projectId: "kwitter-99fe7",
      storageBucket: "kwitter-99fe7.appspot.com",
      messagingSenderId: "590555615137",
      appId: "1:590555615137:web:c25de6ec547e2d99d985e0",
      measurementId: "G-EYDQJL6ER2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var room_name = localStorage.getItem("room_name");
var user_name = localStorage.getItem("user_name");

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        name = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];
                        name_with_tag = "<h4>"+ name + "<img class='user_tick' src='tick.png'></h4>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id="+ firebase_message_id +" value="+like+" onclick='updateClick(this.id)'>";
                        span_with_tag = "<span class='material-icons'>thumb_up</span>Like:" +  like + "</span></button><hr>";

                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML +=row;
                        //End code
                  }
            });
      });
}
getData();

function logout() {
      window.localStorage.clear();
      window.location = "index.html";
}

function send() {
      var msg = document.getElementById("txtMsg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      })
}

function updateClick(message_id) {
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      })
}