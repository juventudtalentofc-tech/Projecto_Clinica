// Navegación entre vistas
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