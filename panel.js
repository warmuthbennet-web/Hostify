async function create(){
 let username=localStorage.user
 let name=document.getElementById("servername").value
 await fetch("/create-server",{method:"POST",
 headers:{"Content-Type":"application/json"},
 body:JSON.stringify({username,name})
 })
 alert("Server erstellt")
}

async function upload(){
 let f=document.getElementById("file").files[0]
 let server=document.getElementById("server").value
 let username=localStorage.user

 let form=new FormData()
 form.append("file",f)
 form.append("username",username)
 form.append("server",server)

 await fetch("/upload",{method:"POST",body:form})
 alert("Datei hochgeladen")
}
