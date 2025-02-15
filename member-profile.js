document.addEventListener('DOMContentLoaded', function() {
    // التحكم في التبويبات
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // إزالة الحالة النشطة من جميع الأزرار والمحتويات
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // تفعيل التبويب المحدد
            button.classList.add('active');
            tabContents[index].classList.add('active');
        });
    });

    // تكبير الصور في المعرض
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(img => {
        img.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${img.src}" alt="${img.alt}">
                </div>
            `;
            document.body.appendChild(modal);

            // إغلاق النافذة المنبثقة
            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.remove();
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });

    // تحريك الصفحة إلى التبويب المحدد من الرابط
    const hash = window.location.hash;
    if (hash) {
        const targetTab = document.querySelector(`[data-tab="${hash.slice(1)}"]`);
        if (targetTab) {
            targetTab.click();
        }
    }

    // تفعيل أزرار المشاركة والإعجاب
    const actionButtons = document.querySelectorAll('.contribution-footer span');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fas')) {
                icon.classList.remove('fas');
                icon.classList.add('far');
            } else {
                icon.classList.remove('far');
                icon.classList.add('fas');
            }
        });
    });

    // تحميل المزيد من المساهمات
    const loadMoreBtn = document.querySelector('.load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // هنا يمكن إضافة كود لتحميل المزيد من المساهمات
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
                // إضافة مساهمات جديدة
            }, 1000);
        });
    }
});
