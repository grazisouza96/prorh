// script.js
document.addEventListener('DOMContentLoaded', () => {
    // lista de formulario 
   const itemForm = document.getElementById('item-form');
   const itemList = document.getElementById('item-list');
   let items = JSON.parse(localStorage.getItem('items')) || [];

   function saveItems() {
       localStorage.setItem('items', JSON.stringify(items));
   }

   function renderItems() {
       itemList.innerHTML = '';
       items.forEach((item, index) => {
           const li = document.createElement('li');
           li.innerHTML = `
               ${item.nome} - ${item.descricao}
               <button onclick="editItem(${index})">Editar</button>
               <button onclick="deleteItem(${index})">Excluir</button>
           `;
           itemList.appendChild(li);
       });
   }

   window.editItem = (index) => {
       const item = items[index];
       document.getElementById('item-id').value = index;
       document.getElementById('item-nome').value = item.nome;
       document.getElementById('item-descricao').value = item.descricao;
   };
    // excluir um item da lista

   window.deleteItem = (index) => {
       items.splice(index, 1);
       saveItems();
       renderItems();
   };

   itemForm.addEventListener('submit', (e) => {
       e.preventDefault();
       const id = document.getElementById('item-id').value;
       const nome = document.getElementById('item-nome').value;
       const descricao = document.getElementById('item-descricao').value;

       if (id) {
           items[id] = { nome, descricao };
       } else {
           items.push({ nome, descricao });
       }

       saveItems();
       renderItems();
       itemForm.reset();
   });
// carregamento da pagina 
   renderItems();
});
