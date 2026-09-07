const dialog = document.querySelector('#project-dialog');
const ideas = {
  tasks: { title: 'Odak & görev takipçisi', description: 'Görev ekleme, tamamlanan işleri işaretleme ve günlük ilerlemeyi görme özellikleriyle başlayabilecek küçük bir uygulama. İlk hedef, görevleri tarayıcıda saklamak ve sade bir arayüz oluşturmak.' },
  algorithms: { title: 'Algoritma atölyesi', description: 'Sıralama algoritmalarının adımlarını çubuk grafiklerle gösteren bir uygulama fikri. Hızı değiştirme, işlemi duraklatma ve farklı veri kümeleriyle deneme özellikleriyle geliştirilebilir.' }
};
document.querySelectorAll('[data-dialog]').forEach(button => {
  button.addEventListener('click', () => {
    const idea = ideas[button.dataset.dialog];
    document.querySelector('#dialog-title').textContent = idea.title;
    document.querySelector('#dialog-description').textContent = idea.description;
    dialog.showModal();
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
document.querySelector('#year').textContent = new Date().getFullYear();
