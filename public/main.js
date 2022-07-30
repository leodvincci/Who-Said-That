const update = document.querySelector("#btn-update");
const updateName =document.querySelector("#updateName")
const updateQuote = document.querySelector("#updateQuote")
const deleteBtn = document.querySelector("#delete-button")
let theItemName;
let liValue = document.querySelectorAll("li")

liValue.forEach( l => {
    l.addEventListener("click", () => {
        console.log(l.innerText)
        console.log(updateName.value)
        theItemName = l.innerText;
        if(updateName.value.length > 0) {
            console.log("YUP!")
            fetch('/quotes', {
                method: "put",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    oldName: l.innerText,
                    name: updateName.value,
                    quote: updateQuote.value
                })

            })
                .then(r => {console.log("Hello")} )

        }
    })
})

update.addEventListener("click", ()=>{
    location.reload();
    updateQuote.value = ""
    updateName.value = ""
})

deleteBtn.addEventListener("click", ()=>{
    console.log("delete")
    fetch('/quotes', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: theItemName
        })
    }).then(r =>{console.log("OKY")})
        .then(()=>location.reload())
         // .then(res => {
        //     if (res.ok){
        //         console.log("OKAY!!")
        //     }
        // })
        // .then(data => {
        //     window.location.reload()
        // })
    setTimeout(() => {
        location.reload()
    }, 100);
}


)


//
// update.addEventListener("click", ()=>{
//     console.log("Hey I've been CLicked!!!!")
//     fetch('/quotes',{
//         method: "put",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             name: 'Mom',
//             quote: "I Love You, Very Much."
//         })
//     })
//         .then()
//
// })