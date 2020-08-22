
    var bImagem = [];  //vetor que armazena 2 vezes todas as imagens que serão usadas e de forma aleatória   
    var vAux=[];    //auxilia o vetor bImagem
    var pontos=0,tentativas=0,cartasViradas=0,metade=0;
    var temp=[];    //guarda temporariamente as cartas selecionadas em cada rodada

    function construirBase(nivel){  //cria a base de dados das fotos usadas
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
        tentativas=nivel+2;   //cada nível terá quantidade de tentativas equivalente a ele
        metade=tentativas/2;
        duplicarBase(nivel);
    }

    function duplicarBase(n){   //duplica bImagem de forma aleatoria para que cada imagem tenha um par
        let i=0;
        while(i<n){
            let j=Math.floor((Math.random()*10)+2);
            if ((bImagem.indexOf(j)!=-1)&&(vAux.indexOf(j)==-1)){
                bImagem.push(j);
                vAux.push(j);
                i++;
            }
        }
        document.getElementById('tentativas').value=tentativas;
        document.getElementById('pontos').value=pontos;
    }
        
    function clicou(foto){  //é chamada quando uma carta é clicada
        if(temp.indexOf(foto)==-1){ //executa somente se a carta selecionada não estiver dentro do vetor temp 
            temp.push(foto);
            var fotos=bImagem[foto];    //pega no banco de imagens a foto em que o indice seja o mesmo da carta selecionada
            var ifotos=document.getElementById(foto);   
            ifotos.style.backgroundImage= 'url(../imagens/colocar/'+fotos+'.png)';  //mostra a foto
            if((temp.length==2)&&((tentativas<=1)||(cartasViradas<=1))){
                verifica();            
                setTimeout(()=>{
                    setTimeout(()=>{
                        document.getElementById('tentativas').value=tentativas;                    
                    },20);                
                    fimJogo();
                },1000);         
            }
            else if (temp.length==2){  //depois que escolher duas cartas, que será verificado se elas são iguais ou diferentes
                verifica();         
            }
        }        
    }
    
    function verifica(){   //verifica se o par de cartas são iguais ou diferentes
        var foto1=bImagem[temp[0]];
        var foto2=bImagem[temp[1]];
        var ifoto1=document.getElementById(temp[0]);
        var ifoto2=document.getElementById(temp[1]);
        if(foto1==foto2){
            setTimeout( ()=>{
                pontos+=100;
                ifoto1.style.visibility= "hidden";
                ifoto2.style.visibility= "hidden";
                cartasViradas--;
                document.getElementById('pontos').value=pontos;
            }, 500);      
        }
        else{
            setTimeout(()=>{
                ifoto1.style.backgroundImage= 'url(../imagens/carta1.png)';
                ifoto2.style.backgroundImage= 'url(../imagens/carta1.png)';
                tentativas--;
                document.getElementById('tentativas').value=tentativas;
            },500);
        }
        temp=[];
    }

    function fimJogo(){
        let bonus=0;
        if(tentativas>=metade){
            bonus=tentativas*200;
            pontos+=bonus;
        }
        window.alert("Fim de Jogo!\nBônus: "+bonus+"\nSua pontuação final: "+pontos);
        document.location.reload(true);        
    }