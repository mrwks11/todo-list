(()=>{const e=document.getElementById("project-title"),t=document.querySelector(".project-create-button"),n=(document.querySelector(".project-list-container"),document.querySelector(".project-list"));document.getElementById("task-title"),document.getElementById("task-description"),document.getElementById("task-date"),document.getElementById("task-priority"),document.querySelector(".task-create-button"),document.querySelector(".task-list-container"),document.querySelector(".task-list"),t.addEventListener("click",(function(t){t.preventDefault(),null!==e.value&&""!==e.value&&(e.value,function(){const t=document.createElement("li");t.classList.add("project-list-item"),t.innerText=e.value,n.appendChild(t)}(),e.value=null)}))})();