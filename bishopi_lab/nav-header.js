// 네비게이션 기능 초기화
function initNavigation() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('.nav-menu');
    const navButtons = document.querySelectorAll('.nav-button');

    // 모바일 메뉴 토글
    mobileMenuButton.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.setAttribute('aria-expanded', 
            this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
        );
    });

    // 서브메뉴 토글 (터치 이벤트)
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const navItem = this.parentElement;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // 다른 모든 메뉴 닫기
            navButtons.forEach(otherButton => {
                if (otherButton !== this) {
                    otherButton.parentElement.classList.remove('active');
                    otherButton.setAttribute('aria-expanded', 'false');
                }
            });

            // 현재 메뉴 토글
            navItem.classList.toggle('active');
            this.setAttribute('aria-expanded', !isExpanded);
        });

        // 마우스 호버 이벤트 (데스크톱)
        const navItem = button.parentElement;
        navItem.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                // 다른 모든 메뉴 닫기
                navButtons.forEach(otherButton => {
                    if (otherButton !== button) {
                        otherButton.parentElement.classList.remove('active');
                        otherButton.setAttribute('aria-expanded', 'false');
                    }
                });

                // 현재 메뉴 열기
                this.classList.add('active');
                button.setAttribute('aria-expanded', 'true');
            }
        });

        navItem.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.classList.remove('active');
                button.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // 화면 크기가 변경될 때 모바일 메뉴 상태 초기화
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            navButtons.forEach(button => {
                button.setAttribute('aria-expanded', 'false');
            });
        }
    });
}

// HTML이 로드된 후 네비게이션 초기화
document.addEventListener('DOMContentLoaded', function() {
    // w3-include-html이 완료될 때까지 대기
    const checkIncludeComplete = setInterval(function() {
        if (document.querySelector('.nav-menu')) {
            clearInterval(checkIncludeComplete);
            initNavigation();
        }
    }, 100);
}); 