import React from 'react';

function UserCard({ user, isLoading }) {
  if (isLoading) {
    return (
      <div className="loader">
        <span>Загрузка...</span>
      </div>
    );
  }

  if (!user) {
    console.log('Пользователь не загружен');
    return <p>Нет данных</p>;
  }

  return (
    <div className="user-card">
      <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
      <h2>Имя: {`${user.name.first} ${user.name.last}`}</h2>
      <p>Email: {user.email}</p>
      <p>Страна: {user.location.country}</p>
    </div>
  );
}

export default UserCard;