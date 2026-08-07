import styles from './page.module.css'
import PanelMenu from '../../../compenents/PanelMenu/page'
import PanelOtherMenu from '../../../compenents/PanelOtherMenu/page'

export default function Page ({ children, modal }){
  return (
    <div className={styles.mainContainer}>
        <div className={styles.panelBarPcContainer}>
            <PanelMenu/>
        </div>

        <div className={styles.panelBarOtherContainer}>
           <PanelOtherMenu/>
        </div>

        <div className={styles.contextContainer}>{children}</div>
    </div>
  );
} 