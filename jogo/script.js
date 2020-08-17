    var bImagem = [];
    var vImagem=[];
    var vAux=[];
    function construirBase(nivel){
        nivel = (nivel*4); //quando chamar a função terá q passar esse valor
        for(let i=0;i<nivel;i++){
            let j=Math.abs(Math.floor((Math.random()*10)+2));
            if ((bImagem.indexOf(j)!=-1)||(j>11)){
                i--;
            }
            else{
                bImagem.push(j);
            }
        }
        duplicarBase(nivel);
    }

    function duplicarBase(n){
        var i=0;
        while(i<n){
            let j=Math.abs(Math.floor((Math.random()*10)+2));
            if ((bImagem.indexOf(j)!=-1)&&(vAux.indexOf(j)==-1)){
                bImagem.push(j);
                vAux.push(j);
                i++;
            }
        }
        gerarMatriz(bImagem.length);
    }


    function gerarMatriz(n){
        var ini=0,fim=4,pos=0;
        var l=(n/4);        
        for(l;l>0;l--){
            vImagem[pos]=bImagem.slice(ini,fim);
            ini+=4;
            fim+=4;
            pos++;  
        }
    }

    function clicou(){
        
    }

    function Virar(){

    }

