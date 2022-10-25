import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";



jQuery(($) => {
  // The speed of the scroll in milliseconds
  const speed = 1000;

  $('a[href*="#"]')
    .filter(
      (i, a) =>
        a.getAttribute("href").startsWith("#") ||
        a.href.startsWith(`${location.href}#`)
    )
    .unbind("click.smoothScroll")
    .bind("click.smoothScroll", (event) => {
      const targetId = event.currentTarget.getAttribute("href").split("#")[1];
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        event.preventDefault();
        $("html, body").animate(
          { scrollTop: $(targetElement).offset().top },
          speed
        );
      }
    });
});




const firebaseConfig = {
  apiKey: "AIzaSyBMhv9nLHJSDFridEtQqTdaceC_Joggj3s",
  authDomain: "mixit-55999.firebaseapp.com",
  databaseURL: "https://mixit-55999-default-rtdb.firebaseio.com",
  projectId: "mixit-55999",
  storageBucket: "mixit-55999.appspot.com",
  messagingSenderId: "640590456925",
  appId: "1:640590456925:web:69ec2ab104da434463c5b4",
  measurementId: "G-C39SN5MQK1"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);

$(document).ready(function(){
  const db = getDatabase();
  const pumpStateDB1 = ref(db, 'pumpState1');
  const pumpStateDB2 = ref(db, 'pumpState2');
  const pumpStateDB3 = ref(db, 'pumpState3');
  const pumpStateDB4 = ref(db, 'pumpState4');
  const drinkOpt = ref(db, 'drinkOpt');
  const isReady = ref(db, 'isReady');


	var pumpState1;
	var pumpState2;
	var pumpState3;
	var pumpState4;
  var opt;
  var state;

  onValue(pumpStateDB1, (snapshot) => {
    pumpState1 = snapshot.val();
    // change toggle button UI
    if(pumpState1 == "1"){
			document.getElementById("unact").style.display = "none";
			document.getElementById("act").style.display = "block";
		} else {
			document.getElementById("unact").style.display = "block";
			document.getElementById("act").style.display = "none";
		}
  });

  onValue(pumpStateDB2, (snapshot) => {
    pumpState2 = snapshot.val();
    // change toggle button UI
    if(pumpState2 == "1"){
			document.getElementById("unact1").style.display = "none";
			document.getElementById("act1").style.display = "block";
		} else {
			document.getElementById("unact1").style.display = "block";
			document.getElementById("act1").style.display = "none";
		}
  });

  onValue(pumpStateDB3, (snapshot) => {
    pumpState3 = snapshot.val();
    // change toggle button UI
    if(pumpState3 == "1"){
			document.getElementById("unact2").style.display = "none";
			document.getElementById("act2").style.display = "block";
		} else {
			document.getElementById("unact2").style.display = "block";
			document.getElementById("act2").style.display = "none";
		}
  });

  onValue(pumpStateDB4, (snapshot) => {
    pumpState4 = snapshot.val();
    // change toggle button UI
    if(pumpState4 == "1"){
			document.getElementById("unact3").style.display = "none";
			document.getElementById("act3").style.display = "block";
		} else {
			document.getElementById("unact3").style.display = "block";
			document.getElementById("act3").style.display = "none";
		}
  });


  $(".toggle-btn").click(function(){ 
   
    if(pumpState1 == "1"){
      set(pumpStateDB1, "0");
      pumpState1 = "0";
    } else {
      set(pumpStateDB1, "1");
      pumpState1 = "1";
    }
  })

  $(".toggle-btn1").click(function(){ 
    
    if(pumpState2 == "1"){
      set(pumpStateDB2, "0");
      pumpState2 = "0";
    } else {
      set(pumpStateDB2, "1");
      pumpState2 = "1";
    }
  })

  $(".toggle-btn2").click(function(){ 
    
    if(pumpState3 == "1"){
      set(pumpStateDB3, "0");
      pumpState3 = "0";
    } else {
      set(pumpStateDB3, "1");
      pumpState3 = "1";
    }
  })

  $(".toggle-btn3").click(function(){ 
    
    if(pumpState4 == "1"){
      set(pumpStateDB4, "0");
      pumpState4 = "0";
    } else {
      set(pumpStateDB4, "1");
      pumpState4 = "1";
    }
  })
  
// drink-option

onValue(isReady, (snapshot) => {
  state = snapshot.val();
  // change toggle button UI
  if(state == "0"){
    $(':button').prop('disabled', true);
    document.getElementById("unact").style.display = "none";
    document.getElementById("unact1").style.display = "none";
    document.getElementById("unact2").style.display = "none";
    document.getElementById("unact3").style.display = "none";

  } else {
    $(':button').prop('disabled', false);
 
    $(':button').text('MixIT');
    $('#clean-up').text('Clean me up!');
    
    
  }
});



  $("button").click(function(){ 
    var ele = $(this);
    opt = ele.val();
    if(state == "1"){
      set(isReady, "0");
      // state = "0";
      ele.text('Please wait...');
      set(drinkOpt, opt);
    } 

  })

  
  

});

