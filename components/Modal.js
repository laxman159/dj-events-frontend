import styles from "@/styles/Modal.module.css";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
export default function Modal({ show, onClose, children, title }) {
  const [isBrowser, setisBrowser] = useState(false);

  useEffect(() => setisBrowser(true), []);

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href="#" onClick={handleClose}>
            <FaTimes />
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}
