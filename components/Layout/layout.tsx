import Header from '../Header';
import Side from '../Side';
import styles from './layout.module.css';

export default function Layout({ children }) {
  return <div className={styles.container}>
    <Header />
    <Side />
    <main>
      {children}
    </main>
  </div>;
}
