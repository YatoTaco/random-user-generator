import React, { useState, useEffect, useCallback } from 'react';
import './styles/App.css';

const API_URL = 'https://randomuser.me/api/';

function App() {
  const [user, setUser] = useState(null);
  const [genderFilter, setGenderFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      // Формируем корректный URL
      const url = genderFilter
        ? `${API_URL}?gender=${encodeURIComponent(genderFilter.trim())}`
        : API_URL;

      console.log('Запрос к API:', url); // Отладочный лог

      const response = await fetch(url);
      console.log('Ответ от сервера:', response.status); // Проверяем статус ответа

      if (!response.ok) {
        throw new Error(`Ошибка при загрузке данных: ${response.status}`);
      }

      const data = await response.json();
      console.log('Данные пользователя:', data);

      const user = data.results[0];
      setUser(user);
    } catch (error) {
      console.error('Ошибка при получении данных:', error.message);
    } finally {
      setIsLoading(false);
    }
  }, [genderFilter]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="app">
      <h1>Генератор случайных пользователей</h1>
      {isLoading ? (
        <div className="loader"><span>Загрузка...</span></div>
      ) : user ? (
        <div className="user-card-container">
          <div className="user-card">
            <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
            <h2>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h2>
            <p>Email: {user.email}</p>
            <p>Страна: {user.location.country}</p>
          </div>
        </div>
      ) : (
        <p>Нет данных</p>
      )}

      {/* Разделим карточку и нижнюю часть */}
      <div className="controls-container">
        <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
          <option value="">Все</option>
          <option value="male">Мужчины</option>
          <option value="female">Женщины</option>
        </select>

        <button onClick={fetchUser}>Новый пользователь</button>
      </div>
    </div>
  );
}

export default App;