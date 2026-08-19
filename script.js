/*fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
        document.getElementById("resultado").innerText = data.name;
    });

    primeira chamada do fetch - pega a url e faz a requisição.
    then(res  => res.json())pega a resosta bruta e converte para JSON utilizável.
    o data usa esse json pra colocar o name do usuario dentro da div usando o innertext.
 */

/*fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => {
        let html ="";
        data.forEach(user => {
            html += `<p>${user.name}</p>`;
        });
        document.getElementById("resultado").innerHTML = html;
    }); 
     
    segunda chamada do fetch - pega a url e faz a requisição, mas agora com o forEach para percorrer o array de objetos e mostrar o nome de cada usuário. Aquie é utilizado o innerhtml e não o text porque estamos inserindo tags <p> (HTML) não só texto puro.
    
    */
    document.getElementById("btnBuscar").addEventListener("click" , () => {
        const id = document.getElementById("idUsuario").value;
     
        if(id ==="") {
            document.getElementById("resultado").innerHTML = `<p> Digite um ID antes de buscar.</p>`;
            return
        }
         if( Number(id) <= 0 || Number(id) > 10) {
            document.getElementById("resultado").innerHTML = `<p>Digite um ID válido(entre 1 e 10).</p>`;
            return;
        } 

        document.getElementById("loading").style.display = "block";
        document.getElementById("resultado").innerHTML = "";

        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(res => {
        if (!res.ok){
            throw new Error("Erro na resposta da API");
        }
            return res.json();
    })
        
        .then(user => {
        document.getElementById("loading").style.display= "none";

        const html = `<p><strong>${user.name}</strong><br>Email:${user.email}<br>Cidade: ${user.address.city}</p>`;
        ;
        document.getElementById("resultado").innerHTML = html;
    })

    .catch(erro => {
        document.getElementById("loading").style.display= "none";
        document.getElementById("resultado").innerHTML = `<p>Erro ao buscar usuários.</p>`;
        console.error(erro);
    });

});
   
   let todosUsuarios = [];

   fetch("https://jsonplaceholder.typicode.com/users")
   .then(res => res.json())
   .then(data => {
        todosUsuarios =data;
        mostrarUsuarios(todosUsuarios);
   });

   function mostrarUsuarios(lista) {
    const html = lista.map(user =>
        `<p><strong>${user.name}</strong><br>Email:${user.email}</p>`
    ).join("");
         document.getElementById("resultado").innerHTML = html;
   }

   document.getElementById("busca").addEventListener("input", () => {
       const termo = document.getElementById("busca").value;

       const filtrados = todosUsuarios.filter(user =>
        user.name.toLowerCase().includes(termo.toLowerCase())
    );
    mostrarUsuarios(filtrados);
   });

    /* strong -pra por em negrito
    br - para quebrar linha

    terceira chamada do fetch utiliza user.address.city. o endereço é o objeto do usuário.
    */