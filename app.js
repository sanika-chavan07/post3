

let cl = console.log;

const PostContainer = document.getElementById("PostContainer");
const postFrom=document.getElementById("postFrom")
const titleControl=document.getElementById("title")
const  bodyControl=document.getElementById("body")
const userIDcontrol=document.getElementById("userId")
const updatebtn=document.getElementById("updatebtn")
const addbtn=document.getElementById("addbtn")

let BASE_URL = `https://jsonplaceholder.typicode.com`
let POST_URL = `${BASE_URL}/posts`

let xhr = new XMLHttpRequest();

xhr.open("GET", POST_URL, true)

xhr.send()

xhr.onload = function () {

    if (xhr.status >= 200 && xhr.status < 300) {

        let data = JSON.parse(xhr.response)

        cl(data)

        craetepost(data)
    }
}


function snackbar(msg, icon) {
    Swal.fire({
        title: msg,
        icon: icon,
        timer: 3000
    })
}


const craetepost = (arr) => {

    let result = ""

    for (let i = arr.length - 1; i >= 0; i--) {

        result += `

        <div class="col-md-4 mb-4" id="${arr[i].id}">
            <div class="card h-100">
                <div class="card-header">
                    <h4>${arr[i].title}</h4>
                </div>
                <div class="card-body">
                    <p>${arr[i].body}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button onclick="onEdit(this)" class="btn btn-primary">Edit</button>
                    <button onclick="onRemove(this)"class="btn btn-danger">Remove</button>
                </div>
            </div>
        </div>

        `
    }

    PostContainer.innerHTML = result
}


function onpostFrom(eve){
    eve.preventDefault()
    let POST_OBJ={
        title:titleControl.value,
        body:bodyControl.value,
        userId:userIDcontrol.value



    }
    cl(POST_OBJ)





    let xhr=new XMLHttpRequest()

    xhr.open("POST",POST_URL,true)
    xhr.send(JSON.stringify(POST_OBJ))

    
    xhr.onload=function(){
        if(xhr.status>=200 && xhr.status<=299){
            // cl(JSON.parse(xhr.response))


        let res=JSON.parse(xhr.response)
        let col=document.createElement("div")
        col.className=`col-md-4 mb-4`;
        col.id=res.id
        col.innerHTML=`
        
        <div class="card h-100">
                <div class="card-header">
                    <h4>${POST_OBJ.title}</h4>
                </div>
                <div class="card-body">
                    <p>${POST_OBJ.body}</p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button onclick="onEdit(this)" class="btn btn-primary">Edit</button>
                    <button onclick="onRemove(this)" class="btn btn-danger">Remove</button>
                </div>
            </div>
        
        `

PostContainer.prepend(col)
        }
    }
}







function onEdit(ele){
    let EDIT_ID=ele.closest('.col-md-4').id
     cl(EDIT_ID)
     localStorage.setItem('EDIT_ID',EDIT_ID)
     let EDIT_URL=`${BASE_URL}/posts/${EDIT_ID}`

     let xhr=new XMLHttpRequest()

     xhr.open('GET',EDIT_URL,true)
     xhr.send()
     xhr.onload =function (){
        if(xhr.status>=200 && xhr.status<=299){
            let EDIT_OBJ=JSON.parse(xhr.response)
            titleControl.value=EDIT_OBJ.title,
            bodyControl.value=EDIT_OBJ.body,
            userIDcontrol.value=EDIT_OBJ.userId


            addbtn.classList.add("d-none")
            updatebtn.classList.remove("d-none")
            

            

            
        }
      
     }

}





function onupdatebtn(eve){
    let UPDATE_ID=localStorage.getItem('EDIT_ID')
    cl(UPDATE_ID)
    let UPDATE_URL=`${BASE_URL}/posts/${UPDATE_ID}`
cl(UPDATE_URL)

let UPDATE_OBJ={
    title:titleControl.value,
    body:bodyControl.value,
    userId:userIDcontrol.value,
    id:UPDATE_ID
}
cl(UPDATE_OBJ)


let xhr=new XMLHttpRequest()
xhr.open("PATCH",UPDATE_URL,true)
xhr.send(JSON.stringify(UPDATE_OBJ))
xhr.onload =function(){
    if(xhr.status>=200 && xhr.status<=299){
let res=JSON.parse(xhr.response)
let col=document.getElementById(UPDATE_ID)
     let h4 = col.querySelector('.card-header h4')
     let p=col.querySelector('.card-body p')

     h4.innerText=UPDATE_OBJ.title
     p.innerText=UPDATE_OBJ.body


     
    addbtn.classList.remove("d-none")
    updatebtn.classList.add("d-none")

 cl(h4)






    }
         snackbar(`The post with id ${UPDATE_ID} is updated successfully !!!`, 'success')
}
}



function onRemove(ele){

Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
    cl(result)
  if (result.isConfirmed) {
     let REMOVE_ID=ele.closest('.col-md-4').id
    cl(REMOVE_ID)

    let REMOVE_URL=`${BASE_URL}/posts/${REMOVE_ID}`
    cl(REMOVE_URL)


    let xhr=new XMLHttpRequest()

    xhr.open("DELETE",REMOVE_URL,true)
    xhr.send()

    xhr.onload =function(){
        if(xhr.status>=200 && xhr.status<=299){
            ele.closest('.col-md-4').remove()
                  snackbar(`The Post with id ${REMOVE_ID}, is removed successfully !!!`, 'success')


        }
    }


    



    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});
















    
   
}












updatebtn.addEventListener("click",onupdatebtn)
postFrom.addEventListener("submit",onpostFrom)