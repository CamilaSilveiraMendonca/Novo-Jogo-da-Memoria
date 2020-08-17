
    var bImagem = [];  //vetor que armazena 2 vezes todas as imagens que serão usadas e de forma aleatória   
    var vAux=[];    //auxilia o vetor bImagem
    var pontos=0,tentativas=0,cartasViradas=0;

    function construirBase(nivel){
        nivel = (nivel*4); //quando chamar a função terá que passar esse valor
        for(let i=0;i<nivel;i++){   //cria um vetor com numeros aleatórios de 1 até 11 e com tamano de nivel
            let j=Math.abs(Math.floor((Math.random()*10)+2));
            if ((bImagem.indexOf(j)!=-1)||(j>11)){
                i--;
            }
            else{
                bImagem.push(j);
            }
        }
        cartasViradas=nivel;    //é usada na função fimJogo
        tentativas=nivel;   //cada nível terá quantidade de tentativas equivalente a ele
        duplicarBase(nivel);
    }

    function duplicarBase(n){   //duplica bImagem de forma aleatoria para que cada imagem tenha um par
        var i=0;
        while(i<n){
            let j=Math.abs(Math.floor((Math.random()*10)+2));
            if ((bImagem.indexOf(j)!=-1)&&(vAux.indexOf(j)==-1)){
                bImagem.push(j);
                vAux.push(j);
                i++;
            }
        }
        document.getElementById('tentativas').value=tentativas;
        document.getElementById('pontos').value=pontos;
    }

    var temp=[];
    function clicou(foto){
        if((temp.length<2)&&(!fimJogo())){
            temp.push(foto);
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
            pontos+=100;
            ifoto1.style.visibility= "hidden";
            ifoto2.style.visibility= "hidden";
            cartasViradas --;
            document.getElementById('pontos').value=pontos;
        }
        if(foto1!=foto2){
            ifoto1.style.backgroundImage= 'url(../imagens/carta1.png)';
            ifoto2.style.backgroundImage= 'url(../imagens/carta1.png)';
            tentativas--;
            document.getElementById('tentativas').value=tentativas;
        }
        temp=[];
        ifoto1.disabled=false;
        fimJogo();
    }

    function fimJogo(){
        if((tentativas<=0)||(cartasViradas==0)){
            window.alert("Fim de Jogo! Sua pontuação total: "+pontos);
            document.location.reload(true);
            return true;
        }
    }

