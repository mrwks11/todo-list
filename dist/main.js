(()=>{document.querySelector(".main-container");const e=document.getElementById("project-title"),t=document.querySelector(".project-create-button"),n=(document.querySelector(".project-list-container"),document.querySelector(".project-list")),l=(document.querySelectorAll(".project-list-item"),document.querySelectorAll(".project-remove-button"),document.getElementById("project-selector")),o=document.getElementById("task-title"),c=document.getElementById("task-description"),r=document.getElementById("task-date"),a=(document.getElementById("task-time"),document.getElementById("task-priority")),i=document.querySelector(".task-create-button"),u=(document.querySelector(".task-list-container"),document.querySelector(".task-list"));function s(e){const t=document.createElement("li");t.classList.add("project-list-item"),t.innerHTML=`\n    ${e.title} <button class="button project-remove-button" data-id="${e.id}">Remove</button>\n  `,n.appendChild(t),function(e){const t=document.createElement("option");t.classList.add("project-option"),t.setAttribute("data-id",e.id),t.setAttribute("value",e.title),t.innerText=e.title,l.appendChild(t)}(e)}function d(){e.value=null,o.value=null,c.value=null,r.value=null,a.value=null}function m(){let e;return e=null===localStorage.getItem("projects")?[]:JSON.parse(localStorage.getItem("projects")),e}t.addEventListener("click",(function(t){if(t.preventDefault(),function(e){return(null===e||""===e)&&(alert("Title cannot be empty, please fill in a project title."),!0)}(e.value))return;if(n=e.value,void m().forEach((e=>{if(n===e.title)return alert("Project already exists, please enter a new title."),!0})))return;var n;const l={title:e.value,id:(new Date).valueOf(),tasks:[]};s(l),function(e){const t=m();t.push(e),localStorage.setItem("projects",JSON.stringify(t))}(l),d()})),i.addEventListener("click",(function(e){e.preventDefault(),null!=o.value&&""!==o.value&&(o.value,c.value,r.value,a.value,function(){const e=document.createElement("li");e.classList.add("task-list-item"),e.innerText=o.value,u.appendChild(e)}(),d())})),n.addEventListener("click",(e=>{var t,n;t=e.target,n=e.target.dataset.id,function(e){e.classList.contains("project-remove-button")&&e.parentElement.remove()}(t),function(e){const t=m();t.forEach(((n,l)=>{n.id==e&&t.splice(l,1)})),localStorage.setItem("projects",JSON.stringify(t))}(n)})),document.addEventListener("DOMContentLoaded",(function(){m().forEach((e=>s(e)))}))})();