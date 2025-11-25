// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 智能体入口按钮交互
    const agentButton = document.querySelector('.agent-button');
    const featureTags = document.querySelectorAll('.feature-tag');
    
    if (agentButton) {
        // 点击按钮跳转到 agent.html（智能对话页面）
        agentButton.addEventListener('click', function() {
            // 添加轻微点击反馈
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                // 跳转到本地 agent 页面
                window.location.href = 'agent.html';
            }, 120);
        });
        
        // 为机器人图标添加旋转动画
        const robotIcon = agentButton.querySelector('.button-icon i');
        if (robotIcon) {
            let rotationState = 0;
            
            agentButton.addEventListener('mouseenter', function() {
                // 机器人图标旋转动画
                robotIcon.style.transition = 'transform 0.5s ease';
                rotationState += 360;
                robotIcon.style.transform = `rotate(${rotationState}deg)`;
                
                // 添加脉冲效果
                robotIcon.classList.add('pulse-animation');
                setTimeout(() => {
                    robotIcon.classList.remove('pulse-animation');
                }, 1000);
            });
        }
        
        // 为箭头添加动画效果
        const arrowIcon = agentButton.querySelector('.button-arrow i');
        if (arrowIcon) {
            agentButton.addEventListener('mouseenter', function() {
                // 箭头动画
                let position = 0;
                const moveArrow = setInterval(() => {
                    position += 3;
                    arrowIcon.style.transform = `translateX(${position}px)`;
                    if (position >= 10) {
                        clearInterval(moveArrow);
                        setTimeout(() => {
                            position = 0;
                            arrowIcon.style.transform = `translateX(${position}px)`;
                        }, 300);
                    }
                }, 50);
            });
        }
    }
    
    // 为特性标签添加交互效果
    featureTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            // 轻微上浮和缩放效果
            this.style.transform = 'translateY(-4px) scale(1.03)';
            this.style.boxShadow = '0 6px 20px rgba(106, 13, 173, 0.25)';
            
            // 图标动画
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        tag.addEventListener('mouseleave', function() {
            // 恢复原始状态
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
            
            // 恢复图标
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
        
        tag.addEventListener('click', function() {
            // 点击特性标签也可以进入相应功能
            const featureName = this.textContent.trim();
            console.log(`进入功能: ${featureName}`);
            alert(`即将进入: ${featureName}`);
        });
    });
    
    // 添加按钮呼吸效果
    function startButtonBreathing() {
        if (agentButton) {
            const breathingEffect = () => {
                agentButton.style.boxShadow = '0 8px 25px rgba(106, 13, 173, 0.3)';
                setTimeout(() => {
                    agentButton.style.boxShadow = '0 12px 35px rgba(106, 13, 173, 0.45)';
                    setTimeout(breathingEffect, 2000);
                }, 2000);
            };
            breathingEffect();
        }
    }
    
    // 启动呼吸效果
    startButtonBreathing();
    
    // 快速导航交互增强
    const navItems = document.querySelectorAll('.nav-item');
    const navHeader = document.querySelector('.nav-header');

    // 导航项交互动画
    navItems.forEach((item, index) => {
        // 初始化动画延迟，错开进入效果
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // 页面加载时的渐入动画
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 300 + (index * 100));
        
        // 鼠标悬停时的交互效果
        item.addEventListener('mouseenter', () => {
            // 图标缩放和旋转动画
            const icon = item.querySelector('.nav-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            
            // 图标背景的虚线动画
            const iconBefore = window.getComputedStyle(icon, '::before');
            if (iconBefore.opacity === '0') {
                icon.classList.add('animate-dash');
            }
            
            // 箭头移动动画
            const arrow = item.querySelector('.nav-arrow');
            arrow.style.transform = 'translateX(10px)';
            
            // 文本颜色变化
            const text = item.querySelector('.nav-text');
            text.style.color = 'var(--accent-color)';
            
            // 添加轻微的抖动效果
            item.classList.add('nav-shake');
        });
        
        item.addEventListener('mouseleave', () => {
            // 恢复图标状态
            const icon = item.querySelector('.nav-icon');
            icon.style.transform = 'scale(1) rotate(0)';
            
            // 恢复箭头状态
            const arrow = item.querySelector('.nav-arrow');
            arrow.style.transform = 'translateX(0)';
            
            // 恢复文本颜色
            const text = item.querySelector('.nav-text');
            text.style.color = 'var(--primary-color)';
            
            // 移除抖动效果
            item.classList.remove('nav-shake');
        });
        
        // 点击效果
        item.addEventListener('click', (e) => {
            // 获取目标链接
            const targetId = item.getAttribute('href');

            // 如果是页面内锚点(以 # 开头)，执行平滑滚动
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
                return;
            }

            // 否则是跳转到其他页面（例如 culture.html），先做点击动画和波纹效果，再短延迟跳转以显示动画
            if (targetId) {
                e.preventDefault();

                // 点击时的缩放效果
                const card = item.querySelector('.nav-card') || item;
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 150);

                // 添加波纹效果
                createRipple(e, card);

                // 短延迟后导航到目标页面
                setTimeout(() => {
                    window.location.href = targetId;
                }, 220);
            }
        });
    });

    // 页面滚动时导航标题的动画效果
    window.addEventListener('scroll', () => {
        if (navHeader) {
            const scrollPosition = window.scrollY;
            const headerPosition = navHeader.getBoundingClientRect().top + scrollPosition;
            
            if (scrollPosition > headerPosition - window.innerHeight * 0.8) {
                navHeader.style.opacity = '1';
                navHeader.style.transform = 'translateY(0)';
            } else {
                navHeader.style.opacity = '0.8';
                navHeader.style.transform = 'translateY(10px)';
            }
        }
    });

    // 初始化导航标题动画
    if (navHeader) {
        navHeader.style.opacity = '0';
        navHeader.style.transform = 'translateY(20px)';
        navHeader.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        
        setTimeout(() => {
            navHeader.style.opacity = '1';
            navHeader.style.transform = 'translateY(0)';
        }, 200);
    }

    // 为导航添加滚动动画类
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('nav-visible');
            }
        });
    }, observerOptions);

    navItems.forEach(item => {
        observer.observe(item);
    });

    // 添加导航项的抖动动画样式
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
    .nav-shake {
        animation: shake 0.5s ease-in-out;
    }

    @keyframes shake {
        0%, 100% { transform: translateY(-8px); }
        25% { transform: translateY(-8px) rotate(-1deg); }
        75% { transform: translateY(-8px) rotate(1deg); }
    }

    .animate-dash::before {
        animation: dash-animation 1.5s ease-in-out;
    }

    @keyframes dash-animation {
        0% { stroke-dashoffset: 1000; }
        100% { stroke-dashoffset: 0; }
    }

    .nav-visible {
        animation: fadeInUp 0.8s ease-out;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    `;
    document.head.appendChild(styleSheet);

    // 为导航项添加波纹效果
    function createRipple(event, element) {
        const circle = document.createElement('span');
        const diameter = Math.max(element.clientWidth, element.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - element.getBoundingClientRect().left - radius}px`;
        circle.style.top = `${event.clientY - element.getBoundingClientRect().top - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = element.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        element.appendChild(circle);
        
        // 添加波纹样式
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(106, 13, 173, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
            z-index: 1000;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        `;
        document.head.appendChild(rippleStyle);
    }
    
    // 页面加载动画
    function animateOnLoad() {
        const elements = document.querySelectorAll('.header-text, .header-image, .agent-button, .nav-item');
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }
    
    // 初始化页面
    function initPage() {
        // 在这里可以添加其他初始化逻辑
        console.log('独秀文枢网站初始化完成');
        
        // 可以添加页面访问统计
        // 例如: sendAnalytics('page_view', 'home');
    }
    
    // 执行初始化
    initPage();
    
    // 实现平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 响应式菜单处理（如果需要）
    function handleResponsiveMenu() {
        const isMobile = window.innerWidth <= 768;
        console.log(`当前设备: ${isMobile ? '移动设备' : '桌面设备'}`);
        
        // 在这里可以根据设备类型调整UI
    }
    
    // 监听窗口大小变化
    window.addEventListener('resize', handleResponsiveMenu);
    
    // 初始检查
    handleResponsiveMenu();
    
    // 添加页面滚动效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 50) {
            header.style.boxShadow = '0 6px 25px rgba(106, 13, 173, 0.25)';
            header.style.transition = 'box-shadow 0.3s ease';
        } else {
            header.style.boxShadow = '0 4px 20px rgba(106, 13, 173, 0.2)';
        }
    });
});

// 可扩展的功能函数

// 发送分析数据（示例）
function sendAnalytics(eventType, eventData) {
    console.log(`分析数据: ${eventType} - ${eventData}`);
    // 实际项目中可以集成Google Analytics或其他分析工具
}

// 加载动态内容（示例）
function loadDynamicContent() {
    console.log('加载动态内容...');
    // 这里可以实现异步加载内容的功能
}

// 处理错误（示例）
function handleError(error) {
    console.error('发生错误:', error);
    // 这里可以实现错误报告或用户友好的错误提示
}

// 本地存储管理（示例）
function storageManager() {
    return {
        set: function(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                console.error('存储数据失败:', error);
                return false;
            }
        },
        get: function(key) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (error) {
                console.error('获取数据失败:', error);
                return null;
            }
        },
        remove: function(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (error) {
                console.error('删除数据失败:', error);
                return false;
            }
        }
    };
}

// 导出存储管理器
const storage = storageManager();