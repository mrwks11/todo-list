(()=>{document.querySelector(".main-container");const t=document.getElementById("project-title"),e=document.querySelector(".project-create-button"),o=(document.querySelector(".project-list-container"),document.querySelector(".project-list")),c=(document.querySelectorAll(".project-list-item"),document.querySelectorAll(".project-remove-button"),document.getElementById("project-selector")),n=document.getElementById("task-title"),l=document.getElementById("task-description"),r=document.getElementById("task-date"),i=(document.getElementById("task-time"),document.getElementById("task-priority"));function a(t){!function(t){const e=document.createElement("li");e.classList.add("project-list-item"),e.setAttribute("data-id",""+t.id),e.innerHTML=`\n    ${t.title} <button class="button project-remove-button" data-id="${t.id}">Remove</button>\n  `,o.appendChild(e)}(t),function(t){const e=document.createElement("option");e.classList.add("project-option"),e.setAttribute("data-id",t.id),e.setAttribute("value",t.title),e.innerText=t.title,c.appendChild(e)}(t)}function s(){let t;return t=null===localStorage.getItem("projects")?[]:JSON.parse(localStorage.getItem("projects")),t}document.querySelector(".task-create-button"),document.querySelector(".task-list-container"),document.querySelector(".task-list"),e.addEventListener("click",(function(e){if(e.preventDefault(),(null===(o=t.value)||""===o)&&(alert("Title cannot be empty, please fill in a project title."),1))return;var o;const c={title:t.value,id:(new Date).valueOf(),tasks:[]};!function(t){const e=s();e.push(t),localStorage.setItem("projects",JSON.stringify(e))}(c),a(c),t.value=null,n.value=null,l.value=null,r.value=null,i.value=null})),o.addEventListener("click",(t=>{var e,o;e=t.target,o=t.target.dataset.id,function(t){t.classList.contains("project-remove-button")&&t.parentElement.remove()}(e),function(t,e){document.querySelectorAll(".project-option").forEach(((o,n)=>{o.dataset.id==e&&t.classList.contains("project-remove-button")&&c.remove(n,1)}))}(e,o),function(t){const e=s();e.forEach(((o,c)=>{o.id==t&&e.splice(c,1)})),localStorage.setItem("projects",JSON.stringify(e))}(o)})),o.addEventListener("click",(t=>{(function(t){t.classList.contains("project-list-item")&&(activeProject=t.dataset.id,console.log(activeProject))})(t.target),document.querySelectorAll(".project-list-item").forEach((t=>{t.classList.contains("project-list-item")&&t.classList.remove("active"),t.dataset.id==activeProject&&t.classList.add("active")})),document.querySelectorAll(".project-option").forEach((t=>{t.removeAttribute("selected"),t.dataset.id==activeProject&&t.setAttribute("selected","selected")}))})),document.addEventListener("DOMContentLoaded",(function(){s().forEach((t=>a(t)))}))})();