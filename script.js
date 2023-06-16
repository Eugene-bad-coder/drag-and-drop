"use strict";
document.addEventListener("DOMContentLoaded", function () {
  //load image Drag-and-drop
  document.querySelectorAll('.js-load-img').forEach(function (item) {
    item.addEventListener('change', function () {
      let imageContainer = item.closest('.js-load-img-parent').querySelector('.js-past-img');
      if (this.files && this.files.length > 0) {
        let file = this.files[0];
        if (file.type == 'image/svg+xml' || file.type == 'image/x-png' || file.type == 'image/png' || file.type == 'image/bmp' || file.type == 'image/jpeg' || file.type == 'image/jpg') {
          if (this.files[0].size > 5242880) {
            this.value = '';
            return false;
          }
          let input = this;
          if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
              imageContainer.innerHTML = '<img src="' + e.target.result + '">';
            }
            reader.readAsDataURL(input.files[0]);
          }
        }
      } else {
        imageContainer.innerHTML = '';
      }
    })
  })

  //remove image
  document.querySelectorAll('.js-remove-img').forEach(function (item) {
    item.addEventListener('click', function (e) {
      let parent = item.closest('.js-load-img-parent');
      parent.querySelector('.js-past-img').innerHTML = '';
      parent.querySelector('.js-load-img').value = null;
    });
  });
  //load image Drag-and-drop
  document.querySelectorAll('.js-drag-drop-img').forEach(function (item) {
    item.addEventListener('dragover', function (e) {
      e.preventDefault();
    });
    item.addEventListener('dragenter', function (e) {
      this.classList.add('_drag');
      e.preventDefault();
    });

    item.addEventListener('dragleave', function (e) {
      this.classList.remove('_drag');
    });
    item.addEventListener('drop', function (e) {
      let parent = item.closest('.js-load-img-parent');
      let fileInput = parent.querySelector('.js-load-img');
      let fileDrop = parent.querySelector('.js-drag-drop-img');
      fileDrop.classList.remove('_drag');

      const dT = new DataTransfer();
      dT.items.add(e.dataTransfer.files[0]);
      fileInput.files = e.dataTransfer.files;
      fileInput.dispatchEvent(new Event('change'));
      this.classList.remove('_drag');
      e.preventDefault();
    });
  });
});