const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.menu-list');

menuButton.addEventListener('click', () => {
  menu.classList.toggle('open');
});


const gallery = document.querySelector('.gallery');

function makeDialogElement() {
  const dialog = document.createElement('dialog');
  dialog.className = 'viewer-dialog';
  dialog.setAttribute('aria-label', 'Image viewer');
  dialog.innerHTML = `
  <div class="image-container">
    <img alt="">
    <button class="close-viewer" aria-label="Close viewer">X</button>
  </div>
`;
  return dialog;
}

function openImageInDialog(imageSrc, imageAlt) {
  const dialog = makeDialogElement();

  const img = dialog.querySelector('img');
  const closeBtn = dialog.querySelector('.close-viewer');

  img.src = imageSrc;
  img.alt = imageAlt || '';

  document.body.appendChild(dialog);

  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
  } else {
    dialog.style.position = 'fixed';
    dialog.style.top = '0';
    dialog.style.left = '0';
    dialog.style.right = '0';
    dialog.style.bottom = '0';
    dialog.style.display = 'flex';
  }

  dialog.focus();

  closeBtn.addEventListener('click', () => {
    try {
      dialog.close();
    } catch (e) {
      dialog.remove();
    }
    dialog.remove();
  });

  dialog.addEventListener('click', (ev) => {
    if (ev.target === dialog) {
      try {
        dialog.close();
      } catch (e) {  }
      dialog.remove();
    }
  });

  dialog.addEventListener('close', () => {
    dialog.remove();
  });
}

function thumbToFull(thumbSrc) {
  return thumbSrc.replace(/-sm(\.jpe?g)$/i, '-full$1');
}

gallery.addEventListener('click', (event) => {
  const clickedImg = event.target.closest('img');
  if (!clickedImg || !gallery.contains(clickedImg)) return;

  const thumbSrc = clickedImg.getAttribute('src') || clickedImg.src;
  const fullSrc = thumbToFull(thumbSrc);
  const alt = clickedImg.getAttribute('alt') || '';

  openImageInDialog(fullSrc, alt);
});