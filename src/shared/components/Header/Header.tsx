import type { ReactNode } from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  children: ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <header className={`${styles.header} glass`}>
      {children}
    </header>
  );
}

interface StandardRowProps {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
}

Header.StandardRow = function StandardRow({ left, center, right }: StandardRowProps) {
  // If there's no center, space-between pushes left and right to edges.
  // If there's a center, we wrap it to ensure it takes up flexible space or is centered.
  return (
    <div className={styles.standardRow}>
      {left && <div className={styles.standardRowLeft}>{left}</div>}
      {center && <div className={styles.standardRowCenter}>{center}</div>}
      {right && <div className={styles.standardRowRight}>{right}</div>}
    </div>
  );
};

interface CustomRowProps {
  children: ReactNode;
  className?: string;
}

Header.CustomRow = function CustomRow({ children, className = '' }: CustomRowProps) {
  return (
    <div className={`${styles.row} ${className}`}>
      {children}
    </div>
  );
};
