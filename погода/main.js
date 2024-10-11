const lat = 43.25;
      const lon = 76.95;
      const apiKey = '30acf5f35276c3c031a529a1f7d3cf20';
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${apiKey}&lang=ru&units=metric`;

      // Функция для получения и отображения данных погоды
      async function getWeatherData() {
        try {
          const response = await fetch(url);
          const data = await response.json();

          // Отображаем погоду прямо сейчас
          document.getElementById('temp').textContent = `${data.current.temp} °C`;
          document.getElementById('humi').textContent = `${data.current.humidity} %`;
          document.getElementById('wind').textContent = `${data.current.wind_speed} м/с`;
          document.getElementById('uvi').textContent = `${data.current.uvi}`;

          // Отображаем прогноз погоды на неделю
          const weeklyWeatherBody = document.getElementById('weeklyWeatherBody');
          weeklyWeatherBody.innerHTML = ''; // Очищаем таблицу перед добавлением

          const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
          const currentDay = new Date().getDay();

          data.daily.slice(0, 7).forEach((day, index) => {
            const date = new Date(day.dt * 1000); // Конвертируем UNIX время
            const dayName = daysOfWeek[(currentDay + index) % 7]; // Получаем название дня недели

            // Добавляем новую строку в таблицу
            const row = `
              <tr>
                <td>${dayName}</td>
                <td>${day.temp.day} °C</td>
                <td>${day.humidity} %</td>
                <td>${day.wind_speed} м/с</td>
              </tr>
            `;

            weeklyWeatherBody.innerHTML += row;
          });
        } catch (error) {
          console.error('Ошибка при получении данных погоды:', error);
        }
      }

      // Вызываем функцию для получения данных после загрузки страницы
      getWeatherData();