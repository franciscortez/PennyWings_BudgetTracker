

export default function AnimatedPage({ children, className = "" }) {
  return (
    <div className={`animate-page-enter ${className}`}>
      {children}
    </div>
  );
}
