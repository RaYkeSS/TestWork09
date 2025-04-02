import styles from './FavoriteButton.module.scss';

interface FavoriteButtonProps {
  isActive: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export function FavoriteButton({ isActive, onClick }: FavoriteButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(e);
  };

  return (
    <button
      className={`${styles.button} ${isActive ? styles.active : ''}`}
      onClick={handleClick}
      aria-label={isActive ? 'Удалить из избранного' : 'Добавить в избранное'}
    >
      {isActive ? '★' : '☆'}
    </button>
  );
}
