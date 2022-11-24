
async function registar() {

  console.log("Doing...");

  try{

    var dinheiro_base = 500;

    let data = {

       utilizador_name: document.getElementById("fusername").value,
       utilizador_password: document.getElementById("fpassword").value,
       utilizador_email: document.getElementById("femail").value,
       utilizador_dinheiro: dinheiro_base

    }

    let newUser = await $.ajax({

        url: "/users/insertnewuser",
        method: "post",
        data: JSON.stringify(data),
        contentType: "application/json",
        dataType: "json"

    });

   // console.log("Inserted new user with id: " + newUser.utilizador_id)

   console.log("Done");

    alert("Done POST");
     
  } catch (err) {

     console.log(err);

  }

}

///////////////// FUNCAO REGISTER 

 // COMEÇA AQUI O COMENTARIO
 async function registreamento() {

 console.log("Storing...");



console.log("Registering user...");

try {


  var utilizador_dinheiro_base = 500;


  let data = {

    utilizador_name: document.getElementById("fusername").value,
    utilizador_password: document.getElementById("fpassword").value,
    utilizador_email: document.getElementById("femail").value,
    utilizador_dinheiro: utilizador_dinheiro_base,
    //utilizador_pass: hash --> DUVIDA*************************************************
    utilizador_pass: "default"

  }

  let newUser = await $.ajax({

      url: "/users/insertnewuser",
      method: "post",
      data: JSON.stringify(data),
      contentType: "application/json",
      dataType: "json"

      
  });
  
} catch (err) {
  
    console.log(err);

}
console.log("Stored...");
}


//LOGIN 

async function login() {

            

  console.log("Função Login chamada...");

  try{

  let object = {

     utilizador_name: document.getElementById("fusernamelogin").value,
     utilizador_password: document.getElementById("fpasswordlogin").value

  };

  console.log("Sending the object with values: " + object);

  let authUser = await $.ajax({
   url: "/users/loginuser",
   method: "post",
   data: JSON.stringify(object),
   contentType: "application/json",
   dataType: "json",

});

    console.log("Verifying user with username: " + authUser.utilizador_name + " and password: " + authUser.utilizador_password);


    sessionStorage.setItem('utilizador_id', authUser.utilizador_id);
    sessionStorage.setItem('utilizador_name', authUser.utilizador_name);
    sessionStorage.setItem('utilizador_password', authUser.utilizador_password);
    sessionStorage.setItem('utilizador_email', authUser.utilizador_email);
    sessionStorage.setItem('utilizador_dinheiro', authUser.utilizador_dinheiro);
    sessionStorage.setItem('utilizador_pass', authUser.utilizador_pass);
   
    console.log(authUser.utilizador_id);

    window.location.replace("http://localhost:2000/secondpagetest.html");
} catch(err){

console.log(err);

}

}
       