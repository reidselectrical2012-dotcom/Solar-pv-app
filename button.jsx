export function Button({ children, onClick, className='' }) {
  return <button onClick={onClick} className={`px-3 py-2 bg-black text-white rounded ${className}`}>{children}</button>
}
