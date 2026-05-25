document.addEventListener("DOMContentLoaded", () => {

const tarea = document.getElementById("taskInput");
const categoria = document.getElementById("categorySelect");
const fecha = document.getElementById("dueDateInput");
const lista = document.getElementById("tasklist");
const buscar = document.getElementById("searchInput");
const filtro = document.getElementById("filterSelect");
const stats = document.getElementById("statics");

flatpickr("#dueDateInput",{dateFormat:"Y-m-d",minDate:"today"});

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

mostrar();

document.getElementById("addTask").addEventListener("click",()=>{

    if(tarea.value.trim()==""){
        alert("Escribe una tarea");
        return;
    }

    tareas.push({
        id:Date.now(),
        texto:tarea.value,
        categoria:categoria.value,
        fecha:fecha.value,
        completada:false
    });

    guardar();

    tarea.value="";
    categoria.value="";
    fecha.value="";
});

function mostrar(){

    lista.innerHTML="";

    let texto = buscar.value.toLowerCase();

    tareas.filter(t=>{

        let buscarTexto =
        t.texto.toLowerCase().includes(texto);

        let estado =
        filtro.value=="all"
        ? true
        : filtro.value=="active"
        ? !t.completada
        : t.completada;

        return buscarTexto && estado;

    }).forEach(t=>{

        const li = document.createElement("li");

        li.className =
        "list-group-item d-flex justify-content-between";

        li.innerHTML=`
        <div>
            <span class="${t.completada ? "text-decoration-line-through text-secondary":""}">
                ${t.texto}
            </span>

            <span class="badge bg-info ms-2">
                ${t.categoria}
            </span>

            <small class="ms-2 text-secondary">
                ${t.fecha}
            </small>
        </div>

        <div>
            <button class="btn btn-success btn-sm comp">
                ${t.completada ? "Deshacer":"Completar"}
            </button>

            <button class="btn btn-danger btn-sm elim">
                Eliminar
            </button>
        </div>
        `;

        li.querySelector(".comp").onclick=()=>{

            t.completada=!t.completada;
            guardar();

        };

        li.querySelector(".elim").onclick=()=>{

            tareas=tareas.filter(x=>x.id!=t.id);
            guardar();

        };

        lista.appendChild(li);

    });

    let c = tareas.filter(t=>t.completada).length;

    stats.innerHTML=`
    Total: ${tareas.length} |
    Activas: ${tareas.length-c} |
    Completadas: ${c}
    `;
}

function guardar(){

    localStorage.setItem("tareas",JSON.stringify(tareas));

    mostrar();
}

buscar.addEventListener("input",mostrar);
filtro.addEventListener("change",mostrar);

});