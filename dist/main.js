(()=>{document.querySelector(".main-container");const t=document.querySelector(".project-form"),e=document.getElementById("project-title"),o=(document.querySelector(".project-create-button"),document.querySelector(".project-list-container"),document.querySelector(".project-list")),n=(document.querySelectorAll(".project-list-item"),document.querySelectorAll(".project-remove-button"),document.getElementById("project-selector")),c=(document.querySelectorAll(".project-option"),document.getElementById("task-title")),l=document.getElementById("task-description"),i=document.getElementById("task-date"),r=(document.getElementById("task-time"),document.getElementById("task-priority")),a=document.querySelector(".task-create-button"),s=(document.querySelector(".task-list-container"),document.querySelector(".task-list"));let u;function d(t){!function(t){const e=document.createElement("li");e.classList.add("project-list-item"),e.setAttribute("data-id",""+t.id),e.innerHTML=`\n    ${t.title} <button class="button project-remove-button" data-id="${t.id}">Remove</button>\n  `,o.appendChild(e)}(t),function(t){const e=document.createElement("option");e.classList.add("project-option"),e.setAttribute("data-id",t.id),e.setAttribute("value",t.title),e.innerText=t.title,n.appendChild(e)}(t)}function m(){e.value=null,c.value=null,l.value=null,i.value=null,r.value=null}function p(){let t;return t=null===localStorage.getItem("projects")?[]:JSON.parse(localStorage.getItem("projects")),t}t.addEventListener("submit",(function(t){if(t.preventDefault(),(null===(o=e.value)||""===o)&&(alert("Title cannot be empty, please fill in a project title."),1))return;var o;const n={title:e.value,id:(new Date).valueOf(),tasks:[]};!function(t){const e=p();e.push(t),localStorage.setItem("projects",JSON.stringify(e))}(n),d(n),m()})),o.addEventListener("click",(t=>{var e,o;e=t.target,o=t.target.dataset.id,function(t){t.classList.contains("project-remove-button")&&t.parentElement.remove()}(e),function(t,e){document.querySelectorAll(".project-option").forEach(((o,c)=>{o.dataset.id==e&&t.classList.contains("project-remove-button")&&n.remove(c,1)}))}(e,o),function(t){const e=p();e.forEach(((o,n)=>{o.id==t&&e.splice(n,1)})),localStorage.setItem("projects",JSON.stringify(e))}(o)})),o.addEventListener("click",(t=>{(function(t){t.classList.contains("project-list-item")&&(u=t.dataset.id,console.log(u))})(t.target),document.querySelectorAll(".project-list-item").forEach((t=>{t.classList.contains("project-list-item")&&t.classList.remove("active"),t.dataset.id==u&&t.classList.add("active")})),document.querySelectorAll(".project-option").forEach((t=>{t.removeAttribute("selected"),t.dataset.id==u&&t.setAttribute("selected","selected")}))})),a.addEventListener("click",(function(t){if(t.preventDefault(),null==c.value||""===c.value)return;const e={project:n.value,title:c.value,description:l.value,date:i.value,priority:r.value,id:(new Date).valueOf()};saveTaskLocalStorage(e),function(t){const e=document.createElement("li");e.classList.add("task-list-item"),e.innerText=t.title,s.appendChild(e)}(e),m()})),document.addEventListener("DOMContentLoaded",(function(){const t=p();t.forEach((t=>d(t))),console.log(t)}))})();