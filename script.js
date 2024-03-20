

const codeinput = document.getElementsByTagName("textarea")[0]

const runbutton = document.getElementsByClassName("compile")[0]

runbutton.addEventListener("click",(e)=>{
        var buttonicon = runbutton.getElementsByTagName("span")[0]
        var buttontext = runbutton.getElementsByTagName("strong")[0]
        buttonicon.innerText = "sync"
        buttonicon.classList.add("rotate")
        buttontext.innerText = "RUNNING..."
});
/*codeinput.addEventListener("input",(e)=>{
    var code = codeinput.value;

    if (! "<>[].+,-".includes(code.slice(x.length-1,x.length)))
    {
        codeinput.value = code.slice(0,x.length-1);
    }
})*/
