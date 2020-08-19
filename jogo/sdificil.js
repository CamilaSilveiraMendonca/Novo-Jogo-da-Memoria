
    var bImagem = [];  //vetor que armazena 2 vezes todas as imagens que serão usadas e de forma aleatória   
    var vAux=[];    //auxilia o vetor bImagem
    var pontos=0,tentativas=0,cartasViradas=0;
    var nivel=0;
    var vImagem=[];

    function construirBase(){
        nivel = 6; 
        for(let i=0;i<nivel;i++){   //cria um vetor com numeros aleatórios de 1 até 11 e com tamano de nivel
            let j=Math.abs(Math.floor(Math.random()*10));
            if ((bImagem.indexOf(j)!=-1)||(j>5)){
                i--;
            }
            else{
                bImagem.push(j);
            }
        }
        cartasViradas=12;    //é usada na função fimJogo
        tentativas=14;   //cada nível terá quantidade de tentativas equivalente a ele
        duplicarBase(nivel);
    }

    function duplicarBase(n){   //duplica bImagem de forma aleatoria para que cada imagem tenha um par
        var i=0;
        while(i<n){
            let j=Math.abs(Math.floor(Math.random()*10));
            if ((bImagem.indexOf(j)!=-1)&&(vAux.indexOf(j)==-1)){
                bImagem.push(j);
                vAux.push(j);
                i++;
            }
        }
        document.getElementById('tentativas').value=tentativas;
        document.getElementById('pontos').value=pontos;
        baseTotal();
    }

    function baseTotal(){
        for(let posicao = 0;posicao<bImagem.length;posicao++){
            vImagem[posicao]=bImagem[posicao]+6;
        }
        bImagem = bImagem.concat(vImagem);
    }

    var temp=[];
    function clicou(foto){
        temp.push(foto);
        if((tentativas<=1)||(cartasViradas<=1)){
            virar();            
            setTimeout(()=>{
                setTimeout(()=>{
                    document.getElementById('tentativas').value=tentativas;                    
                },20);                
                fimJogo();
            },1000);
            
        }
        else if (temp.length<=2){ //se trocar o === para <2, ele volta como antes mas no inspecionar mostra erro. Então é bom refatorar.
            virar();
           
        }
    }
    
    
    function virar(){
        var foto1=bImagem[temp[0]];
        var ifoto1=document.getElementById(temp[0]);
        ifoto1.style.backgroundImage= 'url(../imagens/colocar/'+foto1+'.png)';
        ifoto1.disabled=true;
        var foto2=bImagem[temp[1]];
        var ifoto2=document.getElementById(temp[1]);
        ifoto2.style.backgroundImage= 'url(../imagens/colocar/'+foto2+'.png)';
        if(foto1==foto2){
            setTimeout( ()=>{
                pontos+=100;
                ifoto1.style.visibility= "hidden";
                ifoto2.style.visibility= "hidden";
                cartasViradas--;
                document.getElementById('pontos').value=pontos;
            }, 500);      
        }
        if(foto1!=foto2){
            setTimeout(()=>{
                ifoto1.style.backgroundImage= 'url(../imagens/carta1.png)';
                ifoto2.style.backgroundImage= 'url(../imagens/carta1.png)';
                tentativas--;
                document.getElementById('tentativas').value=tentativas;
            },500);
        }
        temp=[];
        ifoto1.disabled=false;
    }

    function fimJogo(){
        var bonus=0;
        if(tentativas>=7){
            bonus=tentativas*200;
            pontos+=bonus;
        }
        window.alert("Fim de Jogo!\nBônus de "+bonus+"\nSua pontuação final: "+pontos);
        document.location.reload(true);
    }