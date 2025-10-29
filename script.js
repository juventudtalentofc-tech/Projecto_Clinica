 // Base de datos de usuarios
    const users = {
      'santiago': { password: '1234', name: 'Dr. santiago' },
      'jose': { password: '1234', name: 'Dr. jose' },
      'aleck': { password: '1234', name: 'Dr. aleck' },
      'nestor': { password: '1234', name: 'Dr. nestor' }
    };

    // Elementos del DOM
    const loginScreen = document.getElementById('loginScreen');
    const appContainer = document.getElementById('appContainer');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginAlert = document.getElementById('loginAlert');
    const currentUser = document.getElementById('currentUser');
    const logoutBtn = document.getElementById('logoutBtn');
    const goToRegister = document.getElementById('goToRegister');

    // Navegación entre pestañas de login/registro
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remover clase active de todos los enlaces
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        // Agregar clase active al enlace clickeado
        this.classList.add('active');
        
        // Ocultar todos los paneles
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        
        // Mostrar el panel correspondiente
        const target = this.getAttribute('href');
        document.querySelector(target).classList.add('active');
      });
    });

    // Enlace "Registrarse" en el formulario de login
    goToRegister.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('#tab-register').click();
    });

    // Manejo del formulario de login
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const username = document.getElementById('loginName').value;
      const password = document.getElementById('loginPassword').value;
      
      // Validar credenciales
      if (users[username] && users[username].password === password) {
        // Login exitoso
        loginAlert.style.display = 'none';
        currentUser.textContent = users[username].name;
        loginScreen.style.display = 'none';
        appContainer.style.display = 'flex';
      } else {
        // Login fallido
        loginAlert.style.display = 'block';
      }
    });

    // Manejo del formulario de registro
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('registerName').value;
      const username = document.getElementById('registerUsername').value;
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
      const repeatPassword = document.getElementById('registerRepeatPassword').value;
      
      // Validaciones básicas
      if (password !== repeatPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      
      if (users[username]) {
        alert('El usuario ya existe');
        return;
      }
      
      // Registrar nuevo usuario
      users[username] = { password: password, name: name };
      alert('Usuario registrado exitosamente. Ahora puede iniciar sesión.');
      
      // Limpiar formulario y volver a login
      registerForm.reset();
      document.querySelector('#tab-login').click();
    });

    // Cerrar sesión
    logoutBtn.addEventListener('click', function() {
      appContainer.style.display = 'none';
      loginScreen.style.display = 'flex';
      loginForm.reset();
      loginAlert.style.display = 'none';
    });

    // Navegación entre vistas de la aplicación
    document.addEventListener('DOMContentLoaded', function() {
      const menuLinks = document.querySelectorAll('.menu a');
      const views = document.querySelectorAll('.view');
      
      // Función para cambiar de vista
      function showView(viewId) {
        // Ocultar todas las vistas
        views.forEach(view => {
          view.classList.remove('active');
        });
        
        // Mostrar la vista seleccionada
        const targetView = document.getElementById(viewId);
        if (targetView) {
          targetView.classList.add('active');
        }
        
        // Actualizar enlaces del menú
        menuLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Marcar el enlace activo
        const activeLink = document.querySelector(`.menu a[data-view="${viewId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
      
      // Manejar clics en los enlaces del menú
      menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const viewId = this.getAttribute('data-view');
          showView(viewId);
          
          // Actualizar URL
          history.pushState({view: viewId}, '', `#/${viewId}`);
        });
      });
      
      // Manejar el botón de modo wireframe
      const toggleWfBtn = document.getElementById('toggleWf');
      toggleWfBtn.addEventListener('click', function() {
        document.body.classList.toggle('wf');
      });
      
      // Manejar navegación con el historial del navegador
      window.addEventListener('popstate', function(e) {
        if (e.state && e.state.view) {
          showView(e.state.view);
        } else {
          // Si no hay estado, mostrar dashboard por defecto
          showView('dashboard');
        }
      });
      
      // Mostrar vista inicial basada en la URL
      const initialView = window.location.hash.replace('#/', '') || 'dashboard';
      showView(initialView);
    });

