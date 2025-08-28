tinymce.init({
    selector: 'textarea.tiny-mce',
    // API Key từ TinyMCE Cloud
    api_key: 'qado614b80ik6nj27k4wu32te35dp8f24d8gy640mnun5hb2',
    plugins: 'lists link image table code help wordcount',
    toolbar: 'undo redo | formatselect | bold italic backcolor color | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image | help',
    height: 400,
    menubar: 'file edit view', 
    branding: false, // Ẩn TinyMCE branding
    
    // Image upload configuration
    // file_picker_callback: (cb, value, meta) => {
    //     const input = document.createElement('input');
    //     input.setAttribute('type', 'file');
    //     input.setAttribute('accept', 'image/*');

    //     input.addEventListener('change', (e) => {
    //         const file = e.target.files[0];

    //         const reader = new FileReader();
    //         reader.addEventListener('load', () => {
    //             const id = 'blobid' + (new Date()).getTime();
    //             const blobCache = tinymce.activeEditor.editorUpload.blobCache;
    //             const base64 = reader.result.split(',')[1];
    //             const blobInfo = blobCache.create(id, file, base64);
    //             blobCache.add(blobInfo);

    //             cb(blobInfo.blobUri(), { title: file.name });
    //         });
    //         reader.readAsDataURL(file);
    //     });

    //     input.click();
    // },
});
