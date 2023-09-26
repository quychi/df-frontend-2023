export const Modal = (props) => {
  const { isOpen, onYes, onCLose, title, children} = props;

  return (
    <div className={`modal ${isOpen ? 'block' : 'none'}`}>
      <div className="modal__content">
        <div className="modal__content__header">
          <h2>{title}</h2>
          <button type="button" className="modal__content__header__close-btn" onClick={onCLose}>&times;</button>
        </div>
          <div className="modal__content__body">
            {children}
          </div>
      </div>
    </div>
  );
}
