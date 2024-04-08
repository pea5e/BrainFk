

const codeinput = document.getElementsByTagName("textarea")[0]

const runbutton = document.getElementsByClassName("compile")[0]

const error = document.getElementById("error")

const output = document.getElementById("Output")

const inp = document.getElementById("input")

const buffelements = document.getElementsByClassName("btn-group")[0]

const codeinterpreter = document.getElementsByClassName("code-interpreter")[0]

document.body.onload  = (e)=>{
    if(document.cookie.startsWith("lastcode="))
        codeinput.value = document.cookie.split('=')[1]
}



runbutton.addEventListener("click",(e)=>{
        var code = codeinput.value;
        var input = inp.value
        var buttonicon = runbutton.getElementsByTagName("span")[0]
        var buttontext = runbutton.getElementsByTagName("strong")[0]
        buttonicon.innerText = "sync"
        buttonicon.classList.add("rotate")
        buttontext.innerText = "RUNNING..."
        if (codeinput.className.includes("is-invalid"))
            codeinput.classList.remove("is-invalid");
        buffelements.style.display = "block";
        // codeinterpreter = ;
        output.value = '';
        buffelements.innerHTML = '<button type="button" class="btn border border-black btn-warning">0</button>'
        var buffer = [0];
        var index = 0;
        var readindex = 0; 
        var buffindex = 0; 
        // var kill = setTimeout(()=>{
        //     console.log("kill");
        //     location.reload();
        // }, 3000)
        var time = (new Date()).getTime();
        while(index<code.length)
        {
            codeinterpreter.innerHTML = code.slice(0,index)+"<span class=\"highlighted\">"+code.substring(index,index+1)+"</span>"+code.slice(index+1,code.length)
            switch(code.charAt(index))
            {
                case '>':
                    buffindex++;
                    buffelements.getElementsByTagName("button")[buffindex-1].className = "btn border border-black btn-light";
                    if (buffindex == buffer.length)
                    {
                        buffer.push(0);
                        let newnode =  document.createElement('button');
                        newnode.type = "button";
                        newnode.innerHTML = '0';
                        buffelements.appendChild(newnode)
                    }
                    buffelements.getElementsByTagName("button")[buffindex].className = "btn border border-black btn-warning";
                    break;
                case '<':
                    if (buffindex==0)
                    {
                        codeinput.classList.add("is-invalid");
                        error.innerHTML = "Out of range! Youwanted to '<' below the first cell. at "+index.toString();
                        index=code.length;
                    }
                    else{
                        buffelements.getElementsByTagName("button")[buffindex].className = "btn border border-black btn-light";
                        buffindex--;
                        buffelements.getElementsByTagName("button")[buffindex].className = "btn border border-black btn-warning";
                    }
                    break;
                case '+' :
                    buffer[buffindex]++;
                    buffer[buffindex] = (256+buffer[buffindex])%256;
                    buffelements.getElementsByTagName("button")[buffindex].innerHTML = buffer[buffindex].toString();
                    break;
                case '-' :
                    buffer[buffindex]--;
                    buffer[buffindex] = (256+buffer[buffindex])%256;
                    buffelements.getElementsByTagName("button")[buffindex].innerHTML = buffer[buffindex].toString();
                    break;
                case ',' :
                    if (readindex==input.length)
                    {
                        codeinput.classList.add("is-invalid");
                        error.innerHTML = "Warning! Input Out of range! You wanted to ',' read empty. at "+index.toString();
                        //index=code.length;
                        buffer[buffindex] = 0;
                    }
                    else
                    {
                        buffer[buffindex] = input.charCodeAt(readindex++);
                    }
                    buffelements.getElementsByTagName("button")[buffindex].innerHTML = buffer[buffindex].toString();
                    break;
                case '.' :
                    output.value += String.fromCharCode(buffer[buffindex]);
                    break;
                case '[' :
                    if (buffer[buffindex] == 0)
                    {
                        var brackets = 1;
                        error.innerHTML = "Infinite Loop! You forgot to ']'. at "+index.toString();
                        
                        while(index+1<code.length && brackets!=0)
                        {
                            index++;
                            switch(code.charAt(index))
                            {
                                case '[':
                                    brackets++;
                                    break;
                                case ']':
                                    brackets--;
                                    break;
                            }
                        }
                        if (brackets!=0)
                        {
                            codeinput.classList.add("is-invalid");
                            index=code.length;
                        }
                    }
                    break;
                case ']' :
                    if((new Date()).getTime()-3000>time)
                    {
                        codeinput.classList.add("is-invalid");
                        error.innerHTML = "Infinite Loop! code Timeout. at "+index.toString();
                        index=code.length;
                    }
                    else if (buffer[buffindex] != 0)
                    {
                        var brackets = -1;
                        error.innerHTML = "Out of Range! You wanted to '['. at "+index.toString();
                        
                        while(index-1>0 && brackets!=0)
                        {
                            index--;
                            switch(code.charAt(index))
                            {
                                case '[':
                                    brackets++;
                                    break;
                                case ']':
                                    brackets--;
                                    break;
                            }
                        }
                        if (brackets!=0)
                        {
                            codeinput.classList.add("is-invalid");
                            index=code.length;
                        }
                    }
                    break;
            }
            index++;
        }
        // clearTimeout(kill);
        buttonicon.innerText = "play_arrow"
        buttonicon.classList.remove("rotate")
        buttontext.innerText = "RUN"
});
codeinput.addEventListener("input",(e)=>{
    codeinput.classList.remove("is-invalid");
    document.cookie = `lastcode=${codeinput.value}; expires=Thu, 19 Dec 2030 12:00:00 UTC; path=/`;
})
/*codeinput.addEventListener("input",(e)=>{
    var code = codeinput.value;

    if (! "<>[].+,-".includes(code.slice(code.length-1,code.length)))
    {
        codeinput.value = code.slice(0,code.length-1);
    }
})*/
