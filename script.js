
    (function() {
      // ========== الوضع الداكن ==========
      const darkToggle = document.getElementById('darkModeToggle');
      darkToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkToggle.innerHTML = document.body.classList.contains('dark-mode') 
          ? '<i class="fas fa-sun"></i> Light' 
          : '<i class="fas fa-moon"></i> Dark';
      });

      // ========== التخزين المحلي ==========
      const STORAGE_KEY = 'daynest_tasks';

      // تحميل المهام من LocalStorage أو مصفوفة فارغة
      let tasks = [];
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          tasks = JSON.parse(saved);
          // التأكد من أن كل مهمة لها الخاصيات المطلوبة 
          tasks = tasks.map(t => ({ ...t, editMode: false }));
        }
      } catch (e) {
        console.warn('Failed to load tasks from localStorage', e);
      }

      let currentFilterPriority = 'all';

      // ========== حفظ المهام في LocalStorage ==========
      function saveTasks() {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.map(({ editMode, ...rest }) => rest))); // لا نحفظ editMode
        } catch (e) {
          console.warn('Failed to save tasks', e);
        }
      }

      // ========== حساب نسبة الإنجاز ==========
      function updateProgress() {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
        
        document.getElementById('progressPercent').textContent = `${percent}%`;
        document.getElementById('progressFill').style.width = `${percent}%`;
      }

      // ========== عرض المهام ==========
      function renderTasks() {
        const container = document.getElementById('taskListContainer');
        let filteredTasks = [...tasks];
        
        // ترتيب حسب الأولوية
        const priorityOrder = { 'عالية': 1, 'متوسطة': 2, 'منخفضة': 3 };
        filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

        if (currentFilterPriority !== 'all') {
          filteredTasks = filteredTasks.filter(t => t.priority === currentFilterPriority);
        }

        if (filteredTasks.length === 0) {
          container.innerHTML = `
            <div class="empty-message">
              <i class="far fa-smile-wink"></i>
              <p>ماذا تخطط لليوم؟ 🤔</p>
              <small>أضف مهمتك الأولى من الأسفل</small>
            </div>
          `;
        } else {
          container.innerHTML = filteredTasks.map(task => `
            <div class="task-item" data-id="${task.id}">
              <span class="task-check ${task.completed ? 'completed' : ''}" onclick="toggleTask('${task.id}')"></span>
              ${task.editMode ? 
                `<input type="text" class="edit-input" value="${task.text}" id="edit-${task.id}" onblur="saveEdit('${task.id}')" onkeypress="if(event.key==='Enter') saveEdit('${task.id}')">` :
                `<span class="task-text ${task.completed ? 'completed' : ''}" ondblclick="enableEdit('${task.id}')">${task.text}</span>`
              }
              <span class="task-badge"><i class="fas fa-tag"></i> ${task.badge || '📌'} ${task.priority}</span>
              <div class="task-actions">
                <i class="fas fa-edit" onclick="enableEdit('${task.id}')" style="color: #5f7d9c;"></i>
                <i class="fas fa-trash-alt" onclick="deleteTask('${task.id}')"></i>
              </div>
            </div>
          `).join('');
        }

        updateProgress(); // تحديث شريط التقدم بعد كل تغيير
        saveTasks(); // حفظ المهام في كل تحديث
      }

      // دوال عامة
      window.toggleTask = (id) => {
        tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        renderTasks();
      };

      window.deleteTask = (id) => {
        tasks = tasks.filter(t => t.id !== id);
        renderTasks();
      };

      window.enableEdit = (id) => {
        tasks = tasks.map(t => t.id === id ? { ...t, editMode: true } : t);
        renderTasks();
        setTimeout(() => {
          const input = document.getElementById(`edit-${id}`);
          if (input) input.focus();
        }, 50);
      };

      window.saveEdit = (id) => {
        const input = document.getElementById(`edit-${id}`);
        if (input) {
          const newText = input.value.trim();
          if (newText) {
            tasks = tasks.map(t => t.id === id ? { ...t, text: newText, editMode: false } : t);
          } else {
            tasks = tasks.map(t => t.id === id ? { ...t, editMode: false } : t);
          }
        } else {
          tasks = tasks.map(t => t.id === id ? { ...t, editMode: false } : t);
        }
        renderTasks();
      };

      // إضافة مهمة جديدة
      document.getElementById('addTaskBtn').addEventListener('click', () => {
        const textInput = document.getElementById('newTaskText');
        const prioritySelect = document.getElementById('newTaskPriority');
        const badgeInput = document.getElementById('newTaskBadge');
        const text = textInput.value.trim();
        if (!text) return;

        const newTask = {
          id: Date.now().toString(),
          text: text,
          completed: false,
          priority: prioritySelect.value,
          badge: badgeInput.value.trim() || '📌',
          editMode: false
        };
        tasks.push(newTask);
        textInput.value = '';
        badgeInput.value = '📌';
        renderTasks();
      });

      // فلتر الأولوية
      document.getElementById('priorityFilter').addEventListener('change', (e) => {
        currentFilterPriority = e.target.value;
        renderTasks();
      });

      // ========== التقويم ==========
      let currentDate = new Date();
      let selectedDay = currentDate.getDate();
      let selectedMonth = currentDate.getMonth();
      let selectedYear = currentDate.getFullYear();

      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        document.getElementById('currentMonthDisplay').innerText = `${monthNames[month]} ${year}`;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        let cells = [];
        for (let i = firstDay - 1; i >= 0; i--) {
          cells.push(`<span class="day-cell other-month" data-day="${daysInPrevMonth - i}" data-month="${month-1}" data-year="${year}">${daysInPrevMonth - i}</span>`);
        }
        for (let d = 1; d <= daysInMonth; d++) {
          const isSelected = (selectedDay === d && selectedMonth === month && selectedYear === year);
          cells.push(`<span class="day-cell ${isSelected ? 'selected' : ''}" data-day="${d}" data-month="${month}" data-year="${year}">${d}</span>`);
        }
        const totalCells = cells.length;
        const nextMonthDays = 42 - totalCells;
        for (let d = 1; d <= nextMonthDays; d++) {
          cells.push(`<span class="day-cell other-month" data-day="${d}" data-month="${month+1}" data-year="${year}">${d}</span>`);
        }

        document.getElementById('calendarDays').innerHTML = cells.join('');

        document.querySelectorAll('.day-cell').forEach(cell => {
          cell.addEventListener('click', (e) => {
            const day = cell.dataset.day;
            const month = cell.dataset.month;
            const year = cell.dataset.year;
            if (month !== undefined && year !== undefined) {
              selectedDay = parseInt(day);
              selectedMonth = parseInt(month);
              selectedYear = parseInt(year);
              currentDate = new Date(selectedYear, selectedMonth, selectedDay);
              renderCalendar();
              document.getElementById('selectedDateDisplay').innerText = `اليوم المحدد: ${selectedDay} ${monthNames[selectedMonth]} ${selectedYear}`;
            }
          });
        });
      }

      document.getElementById('prevMonthBtn').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
      });
      document.getElementById('nextMonthBtn').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
      });

      function updateLiveTime() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        document.getElementById('live-time').innerHTML = `<i class="far fa-clock"></i> ${timeStr}`;
      }
      setInterval(updateLiveTime, 1000);
      updateLiveTime();

      // تهيئة
      renderCalendar();
      renderTasks();

      setTimeout(() => {
        document.getElementById('selectedDateDisplay').innerText = `اليوم المحدد: ${selectedDay} ${monthNames[selectedMonth]} ${selectedYear}`;
      }, 100);
    })();
  
